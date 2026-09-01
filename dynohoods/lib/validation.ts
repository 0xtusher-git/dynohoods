/**
 * Shared validation used on both client and server.
 * Never trust client-only checks — the API route runs these again.
 */

const WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/;
const X_LINK_REGEX = /(?:x\.com|twitter\.com)\/[^/]+\/status\/\d+/;
const HANDLE_REGEX = /^@?[A-Za-z0-9_]{3,15}$/;

export function isValidWallet(address: string): boolean {
  return WALLET_REGEX.test(address.trim());
}

export function isValidHandle(handle: string): boolean {
  return HANDLE_REGEX.test(handle.trim());
}

export function normalizeHandle(handle: string): string {
  const h = handle.trim().replace(/^@/, "");
  return h.startsWith("@") ? h : `@${h}`;
}

/**
 * Returns true if the provided URL is a valid x.com/twitter status link.
 * Intentionally tolerant of the various current/legacy hostnames.
 */
export function isValidXLink(url: string): boolean {
  const trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed)) return false;
  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    if (host !== "x.com" && host !== "twitter.com") return false;
    return X_LINK_REGEX.test(trimmed);
  } catch {
    return false;
  }
}

/** Human-readable field errors shared by client + server. */
export interface FieldErrors {
  handle?: string;
  wallet?: string;
  quoteUrl?: string;
  replyUrl?: string;
}
