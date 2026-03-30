import { Header } from "../_components/Header";
import { HeroSection } from "../_components/HeroSection";
import { ExpertisesSection } from "../_components/ExpertisesSection";
import { RevealPotentialSection } from "../_components/RevealPotentialSection";
import { DataSymphonySection } from "../_components/DataSymphonySection";
import { KeyFiguresSection } from "../_components/KeyFiguresSection";
import { WorldMapSection } from "../_components/WorldMapSection";
import { ClientsSection } from "../_components/ClientsSection";
import { CTASection } from "../_components/CTASection";
import { Footer } from "../_components/Footer";

export default function S3SeismicPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ExpertisesSection />
        <RevealPotentialSection />
        <DataSymphonySection />
        <KeyFiguresSection />
        <WorldMapSection />
        <ClientsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
