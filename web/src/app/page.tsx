import Header from "@/components/Header";
import Hero from "@/components/hero/Hero";
import Gallery from "@/components/gallery/Gallery";
import AboutSection from "@/components/about/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0C10] text-white">
      <Header />
      <Hero />
      <Gallery />
      <AboutSection />
      <Footer />
    </div>
  );
}
