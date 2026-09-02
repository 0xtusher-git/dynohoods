import WaitlistHero from "@/components/waitlist/WaitlistHero";
import {
  QuoteTaskCard,
  ReplyTaskCard,
  UsernameTaskCard,
  XTaskCard,
} from "@/components/waitlist/TaskCard";
import PinnedPost from "@/components/waitlist/PinnedPost";
import WalletInput from "@/components/waitlist/WalletInput";
import WaitlistSubmit from "@/components/waitlist/WaitlistSubmit";
import SuccessState from "@/components/waitlist/SuccessState";
import { useWaitlistFlow } from "@/components/waitlist/useWaitlistFlow";
import { DEMO_MODE } from "@/lib/waitlist";

export default function WaitlistPage() {
  const flow = useWaitlistFlow();

  if (flow.success) {
    return (
      <SuccessState
        wallet={flow.success.walletAddress}
        xUsername={flow.success.xUsername}
        quoteUrl={flow.success.quoteUrl}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-6 sm:px-8">
      <WaitlistHero completed={flow.completedCount} />

      <div className="my-10 flex justify-center">
        <div aria-hidden className="fossil-crack w-full max-w-md opacity-50" />
      </div>

      <section aria-labelledby="missions-heading">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/80">
          Missions
        </p>
        <h2
          id="missions-heading"
          className="arcade-title font-brand mt-1 text-sm text-white sm:text-base"
        >
          Task checklist
        </h2>

        <div className="mt-5 flex flex-col gap-3">
          <UsernameTaskCard
            username={flow.username}
            done={flow.usernameDone}
            error={flow.usernameError}
            onChange={flow.setUsername}
            onSubmit={flow.submitUsername}
          />
          <XTaskCard
            num="02"
            title="Like"
            instruction="Like the pinned post"
            actionLabel="Like post"
            taskId="like"
            state={flow.like}
            disabledAction={!flow.postConfigured && !DEMO_MODE}
            onAction={() => flow.openXTask("like")}
            onVerify={() => flow.verifyXTask("like")}
          />
          <ReplyTaskCard
            replyUrl={flow.replyUrl}
            done={flow.replyDone}
            error={flow.replyError}
            disabledAction={!flow.postConfigured && !DEMO_MODE}
            onReply={() => flow.openXTask("reply")}
            onChange={flow.setReplyUrl}
            onVerify={flow.verifyReplyUrl}
          />
          <XTaskCard
            num="04"
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
            onVerify={flow.verifyQuote}
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
