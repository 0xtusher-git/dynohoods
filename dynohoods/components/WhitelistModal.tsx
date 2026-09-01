"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { TaskId } from "@/lib/theme";
import { TASKS } from "@/lib/theme";
import { siteConfig } from "@/lib/theme";
import {
  isValidHandle,
  isValidWallet,
  isValidXLink,
} from "@/lib/validation";
import TaskChecklist from "@/components/whitelist/TaskChecklist";
import EntryForm from "@/components/whitelist/EntryForm";
import ConfirmationCard from "@/components/whitelist/ConfirmationCard";
import TrustNote from "@/components/whitelist/TrustNote";

/* ─────────────────────────────────────────────────────────────
   PROVIDER — modal open state, usable from any CTA
   ───────────────────────────────────────────────────────────── */

interface WhitelistCtx {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const WhitelistContext = createContext<WhitelistCtx | null>(null);

export function WhitelistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <WhitelistContext.Provider value={{ isOpen, open, close }}>
      {children}
    </WhitelistContext.Provider>
  );
}

export function useWhitelist() {
  const ctx = useContext(WhitelistContext);
  if (!ctx) throw new Error("useWhitelist must be used inside WhitelistProvider");
  return ctx;
}

/* ─────────────────────────────────────────────────────────────
   WHITELIST FLOW STATE — persisted draft
   ───────────────────────────────────────────────────────────── */

export interface Draft {
  handle: string;
  wallet: string;
  followDone: boolean;
  likeDone: boolean;
  replyUrl: string;
  quoteUrl: string;
}

interface SubmitResult {
  ok: boolean;
  id?: string;
  error?: string;
  message?: string;
  fields?: Record<string, string>;
}

const STORAGE_KEY = "dynohoods-whitelist-v2";
const EMPTY: Draft = {
  handle: "",
  wallet: "",
  followDone: false,
  likeDone: false,
  replyUrl: "",
  quoteUrl: "",
};

function loadDraft(): Partial<Draft> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<Draft>) : {};
  } catch {
    return {};
  }
}

function taskDone(draft: Draft, id: TaskId) {
  switch (id) {
    case "follow":
      return draft.followDone;
    case "like":
      return draft.likeDone;
    case "reply":
      return isValidXLink(draft.replyUrl);
    case "quote":
      return isValidXLink(draft.quoteUrl);
  }
}

/* ─────────────────────────────────────────────────────────────
   THE MODAL
   ───────────────────────────────────────────────────────────── */

export default function WhitelistModal() {
  const { isOpen, close } = useWhitelist();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // keyboard: Esc closes
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // focus management + scroll lock
  useEffect(() => {
    if (!isOpen) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial="hidden"
          animate="show"
          exit="hidden"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* backdrop */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            transition={{ duration: 0.2 }}
          />

          {/* panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Whitelist claim"
            tabIndex={-1}
            className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-surface shadow-2xl outline-none sm:rounded-2xl"
            variants={{
              hidden: { opacity: 0, y: 28, scale: 0.98 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: "spring", stiffness: 300, damping: 28 },
              },
            }}
            transition={{ duration: 0.25 }}
          >
            <WhitelistFlow onClose={close} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   FLOW — form state, draft persistence, submission
   ───────────────────────────────────────────────────────────── */

function WhitelistFlow({ onClose }: { onClose: () => void }) {
  const [draft, setDraft] = useState<Draft>(() => ({ ...EMPTY, ...loadDraft() }));
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [apiFields, setApiFields] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<{
    handle: string;
    wallet: string;
  } | null>(null);

  // persist draft (no secrets, just task + field progress)
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      /* quota — ignore */
    }
  }, [draft]);

  const setField = useCallback(
    <K extends keyof Draft>(key: K, value: Draft[K]) => {
      setDraft((d) => ({ ...d, [key]: value }));
      setApiError(null);
    },
    [],
  );

  const handleError =
    (touched.handle && draft.handle && !isValidHandle(draft.handle)
      ? "Use 3–15 letters, numbers, or underscores, with no spaces."
      : undefined) ?? apiFields?.handle;

  const replyError =
    (touched.replyUrl && draft.replyUrl && !isValidXLink(draft.replyUrl)
      ? "Paste the full link from the post (x.com or twitter.com)."
      : undefined) ?? apiFields?.replyUrl;

  const quoteError =
    (touched.quoteUrl && draft.quoteUrl && !isValidXLink(draft.quoteUrl)
      ? "Paste the full link from the post (x.com or twitter.com)."
      : undefined) ?? apiFields?.quoteUrl;

  const walletError =
    (touched.wallet && draft.wallet && !isValidWallet(draft.wallet)
      ? "That isn't a valid Robinhood Chain address — 0x followed by 40 hex characters."
      : undefined) ?? apiFields?.wallet;

  const validHandle = isValidHandle(draft.handle);
  const validReply = isValidXLink(draft.replyUrl);
  const validQuote = isValidXLink(draft.quoteUrl);
  const validWallet = isValidWallet(draft.wallet);

  const completedCount = TASKS.filter((t) => taskDone(draft, t.id)).length;
  const allComplete =
    validHandle && validReply && validQuote && validWallet && completedCount === 4;

  const submit = async () => {
    if (!allComplete || submitting) return;
    setSubmitting(true);
    setApiError(null);
    setApiFields({});
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        handle: draft.handle,
        wallet: draft.wallet,
        followAttested: draft.followDone,
        likeAttested: draft.likeDone,
        quoteUrl: draft.quoteUrl,
        replyUrl: draft.replyUrl,
        honey: "", // invisible honeypot
      }),
    });
    let result: SubmitResult = { ok: false };
    try {
      result = (await res.json()) as SubmitResult;
    } catch {
      result = { ok: false, error: "network" };
    }
    if (res.ok) {
      setConfirmed({
        handle: draft.handle.trim().replace(/^@?/, "@"),
        wallet: draft.wallet.trim().toLowerCase(),
      });
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    } else {
      setApiError(result.message ?? result.error ?? "Something went wrong.");
      setApiFields(result.fields ?? {});
    }
    setSubmitting(false);
  };

  return (
    <div className="relative">
      {/* header */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="arcade-title text-xs text-foreground">
            Whitelist claim
          </span>
          <span className="chip">{completedCount}/4 tasks</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted transition-colors hover:border-white/25 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {confirmed ? (
        <ConfirmationCard
          handle={confirmed.handle}
          wallet={confirmed.wallet}
          onClose={onClose}
        />
      ) : (
        <div className="overflow-y-auto px-6 py-5">
          <p className="text-sm leading-relaxed text-muted">
            Four quick tasks, then your wallet. None of it takes a shift&apos;s
            worth of moonlight.
          </p>

          <TaskChecklist
            draft={draft}
            setField={setField}
          />

          <EntryForm
            draft={draft}
            setField={setField}
            setTouched={setTouched}
            handleError={handleError}
            replyError={replyError}
            quoteError={quoteError}
            walletError={walletError}
          />

          <TrustNote />

          <button
            onClick={submit}
            disabled={!allComplete || submitting}
            className="btn btn-primary mt-6 w-full px-6 py-3.5 text-base"
          >
            {submitting
              ? "Stomping the form in…"
              : allComplete
                ? "Claim whitelist spot"
                : "Finish tasks + details"}
          </button>

          <p className="mt-3 text-center text-xs leading-relaxed text-subtle">
            One entry per person. Duplicate wallets, duplicate handles and bot
            accounts are removed before the list closes.
          </p>

          {apiError && (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-center text-xs font-medium text-danger"
            >
              {apiError}
            </p>
          )}
        </div>
      )}

      {/* footer strip */}
      <div className="border-t border-white/10 bg-white/[0.02] px-6 py-3">
        <p className="text-xs leading-relaxed text-subtle">
          {siteConfig.projectName} on {siteConfig.chainName} ·{" "}
          {siteConfig.disclaimer}
        </p>
      </div>
    </div>
  );
}