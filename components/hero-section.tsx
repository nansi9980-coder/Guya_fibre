"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { ScrollReveal } from "./scroll-reveal"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://guya-fibre-backend.onrender.com'

const DEFAULTS = {
  titleFr: 'La Fibre Optique pour la Guyane',
  titleEn: 'Fiber Optic for French Guiana',
  subtitle: 'Connectivité haut débit pour tous les foyers et entreprises',
  badge: 'Disponible en Guyane',
  ctaPrimary: 'Demander un devis',
  ctaSecondary: 'Nos services',
}

export function HeroSection() {
  const { locale } = useLanguage()
  const [content, setContent] = useState(DEFAULTS)

  useEffect(() => {
    fetch(`${API_URL}/api/site-content/hero`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) setContent({ ...DEFAULTS, ...(data.content ?? data) })
      })
      .catch(() => {})
  }, [])

  const title = locale === 'en' ? (content.titleEn || content.titleFr) : content.titleFr

  return (
    <section
      className="relative min-h-[95vh] lg:min-h-screen overflow-hidden"
      aria-label="Section d'accueil"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/30 to-transparent" />
        <div className="absolute left-0 top-0 h-full w-full lg:w-1/2 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_40%)] pointer-events-none" />
      </div>

      <div className="relative z-20 container-wide mx-auto px-4 md:px-8 lg:px-16 pt-28 pb-24 min-h-screen flex items-center">
        <div className="w-full lg:w-6/12 lg:ml-auto">
          <div className="max-w-xl text-white">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-slate-100 mb-8">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span>{content.badge}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h1 className="font-display text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[0.95] tracking-tight mb-8">
                {title.split(' ').map((word, i) => (
                  <span key={i} className={word.toLowerCase() === 'fibre' || word.toLowerCase() === 'guyane' ? 'text-primary' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-12">
                {content.subtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/devis"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-2xl shadow-primary/30 hover:-translate-y-0.5"
                >
                  {content.ctaPrimary}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl border border-white/20 bg-white/10 text-white font-bold text-lg hover:bg-white/15 transition-all duration-300"
                >
                  {content.ctaSecondary}
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={4}>
              <div className="mt-16 flex flex-col sm:flex-row items-center gap-6 text-sm text-slate-300">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-white/10 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-semibold text-white">5000+ entreprises connectées</div>
                  <div className="text-slate-300">Expertise locale reconnue</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}