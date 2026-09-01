"use client";

import { ShieldAlert } from "lucide-react";
import { siteConfig } from "@/lib/theme";

/**
 * The trust paragraph — tucked near the submit button where it's most
 * likely to be read before anyone hands over a wallet address.
 */
export default function TrustNote() {
  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-amber-400">
          <ShieldAlert className="h-4 w-4" />
        </span>
        <div className="text-xs leading-relaxed text-muted">
          <p className="font-semibold text-foreground">Read this before applying</p>
          <ul className="footprint-list mt-2 space-y-1.5">
            <li>
              Finishing all four tasks does <em>not</em> guarantee a spot if
              entries outnumber slots.
            </li>
            <li>
              Every entry gets checked against X before the list closes; bogus
              links and bot accounts are removed.
            </li>
            <li>
              Results are posted only from the official{" "}
              <span className="font-medium text-foreground">{siteConfig.handle}</span>{" "}
              account.
            </li>
            <li>
              No one from the team will ever DM you first. If someone DMs
              claiming a win, it&apos;s a scam, not us.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}