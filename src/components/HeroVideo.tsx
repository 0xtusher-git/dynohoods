import StatStrip from "@/components/StatStrip";
import { GetWhitelistedButton } from "@/components/captcha/CaptchaProvider";
import { siteConfig } from "@/lib/theme";

export default function HeroVideo() {
  return (
    <section id="top" className="relative isolate">
      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-5 pb-16 pt-28 text-center sm:px-8">
        <h1 className="brand-title max-w-5xl whitespace-nowrap text-[clamp(2.6rem,13vw,8rem)] text-white [text-shadow:0_2px_22px_rgba(0,0,0,0.7)]">
          {siteConfig.tagline}
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-relaxed font-medium text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.8)] sm:text-lg">
          {siteConfig.description}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <GetWhitelistedButton className="btn btn-primary px-7 py-3 text-base" />
          <a
            href="#first-look"
            className="btn btn-ghost px-7 py-3 text-base"
          >
            Take the first look
          </a>
        </div>

        <StatStrip />
      </div>
    </section>
  );
}
