"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CTABanner } from "@/components/cta-banner"
import { useLanguage } from "@/lib/i18n/context"
import { AboutSection } from "@/components/about-section"
import { ProcessSection } from "@/components/process-section"
import { RealisationsSection } from "@/components/realisations-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"

export default function AProposPage() {
  const { t } = useLanguage()
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 md:pt-32 pb-6 bg-background">
          <div className="container-wide px-4 md:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5 border border-primary/20">
                {t("about.badge")}
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                {t("about.title")} <span className="text-primary">{t("about.titleHighlight")}</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                {t("about.description1")}
              </p>
            </div>
          </div>
        </section>

        <AboutSection />
        <ProcessSection />
        <RealisationsSection />
        <TestimonialsSection />
        <FAQSection />

        <CTABanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
