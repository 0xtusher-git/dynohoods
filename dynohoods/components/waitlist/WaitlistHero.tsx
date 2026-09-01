"use client";

import { motion } from "framer-motion";
import { COLLECTION_NAME, COLLECTION_SUPPLY, DEMO_MODE } from "@/lib/waitlist";
import ProgressBar from "@/components/waitlist/ProgressBar";

export default function WaitlistHero({ completed }: { completed: number }) {
  return (
    <section className="relative isolate pt-10 sm:pt-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
          <span className="chip border-white/15 text-primary">
            {COLLECTION_SUPPLY.toLocaleString()} · {COLLECTION_NAME}
          </span>
          {DEMO_MODE && (
            <span className="chip border-primary/30 bg-primary/10 text-primary">
              Demo mode
            </span>
          )}
        </div>

        <h1 className="arcade-title text-2xl leading-[1.35] text-foreground sm:text-4xl">
          Join the waitlist
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
          Complete the missions below to secure your spot.
        </p>

        <ProgressBar completed={completed} total={4} />
      </motion.div>
    </section>
  );
}
