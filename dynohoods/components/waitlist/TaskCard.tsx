"use client";

import { motion } from "framer-motion";
import { Check, ExternalLink, Loader2 } from "lucide-react";
import XLogo from "@/components/waitlist/XLogo";
import { DEMO_MODE } from "@/lib/waitlist";
import type { TaskState, XTaskId } from "@/components/waitlist/useWaitlistFlow";

const PLATE =
  "rounded-xl border p-4 sm:p-5 backdrop-blur-2xl transition-colors " +
  "bg-[rgba(7,21,15,0.58)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]";

interface XTaskCardProps {
  num: string;
  title: string;
  instruction: string;
  actionLabel: string;
  taskId: XTaskId;
  state: TaskState;
  disabledAction: boolean;
  onAction: () => void;
  onVerify: () => void;
}

export function XTaskCard({
  num,
  title,
  instruction,
  actionLabel,
  taskId,
  state,
  disabledAction,
  onAction,
  onVerify,
}: XTaskCardProps) {
  const done = state.verified;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${PLATE} ${
        done
          ? "border-teal/40 bg-teal/[0.12]"
          : "border-white/10 hover:border-teal/30"
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <span
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
            done
              ? "border-teal/40 bg-teal/10 text-teal"
              : "border-white/10 bg-white/[0.03] text-muted"
          }`}
        >
          {done ? (
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
            >
              <Check className="h-5 w-5" />
            </motion.span>
          ) : (
            <XLogo className="h-4 w-4" />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-sm font-semibold text-foreground">
              <span className="mr-1.5 font-mono text-xs text-subtle">
                {num}
              </span>
              {title}
            </p>
            <StatusChip done={done} verifying={state.verifying} />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
            {instruction}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onAction}
              disabled={disabledAction || done}
              className="btn btn-ghost min-h-11 px-4 py-2 text-xs sm:text-sm"
            >
              {actionLabel}
              <ExternalLink className="h-3.5 w-3.5" />
            </button>

            {!done && state.opened && (
              <button
                type="button"
                onClick={onVerify}
                disabled={state.verifying}
                className="btn btn-primary min-h-11 px-4 py-2 text-xs sm:text-sm"
              >
                {state.verifying ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Checking
                  </>
                ) : DEMO_MODE ? (
                  "Verify (demo)"
                ) : (
                  "Verify"
                )}
              </button>
            )}
          </div>

          {state.error && (
            <p role="alert" className="mt-2 text-xs text-danger">
              {state.error}
            </p>
          )}

          {!done && !state.opened && (
            <p className="mt-2 text-[0.7rem] leading-relaxed text-subtle">
              Opening {taskId === "like" ? "the post" : "X"} does not mark this
              done. Come back and verify after you finish the action.
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

interface QuoteTaskCardProps {
  quoteUrl: string;
  done: boolean;
  error: string | null;
  disabledAction: boolean;
  onQuote: () => void;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function QuoteTaskCard({
  quoteUrl,
  done,
  error,
  disabledAction,
  onQuote,
  onChange,
  onBlur,
}: QuoteTaskCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${PLATE} ${
        done
          ? "border-teal/40 bg-teal/[0.12]"
          : "border-white/10 hover:border-teal/30"
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <span
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
            done
              ? "border-teal/40 bg-teal/10 text-teal"
              : "border-white/10 bg-white/[0.03] text-muted"
          }`}
        >
          {done ? (
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
            >
              <Check className="h-5 w-5" />
            </motion.span>
          ) : (
            <XLogo className="h-4 w-4" />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-sm font-semibold text-foreground">
              <span className="mr-1.5 font-mono text-xs text-subtle">04</span>
              Quote
            </p>
            <StatusChip done={done} />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
            Quote the pinned post
          </p>
          <p className="mt-1 text-xs leading-relaxed text-subtle">
            Quote the pinned post, then paste your post link below.
          </p>

          <div className="mt-3">
            <button
              type="button"
              onClick={onQuote}
              disabled={disabledAction}
              className="btn btn-ghost min-h-11 px-4 py-2 text-xs sm:text-sm"
            >
              Quote post
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>

          <label
            htmlFor="waitlist-quote"
            className="mt-4 block text-xs font-medium text-foreground"
          >
            Post link
          </label>
          <input
            id="waitlist-quote"
            type="url"
            autoComplete="off"
            spellCheck={false}
            placeholder="https://x.com/you/status/…"
            value={quoteUrl}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "waitlist-quote-error" : undefined}
            className="field-input mt-1.5 font-mono text-xs"
          />
          {error ? (
            <p
              id="waitlist-quote-error"
              role="alert"
              className="mt-1.5 text-xs text-danger"
            >
              {error}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-subtle">
              Paste the full x.com / twitter.com status link from your quote.
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function StatusChip({
  done,
  verifying,
}: {
  done: boolean;
  verifying?: boolean;
}) {
  if (done) {
    return (
      <span className="inline-flex items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-wider text-teal">
        <Check className="h-3 w-3" />
        Completed
      </span>
    );
  }
  if (verifying) {
    return (
      <span className="text-[0.6rem] font-medium uppercase tracking-wider text-primary">
        Checking
      </span>
    );
  }
  return (
    <span className="text-[0.6rem] font-medium uppercase tracking-wider text-subtle">
      Not completed
    </span>
  );
}
