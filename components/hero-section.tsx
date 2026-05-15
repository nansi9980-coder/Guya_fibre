"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, ArrowRight, ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { ScrollReveal } from "./scroll-reveal"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://guya-fibre-backend.onrender.com'

const DEFAULTS = {
  titleFr: 'Connecter la Guyane, du cœur urbain aux villages isolés',
  titleEn: 'Connecting French Guiana, from urban hearts to isolated villages',
  subtitle: 'De Cayenne aux profondeurs amazoniennes — GUYA FIBRE déploie les réseaux fibre optique les plus performants et fiables du territoire guyanais. Zones urbaines, rurales, fluviales, forestières : aucune barrière géographique ne nous arrête.',
  badge: 'En Guyane française — Experts depuis plusieurs années',
  ctaPrimary: 'Demander une prise de contact',
  ctaSecondary: 'Découvrir nos services',
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
      className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-background"
      aria-label="Section d'accueil"
    >
      {/* Full-width background image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-slate-950/60" />

        {/* Animated lines SVG - now spans full width */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none hidden lg:block z-20"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={i}
              d={`M${i * 60 + 800} 0 Q${i * 50 + 1000} 450 ${i * 55 + 900} 900`}
              stroke="var(--brand-cyan)"
              strokeWidth="0.6"
              fill="none"
              style={{ opacity: 1 - i * 0.07 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-30 container-wide w-full px-4 md:px-8 lg:px-16 pt-32 pb-20">
        <div className="w-full max-w-4xl">
          {/* Badge centered above title */}
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-xs md:text-sm font-medium text-white/90 mb-8 backdrop-blur-md bg-white/5 border border-white/10">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true">🇬🇫</span>
                <span>{content.badge}</span>
              </span>
            </div>
          </ScrollReveal>

          {/* Main title - left aligned, no word coloring */}
          <ScrollReveal delay={1}>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 text-balance">
              {title}
            </h1>
          </ScrollReveal>

          {/* Subtitle - no left border */}
          <ScrollReveal delay={2}>
            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-2xl text-pretty">
              {content.subtitle}
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal delay={3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all duration-300 shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 group"
              >
                {content.ctaPrimary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-base hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                {content.ctaSecondary}
              </Link>
            </div>
          </ScrollReveal>

          {/* Stats row - simple dots, no avatars */}
          <ScrollReveal delay={4}>
            <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>150+ projets réalisés</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>98% taux de satisfaction</span>
              </div>
              <Link href="/a-propos" className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>En savoir plus</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll down indicator - centered at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/60" />
      </div>
    </section>
  )
}