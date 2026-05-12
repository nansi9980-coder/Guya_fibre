"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Compass, HardHat, Home, Zap, Server, CheckCircle2, ArrowRight, Layers } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { ScrollReveal } from "./scroll-reveal"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://guyafibrebackend-production.up.railway.app'

const ICON_MAP: Record<string, React.ElementType> = {
  Compass, HardHat, Home, Zap, Server,
}

interface ServiceContent {
  id: string
  slug: string
  number: string
  icon: string
  titleFr: string
  titleEn?: string
  descFr: string
  descEn?: string
  features: string[]
  image?: string
  benefit?: string
  isActive: boolean
  order: number
}

const FALLBACK_SERVICES: ServiceContent[] = [
  { id: "1", slug: "etudes", number: "01", icon: "Compass", titleFr: "Études & Conception", descFr: "Études de faisabilité FTTH / FTTO, conception et plans.", features: ["Études de faisabilité FTTH / FTTO", "Conception et plans APS / APD / DOE", "Cartographie SIG géoréférencée", "Dossiers réglementaires DT / DICT"], image: "/images/service-etudes.jpg", benefit: "Conception optimisée", isActive: true, order: 1 },
  { id: "2", slug: "deploiement", number: "02", icon: "HardHat", titleFr: "Déploiement", descFr: "Génie civil, réseaux aériens, tirage de fibre.", features: ["Génie civil : tranchées, fourreaux, chambres", "Réseaux aériens sur poteaux", "Tirage de fibre et soudure par fusion", "Installation PBO / BPE / PM"], image: "/images/service-deploiement.jpg", benefit: "Infrastructure durable", isActive: true, order: 2 },
  { id: "3", slug: "raccordement", number: "03", icon: "Home", titleFr: "Raccordement", descFr: "FTTH particuliers et FTTO entreprises.", features: ["FTTH particuliers : PTO, ONT, mise en service", "FTTO entreprises : fibre dédiée", "Tests et mesures OTDR", "Validation finale et bon de recette"], image: "/images/service-raccordement.jpg", benefit: "Mise en service rapide", isActive: true, order: 3 },
  { id: "4", slug: "maintenance", number: "04", icon: "Zap", titleFr: "Maintenance", descFr: "Inspections périodiques et interventions d'urgence.", features: ["Inspections périodiques et contrôles OTDR", "Localisation de pannes par réflectométrie", "Diagnostic des équipements actifs", "Interventions d'urgence 7j/7"], image: "/images/service-maintenance.jpg", benefit: "Disponibilité garantie", isActive: true, order: 4 },
  { id: "5", slug: "entreprises", number: "05", icon: "Server", titleFr: "Solutions Entreprises", descFr: "Réseaux d'infrastructure et smart city.", features: ["Réseaux d'infrastructure interne", "Smart city et projets territoriaux", "Infrastructures publiques", "Accompagnement sur mesure"], image: "/images/service-entreprises.jpg", benefit: "Sur mesure", isActive: true, order: 5 },
]

export function ServicesSection() {
  const { t, locale } = useLanguage()
  const [services, setServices] = useState<ServiceContent[]>(FALLBACK_SERVICES)

  useEffect(() => {
    fetch(`${API_URL}/api/services-content`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data.filter((s: ServiceContent) => s.isActive).sort((a: ServiceContent, b: ServiceContent) => a.order - b.order))
        }
      })
      .catch(() => {})
  }, [])

  const ctaTitleByLocale: Record<string, string> = {
    fr: "Un projet fibre en Guyane ?",
    en: "A fiber project in French Guiana?",
    es: "¿Un proyecto de fibra en Guayana?",
    pt: "Um projeto de fibra na Guiana?",
    nl: "Een glasvezelproject in Guyana?",
    gcr: "On projé fib an Lagwiyàn?",
    ar: "هل لديك مشروع ألياف في غويانا؟",
    zh: "在法属圭亚那有光纤项目吗？",
  }
  const ctaTitle = ctaTitleByLocale[locale] || ctaTitleByLocale.fr

  return (
    <section id="services" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold text-primary mb-6 tracking-widest uppercase">
              <Layers className="w-4 h-4" />
              <span>{t("nav.services")}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              {t("services.title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed text-pretty max-w-2xl">
              {t("services.subtitle")}
            </p>
          </ScrollReveal>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Server
            const title = (locale === 'en' && service.titleEn) ? service.titleEn : service.titleFr
            const desc = (locale === 'en' && service.descEn) ? service.descEn : service.descFr
            const SLUG_IMAGE_MAP: Record<string, string> = {
              'ftth': '/images/service-deploiement.jpg',
              'etudes-techniques': '/images/service-etudes.jpg',
              'raccordement': '/images/service-raccordement.jpg',
              'maintenance': '/images/service-maintenance.jpg',
              'entreprises': '/images/service-entreprises.jpg',
              'deploiement': '/images/service-deploiement.jpg',
              'etudes': '/images/service-etudes.jpg',
            }
            const imgSrc = service.image?.startsWith('http')
              ? service.image
              : service.image || SLUG_IMAGE_MAP[service.slug] || `/images/service-deploiement.jpg`

            return (
              <ScrollReveal key={service.id} delay={((i % 3) + 1) as 1 | 2 | 3 | 4}>
                <article
                  id={service.slug}
                  className="group h-full bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 flex flex-col shadow-sm hover:shadow-2xl hover:shadow-primary/5"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90" />
                    
                    <div className="absolute top-6 left-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform duration-500">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-6 left-6">
                      <span className="text-4xl font-display font-black text-foreground/10 uppercase tracking-tighter group-hover:text-primary/20 transition-colors">
                        {service.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-8 flex-1">{desc}</p>

                    <div className="space-y-3 mb-10">
                      {(service.features || []).map((f) => (
                        <div key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                          <CheckCircle2 className="w-5 h-5 text-primary/60 shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      {service.benefit && (
                        <span className="text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                          {service.benefit}
                        </span>
                      )}
                      <Link
                        href="/devis"
                        className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-all group/btn"
                      >
                        {t("nav.quote")} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            )
          })}

          {/* CTA card */}
          <ScrollReveal delay={3}>
            <div className="h-full bg-gradient-brand rounded-3xl p-10 flex flex-col items-start justify-center text-white relative overflow-hidden group shadow-xl shadow-primary/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
              
              <h3 className="font-display text-3xl font-bold mb-4 text-balance leading-tight relative z-10">
                {ctaTitle}
              </h3>
              <p className="text-white/80 leading-relaxed mb-10 relative z-10">
                {t("contact.subtitle")}
              </p>
              
              <div className="flex flex-col gap-4 w-full relative z-10">
                <Link
                  href="/devis"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
                >
                  {t("nav.quote")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
                >
                  {t("common.learnMore")}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}