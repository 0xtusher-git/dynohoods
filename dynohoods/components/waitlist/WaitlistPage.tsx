"use client";

import { DEMO_MODE } from "@/lib/waitlist";
import WaitlistHero from "@/components/waitlist/WaitlistHero";
import { QuoteTaskCard, XTaskCard } from "@/components/waitlist/TaskCard";
import PinnedPost from "@/components/waitlist/PinnedPost";
import WalletInput from "@/components/waitlist/WalletInput";
import WaitlistSubmit from "@/components/waitlist/WaitlistSubmit";
import SuccessState from "@/components/waitlist/SuccessState";
import { useWaitlistFlow } from "@/components/waitlist/useWaitlistFlow";

export default function WaitlistPage() {
  const flow = useWaitlistFlow();

  if (flow.success) {
    return (
      <SuccessState
        wallet={flow.success.walletAddress}
        quoteUrl={flow.success.quoteUrl}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-6 sm:px-8">
      <WaitlistHero completed={flow.completedCount} />

      {DEMO_MODE && (
        <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-relaxed text-subtle">
          Demo mode is on. Verify is for testing the page — it does not confirm
          a real like, reply, or repost on X.
        </p>
      )}

      <div className="my-10 flex justify-center">
        <div aria-hidden className="fossil-crack w-full max-w-md opacity-50" />
      </div>

      <section aria-labelledby="missions-heading">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-subtle">
          Missions
        </p>
        <h2
          id="missions-heading"
          className="arcade-title mt-1 text-sm text-foreground sm:text-base"
        >
          Task checklist
        </h2>

        <div className="mt-5 flex flex-col gap-3">
          <XTaskCard
            num="01"
            title="Like"
            instruction="Like the pinned post"
            actionLabel="Like post"
            taskId="like"
            state={flow.like}
            disabledAction={!flow.postConfigured && !DEMO_MODE}
            onAction={() => flow.openXTask("like")}
            onVerify={() => flow.verifyXTask("like")}
          />
          <XTaskCard
            num="02"
            title="Reply"
            instruction="Reply to the pinned post"
            actionLabel="Reply"
            taskId="reply"
            state={flow.reply}
            disabledAction={!flow.postConfigured && !DEMO_MODE}
            onAction={() => flow.openXTask("reply")}
            onVerify={() => flow.verifyXTask("reply")}
          />
          <XTaskCard
            num="03"
            title="Repost"
            instruction="Repost the pinned post"
            actionLabel="Repost"
            taskId="repost"
            state={flow.repost}
            disabledAction={!flow.postConfigured && !DEMO_MODE}
            onAction={() => flow.openXTask("repost")}
            onVerify={() => flow.verifyXTask("repost")}
          />
          <QuoteTaskCard
            quoteUrl={flow.quoteUrl}
            done={flow.quoteDone}
            error={flow.quoteError}
            disabledAction={!flow.postConfigured && !DEMO_MODE}
            onQuote={() => flow.openXTask("quote")}
            onChange={flow.setQuoteUrl}
            onBlur={() => flow.setQuoteTouched(true)}
          />
        </div>
      </section>

      <div className="my-12">
        <PinnedPost />
      </div>

      <div className="mb-10">
        <WalletInput
          unlocked={flow.allTasksDone}
          value={flow.wallet}
          touched={flow.walletTouched}
          onChange={flow.setWallet}
          onBlur={() => flow.setWalletTouched(true)}
          onConnected={(addr) => {
            flow.setWallet(addr);
            flow.setWalletTouched(true);
          }}
        />
      </div>

      <WaitlistSubmit
        enabled={flow.canSubmit}
        submitting={flow.submitting}
        error={flow.submitError}
        onSubmit={flow.submit}
      />
    </div>
  );
}
