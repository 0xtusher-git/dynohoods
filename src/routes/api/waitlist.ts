import { createFileRoute } from "@tanstack/react-router";
import { isValidWallet, isValidXPostUrl, isValidXUsername } from "@/lib/validation";
import { DEMO_MODE, type WaitlistSubmission } from "@/lib/waitlist";

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
          !isValidXPostUrl(quoteUrl)
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

        return Response.json({ ok: true, demo: DEMO_MODE });
      },
    },
  },
});
