"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, ArrowRight, ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

const DEFAULTS = {
  titleFr: 'La Fibre Optique pour la Guyane',
  titleEn: 'Fiber Optic for French Guiana',
  subtitle: 'Connectivité haut débit pour tous les foyers et entreprises',
  badge: 'Disponible en Guyane',
  ctaPrimary: 'Demander un devis',
  ctaSecondary: 'Nos services',
}

export function HeroSection() {
  const { locale, t } = useLanguage()
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Section d'accueil"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        role="img"
        aria-label="Technicien fibre optique en intervention en Guyane"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      <svg
        className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none hidden lg:block"
        viewBox="0 0 600 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d={`M${600 - i * 30} 0 Q${400 - i * 20} 400 ${500 - i * 25} 800`}
            stroke="oklch(0.65 0.13 180)"
            strokeWidth="1"
            fill="none"
            style={{ opacity: 1 - i * 0.06 }}
          />
        ))}
      </svg>

      <div className="relative z-10 container-wide px-4 md:px-8 lg:px-16 py-32 pt-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/80 mb-8 hover:bg-white/15 transition-colors duration-300">
            <MapPin className="w-4 h-4 text-primary animate-pulse" />
            <span>{content.badge}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl text-pretty">
            {content.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 group"
            >
              {content.ctaPrimary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold text-base border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              {content.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/40" />
      </div>
    </section>
  )
}