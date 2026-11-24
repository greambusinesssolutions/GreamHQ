import BusinessCheck from "@/components/BusinessCheck";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import MobileBar from "@/components/MobileBar";
import Outcomes from "@/components/Outcomes";
import Packages from "@/components/Packages";
import SelfCheck from "@/components/SelfCheck";
import Solutions from "@/components/Solutions";

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
        <Outcomes />
        <HowWeWork />
        <Packages />
        <BusinessCheck />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
