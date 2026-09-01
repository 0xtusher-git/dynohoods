import { useCallback, useEffect, useRef, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { siteConfig } from "@/lib/theme";

const CANVAS_W = 320;
const CANVAS_H = 160;
const PIECE = 40;
const HANDLE = 40;
const TOLERANCE = 10;

const PUZZLE_IMAGES = siteConfig.collectionSlides.map((s) => s.src);

function pickImage(prev?: string) {
  const pool = PUZZLE_IMAGES.filter((src) => src !== prev);
  const list = pool.length ? pool : PUZZLE_IMAGES;
  return list[Math.floor(Math.random() * list.length)] ?? "/hero-poster.jpg";
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
) {
  const ir = img.width / img.height || 1;
  const r = w / h;
  let dw: number;
  let dh: number;
  let dx: number;
  let dy: number;
  if (ir > r) {
    dh = h;
    dw = img.width * (h / img.height);
    dx = (w - dw) / 2;
    dy = 0;
  } else {
    dw = w;
    dh = img.height * (w / img.width);
    dx = 0;
    dy = (h - dh) / 2;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function SlideCaptcha({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const mainRef = useRef<HTMLCanvasElement>(null);
  const blockRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const dragging = useRef(false);
  const startClientX = useRef(0);
  const startOffset = useRef(0);
  const imgSrc = useRef(pickImage());

  const offsetRef = useRef(0);
  const [offset, setOffset] = useState(0);
  const [status, setStatus] = useState<"idle" | "ok" | "fail">("idle");
  const [ready, setReady] = useState(false);

  const applyOffset = (n: number) => {
    offsetRef.current = n;
    setOffset(n);
  };

  const paint = useCallback(() => {
    const main = mainRef.current;
    const block = blockRef.current;
    if (!main || !block) return;
    const ctx = main.getContext("2d", { willReadFrequently: true });
    const bctx = block.getContext("2d", { willReadFrequently: true });
    if (!ctx || !bctx) return;

    const img = new Image();
    img.decoding = "async";
    img.src = imgSrc.current;

    const finish = () => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      if (img.naturalWidth > 0) {
        drawCover(ctx, img, CANVAS_W, CANVAS_H);
      } else {
        const g = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
        g.addColorStop(0, "#07150f");
        g.addColorStop(1, "#0a2418");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      }

      const maxX = CANVAS_W - PIECE - 50;
      targetX.current = Math.floor(Math.random() * Math.max(1, maxX - 70)) + 70;
      const targetY =
        Math.floor(Math.random() * (CANVAS_H - PIECE - 20)) + 10;

      const piece = ctx.getImageData(
        targetX.current,
        targetY,
        PIECE,
        PIECE,
      );

      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(targetX.current, targetY, PIECE, PIECE);
      ctx.strokeStyle = "rgba(64, 224, 192, 0.45)";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        targetX.current + 0.5,
        targetY + 0.5,
        PIECE - 1,
        PIECE - 1,
      );

      bctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      bctx.putImageData(piece, 0, targetY);
      bctx.strokeStyle = "rgba(244, 237, 224, 0.95)";
      bctx.lineWidth = 2;
      bctx.strokeRect(0.5, targetY + 0.5, PIECE - 1, PIECE - 1);

      main.dataset.targetX = String(targetX.current);
      applyOffset(0);
      setStatus("idle");
      setReady(true);
    };

    img.onload = finish;
    img.onerror = finish;
  }, []);

  useEffect(() => {
    paint();
  }, [paint]);

  const maxCss = () => {
    const track = trackRef.current;
    if (!track) return CANVAS_W - HANDLE;
    return Math.max(0, track.clientWidth - HANDLE);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (status === "ok") return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    startClientX.current = e.clientX;
    startOffset.current = offsetRef.current;
    setStatus("idle");
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current || status === "ok") return;
    const dx = e.clientX - startClientX.current;
    applyOffset(clamp(startOffset.current + dx, 0, maxCss()));
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;

    const track = trackRef.current;
    const width = track?.clientWidth || CANVAS_W;
    const displayedTarget = targetX.current * (width / CANVAS_W);
    const current = offsetRef.current;

    if (Math.abs(current - displayedTarget) <= TOLERANCE) {
      applyOffset(displayedTarget);
      setStatus("ok");
      window.setTimeout(() => onSuccess(), 420);
    } else {
      setStatus("fail");
      imgSrc.current = pickImage(imgSrc.current);
      window.setTimeout(() => paint(), 280);
    }
  };

  const refresh = () => {
    if (status === "ok") return;
    imgSrc.current = pickImage(imgSrc.current);
    paint();
  };

  return (
    <div className="w-[320px] max-w-full">
      <div className="text-center">
        <p className="arcade-title text-sm text-white">Slide to enter</p>
        <p className="mt-2 text-xs text-white">
          Drag the piece into the slot to open the waitlist.
        </p>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-lg border border-white/10 bg-surface">
        <canvas
          ref={mainRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="block h-auto w-full"
        />
        <canvas
          ref={blockRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="pointer-events-none absolute top-0 left-0 h-full w-full"
          style={{ transform: `translateX(${offset}px)` }}
        />
        {!ready && (
          <div className="absolute inset-0 bg-surface" aria-hidden />
        )}
      </div>

      <div
        ref={trackRef}
        className="relative mt-4 h-10 rounded-full border border-white/10 bg-white/[0.04]"
      >
        <p className="pointer-events-none absolute inset-0 text-center text-xs leading-10 text-subtle">
          {status === "ok" ? "Verified" : "Swipe right →"}
        </p>
        <button
          type="button"
          aria-label="Slide puzzle handle"
          disabled={status === "ok"}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold select-none touch-none ${
            status === "ok" ? "bg-teal text-background" : "bg-primary"
          }`}
          style={{
            transform: `translateX(${offset}px)`,
            color: status === "ok" ? undefined : "#1a1203",
          }}
        >
          {status === "ok" ? <Check className="h-4 w-4" /> : "→"}
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <p
          role="status"
          className={`min-h-4 text-xs ${
            status === "fail"
              ? "text-danger"
              : status === "ok"
                ? "text-teal"
                : "text-subtle"
          }`}
        >
          {status === "fail"
            ? "Not quite — new puzzle loaded."
            : status === "ok"
              ? "You're in. Opening waitlist…"
              : " "}
        </p>
        <button
          type="button"
          onClick={refresh}
          disabled={status === "ok"}
          className="inline-flex items-center gap-1 text-xs text-muted hover:text-foreground disabled:opacity-40"
        >
          <RotateCcw className="h-3 w-3" />
          New puzzle
        </button>
      </div>
    </div>
  );
}
