import TopBar from "@/components/TopBar";
import HeroVideoLayer from "@/components/HeroVideoLayer";
import VideoShadowLayer from "@/components/VideoShadowLayer";
import Footer from "@/components/Footer";
import Special150Page from "@/components/special150/Special150Page";

export default function Special150Shell() {
  return (
    <>
      <HeroVideoLayer />
      <VideoShadowLayer />
      <div className="relative z-10 min-h-screen">
        <TopBar />
        <main>
          <Special150Page />
        </main>
        <Footer />
      </div>
    </>
  );
}
