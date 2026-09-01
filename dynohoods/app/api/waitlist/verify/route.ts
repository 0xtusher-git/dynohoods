import { NextRequest, NextResponse } from "next/server";
import { DEMO_MODE, type XTaskId } from "@/lib/waitlist";

/**
 * POST /api/waitlist/verify
 *
 * TODO: Implement real X API verification.
 * A browser click cannot prove a like / reply / repost. When DEMO_MODE is
 * false this route refuses until the server-side check is wired:
 *   1. Identify the authenticated X user (OAuth).
 *   2. Query whether they liked / replied to / reposted the pinned post.
 *   3. Return { ok: true } only when the platform confirms it.
 */

const ACTIONS: XTaskId[] = ["like", "reply", "repost"];

export async function POST(req: NextRequest) {
  let action: unknown;
  try {
    const body = (await req.json()) as { action?: unknown };
    action = body.action;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  if (typeof action !== "string" || !ACTIONS.includes(action as XTaskId)) {
    return NextResponse.json(
      { ok: false, error: "Unknown action." },
      { status: 400 },
    );
  }

  if (DEMO_MODE) {
    return NextResponse.json({
      ok: true,
      demo: true,
    });
  }

  return NextResponse.json(
    {
      ok: false,
      error:
        "X verification is not connected yet. A button click is not proof of a like, reply, or repost.",
    },
    { status: 501 },
  );
}
