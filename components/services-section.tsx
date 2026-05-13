"use client"

import { useEffect, useRef, useState } from "react"
import { Compass, HardHat, Home, Zap, Server, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { ScrollReveal } from "./scroll-reveal"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://guya-fibre-backend.onrender.com'

const ICON_MAP: Record<string, any> = {
  Compass, HardHat, Home, Zap, Server,
  Wifi: Zap, Wrench: HardHat, PenTool: Compass
}

interface Service {
  id: string
  number: string
  icon: string
  titleFr: string
  titleEn?: string
  descFr: string
  descEn?: string
  features: string[]
  benefit?: string
  isActive: boolean
  order: number
}

const FALLBACK_SERVICES: Service[] = [
  { id: "1", number: "01", icon: "Compass", titleFr: "Études & Conception", descFr: "Études de faisabilité FTTH / FTTO, conception et plans.", features: ["Plans APS / APD", "Dossiers DT/DICT"], isActive: true, order: 1 },
  { id: "2", number: "02", icon: "HardHat", titleFr: "Déploiement", descFr: "Génie civil, réseaux aériens, tirage de fibre.", features: ["Génie civil", "Tirage & Soudure"], isActive: true, order: 2 },
  { id: "3", number: "03", icon: "Home", titleFr: "Raccordement", descFr: "FTTH particuliers et FTTO entreprises.", features: ["Installation PTO", "Tests OTDR"], isActive: true, order: 3 },
]

export function ServicesSection() {
  const { locale } = useLanguage()
  const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES)

  // Carrousel : index du premier élément visible
  const [currentIndex, setCurrentIndex] = useState(0)
  // Nombre de cartes visibles selon la largeur (sm=1, md=2, lg=3)
  const [visibleCount, setVisibleCount] = useState(3)
  const trackRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/api/services-content?isActive=true`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        const list = Array.isArray(data) ? data : data?.data
        if (Array.isArray(list) && list.length > 0) {
          setServices(list.sort((a: Service, b: Service) => a.order - b.order))
        }
      })
      .catch(() => {})
  }, [])

  // Détecter la largeur d'écran pour savoir combien de cartes sont visibles
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3)
      else if (window.innerWidth >= 768) setVisibleCount(2)
      else setVisibleCount(1)
    }
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  // Quand la taille d'écran change, s'assurer qu'on ne dépasse pas la fin
  useEffect(() => {
    const maxIndex = Math.max(0, services.length - visibleCount)
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex)
  }, [visibleCount, services.length, currentIndex])

  const maxIndex = Math.max(0, services.length - visibleCount)
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < maxIndex
  // Nombre de "pages" de pagination
  const pageCount = maxIndex + 1

  const goPrev = () => { if (canGoPrev) setCurrentIndex(currentIndex - 1) }
  const goNext = () => { if (canGoNext) setCurrentIndex(currentIndex + 1) }
  const goTo = (index: number) => setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))

  // Swipe tactile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchEndX.current = null
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const delta = touchStartX.current - touchEndX.current
    const threshold = 50
    if (delta > threshold) goNext()
    else if (delta < -threshold) goPrev()
    touchStartX.current = null
    touchEndX.current = null
  }

  const labels = {
    fr: { badge: "Notre Expertise", title: "Des solutions réseau", titleHighlight: "sur mesure", subtitle: "Nous accompagnons les acteurs publics et privés dans la transformation numérique de la Guyane.", prev: "Précédent", next: "Suivant", learnMore: "En savoir plus" },
    en: { badge: "Our Expertise", title: "Tailored network", titleHighlight: "solutions", subtitle: "We support public and private actors in the digital transformation of French Guiana.", prev: "Previous", next: "Next", learnMore: "Learn more" },
  }
  const text = labels[locale as keyof typeof labels] || labels.fr

  // Largeur d'une "carte + gap" en pourcentage du conteneur
  const cardWidthPercent = 100 / visibleCount
  const translateX = -currentIndex * cardWidthPercent

  return (
    <section id="services" className="section-padding bg-background/50 relative overflow-hidden">
      <div className="container-wide">
        <div className="max-w-3xl mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center px-4 py-2 glass rounded-full text-xs font-bold text-primary mb-6 uppercase tracking-widest">
              {text.badge}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {text.title} <span className="text-primary">{text.titleHighlight}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              {text.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Carrousel */}
        <div className="relative">
          {/* Flèche gauche — visible seulement s'il y a un précédent */}
          {pageCount > 1 && (
            <button
              type="button"
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label={text.prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-card disabled:hover:text-foreground disabled:hover:border-border"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Track : conteneur des cartes qui se translate */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {services.map((service) => {
                const Icon = ICON_MAP[service.icon] || Server
                const title = (locale === 'en' && service.titleEn) ? service.titleEn : service.titleFr
                const desc = (locale === 'en' && service.descEn) ? service.descEn : service.descFr

                return (
                  <div
                    key={service.id}
                    className="shrink-0 px-3"
                    style={{ width: `${cardWidthPercent}%` }}
                  >
                    <div className="group h-full p-8 glass rounded-[2.5rem] border border-border hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                      <div className="flex items-start justify-between mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <Icon className="w-8 h-8" />
                        </div>
                        <span className="text-4xl font-display font-black text-foreground/5">{service.number}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-8 flex-1">{desc}</p>

                      <ul className="space-y-3 mb-8">
                        {service.features.slice(0, 3).map((f, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group/btn">
                        {text.learnMore}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Flèche droite */}
          {pageCount > 1 && (
            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              aria-label={text.next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-card disabled:hover:text-foreground disabled:hover:border-border"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dots de pagination — visibles uniquement si plus d'une page */}
        {pageCount > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2.5">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Page ${i + 1}`}
                aria-current={i === currentIndex}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}