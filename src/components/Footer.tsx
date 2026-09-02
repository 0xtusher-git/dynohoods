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
            <span className="arcade-title font-brand text-base text-white">
              {siteConfig.projectName}
            </span>
            <span className="text-white/70">·</span>
            <span className="text-xs text-white">{siteConfig.chainName}</span>
          </div>

          <nav aria-label="Footer" className="flex items-center gap-6">
            <a
              href="#top"
              className="claw-link inline-flex items-center gap-1.5 text-sm text-white transition-colors hover:text-white"
            >
              <ArrowUp className="h-4 w-4" />
              Back to top
            </a>
            <a
              href={socialLinks.follow}
              target="_blank"
              rel="noopener noreferrer"
              className="claw-link text-sm text-white transition-colors hover:text-white"
            >
              Follow on X
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}