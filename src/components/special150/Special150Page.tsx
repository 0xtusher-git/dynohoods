import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Download,
  Loader2,
  Search,
  Send,
} from "lucide-react";
import XLogo from "@/components/waitlist/XLogo";
import { siteConfig } from "@/lib/theme";

const ELIGIBLE_COUNT = 150;

const SPECIAL_150_CARDS = [
  "/cards/card-1.jpg",
  "/cards/card-2.jpg",
  "/cards/card-3.jpg",
  "/cards/card-4.jpg",
  "/cards/card-5.jpg",
];

const SPECIAL_150_TWEET = `Guys....👀

I just found myself in 150 Specials Honorary Collection on ${siteConfig.handle}

Check yours if you're in or not: dynohoods.xyz/special-150`;

const X_POST_URL = `https://x.com/intent/post?text=${encodeURIComponent(
  SPECIAL_150_TWEET,
)}`;

type CheckResult = "eligible" | "not-eligible" | null;

export default function Special150Page() {
  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResult>(null);
  const [cardIndex, setCardIndex] = useState<number | null>(null);
  const [clipboardNote, setClipboardNote] = useState<string | null>(null);

  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestDone, setRequestDone] = useState(false);

  const cardUrl = useMemo(
    () =>
      cardIndex === null ? null : SPECIAL_150_CARDS[cardIndex % SPECIAL_150_CARDS.length],
    [cardIndex],
  );

  const checkEligibility = async () => {
    const trimmed = username.trim();
    if (!trimmed) {
      setCheckError("Enter your X username.");
      return;
    }
    setCheckError(null);
    setResult(null);
    setClipboardNote(null);
    setChecking(true);
    try {
      const res = await fetch(
        `/api/special150?username=${encodeURIComponent(trimmed)}`,
      );
      const data = await res.json();
      if (!res.ok) {
        setCheckError(data.error ?? "Could not check eligibility.");
      } else {
        if (data.eligible) {
          setCardIndex(cardIndexForUsername(trimmed));
        }
        setResult(data.eligible ? "eligible" : "not-eligible");
      }
    } catch {
      setCheckError("Could not check eligibility. Try again.");
    } finally {
      setChecking(false);
    }
  };

  const shareOnX = async () => {
    if (!cardUrl) return;

    const isMobile = /Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(
      navigator.userAgent,
    );
    const canWebShare = typeof navigator.share === "function";

    // Phone: open the native share sheet with the card attached as a file,
    // so tapping the X app starts a post with the image already attached.
    if (isMobile && canWebShare) {
      let handledWithShare = false;
      try {
        const res = await fetch(cardUrl);
        const blob = await res.blob();
        const file = new File(
          [blob],
          cardUrl.split("/").pop() ?? "special-150-card.jpg",
          { type: blob.type || "image/jpeg" },
        );
        if (navigator.canShare && !navigator.canShare({ files: [file] })) {
          throw new Error("file share unsupported");
        }
        await navigator.share({ files: [file], text: SPECIAL_150_TWEET });
        handledWithShare = true;
      } catch {
        // fall through to the tab + clipboard path
      }
      if (handledWithShare) return;
    }

    // Desktop + fallback: open the composer tab FIRST (synchronous — keeps
    // the click's user activation so the popup isn't blocked), then copy the
    // card to the clipboard so the user just presses Ctrl/Cmd+V to attach it.
    window.open(X_POST_URL, "_blank", "noopener,noreferrer");

    try {
      const res = await fetch(cardUrl);
      const blob = await res.blob();
      const png = await toPngBlob(blob);
      const item = new ClipboardItem({ "image/png": png });
      await navigator.clipboard.write([item]);
      setClipboardNote(
        "Your card is copied — press Ctrl/⌘+V inside the post to attach it.",
      );
    } catch {
      setClipboardNote(
        "Couldn't auto-copy the card — use the download button and attach it in the post.",
      );
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
    setClipboardNote(null);
    setCardIndex(null);
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
          <section className="mx-auto flex max-w-md flex-col items-center text-center">
            <h2 className="arcade-title text-xl leading-relaxed text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.75)] sm:text-2xl">
              Congratulations!! You&apos;re In Special 150
            </h2>

            {cardUrl && (
              <div className="mt-6 w-full overflow-hidden rounded-xl border border-teal/30 bg-surface shadow-glow">
                <img
                  src={cardUrl}
                  alt="Your Special 150 honorary NFT card"
                  className="block h-auto w-full"
                  loading="eager"
                />
              </div>
            )}

            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={cardUrl ?? "#"}
                download={cardUrl ? cardUrl.split("/").pop() : undefined}
                className="btn btn-primary min-h-12 flex-1 px-5 text-sm"
              >
                <Download className="h-4 w-4" />
                Download the Card as image
              </a>
              <button
                type="button"
                onClick={shareOnX}
                className="btn btn-ghost min-h-12 flex-1 px-5 text-sm"
              >
                <XLogo className="h-4 w-4" />
                X post
              </button>
            </div>

            {clipboardNote && (
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-subtle">
                {clipboardNote}
              </p>
            )}

            <p className="mt-6 max-w-sm text-xs leading-relaxed text-muted">
              Mint details are coming soon. Keep an eye on {siteConfig.handle}{" "}
              for the exact date and next steps.
            </p>
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

function toPngBlob(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("png encode failed"))),
        "image/png",
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image decode failed"));
    };
    img.src = url;
  });
}

function cardIndexForUsername(username: string): number {
  const key = username.trim().replace(/^@/, "").toLowerCase();
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % SPECIAL_150_CARDS.length;
}
