import { NextRequest, NextResponse } from "next/server";
import {
  isValidWallet,
  isValidHandle,
  isValidXLink,
  normalizeHandle,
  type FieldErrors,
} from "@/lib/validation";
import {
  storeSubmission,
  type WhitelistRecord,
} from "@/lib/storage";

/** Simple in-memory per-IP rate limiting (process-scoped). */
const ipHits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // per day
const RATE_LIMIT_MAX = Number(
  process.env.SUBMISSION_RATE_LIMIT_PER_IP || "5",
);

function normalizeIp(headers: Headers): string {
  const cf = headers.get("x-forwarded-for") ?? headers.get("x-real-ip");
  if (cf) return cf.split(",")[0].trim().slice(0, 45);
  return "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  const ip = normalizeIp(req.headers);

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Rate limited. Too many submissions from this address — try again tomorrow." },
      { status: 429 },
    );
  }

  let body: { [key: string]: unknown };
  try {
    body = (await req.json()) as { [key: string]: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a hidden field that real humans never fill. If it's
  // populated, it's a bot — reject silently (200 to avoid tipping off).
  if (typeof body.honey === "string" && body.honey.length > 0) {
    return NextResponse.json({ ok: true, error: "ok" });
  }

  const rawHandle = typeof body.handle === "string" ? body.handle : "";
  const rawWallet = typeof body.wallet === "string" ? body.wallet : "";
  const quoteUrl = typeof body.quoteUrl === "string" ? body.quoteUrl : "";
  const replyUrl = typeof body.replyUrl === "string" ? body.replyUrl : "";
  const followAttested = Boolean(body.followAttested);
  const likeAttested = Boolean(body.likeAttested);

  const errors: FieldErrors = {};
  if (!isValidHandle(rawHandle)) {
    errors.handle = "Enter a valid X handle (3–15 letters, numbers, underscores).";
  }
  if (!isValidWallet(rawWallet)) {
    errors.wallet = "Enter a valid wallet address (0x followed by 40 hex characters).";
  }
  if (quoteUrl && !isValidXLink(quoteUrl)) {
    errors.quoteUrl = "Paste a valid x.com / twitter.com status link.";
  }
  if (replyUrl && !isValidXLink(replyUrl)) {
    errors.replyUrl = "Paste a valid x.com / twitter.com status link.";
  }
  if (!followAttested) {
    return NextResponse.json(
      { ok: false, error: "validation", message: "Attest that you followed before hatching." },
      { status: 400 },
    );
  }
  if (!likeAttested) {
    return NextResponse.json(
      { ok: false, error: "validation", message: "Attest that you liked before hatching." },
      { status: 400 },
    );
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "validation", fields: errors },
      { status: 400 },
    );
  }

  const record: WhitelistRecord = {
    handle: normalizeHandle(rawHandle),
    wallet: rawWallet.trim().toLowerCase(),
    followAttested,
    likeAttested,
    quoteUrl: quoteUrl.trim() || undefined,
    replyUrl: replyUrl.trim() || undefined,
    timestamp: new Date().toISOString(),
    ip,
  };

  try {
    const result = await storeSubmission(record);
    if (!result.ok) {
      const status = result.error === "duplicate" ? 409 : 500;
      const message =
        result.error === "duplicate"
          ? result.dupField === "handle"
            ? "This X handle has already claimed a spot."
            : "This wallet has already claimed a spot."
          : "Submission failed. Please try again in a moment.";
      return NextResponse.json({ ok: false, error: result.error, message }, { status });
    }
    return NextResponse.json(
      { ok: true, id: result.id },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "storage", message: "Storage error. Please try again." },
      { status: 500 },
    );
  }
}
