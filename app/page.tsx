import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { ServicesSection } from "@/components/services-section"
import { ArchitectureSection } from "@/components/architecture-section"
import { ProcessSection } from "@/components/process-section"
import { FTTESection } from "@/components/ftte-section"
import { ExpertiseImmeubleSection } from "@/components/expertise-immeuble-section"
import { CoverageSection } from "@/components/coverage-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <ArchitectureSection />
        <ProcessSection />
        <FTTESection />
        <ExpertiseImmeubleSection />
        <CoverageSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
