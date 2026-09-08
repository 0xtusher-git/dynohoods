import { useState } from "react";
import { CheckCircle2, Loader2, Search, Send } from "lucide-react";
import { siteConfig } from "@/lib/theme";

const ELIGIBLE_COUNT = 150;

type CheckResult = "eligible" | "not-eligible" | null;

export default function Special150Page() {
  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResult>(null);

  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestDone, setRequestDone] = useState(false);

  const checkEligibility = async () => {
    const trimmed = username.trim();
    if (!trimmed) {
      setCheckError("Enter your X username.");
      return;
    }
    setCheckError(null);
    setResult(null);
    setChecking(true);
    try {
      const res = await fetch(
        `/api/special150?username=${encodeURIComponent(trimmed)}`,
      );
      const data = await res.json();
      if (!res.ok) {
        setCheckError(data.error ?? "Could not check eligibility.");
      } else {
        setResult(data.eligible ? "eligible" : "not-eligible");
      }
    } catch {
      setCheckError("Could not check eligibility. Try again.");
    } finally {
      setChecking(false);
    }
  };

  const submitRequest = async () => {
    if (!reason.trim()) {
      setRequestError("Tell us why you want this.");
      return;
    }
    setRequestError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/special150", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, reason }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRequestError(data.error ?? "Could not save your request.");
      } else {
        setRequestDone(true);
      }
    } catch {
      setRequestError("Could not save your request. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setResult(null);
    setCheckError(null);
    setRequestError(null);
    setRequestDone(false);
    setReason("");
  };

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-16 sm:px-8">
      <section className="relative isolate text-center">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
          <span className="chip border-white/15 text-primary">
            {ELIGIBLE_COUNT} Honorary NFTs · CT Members
          </span>
        </div>
        <h1 className="arcade-title font-brand whitespace-nowrap text-3xl leading-[1.35] tracking-wider text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.75)] sm:text-5xl">
          Special {ELIGIBLE_COUNT}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed font-medium text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.8)] sm:text-base">
          {ELIGIBLE_COUNT} honorary {siteConfig.projectName} NFTs are reserved
          for CT members. Check if you&apos;re on the list.
        </p>
      </section>

      <div className="mx-auto my-10 max-w-md">
        <div aria-hidden className="fossil-crack w-full opacity-50" />
      </div>

      {result === null && (
        <section className="mx-auto max-w-md">
          <label htmlFor="special-150-username" className="mb-2 block text-center font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/80">
            X username
          </label>
          <div className="flex items-start gap-3">
            <input
              id="special-150-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !checking) checkEligibility();
              }}
              placeholder="@yourhandle"
              aria-invalid={checkError ? "true" : undefined}
              className="field-input min-w-0 flex-1"
              inputMode="text"
            />
            <button
              type="button"
              onClick={checkEligibility}
              disabled={checking}
              className="btn btn-primary min-h-12 shrink-0 px-5 text-sm"
            >
              {checking ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Check Eligibility
                </>
              )}
            </button>
          </div>
          {checkError && (
            <p role="alert" className="mt-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-center text-xs font-medium text-danger">
              {checkError}
            </p>
          )}
        </section>
      )}

      {result === "eligible" && (
        <>
          <section className="mx-auto max-w-md overflow-hidden rounded-xl border border-teal/40 bg-surface text-center shadow-card">
            <div className="space-y-4 p-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-teal/40 bg-teal/10">
                <CheckCircle2 className="h-8 w-8 text-teal" />
              </div>
              <h2 className="arcade-title text-xl text-foreground sm:text-2xl">
                You&apos;re eligible
              </h2>
              <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted">
                You&apos;ve secured your spot for one of the {ELIGIBLE_COUNT}{" "}
                honorary {siteConfig.projectName} NFTs reserved for CT members.
              </p>
              <p className="mx-auto max-w-sm text-xs leading-relaxed text-subtle">
                Mint details are coming soon. Keep an eye on {siteConfig.handle}{" "}
                for the exact date and next steps.
              </p>
            </div>
          </section>
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={reset}
              className="btn btn-ghost min-h-12 px-6 py-3 text-sm"
            >
              Check another username
            </button>
          </div>
        </>
      )}

      {result === "not-eligible" && (
        <>
          <section className="mx-auto max-w-md overflow-hidden rounded-xl border border-white/10 bg-surface shadow-card">
            {requestDone ? (
              <div className="space-y-4 p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-teal/40 bg-teal/10">
                  <CheckCircle2 className="h-8 w-8 text-teal" />
                </div>
                <h2 className="arcade-title text-xl text-foreground">
                  Request received
                </h2>
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted">
                  We&apos;ll review your request and reach out if you&apos;re
                  given a spot.
                </p>
              </div>
            ) : (
              <div className="space-y-5 p-6">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Not on the list right now
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Want to be considered for one of the {ELIGIBLE_COUNT}{" "}
                    honorary {siteConfig.projectName} NFTs? Tell us why.
                  </p>
                </div>

                <label htmlFor="special-150-username-request" className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/80">
                  X username
                </label>
                <input
                  id="special-150-username-request"
                  type="text"
                  value={username.startsWith("@") ? username : `@${username}`}
                  disabled
                  className="field-input opacity-70"
                />

                <label htmlFor="special-150-reason" className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/80">
                  Why do you want this?
                </label>
                <textarea
                  id="special-150-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  placeholder="Tell us a little about why you'd like to be considered."
                  aria-invalid={requestError ? "true" : undefined}
                  className="field-input resize-none"
                />

                {requestError && (
                  <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-center text-xs font-medium text-danger">
                    {requestError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={submitRequest}
                  disabled={submitting}
                  className="btn btn-primary min-h-12 w-full px-6 py-3.5 text-sm"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit request
                    </>
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={reset}
                    className="btn btn-ghost min-h-10 px-4 py-2 text-xs"
                  >
                    Check another username
                  </button>
                </div>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
