import { NextRequest, NextResponse } from "next/server";
import { isValidWallet, isValidXLink } from "@/lib/validation";
import { DEMO_MODE, type WaitlistSubmission } from "@/lib/waitlist";

/**
 * POST /api/waitlist
 *
 * TODO: Persist to the real database (Supabase / Postgres).
 * This stub validates the payload and acknowledges it. Nothing durable
 * is stored yet — flip DEMO_MODE off and wire storage before launch.
 */

const seenWallets = new Set<string>();

export async function POST(req: NextRequest) {
  let body: Partial<WaitlistSubmission>;
  try {
    body = (await req.json()) as Partial<WaitlistSubmission>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  const wallet =
    typeof body.walletAddress === "string" ? body.walletAddress.trim() : "";
  if (!isValidWallet(wallet)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid wallet address." },
      { status: 400 },
    );
  }

  const quoteUrl = typeof body.quoteUrl === "string" ? body.quoteUrl.trim() : "";
  const tasks = body.tasks;
  if (
    !tasks ||
    !tasks.liked ||
    !tasks.replied ||
    !tasks.reposted ||
    !tasks.quoted ||
    !isValidXLink(quoteUrl)
  ) {
    return NextResponse.json(
      { ok: false, error: "All four missions must be complete." },
      { status: 400 },
    );
  }

  const key = wallet.toLowerCase();
  if (seenWallets.has(key)) {
    return NextResponse.json(
      { ok: false, error: "This wallet is already on the list." },
      { status: 409 },
    );
  }
  seenWallets.add(key);

  // TODO: insert into waitlist table (wallet, tasks, quote url, submitted_at).
  return NextResponse.json({
    ok: true,
    demo: DEMO_MODE,
  });
}
