import { siteConfig } from "@/lib/theme";

export default function StatStrip() {
  const marketName =
    siteConfig.marketplace.name || siteConfig.marketplace.url || "TBA";

  return (
    <div className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:mx-auto lg:grid-cols-4">
      <div className="bg-background px-4 py-4 text-left">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/80">
          Total supply
        </p>
        <p className="mt-1 font-semibold text-white">
          {siteConfig.supplyDisplay}
        </p>
      </div>

      <div className="bg-background px-4 py-4 text-left">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/80">
          Mint status
        </p>
        <p className="mt-1 inline-flex items-center gap-1.5 font-semibold text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {siteConfig.mintStatus}
        </p>
      </div>

      <div className="bg-background px-4 py-4 text-left">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/80">
          Chain
        </p>
        <p className="mt-1 font-semibold text-white">
          {siteConfig.chainName}
        </p>
      </div>

      <div className="bg-background px-4 py-4 text-left">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/80">
          Marketplace
        </p>
        <p className="mt-1 font-semibold text-white">{marketName}</p>
      </div>
    </div>
  );
}
