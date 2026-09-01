import { useEffect } from "react";
import { playClickSound } from "@/lib/playClickSound";

/**
 * One global click listener at the app root. Any click on a <button>,
 * an <a> styled as a button, or an element with role="button" triggers
 * the shared click sound — no per-button onClick wiring needed.
 */
export default function ButtonClickSound() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || !(target instanceof Element)) return;
      const el = target.closest<HTMLElement>(
        "button, a.btn, a[role='button'], [role='button']",
      );
      if (el) playClickSound();
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
