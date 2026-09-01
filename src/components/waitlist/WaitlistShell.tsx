import TopBar from "@/components/TopBar";
import VideoShadowLayer from "@/components/VideoShadowLayer";
import Footer from "@/components/Footer";
import WaitlistPage from "@/components/waitlist/WaitlistPage";
import { useCaptcha } from "@/components/captcha/CaptchaProvider";

export default function WaitlistShell() {
  const { ready, verified } = useCaptcha();
  const showWaitlist = ready && verified;

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-background"
      >
        <img
          src="/hero-poster.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <VideoShadowLayer />
      <div
        id="top"
        className="relative z-10 min-h-screen bg-gradient-to-b from-transparent via-background/80 to-background"
      >
        <TopBar />
        <main>
          {showWaitlist ? (
            <WaitlistPage />
          ) : (
            <div className="min-h-[70vh]" aria-hidden />
          )}
        </main>
        {showWaitlist && <Footer />}
      </div>
    </>
  );
}
