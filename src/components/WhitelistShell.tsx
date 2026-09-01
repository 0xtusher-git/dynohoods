import TopBar from "@/components/TopBar";
import HeroVideoLayer from "@/components/HeroVideoLayer";
import VideoShadowLayer from "@/components/VideoShadowLayer";
import HeroVideo from "@/components/HeroVideo";
import CollectionCarousel from "@/components/CollectionCarousel";
import DetailsTeaser from "@/components/DetailsTeaser";
import Footer from "@/components/Footer";

export default function WhitelistShell() {
  return (
    <>
      <HeroVideoLayer />
      <VideoShadowLayer />
      <div className="relative z-10 min-h-screen">
        <TopBar />
        <main>
          <HeroVideo />
          <CollectionCarousel />
          <DetailsTeaser />
        </main>
        <Footer />
      </div>
    </>
  );
}
