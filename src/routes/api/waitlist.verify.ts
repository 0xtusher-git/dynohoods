import { createFileRoute } from "@tanstack/react-router";
import { DEMO_MODE, type XTaskId } from "@/lib/waitlist";

const ACTIONS: Exclude<XTaskId, "quote">[] = ["like", "reply", "repost"];

export const Route = createFileRoute("/api/waitlist/verify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let action: unknown;
        try {
          const body = (await request.json()) as { action?: unknown };
          action = body.action;
        } catch {
          return Response.json(
            { ok: false, error: "Malformed request." },
            { status: 400 },
          );
        }

        if (
          typeof action !== "string" ||
          !ACTIONS.includes(action as Exclude<XTaskId, "quote">)
        ) {
          return Response.json(
            { ok: false, error: "Unknown action." },
            { status: 400 },
          );
        }

        if (DEMO_MODE) {
          return Response.json({ ok: true, demo: true });
        }

        return Response.json(
          {
            ok: false,
            error:
              "X verification is not connected yet. A button click is not proof of a like, reply, or repost.",
          },
          { status: 501 },
        );
      },
    },
  },
});
