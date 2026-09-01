/**
 * One full-page fixed shadow/scrim layer sitting on top of the entire video
 * but underneath every content element (text, buttons, cards, footer).
 *
 * Stacking:
 *   - HeroVideoLayer:  -z-10 (bottom)
 *   - VideoShadowLayer: z-0  (this — dims the whole video uniformly)
 *   - Page content:     z-10  (above the shadow)
 *
 * It must stay a direct sibling of the video/content inside the shell with no
 * transform ancestor, so position: fixed stays relative to the viewport.
 */
export default function VideoShadowLayer() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen bg-[rgba(4,8,6,0.55)]"
    />
  );
}
