import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight, PawPrint } from "lucide-react";
import { siteConfig } from "@/lib/theme";

const slides = siteConfig.collectionSlides;

export default function CollectionCarousel() {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  const slide = slides[index];
  const hasImage = slide.src.length > 0;

  return (
    <section
      id="first-look"
      className="relative w-full scroll-mt-20 bg-gradient-to-b from-transparent via-background/90 to-background"
    >
      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Collection showcase</span>
          <h2 className="arcade-title font-brand mt-4 text-2xl text-white sm:text-3xl">
            First Look
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white sm:text-base">
            Every dino is a roll of four traits — hide, headgear, markings and
            background. Traits set rarity, rarity sets rank, and rank decides
            who rules the swamp. Sneak previews below.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <div aria-hidden className="fossil-crack w-56" />
        </div>

        <div className="relative mx-auto mt-10 max-w-md">
          <div
            className="relative aspect-square w-full select-none overflow-hidden rounded-2xl border border-white/10 bg-[#0a1a12] shadow-card"
            tabIndex={0}
            aria-label={`Slide ${index + 1} of ${count}: ${slide.title}`}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") go(-1);
              if (e.key === "ArrowRight") go(1);
            }}
          >
            {hasImage ? (
              <img
                src={slide.src}
                alt={`Dynohoods preview #${slide.num}`}
                width={800}
                height={800}
                decoding="async"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[linear-gradient(160deg,#07150F_0%,#04110B_55%,#030A07_100%)] p-6 text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                  <PawPrint className="h-14 w-14 text-primary/60" />
                </div>
                <div>
                  <p className="arcade-title text-[0.65rem] tracking-wider text-muted">
                    Artwork revealing soon
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {slide.title}
                  </p>
                  <p className="mt-0.5 text-xs text-subtle">{slide.trait}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="btn btn-ghost h-11 w-11 rounded-full p-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex max-w-xs items-center justify-center gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-[width,background-color] duration-150 ${
                    i === index
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="btn btn-ghost h-11 w-11 rounded-full p-0"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
