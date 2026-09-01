"use client";

import { motion } from "framer-motion";
import { Check, ExternalLink, Heart, MessageCircle, Repeat2, UserPlus } from "lucide-react";
import { TASKS, socialLinks, type TaskId } from "@/lib/theme";
import type { Draft } from "@/components/WhitelistModal";
import { isValidXLink } from "@/lib/validation";

const ICONS: Record<string, typeof UserPlus> = {
  follow: UserPlus,
  like: Heart,
  reply: MessageCircle,
  quote: Repeat2,
};

const INTENT: Record<string, { href: string; external: boolean }> = {
  follow: { href: socialLinks.follow, external: true },
  like: { href: socialLinks.like, external: true },
  reply: { href: socialLinks.reply, external: true },
  quote: { href: socialLinks.quote, external: true },
};

function doneFor(id: TaskId, draft: Draft): boolean {
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

export default function TaskChecklist({
  draft,
  setField,
}: {
  draft: Draft;
  setField: <K extends keyof Draft>(key: K, value: Draft[K]) => void;
}) {
  return (
    <div className="mt-5 space-y-3">
      {TASKS.map((t, i) => {
        const Icon = ICONS[t.id];
        const done = doneFor(t.id, draft);
        const attestedSelf = t.attested === "self";
        return (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className={`flex items-start gap-3 rounded-xl border p-3.5 transition-colors ${
              done
                ? "border-teal/40 bg-teal/[0.06]"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <span
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                done
                  ? "border-teal/40 bg-teal/10 text-teal"
                  : "border-white/10 bg-white/[0.03] text-muted"
              }`}
            >
              <Icon className="h-4 w-4" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="text-sm font-semibold text-foreground">
                  <span className="mr-1.5 font-mono text-xs text-subtle">
                    {t.num}
                  </span>
                  {t.name}
                </p>
                <span className="text-[0.6rem] font-medium uppercase tracking-wider text-subtle">
                  {attestedSelf ? "Self-attested" : "Link-verified"}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {t.instruction}
              </p>

              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <a
                  href={INTENT[t.id].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost px-3 py-1.5 text-xs"
                >
                  {t.actionLabel}
                  <ExternalLink className="h-3 w-3" />
                </a>

                {attestedSelf ? (
                  <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-muted">
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={(e) =>
                        setField(t.id as keyof Draft, e.target.checked)
                      }
                      className="h-4 w-4 accent-[#40E0C0]"
                    />
                    I did this
                  </label>
                ) : done ? (
                  <span className="inline-flex items-center gap-1 text-xs text-teal">
                    <Check className="h-3.5 w-3.5" /> Link verified below
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-subtle">
                    Paste your post link below to verify
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}