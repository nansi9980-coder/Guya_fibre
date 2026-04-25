"use client"

import { useEffect, useState } from "react"
import { Quote, Star } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

interface Testimonial {
  initials: string
  name: string
  role: string
  company: string
  rating: number
  quote: string
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    initials: "MJ",
    name: "Marie-Josèphe L.",
    role: "Directrice d'école",
    company: "Maripasoula",
    rating: 5,
    quote: "L'équipe GUYA FIBRE a fait l'impossible : connecter notre école isolée accessible uniquement par pirogue. Travail impeccable, délais tenus, et surtout une équipe qui comprend nos défis uniques. Nos 80 élèves ont maintenant internet fiable pour étudier.",
  },
  {
    initials: "KR",
    name: "Kévin R.",
    role: "Directeur Technique",
    company: "PME Kourou",
    rating: 5,
    quote: "FTTO ultra-stable depuis 2 ans. Liaison dédiée 10 Gbps, 99.9% uptime garanti. Réactivité exceptionnelle : problème résolu en 2h. Meilleur choix comparé aux prestataires métropole. Prix agressif, service irréprochable.",
  },
  {
    initials: "CT",
    name: "Collectivité Territoriale",
    role: "Commune de Mana",
    company: "Guyane française",
    rating: 5,
    quote: "Partenaire stratégique sur projet infrastructure municipale 45 km. Budget maîtrisé, documentation technique parfaite, suivi post-installation exemplaire. GUYA FIBRE a dépassé attentes. Prêt pour une phase 2.",
  },
]

export function TestimonialsSection() {
  const { locale } = useLanguage()
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS)

  useEffect(() => {
    fetch(`${API_URL}/api/site-content/testimonials`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        const list = Array.isArray(data?.content) ? data.content : null
        if (list && list.length > 0) {
          setTestimonials(list)
        }
      })
      .catch(() => {})
  }, [])

  const labels = {
    fr: { badge: "Avis clients", title: "Ce que disent nos clients", subtitle: "Des particuliers, entreprises et collectivités de toute la Guyane nous font confiance." },
    en: { badge: "Client reviews", title: "What our clients say", subtitle: "Individuals, businesses and public entities across French Guiana trust us." },
    es: { badge: "Opiniones", title: "Lo que dicen nuestros clientes", subtitle: "Particulares, empresas y entidades públicas confían en nosotros." },
    pt: { badge: "Depoimentos", title: "O que dizem nossos clientes", subtitle: "Particulares, empresas e coletividades confiam em nós em toda a Guiana." },
    nl: { badge: "Klantbeoordelingen", title: "Wat onze klanten zeggen", subtitle: "Particulieren, bedrijven en overheden in heel Frans-Guyana vertrouwen op ons." },
    gcr: { badge: "Avis klyan", title: "Sa klyan nou ka di", subtitle: "Patikilyé, biznis épi kolektivité ka fè konfyans an nou toutpatou an Lagwiyàn." },
    ar: { badge: "آراء العملاء", title: "ماذا يقول عملاؤنا", subtitle: "أفراد وشركات وجهات عامة في كل غويانا يثقون بخدماتنا." },
    zh: { badge: "客户评价", title: "客户怎么说", subtitle: "法属圭亚那各地的个人、企业与公共机构都在信赖我们。" },
  } as const

  const text = labels[locale as keyof typeof labels] || labels.fr

  const starsLabel =
    locale === "en" ? "stars out of 5" :
    locale === "es" ? "estrellas de 5" :
    locale === "pt" ? "estrelas de 5" :
    locale === "nl" ? "sterren op 5" :
    locale === "gcr" ? "zetwal asi 5" :
    locale === "ar" ? "نجوم من 5" :
    locale === "zh" ? "星（满分5）" :
    "étoiles sur 5"

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5 border border-primary/20">
            {text.badge}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {text.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            {text.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <figure
              key={`${t.name}-${idx}`}
              className="bg-card rounded-2xl border border-border p-7 flex flex-col gap-5 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-primary/5 transition-all duration-200"
            >
              <Quote className="w-8 h-8 text-primary/40" aria-hidden="true" />

              <blockquote className="text-sm text-foreground/80 leading-relaxed flex-1 text-pretty">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold font-display text-sm shrink-0">
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role}{t.company ? ` — ${t.company}` : ""}
                  </div>
                </div>
                <div className="flex gap-0.5" role="img" aria-label={`${t.rating} ${starsLabel}`}>
                  {Array.from({ length: Math.min(5, Math.max(1, t.rating)) }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}