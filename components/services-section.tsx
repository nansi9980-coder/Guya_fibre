"use client"

import { useEffect, useState } from "react"
import { Compass, HardHat, Home, Zap, Server, ArrowRight } from "lucide-react"
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

  const labels = {
    fr: { badge: "Notre Expertise", title: "Des solutions réseau", titleHighlight: "sur mesure", subtitle: "Nous accompagnons les acteurs publics et privés dans la transformation numérique de la Guyane." },
    en: { badge: "Our Expertise", title: "Tailored network", titleHighlight: "solutions", subtitle: "We support public and private actors in the digital transformation of French Guiana." },
  }
  const text = labels[locale as keyof typeof labels] || labels.fr

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Server
            const title = (locale === 'en' && service.titleEn) ? service.titleEn : service.titleFr
            const desc = (locale === 'en' && service.descEn) ? service.descEn : service.descFr

            return (
              <ScrollReveal key={service.id} delay={((i % 3) + 1) as any}>
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
                    En savoir plus
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}