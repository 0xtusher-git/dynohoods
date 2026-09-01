"use client";

import { useReducedMotion } from "framer-motion";

const VIDEO_SRC = "/Video/hero.mp4";
const POSTER = "/hero-poster.jpg";

/**
 * Full-viewport fixed video background.
 *
 * Rendered directly inside <body>, before any page content, so there are no
 * transform/filter/perspective ancestors — those would break position: fixed
 * and make it scroll like position: absolute.
 *
 * Page content sits at z-index 10+ and every section has its own opaque
 * background, so this stays pinned behind everything until the (transparent)
 * hero reads over it.
 */
export default function HeroVideoLayer() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="fixed inset-0 -z-10 h-screen w-screen">
      {reducedMotion ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={POSTER}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={POSTER}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </div>
  );
}