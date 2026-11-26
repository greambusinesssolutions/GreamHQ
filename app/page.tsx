import BusinessCheck from "@/components/BusinessCheck";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import MobileBar from "@/components/MobileBar";
import Packages from "@/components/Packages";
import SelfCheck from "@/components/SelfCheck";
import Solutions from "@/components/Solutions";

// One story, one offer: problem → what we build → how → where to start → objections → book the check.
export default function Home() {
  return (
    <div className="g motion">
      <a className="skip" href="#top">
        Skip to content
      </a>
      <Header />
      <main id="top">
        <Hero />
        <SelfCheck />
        <Solutions />
        <HowWeWork />
        <Packages />
        <Faq />
        <BusinessCheck />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
