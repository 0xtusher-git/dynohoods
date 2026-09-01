import { useState } from "react";
import { Check, CheckCircle2, Copy } from "lucide-react";

export default function ConfirmationCard({
  handle,
  wallet,
  onClose,
}: {
  handle: string;
  wallet: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(wallet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="px-6 py-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-teal/40 bg-teal/10">
        <CheckCircle2 className="h-8 w-8 text-teal" />
      </div>

      <h3 className="arcade-title mt-5 text-lg text-foreground">
        You&apos;re in the queue
      </h3>
      <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
        Entry recorded. Results post from the official account when the list
        closes — no DMs, ever.
      </p>

      <div className="mx-auto mt-6 max-w-sm space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-xs uppercase tracking-wider text-subtle">
            Username
          </span>
          <span className="font-semibold text-foreground">{handle}</span>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-xs uppercase tracking-wider text-subtle">
            Status
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald">
            <Check className="h-3.5 w-3.5" />
            Whitelisted
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-xs uppercase tracking-wider text-subtle">
            Wallet
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-foreground">
            {wallet.slice(0, 6)}…{wallet.slice(-4)}
            <button
              onClick={copyWallet}
              aria-label="Copy wallet address"
              className="text-subtle transition-colors hover:text-teal"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-teal" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </span>
        </div>
      </div>

      <button onClick={onClose} className="btn btn-ghost mt-6 px-6 py-2.5 text-sm">
        Back to the swamp
      </button>
    </div>
  );
}