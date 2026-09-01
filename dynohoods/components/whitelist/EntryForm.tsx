"use client";

import { useEffect, useState } from "react";
import { AtSign, Info, Link2, Wallet } from "lucide-react";
import { siteConfig } from "@/lib/theme";
import type { Draft } from "@/components/WhitelistModal";

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown[]>;
}

function getEthereum(): EthereumProvider | null {
  const w = window as Window & { ethereum?: EthereumProvider };
  return w.ethereum ?? null;
}

export default function EntryForm({
  draft,
  setField,
  setTouched,
  handleError,
  replyError,
  quoteError,
  walletError,
}: {
  draft: Draft;
  setField: <K extends keyof Draft>(key: K, value: Draft[K]) => void;
  setTouched: (fn: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
  handleError?: string;
  replyError?: string;
  quoteError?: string;
  walletError?: string;
}) {
  const [walletReady, setWalletReady] = useState(false);

  useEffect(() => {
    setWalletReady(Boolean(window && getEthereum()));
  }, []);

  const touch = (key: string) =>
    setTouched((t) => (t[key] ? t : { ...t, [key]: true }));

  const autofill = async () => {
    try {
      const eth = getEthereum();
      if (!eth) return;
      const accounts = await eth.request({ method: "eth_requestAccounts" });
      if (Array.isArray(accounts) && typeof accounts[0] === "string") {
        setField("wallet", accounts[0]);
      }
    } catch {
      /* user rejected — no-op */
    }
  };

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
        Entry details
      </p>

      <div className="space-y-4">
        {/* X username */}
        <div>
          <label
            htmlFor="wl-handle"
            className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            <AtSign className="h-3.5 w-3.5 text-muted" />
            X username
          </label>
          <div className="relative">
            <input
              id="wl-handle"
              type="text"
              autoComplete="username"
              placeholder="@YourHandle"
              value={draft.handle}
              onChange={(e) => setField("handle", e.target.value)}
              onBlur={() => touch("handle")}
              aria-invalid={Boolean(handleError)}
              aria-describedby={handleError ? "wl-handle-error" : undefined}
              className="field-input pl-9"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle">
              @
            </span>
          </div>
          {handleError && (
            <p
              id="wl-handle-error"
              role="alert"
              className="mt-1.5 text-xs text-danger"
            >
              {handleError}
            </p>
          )}
        </div>

        {/* quote link */}
        <div>
          <label
            htmlFor="wl-quote"
            className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            <Link2 className="h-3.5 w-3.5 text-muted" />
            Quote-post link
          </label>
          <input
            id="wl-quote"
            type="url"
            autoComplete="off"
            spellCheck={false}
            placeholder="https://x.com/you/status/…"
            value={draft.quoteUrl}
            onChange={(e) => setField("quoteUrl", e.target.value)}
            onBlur={() => touch("quoteUrl")}
            aria-invalid={Boolean(quoteError)}
            aria-describedby={quoteError ? "wl-quote-error" : undefined}
            className="field-input font-mono text-xs"
          />
          {quoteError ? (
            <p
              id="wl-quote-error"
              role="alert"
              className="mt-1.5 text-xs text-danger"
            >
              {quoteError}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-subtle">
              The validated quote-post from task 04.
            </p>
          )}
        </div>

        {/* reply link */}
        <div>
          <label
            htmlFor="wl-reply"
            className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            <Link2 className="h-3.5 w-3.5 text-muted" />
            Reply link
          </label>
          <input
            id="wl-reply"
            type="url"
            autoComplete="off"
            spellCheck={false}
            placeholder="https://x.com/you/status/…"
            value={draft.replyUrl}
            onChange={(e) => setField("replyUrl", e.target.value)}
            onBlur={() => touch("replyUrl")}
            aria-invalid={Boolean(replyError)}
            aria-describedby={replyError ? "wl-reply-error" : undefined}
            className="field-input font-mono text-xs"
          />
          {replyError ? (
            <p
              id="wl-reply-error"
              role="alert"
              className="mt-1.5 text-xs text-danger"
            >
              {replyError}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-subtle">
              The validated reply from task 03.
            </p>
          )}
        </div>

        {/* wallet */}
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <label
              htmlFor="wl-wallet"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground"
            >
              <Wallet className="h-3.5 w-3.5 text-muted" />
              Wallet address
            </label>
            <span className="group relative inline-flex">
              <span className="flex h-4 w-4 items-center justify-center text-subtle">
                <Info className="h-3.5 w-3.5" />
              </span>
              <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-6 z-20 w-60 -translate-x-1/2 rounded-md border border-white/10 bg-zinc-950 px-3 py-2 text-xs text-muted opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {siteConfig.chainNote}
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="wl-wallet"
              type="text"
              autoComplete="off"
              spellCheck={false}
              placeholder="0x…"
              value={draft.wallet}
              onChange={(e) => setField("wallet", e.target.value)}
              onBlur={() => touch("wallet")}
              aria-invalid={Boolean(walletError)}
              aria-describedby={walletError ? "wl-wallet-error" : undefined}
              className="field-input flex-1 font-mono text-xs"
            />
            {walletReady && (
              <button
                type="button"
                onClick={autofill}
                className="btn btn-ghost shrink-0 px-4 py-2 text-xs"
              >
                <Wallet className="h-3.5 w-3.5" />
                Connect
              </button>
            )}
          </div>
          {walletError && (
            <p
              id="wl-wallet-error"
              role="alert"
              className="mt-1.5 text-xs text-danger"
            >
              {walletError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}