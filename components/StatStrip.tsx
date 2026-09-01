"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/theme";

const slot = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, delay },
});

export default function StatStrip() {
  const marketName =
    siteConfig.marketplace.name || siteConfig.marketplace.url || "TBA";

  return (
    <div className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:mx-auto lg:grid-cols-4">
      <motion.div
        {...slot(0)}
        className="bg-background/80 px-4 py-4 text-left backdrop-blur-sm"
      >
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-subtle">
          Total supply
        </p>
        <p className="mt-1 font-semibold text-foreground">
          {siteConfig.supplyDisplay}
        </p>
      </motion.div>

      <motion.div
        {...slot(0.1)}
        className="bg-background/80 px-4 py-4 text-left backdrop-blur-sm"
      >
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-subtle">
          Mint status
        </p>
        <p className="mt-1 inline-flex items-center gap-1.5 font-semibold text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {siteConfig.mintStatus}
        </p>
      </motion.div>

      <motion.div
        {...slot(0.2)}
        className="bg-background/80 px-4 py-4 text-left backdrop-blur-sm"
      >
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-subtle">
          Chain
        </p>
        <p className="mt-1 font-semibold text-foreground">
          {siteConfig.chainName}
        </p>
      </motion.div>

      <motion.div
        {...slot(0.3)}
        className="bg-background/80 px-4 py-4 text-left backdrop-blur-sm"
      >
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-subtle">
          Marketplace
        </p>
        <p className="mt-1 font-semibold text-foreground">{marketName}</p>
      </motion.div>
    </div>
  );
}