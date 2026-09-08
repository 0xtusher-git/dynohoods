import { createFileRoute } from "@tanstack/react-router";
import Special150Shell from "@/components/special150/Special150Shell";
import { COLLECTION_NAME } from "@/lib/waitlist";

export const Route = createFileRoute("/special-150")({
  component: Special150Route,
  head: () => ({
    meta: [
      { title: `Special 150 — ${COLLECTION_NAME}` },
      {
        name: "description",
        content: `150 honorary ${COLLECTION_NAME} NFTs reserved for CT members. Check your eligibility.`,
      },
    ],
  }),
});

function Special150Route() {
  return <Special150Shell />;
}
