"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { isValidWallet, isValidXLink } from "@/lib/validation";
import {
  DEMO_MODE,
  quoteLinkError,
  submitWaitlist,
  verifyLike,
  verifyReply,
  verifyRepost,
  xActionUrl,
  isPinnedPostConfigured,
  type WaitlistSubmission,
  type XTaskId,
} from "@/lib/waitlist";

export type { XTaskId };

export interface TaskState {
  opened: boolean;
  verified: boolean;
  verifying: boolean;
  error: string | null;
}

const EMPTY_TASK: TaskState = {
  opened: false,
  verified: false,
  verifying: false,
  error: null,
};

export function useWaitlistFlow() {
  const [like, setLike] = useState<TaskState>(EMPTY_TASK);
  const [reply, setReply] = useState<TaskState>(EMPTY_TASK);
  const [repost, setRepost] = useState<TaskState>(EMPTY_TASK);
  const [quoteUrl, setQuoteUrl] = useState("");
  const [quoteTouched, setQuoteTouched] = useState(false);
  const [wallet, setWallet] = useState("");
  const [walletTouched, setWalletTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<WaitlistSubmission | null>(null);
  const submittedLock = useRef(false);

  const setTask = useCallback((id: XTaskId, patch: Partial<TaskState>) => {
    const apply = (prev: TaskState): TaskState => ({ ...prev, ...patch });
    if (id === "like") setLike(apply);
    if (id === "reply") setReply(apply);
    if (id === "repost") setRepost(apply);
  }, []);

  const openXTask = useCallback(
    (id: XTaskId) => {
      const url = xActionUrl(id);
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
      if (id !== "quote") {
        setTask(id, { opened: true, error: null });
      }
    },
    [setTask],
  );

  const verifyXTask = useCallback(
    async (id: Exclude<XTaskId, "quote">) => {
      setTask(id, { verifying: true, error: null });
      const run =
        id === "like"
          ? verifyLike
          : id === "reply"
            ? verifyReply
            : verifyRepost;
      const result = await run();
      if (result.ok) {
        setTask(id, { verifying: false, verified: true, error: null });
      } else {
        setTask(id, {
          verifying: false,
          verified: false,
          error:
            result.error ??
            "Could not verify this action. A click is not proof.",
        });
      }
    },
    [setTask],
  );

  const quoteDone = isValidXLink(quoteUrl);
  const quoteError = quoteLinkError(quoteUrl, quoteTouched);

  const completedCount = useMemo(() => {
    return [
      like.verified,
      reply.verified,
      repost.verified,
      quoteDone,
    ].filter(Boolean).length;
  }, [like.verified, reply.verified, repost.verified, quoteDone]);

  const allTasksDone = completedCount === 4;
  const walletValid = isValidWallet(wallet);
  const canSubmit =
    allTasksDone && walletValid && !submitting && !submittedLock.current;

  const submit = useCallback(async () => {
    if (submittedLock.current || submitting) return;

    const payload: WaitlistSubmission = {
      walletAddress: wallet.trim(),
      tasks: {
        liked: like.verified,
        replied: reply.verified,
        reposted: repost.verified,
        quoted: isValidXLink(quoteUrl),
      },
      quoteUrl: quoteUrl.trim(),
      submittedAt: new Date().toISOString(),
    };

    if (
      !payload.tasks.liked ||
      !payload.tasks.replied ||
      !payload.tasks.reposted ||
      !payload.tasks.quoted ||
      !isValidWallet(payload.walletAddress)
    ) {
      setSubmitError("Finish every mission and enter a valid wallet.");
      setWalletTouched(true);
      setQuoteTouched(true);
      return;
    }

    submittedLock.current = true;
    setSubmitting(true);
    setSubmitError(null);

    const result = await submitWaitlist(payload);
    if (result.ok) {
      setSuccess(payload);
    } else {
      submittedLock.current = false;
      setSubmitError(result.error ?? "Submission failed.");
    }
    setSubmitting(false);
  }, [
    like.verified,
    quoteUrl,
    reply.verified,
    repost.verified,
    submitting,
    wallet,
  ]);

  return {
    like,
    reply,
    repost,
    quoteUrl,
    quoteError,
    quoteDone,
    wallet,
    walletTouched,
    submitting,
    submitError,
    success,
    completedCount,
    allTasksDone,
    canSubmit,
    postConfigured: isPinnedPostConfigured(),
    openXTask,
    verifyXTask,
    setQuoteUrl,
    setQuoteTouched,
    setWallet,
    setWalletTouched,
    submit,
  };
}
