/**
 * Shared validation used on both client and server.
 * Never trust client-only checks — the API route runs these again.
 */

const WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/;
const HANDLE_REGEX = /^@?[A-Za-z0-9_]{3,15}$/;
/** X username for the waitlist: MUST start with @, then 1–15 letters/numbers/_ */
const X_USERNAME_REGEX = /^@[A-Za-z0-9_]{1,15}$/;

const X_POST_HOSTS = new Set([
  "x.com",
  "www.x.com",
  "twitter.com",
  "www.twitter.com",
]);

export function isValidWallet(address: string): boolean {
  return WALLET_REGEX.test(address.trim());
}

export function isValidHandle(handle: string): boolean {
  return HANDLE_REGEX.test(handle.trim());
}

/**
 * Waitlist username: only values that start with @ are accepted.
 * Example: @Dynohoods
 */
export function isValidXUsername(value: string): boolean {
  return X_USERNAME_REGEX.test(value.trim());
}

export function normalizeHandle(handle: string): string {
  const h = handle.trim().replace(/^@/, "");
  return h.startsWith("@") ? h : `@${h}`;
}

/**
 * Client-side X/Twitter *post URL format* checker.
 *
 * Uses the URL parser + an exact hostname allowlist. This does NOT prove
 * the post exists, or that the user quoted anything — only that the string
 * looks like `https://x.com/<user>/status/<id>`.
 */
export function isValidXPostUrl(url: string): boolean {
  if (typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed) return false;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return false;
  }

  if (parsed.protocol !== "https:") return false;

  const host = parsed.hostname.toLowerCase();
  if (!X_POST_HOSTS.has(host)) return false;

  const match = parsed.pathname.match(/^\/([^/]+)\/status\/(\d+)\/?$/);
  if (!match) return false;

  const username = match[1];
  const statusId = match[2];
  if (!username || username === "." || username === "..") return false;
  if (!/^\d+$/.test(statusId)) return false;

  return true;
}

/** @deprecated Prefer isValidXPostUrl — kept for the older whitelist modal. */
export function isValidXLink(url: string): boolean {
  return isValidXPostUrl(url);
}

/** Human-readable field errors shared by client + server. */
export interface FieldErrors {
  handle?: string;
  wallet?: string;
  quoteUrl?: string;
  replyUrl?: string;
}
