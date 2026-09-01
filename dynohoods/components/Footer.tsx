import { ArrowUp } from "lucide-react";
import { siteConfig, socialLinks } from "@/lib/theme";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      {/* translucent overlay so the fixed video shows through, like the hero */}
      <div aria-hidden className="absolute inset-0 bg-[rgba(10,15,10,0.9)]" />

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="arcade-title text-xs text-foreground">
              {siteConfig.projectName}
            </span>
            <span className="text-subtle">·</span>
            <span className="text-xs text-subtle">{siteConfig.chainName}</span>
          </div>

          <nav aria-label="Footer" className="flex items-center gap-6">
            <a
              href="#top"
              className="claw-link inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowUp className="h-4 w-4" />
              Back to top
            </a>
            <a
              href={socialLinks.follow}
              target="_blank"
              rel="noopener noreferrer"
              className="claw-link text-sm text-muted transition-colors hover:text-foreground"
            >
              Follow on X
            </a>
          </nav>
        </div>

        <div className="my-7 flex justify-center">
          <div aria-hidden className="fossil-crack w-full max-w-md opacity-50" />
        </div>

        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <p className="text-xs leading-relaxed text-subtle">
            {siteConfig.tokenDisclaimer}
          </p>
          <p className="text-xs leading-relaxed text-subtle">
            {siteConfig.disclaimer}
          </p>
          <p className="text-[0.7rem] text-subtle/70">
            Not affiliated with or endorsed by X/Twitter.
          </p>
        </div>
      </div>
    </footer>
  );
}