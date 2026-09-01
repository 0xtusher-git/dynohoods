"use client";

import { useEffect, useState } from "react";
import { Lock, ShieldCheck, Wallet } from "lucide-react";
import { siteConfig } from "@/lib/theme";
import { walletErrorMessage } from "@/lib/waitlist";

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

function getEthereum(): EthereumProvider | null {
  const w = window as Window & { ethereum?: EthereumProvider };
  return w.ethereum ?? null;
}

export default function WalletInput({
  unlocked,
  value,
  touched,
  onChange,
  onBlur,
  onConnected,
}: {
  unlocked: boolean;
  value: string;
  touched: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
  onConnected: (address: string) => void;
}) {
  const [walletReady, setWalletReady] = useState(false);
  const error = walletErrorMessage(value, touched);

  useEffect(() => {
    setWalletReady(Boolean(getEthereum()));
  }, []);

  const connect = async () => {
    try {
      const eth = getEthereum();
      if (!eth) return;
      const accounts = await eth.request({ method: "eth_requestAccounts" });
      if (Array.isArray(accounts) && typeof accounts[0] === "string") {
        onConnected(accounts[0]);
      }
    } catch {
      /* user rejected */
    }
  };

  return (
    <section aria-labelledby="wallet-heading" className="relative">
      <div className={!unlocked ? "pointer-events-none select-none opacity-40" : ""}>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-subtle">
          Entry
        </p>
        <h2
          id="wallet-heading"
          className="arcade-title mt-1 text-sm text-foreground sm:text-base"
        >
          Your wallet
        </h2>
        <p className="mt-2 text-sm text-muted">
          Enter the wallet address that will be used for the NFT.
        </p>

        <div className="mt-5 glass-card rounded-xl p-4 sm:p-5">
          <div className="mb-1.5 flex items-center gap-2">
            <label
              htmlFor="waitlist-wallet"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground"
            >
              <Wallet className="h-3.5 w-3.5 text-muted" />
              Wallet address
            </label>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="waitlist-wallet"
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder="0x..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              disabled={!unlocked}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "waitlist-wallet-error" : "waitlist-wallet-hint"}
              className="field-input min-w-0 flex-1 break-all font-mono text-xs sm:text-sm"
            />
            {walletReady && (
              <button
                type="button"
                onClick={connect}
                disabled={!unlocked}
                className="btn btn-ghost min-h-11 shrink-0 px-4 py-2 text-xs sm:text-sm"
              >
                <Wallet className="h-3.5 w-3.5" />
                Connect wallet
              </button>
            )}
          </div>

          {error ? (
            <p
              id="waitlist-wallet-error"
              role="alert"
              className="mt-2 text-xs text-danger"
            >
              {error}
            </p>
          ) : (
            <p
              id="waitlist-wallet-hint"
              className="mt-2 text-xs leading-relaxed text-subtle"
            >
              Public address only. Never share a seed phrase or private key — we
              will never ask for one. {siteConfig.chainNote}
            </p>
          )}

          <p className="mt-3 inline-flex items-center gap-1.5 text-[0.7rem] text-subtle">
            <ShieldCheck className="h-3.5 w-3.5 text-teal" />
            No seed phrases. No private keys. Address validation only.
          </p>
        </div>
      </div>

      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl">
          <div className="glass-card mx-4 flex max-w-sm items-start gap-3 rounded-xl px-4 py-3">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-muted sm:text-sm">
              Complete all four missions to unlock your wallet.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
