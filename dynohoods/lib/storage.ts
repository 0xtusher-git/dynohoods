/**
 * ─────────────────────────────────────────────────────────────
 *  STORAGE ABSTRACTION
 *  All submission storage funnels through `storeSubmission`.
 *  Default backend: Supabase (Postgres).
 *  Swap for Airtable/Google Sheets by returning a different
 *  implementation — nothing else in the app needs to change.
 * ─────────────────────────────────────────────────────────────
 */

export interface WhitelistRecord {
  handle: string; // normalized "@handle"
  wallet: string; // normalized lowercase 0x address
  followAttested: boolean;
  likeAttested: boolean;
  quoteUrl?: string;
  replyUrl?: string;
  timestamp: string; // ISO
  ip: string; // normalized IP for basic rate-limiting
}

export type StorageResult =
  | { ok: true; id: string }
  | { ok: false; error: "duplicate" | "storage" };

export type StoreSubmissionResult = StorageResult & {
  dupField?: "wallet" | "handle";
};

/**
 * In-memory fallback used when no backend env vars are configured.
 * Loses data on server restart — good for local dev, not production.
 */
const memoryStore = new Map<string, WhitelistRecord>();

function isConfigured(): boolean {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

function detectDuplicate(record: WhitelistRecord): "wallet" | "handle" | null {
  const wallet = record.wallet.toLowerCase();
  const handle = record.handle.toLowerCase();
  for (const existing of Array.from(memoryStore.values())) {
    if (existing.wallet.toLowerCase() === wallet) return "wallet";
    if (existing.handle.toLowerCase() === handle) return "handle";
  }
  return null;
}

async function storeSupabase(
  record: WhitelistRecord,
): Promise<StoreSubmissionResult> {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // Guard against duplicates by wallet and by handle.
  const { data: existing } = await supabase
    .from("whitelist")
    .select("wallet, handle")
    .or(`wallet.eq.${record.wallet},handle.eq.${record.handle}`)
    .limit(1);

  if (existing && existing.length > 0) {
    const dup = existing[0];
    const dupField: "wallet" | "handle" =
      dup.wallet?.toLowerCase() === record.wallet.toLowerCase()
        ? "wallet"
        : "handle";
    return { ok: false, error: "duplicate", dupField };
  }

  const { data, error } = await supabase
    .from("whitelist")
    .insert([
      {
        handle: record.handle,
        wallet: record.wallet,
        follow_attested: record.followAttested,
        like_attested: record.likeAttested,
        quote_url: record.quoteUrl ?? null,
        reply_url: record.replyUrl ?? null,
        timestamp: record.timestamp,
        ip: record.ip,
      },
    ])
    .select("id")
    .single();

  if (error || !data) return { ok: false, error: "storage" };
  return { ok: true, id: data.id };
}

async function storeMemory(record: WhitelistRecord): Promise<StoreSubmissionResult> {
  const dup = detectDuplicate(record);
  if (dup) {
    return { ok: false, error: "duplicate", dupField: dup };
  }
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  memoryStore.set(id, record);
  return { ok: true, id };
}

/**
 * THE single storage entrypoint. Swap the backend here.
 */
export async function storeSubmission(
  record: WhitelistRecord,
): Promise<StoreSubmissionResult> {
  if (isConfigured()) {
    return storeSupabase(record);
  }
  return storeMemory(record);
}

/** Used by the API route to find duplicates before inserting. */
export { isConfigured };
