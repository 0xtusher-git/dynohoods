import { Loader2 } from "lucide-react";

export default function WaitlistSubmit({
  enabled,
  submitting,
  error,
  onSubmit,
}: {
  enabled: boolean;
  submitting: boolean;
  error: string | null;
  onSubmit: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={!enabled || submitting}
        className="btn btn-primary min-h-12 w-full px-6 py-3.5 text-sm sm:text-base"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Joining…
          </>
        ) : enabled ? (
          "Join waitlist"
        ) : (
          "Finish missions + wallet"
        )}
      </button>
      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-center text-xs font-medium text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}
