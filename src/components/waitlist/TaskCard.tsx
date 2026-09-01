import { Check, ExternalLink, Loader2 } from "lucide-react";
import XLogo from "@/components/waitlist/XLogo";
import { DEMO_MODE } from "@/lib/waitlist";
import type { TaskState, XTaskId } from "@/components/waitlist/useWaitlistFlow";

const PLATE =
  "rounded-xl border p-4 sm:p-5 transition-colors " +
  "bg-[rgba(7,21,15,0.94)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]";

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
    <article
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
          {done ? <Check className="h-5 w-5" /> : <XLogo className="h-4 w-4" />}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-sm font-semibold text-white">
              <span className="mr-1.5 font-mono text-xs text-subtle">
                {num}
              </span>
              {title}
            </p>
            <StatusChip done={done} verifying={state.verifying} />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-white sm:text-sm">
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
    </article>
  );
}

interface UsernameTaskCardProps {
  username: string;
  done: boolean;
  error: string | null;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function UsernameTaskCard({
  username,
  done,
  error,
  onChange,
  onSubmit,
}: UsernameTaskCardProps) {
  return (
    <article
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
          {done ? <Check className="h-5 w-5" /> : <XLogo className="h-4 w-4" />}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-sm font-semibold text-white">
              <span className="mr-1.5 font-mono text-xs text-subtle">01</span>
              Username
            </p>
            <StatusChip done={done} />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-white sm:text-sm">
            Submit your X username. It must start with @.
          </p>

          <label
            htmlFor="waitlist-username"
            className="mt-4 block text-xs font-medium text-foreground"
          >
            X username
          </label>
          <input
            id="waitlist-username"
            type="text"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="@username"
            value={username}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSubmit();
              }
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error
                ? "waitlist-username-error"
                : done
                  ? "waitlist-username-ok"
                  : "waitlist-username-hint"
            }
            className="field-input mt-1.5 font-mono text-xs"
          />

          {!done && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={onSubmit}
                className="btn btn-primary min-h-11 min-w-28 px-6 py-2 text-xs tracking-wide sm:text-sm"
              >
                SUBMIT
              </button>
            </div>
          )}

          {error ? (
            <p
              id="waitlist-username-error"
              role="alert"
              className="mt-3 text-center text-xs text-danger"
            >
              {error}
            </p>
          ) : done ? (
            <p
              id="waitlist-username-ok"
              className="mt-3 text-center text-xs font-medium text-teal"
            >
              ✓ Valid X username
            </p>
          ) : (
            <p id="waitlist-username-hint" className="sr-only">
              Enter your X username starting with @, then press SUBMIT.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

interface QuoteTaskCardProps {
  quoteUrl: string;
  done: boolean;
  error: string | null;
  disabledAction: boolean;
  onQuote: () => void;
  onChange: (value: string) => void;
  onVerify: () => void;
}

export function QuoteTaskCard({
  quoteUrl,
  done,
  error,
  disabledAction,
  onQuote,
  onChange,
  onVerify,
}: QuoteTaskCardProps) {
  return (
    <article
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
          {done ? <Check className="h-5 w-5" /> : <XLogo className="h-4 w-4" />}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-sm font-semibold text-white">
              <span className="mr-1.5 font-mono text-xs text-subtle">05</span>
              Quote
            </p>
            <StatusChip done={done} />
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-white sm:text-sm">
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
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            placeholder="https://x.com/.../status/..."
            value={quoteUrl}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onVerify();
              }
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error
                ? "waitlist-quote-error"
                : done
                  ? "waitlist-quote-ok"
                  : "waitlist-quote-hint"
            }
            className="field-input mt-1.5 font-mono text-xs"
          />

          {!done && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={onVerify}
                className="btn btn-primary min-h-11 min-w-28 px-6 py-2 text-xs tracking-wide sm:text-sm"
              >
                VERIFY
              </button>
            </div>
          )}

          {error ? (
            <p
              id="waitlist-quote-error"
              role="alert"
              className="mt-3 text-center text-xs text-danger"
            >
              {error}
            </p>
          ) : done ? (
            <p
              id="waitlist-quote-ok"
              className="mt-3 text-center text-xs font-medium text-teal"
            >
              ✓ Valid X post link
            </p>
          ) : (
            <p id="waitlist-quote-hint" className="sr-only">
              Paste an x.com or twitter.com status link, then press VERIFY.
              This only checks the link format.
            </p>
          )}
        </div>
      </div>
    </article>
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
