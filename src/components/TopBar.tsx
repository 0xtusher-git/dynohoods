import { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { GetWhitelistedButton } from "@/components/captcha/CaptchaProvider";
import { siteConfig } from "@/lib/theme";

const NAV_LINKS = [
  { label: "First Look", href: "/#first-look" },
  { label: "Details", href: "/#details" },
];

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function TopBar() {
  const [copied, setCopied] = useState(false);
  const hasContract = siteConfig.contractAddress.length > 0;
  const marketplaceLive = siteConfig.marketplace.url.length > 0;

  const copyContract = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contractAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-sm font-semibold text-foreground"
        >
          <img
            src="/logo.jpg"
            alt={`${siteConfig.projectName} logo`}
            width={28}
            height={28}
            decoding="async"
            className="h-7 w-7 rounded-lg object-cover ring-1 ring-white/10"
          />
          <span className="arcade-title font-brand text-lg tracking-[0.1em]">
            {siteConfig.projectName}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="claw-link text-sm font-medium text-white transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {hasContract && (
            <button
              onClick={copyContract}
              aria-label="Copy contract address"
              title={siteConfig.contractAddress}
              className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-teal/40 hover:text-foreground hover:shadow-glow sm:inline-flex"
            >
              {copied ? (
                <Check className="h-3 w-3 text-teal" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {shortAddress(siteConfig.contractAddress)}
            </button>
          )}

          {marketplaceLive ? (
            <a
              href={siteConfig.marketplace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost px-4 py-2 text-sm"
            >
              View on {siteConfig.marketplace.name}
            </a>
          ) : (
            <GetWhitelistedButton className="btn btn-primary px-4 py-2 text-sm" />
          )}
        </div>
      </div>
    </header>
  );
}
