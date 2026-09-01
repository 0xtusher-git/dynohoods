import { createFileRoute } from "@tanstack/react-router";
import WaitlistShell from "@/components/waitlist/WaitlistShell";
import { COLLECTION_NAME, COLLECTION_SUPPLY } from "@/lib/waitlist";

export const Route = createFileRoute("/waitlist")({
  component: WaitlistRoute,
  head: () => ({
    meta: [
      { title: `Join the Waitlist — ${COLLECTION_NAME}` },
      {
        name: "description",
        content: `Complete the missions to join the ${COLLECTION_NAME} waitlist. Supply ${COLLECTION_SUPPLY.toLocaleString()}.`,
      },
    ],
  }),
});

function WaitlistRoute() {
  return <WaitlistShell />;
}
