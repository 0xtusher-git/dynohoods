"use client";

import TopBar from "@/components/TopBar";
import HeroVideoLayer from "@/components/HeroVideoLayer";
import VideoShadowLayer from "@/components/VideoShadowLayer";
import Footer from "@/components/Footer";
import WhitelistModal, {
  WhitelistProvider,
} from "@/components/WhitelistModal";
import WaitlistPage from "@/components/waitlist/WaitlistPage";

/**
 * Same chrome as the homepage shell — existing TopBar / Footer / video
 * background — wrapping only the new waitlist route.
 */
export default function WaitlistShell() {
  return (
    <WhitelistProvider>
      <HeroVideoLayer />
      <VideoShadowLayer />
      <div id="top" className="relative z-10 min-h-screen">
        <TopBar />
        <main>
          <WaitlistPage />
        </main>
        <Footer />
      </div>
      <WhitelistModal />
    </WhitelistProvider>
  );
}
