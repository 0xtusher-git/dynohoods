"use client";

export default function ProgressBar({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const pct = Math.min(100, Math.round((completed / total) * 100));

  return (
    <div className="mx-auto mt-8 w-full max-w-md">
      <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
        {completed} / {total} tasks completed
      </p>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={completed}
        aria-label={`${completed} of ${total} tasks completed`}
      >
        <div
          className="h-full rounded-full bg-teal shadow-glow transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
