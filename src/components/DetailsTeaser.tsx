import { BookOpen, ExternalLink, FileText, Map } from "lucide-react";
import { siteConfig } from "@/lib/theme";

const icons = { whitepaper: FileText, lore: BookOpen, roadmap: Map } as const;

export default function DetailsTeaser() {
  return (
    <section
      id="details"
      className="relative w-full scroll-mt-20 bg-background"
    >
      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="chip">More reading</span>
        <h2 className="arcade-title mt-4 text-2xl text-white sm:text-3xl">
          The Details
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white sm:text-base">
          The full writeup — mint mechanics, trait odds, territory plans and
          the story of how the swamp flooded — lives in the docs. Anything
          still digging has a placeholder, perfectly normal for a hatchling.
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <div aria-hidden className="fossil-crack w-56" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {Object.entries(siteConfig.docs).map(([key, doc]) => {
          const Icon = icons[key as keyof typeof icons];
          const ready = doc.url.length > 0;
          return (
            <a
              key={key}
              href={ready ? doc.url : undefined}
              className={`glass-card glass-card-hover group flex flex-col rounded-xl p-6 ${
                ready ? "" : "cursor-default"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                {ready ? (
                  <ExternalLink className="h-4 w-4 text-subtle transition-colors group-hover:text-teal" />
                ) : (
                  <span className="chip !py-0.5 text-[0.55rem] text-muted">
                    Coming soon
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                {doc.title}
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-white">
                {doc.desc}
              </p>
            </a>
          );
        })}
      </div>
      </div>
    </section>
  );
}