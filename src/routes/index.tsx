import { createFileRoute } from "@tanstack/react-router";
import WhitelistShell from "@/components/WhitelistShell";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <WhitelistShell />;
}
