"use client"

import Link from "next/link"
import { ArrowRight, Phone, Rocket } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { ScrollReveal } from "./scroll-reveal"

export function CTABanner() {
  const { locale } = useLanguage()
  const labels = {
    fr: {
      title: "Prêt à connecter votre projet fibre",
      accent: "avec les meilleurs du terrain ?",
      subtitle: "GUYA FIBRE transforme les défis les plus complexes en solutions fiables et performantes. Déploiement complet, maintenance 24/7, expertise locale incomparable.",
      cta: "Demander une prise de contact",
      call: "Appeler directement",
    },
    en: {
      title: "Ready to connect your fiber project",
      accent: "with trusted local experts?",
      subtitle: "GUYA FIBRE turns complex constraints into reliable high-performance solutions across French Guiana.",
      cta: "Request a contact",
      call: "Call now",
    },
    // ... locales
  } as const
  const text = labels[locale as keyof typeof labels] || labels.fr

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide">
        <ScrollReveal>
          <div className="relative rounded-[3rem] overflow-hidden bg-slate-950 px-8 py-20 md:px-16 md:py-24 text-center border border-white/10 shadow-2xl">
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 opacity-40 mix-blend-overlay grayscale"
              style={{
                backgroundImage: "url('/images/hero-bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-brand-orange/20" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white mb-8 tracking-widest uppercase border border-white/20">
                <Rocket className="w-4 h-4 text-primary" />
                <span>Propulsez votre connectivité</span>
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 text-balance leading-tight">
                {text.title} <span className="text-primary">{text.accent}</span>
              </h2>
              
              <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto text-pretty">
                {text.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/20"
                >
                  {text.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+594694435484"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all hover:scale-105 border-white/20"
                >
                  <Phone className="w-5 h-5" />
                  {text.call}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            <Phone className="w-5 h-5" />
            {text.call}
          </a>
        </div>
      </div>
    </section>
  )
}