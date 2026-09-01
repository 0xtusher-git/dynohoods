import { siteConfig } from "@/lib/theme";
import { isValidWallet, isValidXPostUrl, isValidXUsername } from "@/lib/validation";

/**
 * Waitlist page config — the one-line-edit center for this route only.
 * Does not change homepage / modal copy.
 */
export const COLLECTION_NAME = siteConfig.projectName;
export const COLLECTION_SUPPLY = 5555;
export const TASK_TOTAL = 5;
export const WAITLIST_API_URL = "/api/waitlist";

/**
 * Official pinned post. Leave empty (or the theme placeholder) until the
 * real post is live — the page will not invent tweet content.
 */
export const PINNED_POST_URL: string = siteConfig.pinnedPostUrl;

/**
 * When true, VERIFY may succeed without a live X API so the page can be
 * tested. This does NOT mean the user actually liked / replied / reposted.
 * Flip to false before going live, then implement the TODOs in the verify*
 * functions and the /api/waitlist/verify route.
 */
export const DEMO_MODE = true;

export type XTaskId = "like" | "reply" | "repost" | "quote";

export interface WaitlistTasks {
  usernameSubmitted: boolean;
  liked: boolean;
  replied: boolean;
  reposted: boolean;
  quoted: boolean;
}

export interface WaitlistSubmission {
  walletAddress: string;
  xUsername: string;
  tasks: WaitlistTasks;
  quoteUrl: string;
  submittedAt: string;
}

export interface VerifyResult {
  ok: boolean;
  demo?: boolean;
  error?: string;
}

export interface SubmitResult {
  ok: boolean;
  demo?: boolean;
  error?: string;
}

export function isPinnedPostConfigured(url: string = PINNED_POST_URL): boolean {
  if (!url.trim()) return false;
  if (url.includes("0000000000000000000")) return false;
  if (/\/status\/0+$/.test(url)) return false;
  return /^https?:\/\//i.test(url);
}

export function tweetIdFromUrl(url: string = PINNED_POST_URL): string | null {
  const match = url.match(/\/status\/(\d+)/);
  return match?.[1] ?? null;
}

export function xActionUrl(task: XTaskId): string | null {
  if (!isPinnedPostConfigured()) return null;
  const id = tweetIdFromUrl();
  if (!id) return PINNED_POST_URL;
  switch (task) {
    case "like":
      return `https://x.com/intent/like?tweet_id=${id}`;
    case "reply":
      return `https://x.com/intent/tweet?in_reply_to=${id}`;
    case "repost":
      return `https://x.com/intent/retweet?tweet_id=${id}`;
    case "quote":
      return `https://x.com/intent/post?url=${encodeURIComponent(PINNED_POST_URL)}`;
  }
}

export function shortAddress(addr: string): string {
  const a = addr.trim();
  if (a.length < 10) return a;
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

export function usernameError(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Please enter your X username.";
  }
  if (!trimmed.startsWith("@")) {
    return "Username must start with @.";
  }
  if (!isValidXUsername(trimmed)) {
    return "Enter a valid X username starting with @ (letters, numbers, underscore).";
  }
  return null;
}

export function quoteLinkError(value: string): string | null {
  if (!value.trim()) {
    return "Please enter your X post link.";
  }
  if (!isValidXPostUrl(value)) {
    return "Invalid X post link. Please paste a valid X/Twitter post URL.";
  }
  return null;
}

export function walletErrorMessage(value: string, touched: boolean): string | null {
  if (!touched || !value.trim()) return null;
  if (!isValidWallet(value)) {
    return "That isn't a valid EVM address — 0x followed by 40 hex characters.";
  }
  return null;
}

/* ─────────────────────────────────────────────────────────────
   FRONTEND ABSTRACTIONS — real backends plug in at the TODOs
   ───────────────────────────────────────────────────────────── */

/**
 * verifyLike()
 *
 * TODO: Call the real X / backend verification.
 * Frontend clicks cannot prove a like. The server must check the
 * authenticated X user against the pinned post.
 */
export async function verifyLike(): Promise<VerifyResult> {
  return verifyXTask("like");
}

/**
 * verifyReply()
 *
 * TODO: Call the real X / backend verification (reply on the pinned post).
 */
export async function verifyReply(): Promise<VerifyResult> {
  return verifyXTask("reply");
}

/**
 * verifyRepost()
 *
 * TODO: Call the real X / backend verification (repost of the pinned post).
 */
export async function verifyRepost(): Promise<VerifyResult> {
  return verifyXTask("repost");
}

async function verifyXTask(action: Exclude<XTaskId, "quote">): Promise<VerifyResult> {
  if (DEMO_MODE) {
    // Demo only — does not mean the user actually performed the action.
    return { ok: true, demo: true };
  }

  try {
    const res = await fetch(`${WAITLIST_API_URL}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const data = (await res.json()) as VerifyResult;
    if (!res.ok) {
      return {
        ok: false,
        error: data.error ?? "Verification is not available yet.",
      };
    }
    return data;
  } catch {
    return { ok: false, error: "Could not reach the verification service." };
  }
}

/**
 * submitWaitlist(data)
 *
 * TODO: Connect to the real backend / database.
 * Payload shape is stable so the server can land later without UI churn.
 */
export async function submitWaitlist(
  data: WaitlistSubmission,
): Promise<SubmitResult> {
  if (!isValidWallet(data.walletAddress)) {
    return { ok: false, error: "Enter a valid wallet address." };
  }
  const { tasks } = data;
  if (
    !tasks.usernameSubmitted ||
    !isValidXUsername(data.xUsername) ||
    !tasks.liked ||
    !tasks.replied ||
    !tasks.reposted ||
    !tasks.quoted ||
    !isValidXPostUrl(data.quoteUrl)
  ) {
    return { ok: false, error: "Finish every mission before joining." };
  }

  try {
    const res = await fetch(WAITLIST_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = (await res.json()) as SubmitResult;
    if (!res.ok) {
      return { ok: false, error: result.error ?? "Submission failed." };
    }
    return result;
  } catch {
    return { ok: false, error: "Network error — try again in a moment." };
  }
}
