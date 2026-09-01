"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/theme";
import { shortAddress } from "@/lib/waitlist";

export default function SuccessState({
  wallet,
  quoteUrl,
}: {
  wallet: string;
  quoteUrl: string;
}) {
  const collectionHref = siteConfig.marketplace.url || "/";
  const external = Boolean(siteConfig.marketplace.url);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-lg py-10 text-center sm:py-16"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-teal/40 bg-teal/10">
        <CheckCircle2 className="h-8 w-8 text-teal" />
      </div>

      <h1 className="arcade-title mt-6 text-2xl text-foreground sm:text-3xl">
        {"You're on the list"}
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
        Your waitlist submission has been received.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] text-left backdrop-blur-xl">
        <div className="space-y-3 p-4">
          <Row label="Wallet" value={shortAddress(wallet)} mono />
          <Row label="Missions" value="4 / 4 completed" />
          {quoteUrl && <Row label="Quote" value={quoteUrl} mono />}
        </div>
      </div>

      <a
        href={collectionHref}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="btn btn-primary mt-8 inline-flex min-h-12 px-6 py-3 text-sm"
      >
        View collection
        <ArrowRight className="h-4 w-4" />
      </a>
    </motion.section>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="shrink-0 text-xs uppercase tracking-wider text-subtle">
        {label}
      </span>
      <span
        className={`min-w-0 truncate font-semibold text-foreground ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
