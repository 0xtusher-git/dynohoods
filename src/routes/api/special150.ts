import { createFileRoute } from "@tanstack/react-router";
import { isValidHandle } from "@/lib/validation";
import { getSupabase } from "@/lib/supabase";

const ELIGIBLE_TABLE = "special_150_eligible";
const REQUESTS_TABLE = "special_150_requests";

function cleanUsername(value: string): string {
  return value.trim().replace(/^@/, "");
}

export const Route = createFileRoute("/api/special150")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const username = cleanUsername(url.searchParams.get("username") ?? "");

        if (!username || !isValidHandle(`@${username}`)) {
          return Response.json(
            { ok: false, error: "Enter a valid X username." },
            { status: 400 },
          );
        }

        const supabase = getSupabase();
        if (!supabase) {
          return Response.json(
            { ok: false, error: "Eligibility storage is not configured on the server." },
            { status: 500 },
          );
        }

        const { data, error } = await supabase
          .from(ELIGIBLE_TABLE)
          .select("x_username")
          .or(`x_username.ilike.${username},x_username.ilike.@${username}`);

        if (error) {
          return Response.json(
            { ok: false, error: "Failed to check eligibility." },
            { status: 500 },
          );
        }

        return Response.json({ ok: true, eligible: (data?.length ?? 0) > 0 });
      },

      POST: async ({ request }) => {
        let body: { username?: string; reason?: string };
        try {
          body = (await request.json()) as { username?: string; reason?: string };
        } catch {
          return Response.json(
            { ok: false, error: "Malformed request." },
            { status: 400 },
          );
        }

        const username = cleanUsername(typeof body.username === "string" ? body.username : "");
        const reason = (typeof body.reason === "string" ? body.reason : "").trim();

        if (!username || !isValidHandle(`@${username}`)) {
          return Response.json(
            { ok: false, error: "Enter a valid X username." },
            { status: 400 },
          );
        }
        if (!reason) {
          return Response.json(
            { ok: false, error: "Tell us why you want this." },
            { status: 400 },
          );
        }

        const supabase = getSupabase();
        if (!supabase) {
          return Response.json(
            { ok: false, error: "Eligibility storage is not configured on the server." },
            { status: 500 },
          );
        }

        // Query the DB directly (never an in-memory set) so a duplicate check
        // stays consistent across deploys / instances.
        const { data: existing, error: checkError } = await supabase
          .from(REQUESTS_TABLE)
          .select("x_username")
          .or(`x_username.ilike.${username},x_username.ilike.@${username}`);

        if (checkError) {
          return Response.json(
            { ok: false, error: "Failed to save your request." },
            { status: 500 },
          );
        }
        if ((existing?.length ?? 0) > 0) {
          return Response.json(
            { ok: false, alreadyRequested: true, error: "You've already requested consideration" },
            { status: 409 },
          );
        }

        const { error: insertError } = await supabase
          .from(REQUESTS_TABLE)
          .insert({ x_username: username, reason });

        if (insertError) {
          if (insertError.code === "23505") {
            return Response.json(
              { ok: false, alreadyRequested: true, error: "You've already requested consideration" },
              { status: 409 },
            );
          }
          return Response.json(
            { ok: false, error: "Failed to save your request." },
            { status: 500 },
          );
        }

        return Response.json({ ok: true });
      },
    },
  },
});
