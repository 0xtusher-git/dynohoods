"use client";

/**
 * Single cached Audio instance for button clicks. Resets currentTime to 0
 * on every play so rapid clicks retrigger cleanly instead of being cut off.
 */

let audio: HTMLAudioElement | null = null;

export function playClickSound() {
  if (typeof window === "undefined") return;
  if (!audio) {
    audio = new Audio("/audio/click.wav");
  }
  if (audio.currentTime > 0) {
    audio.currentTime = 0;
  }
  audio.play().catch(() => {
    /* autoplay restrictions or missing file — ignore */
  });
}
