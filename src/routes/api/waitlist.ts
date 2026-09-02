import { createFileRoute } from "@tanstack/react-router";
import { isValidWallet, isValidXPostUrl, isValidXUsername } from "@/lib/validation";
import { DEMO_MODE, type WaitlistSubmission } from "@/lib/waitlist";
import { getSupabase } from "@/lib/supabase";

const seenWallets = new Set<string>();

export const Route = createFileRoute("/api/waitlist")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: Partial<WaitlistSubmission>;
        try {
          body = (await request.json()) as Partial<WaitlistSubmission>;
        } catch {
          return Response.json(
            { ok: false, error: "Malformed request." },
            { status: 400 },
          );
        }

        const wallet =
          typeof body.walletAddress === "string"
            ? body.walletAddress.trim()
            : "";
        if (!isValidWallet(wallet)) {
          return Response.json(
            { ok: false, error: "Enter a valid wallet address." },
            { status: 400 },
          );
        }

        const quoteUrl =
          typeof body.quoteUrl === "string" ? body.quoteUrl.trim() : "";
        const replyUrl =
          typeof body.replyUrl === "string" ? body.replyUrl.trim() : "";
        const xUsername =
          typeof body.xUsername === "string" ? body.xUsername.trim() : "";
        const tasks = body.tasks;
        if (
          !tasks ||
          !tasks.usernameSubmitted ||
          !isValidXUsername(xUsername) ||
          !tasks.liked ||
          !tasks.replied ||
          !tasks.reposted ||
          !tasks.quoted ||
          !isValidXPostUrl(quoteUrl) ||
          !isValidXPostUrl(replyUrl)
        ) {
          return Response.json(
            { ok: false, error: "All five missions must be complete." },
            { status: 400 },
          );
        }

        const key = wallet.toLowerCase();
        if (seenWallets.has(key)) {
          return Response.json(
            { ok: false, error: "This wallet is already on the list." },
            { status: 409 },
          );
        }
        seenWallets.add(key);

        const supabase = getSupabase();
        if (!supabase) {
          return Response.json(
            { ok: false, error: "Waitlist storage is not configured on the server." },
            { status: 500 },
          );
        }

        const { error: insertError } = await supabase
          .from("whitelist_submissions")
          .insert({
            x_username: xUsername,
            wallet_address: wallet,
            quote_link: quoteUrl,
            reply_link: typeof body.replyUrl === "string" ? body.replyUrl.trim() : "",
            follow_confirmed: false,
            like_confirmed: tasks.liked,
          });

        if (insertError) {
          if (
            insertError.code === "23505" &&
            (insertError.message.includes("wallet_address") ||
              insertError.message.includes("x_username"))
          ) {
            return Response.json(
              { ok: false, error: "This wallet or X account has already submitted an entry." },
              { status: 409 },
            );
          }
          return Response.json(
            { ok: false, error: "Failed to save submission." },
            { status: 500 },
          );
        }

        return Response.json({ ok: true, demo: DEMO_MODE });
      },
    },
  },
});
