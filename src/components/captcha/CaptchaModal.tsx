import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import SlideCaptcha from "@/components/captcha/SlideCaptcha";

export default function CaptchaModal({
  onSuccess,
  onDismiss,
}: {
  onSuccess: () => void;
  onDismiss: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-5">
      <button
        type="button"
        aria-label="Close verification"
        className="absolute inset-0 bg-background/55 backdrop-blur-md"
        onClick={onDismiss}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="captcha-title"
        tabIndex={-1}
        className="relative z-10 w-[min(100%,22rem)] rounded-2xl border border-white/12 bg-[rgba(7,21,15,0.96)] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.45)] outline-none"
      >
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Close"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <h2 id="captcha-title" className="sr-only">
          Waitlist verification
        </h2>
        <SlideCaptcha onSuccess={onSuccess} />
      </div>
    </div>
  );
}
