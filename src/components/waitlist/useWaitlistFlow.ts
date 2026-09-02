import { useCallback, useMemo, useRef, useState } from "react";
import { isValidWallet, isValidXPostUrl, isValidXUsername } from "@/lib/validation";
import {
  TASK_TOTAL,
  quoteLinkError,
  replyLinkError,
  usernameError,
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
  const [username, setUsernameState] = useState("");
  const [usernameVerified, setUsernameVerified] = useState(false);
  const [usernameErr, setUsernameErr] = useState<string | null>(null);
  const [quoteUrl, setQuoteUrlState] = useState("");
  const [quoteVerified, setQuoteVerified] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [replyUrl, setReplyUrlState] = useState("");
  const [replyVerified, setReplyVerified] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);
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

  const setUsername = useCallback((value: string) => {
    setUsernameState(value);
    setUsernameVerified(false);
    setUsernameErr(null);
  }, []);

  const submitUsername = useCallback(() => {
    const error = usernameError(username);
    if (error) {
      setUsernameVerified(false);
      setUsernameErr(error);
      return;
    }
    setUsernameErr(null);
    setUsernameVerified(true);
  }, [username]);

  const setQuoteUrl = useCallback((value: string) => {
    setQuoteUrlState(value);
    setQuoteVerified(false);
    setQuoteError(null);
    if (replyVerified && value.trim() && replyUrl.trim() && value.trim().toLowerCase() === replyUrl.trim().toLowerCase()) {
      setReplyVerified(false);
      setReplyError("This link is already used for another task — each one needs a different post.");
    } else if (replyError === "This link is already used for another task — each one needs a different post.") {
      setReplyError(null);
    }
  }, [replyUrl, replyVerified, replyError]);

  const verifyQuote = useCallback(() => {
    const error = quoteLinkError(quoteUrl);
    if (error) {
      setQuoteVerified(false);
      setQuoteError(error);
      return;
    }
    if (replyUrl.trim() && quoteUrl.trim().toLowerCase() === replyUrl.trim().toLowerCase()) {
      setQuoteVerified(false);
      setQuoteError("This link is already used for another task — each one needs a different post.");
      return;
    }
    setQuoteError(null);
    setQuoteVerified(true);
  }, [quoteUrl, replyUrl]);

  const setReplyUrl = useCallback((value: string) => {
    setReplyUrlState(value);
    setReplyVerified(false);
    setReplyError(null);
    if (quoteVerified && value.trim() && quoteUrl.trim() && value.trim().toLowerCase() === quoteUrl.trim().toLowerCase()) {
      setQuoteVerified(false);
      setQuoteError("This link is already used for another task — each one needs a different post.");
    } else if (quoteError === "This link is already used for another task — each one needs a different post.") {
      setQuoteError(null);
    }
  }, [quoteUrl, quoteVerified, quoteError]);

  const verifyReplyUrl = useCallback(() => {
    const error = replyLinkError(replyUrl);
    if (error) {
      setReplyVerified(false);
      setReplyError(error);
      return;
    }
    if (quoteUrl.trim() && replyUrl.trim().toLowerCase() === quoteUrl.trim().toLowerCase()) {
      setReplyVerified(false);
      setReplyError("This link is already used for another task — each one needs a different post.");
      return;
    }
    setReplyError(null);
    setReplyVerified(true);
  }, [replyUrl, quoteUrl]);

  const completedCount = useMemo(() => {
    return [
      usernameVerified,
      like.verified,
      replyVerified,
      repost.verified,
      quoteVerified,
    ].filter(Boolean).length;
  }, [
    usernameVerified,
    like.verified,
    replyVerified,
    repost.verified,
    quoteVerified,
  ]);

  const allTasksDone = completedCount === TASK_TOTAL;
  const walletValid = isValidWallet(wallet);
  const canSubmit =
    allTasksDone && walletValid && !submitting && !submittedLock.current;

  const submit = useCallback(async () => {
    if (submittedLock.current || submitting) return;

    const handleOk = usernameVerified && isValidXUsername(username);
    const quoted = quoteVerified && isValidXPostUrl(quoteUrl);
    const replied = replyVerified && isValidXPostUrl(replyUrl);
    const payload: WaitlistSubmission = {
      walletAddress: wallet.trim(),
      xUsername: username.trim(),
      tasks: {
        usernameSubmitted: handleOk,
        liked: like.verified,
        replied,
        reposted: repost.verified,
        quoted,
      },
      quoteUrl: quoteUrl.trim(),
      replyUrl: replyUrl.trim(),
      submittedAt: new Date().toISOString(),
    };

    if (
      !payload.tasks.usernameSubmitted ||
      !payload.tasks.liked ||
      !payload.tasks.replied ||
      !payload.tasks.reposted ||
      !payload.tasks.quoted ||
      !isValidWallet(payload.walletAddress)
    ) {
      setSubmitError("Finish every mission and enter a valid wallet.");
      setWalletTouched(true);
      if (!handleOk) {
        setUsernameErr(usernameError(username) ?? "Please enter your X username.");
      }
      if (!quoted) {
        setQuoteError(quoteLinkError(quoteUrl) ?? "Please enter your X post link.");
      }
      if (!replied) {
        setReplyError(replyLinkError(replyUrl) ?? "Please enter your reply link.");
      }
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
    quoteVerified,
    replyUrl,
    replyVerified,
    repost.verified,
    submitting,
    username,
    usernameVerified,
    wallet,
  ]);

  return {
    like,
    reply,
    repost,
    username,
    usernameError: usernameErr,
    usernameDone: usernameVerified,
    quoteUrl,
    quoteError,
    quoteDone: quoteVerified,
    replyUrl,
    replyError,
    replyDone: replyVerified,
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
    submitUsername,
    setUsername,
    verifyQuote,
    setQuoteUrl,
    verifyReplyUrl,
    setReplyUrl,
    setWallet,
    setWalletTouched,
    submit,
  };
}
