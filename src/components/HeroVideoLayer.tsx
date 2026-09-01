const VIDEO_SRC = "/Video/hero.mp4";
const POSTER = "/hero-poster.jpg";

/**
 * Full-viewport fixed video background.
 * No JS — the tag is in the first HTML paint so the poster shows immediately.
 */
export default function HeroVideoLayer() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-background"
    >
      <video
        className="h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={POSTER}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <img
        src={POSTER}
        alt=""
        className="hidden h-full w-full object-cover motion-reduce:block"
      />
    </div>
  );
}
