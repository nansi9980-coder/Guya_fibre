"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, ArrowRight, ChevronDown, Sparkles } from "lucide-react"
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
      className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-background"
      aria-label="Section d'accueil"
    >
      {/* Background with mesh gradient and subtle movement */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      
      {/* Visual elements */}
      <div className="absolute right-0 top-0 h-full w-full lg:w-1/2 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent lg:z-10" />
        <div 
          className="absolute inset-0 lg:scale-110 opacity-40 lg:opacity-100 grayscale hover:grayscale-0 transition-all duration-1000"
          style={{ 
            backgroundImage: "url('/images/hero-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'linear-gradient(to left, black 60%, transparent)',
            WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent)'
          }}
        />
        
        {/* Animated lines SVG */}
        <svg
          className="absolute right-0 top-0 h-full w-full opacity-20 pointer-events-none hidden lg:block z-20"
          viewBox="0 0 600 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d={`M${600 - i * 40} 0 Q${400 - i * 30} 400 ${500 - i * 35} 800`}
              stroke="var(--brand-cyan)"
              strokeWidth="0.5"
              fill="none"
              style={{ opacity: 1 - i * 0.08 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-30 container-wide px-4 md:px-8 lg:px-16 pt-32 pb-20">
        <div className="max-w-3xl">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs md:text-sm font-semibold text-primary mb-8 tracking-wide uppercase">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{content.badge}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-bold text-foreground leading-[1.1] mb-8 text-balance">
              {title.split(' ').map((word, i) => (
                <span key={i} className={word.toLowerCase() === 'fibre' || word.toLowerCase() === 'guyane' ? 'text-primary' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-2xl text-pretty border-l-2 border-primary/20 pl-6">
              {content.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={3}>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/devis"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 group"
              >
                {content.ctaPrimary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl glass text-foreground font-bold text-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1"
              >
                {content.ctaSecondary}
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={4} className="mt-16 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-muted overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="font-bold text-foreground">5000+ entreprises connectées</div>
              <div className="text-muted-foreground">Expertise locale reconnue</div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-4 text-xs font-medium text-muted-foreground/50 uppercase tracking-[0.2em] [writing-mode:vertical-lr] animate-float">
        scroll down <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
      </div>
    </section>
  )
}