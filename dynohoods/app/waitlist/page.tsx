import type { Metadata } from "next";
import { COLLECTION_NAME, COLLECTION_SUPPLY } from "@/lib/waitlist";
import WaitlistShell from "@/components/waitlist/WaitlistShell";

export const metadata: Metadata = {
  title: `Join the Waitlist — ${COLLECTION_NAME}`,
  description: `Complete the missions to join the ${COLLECTION_NAME} waitlist. Supply ${COLLECTION_SUPPLY.toLocaleString()}.`,
};

export default function WaitlistRoute() {
  return <WaitlistShell />;
}
