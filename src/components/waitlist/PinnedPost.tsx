import { ExternalLink } from "lucide-react";
import {
  COLLECTION_NAME,
  PINNED_POST_URL,
  tweetIdFromUrl,
  isPinnedPostConfigured,
} from "@/lib/waitlist";

export default function PinnedPost() {
  const configured = isPinnedPostConfigured();
  const tweetId = tweetIdFromUrl();

  const openPost = () => {
    if (!configured) return;
    window.open(PINNED_POST_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section aria-labelledby="pinned-heading">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-subtle">
            Reference
          </p>
          <h2
            id="pinned-heading"
            className="arcade-title font-brand mt-1 text-sm text-foreground sm:text-base"
          >
            Official pinned post
          </h2>
        </div>
        <button
          type="button"
          onClick={openPost}
          disabled={!configured}
          className="btn btn-ghost min-h-11 px-4 py-2 text-xs sm:text-sm"
        >
          Open post on X
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="glass-card overflow-hidden rounded-xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-primary/80" />
          <span className="text-xs font-medium text-muted">
            {COLLECTION_NAME} · X
          </span>
        </div>

        {configured && tweetId ? (
          <div className="flex justify-center py-4">
            <iframe
              src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=dark&chrome=footer,scrollbars`}
              width="100%"
              style={{ maxWidth: "550px" }}
              height="500"
              className="border-0"
              title="Embedded tweet"
            />
          </div>
        ) : (
          <div className="flex min-h-[160px] flex-col items-center justify-center px-6 py-10 text-center sm:min-h-[200px]">
            <p className="text-sm text-foreground">Post embed placeholder</p>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-subtle">
              Set <span className="font-mono text-muted">PINNED_POST_URL</span>{" "}
              to the real post. This page will not invent a tweet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
