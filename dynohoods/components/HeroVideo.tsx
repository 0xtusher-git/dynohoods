"use client";

import { motion } from "framer-motion";
import StatStrip from "@/components/StatStrip";
import { siteConfig } from "@/lib/theme";

export default function HeroVideo() {
  return (
    <section id="top" className="relative isolate">
      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-5 pb-16 pt-28 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-6"
        >
          <span className="chip border-white/15 text-primary">
            {siteConfig.supplyDisplay} bandits. One swamp.
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="arcade-title max-w-4xl text-3xl leading-[1.3] text-foreground sm:text-5xl md:text-6xl"
        >
          {siteConfig.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a href="/waitlist" className="btn btn-primary px-7 py-3 text-base">
            Get whitelisted
          </a>
          <a
            href="#first-look"
            className="btn btn-ghost px-7 py-3 text-base"
          >
            Take the first look
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="mt-4 text-xs text-subtle"
        >
          {siteConfig.chainNote}
        </motion.p>

        <StatStrip />
      </div>
    </section>
  );
}