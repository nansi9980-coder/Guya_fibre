"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { resolveMediaUrl } from "@/lib/utils/media"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

interface Realisation {
  id: string
  slug: string
  titleFr: string
  titleEn?: string
  location: string
  scope: string
  tags: string[]
  images: string[]
  isActive: boolean
  isFeatured: boolean
  order: number
}

const FALLBACK_PROJECTS: Realisation[] = [
  { id: "1", slug: "ftth-cayenne", titleFr: "Déploiement FTTH — Expansion Cayenne Centre", location: "Cayenne", scope: "1 200 prises résidentielles", tags: ["FTTH", "Génie civil", "Soudure fusion"], images: ["/images/project-cayenne.jpg"], isActive: true, isFeatured: true, order: 1 },
  { id: "2", slug: "lycee-melkior", titleFr: "Infrastructure Éducation — Lycée Melkior-Garré", location: "Cayenne", scope: "Réseaux inter-bâtiments 1Gbps", tags: ["FTTO", "Éducation", "Haute performance"], images: ["/images/project-lycee.jpg"], isActive: true, isFeatured: true, order: 2 },
  { id: "3", slug: "communes-ouest", titleFr: "Aménagement Rural — Communes Ouest", location: "Saint-Laurent-du-Maroni", scope: "45 km fibre aérien multi-zones", tags: ["Aérien", "Zone rurale", "Logistique"], images: ["/images/project-rural.jpg"], isActive: true, isFeatured: true, order: 3 },
  { id: "4", slug: "port-degrad", titleFr: "Liaison Entreprise Dédiée — Port Dégrad", location: "Rémire-Montjoly", scope: "Fibre dédiée 10 Gbps SLA 99.9%", tags: ["FTTO", "Entreprise", "Critique"], images: ["/images/project-port.jpg"], isActive: true, isFeatured: false, order: 4 },
  { id: "5", slug: "maintenance-operateur", titleFr: "Contrat Support National — Opérateur Télécom", location: "Toute la Guyane", scope: "Maintenance préventive + astreinte 24/7", tags: ["Maintenance", "Support", "Nationwide"], images: ["/images/project-maintenance.jpg"], isActive: true, isFeatured: false, order: 5 },
  { id: "6", slug: "village-aps", titleFr: "Connectivité Isolée — Villages Intérieur", location: "Intérieur amazonien", scope: "Desserte fibre site isolé (pirogue)", tags: ["Zone isolée", "Pirogue", "FTTH"], images: ["/images/project-village.jpg"], isActive: true, isFeatured: false, order: 6 },
]

export function RealisationsSection() {
  const { locale } = useLanguage()
  const [projects, setProjects] = useState<Realisation[]>(FALLBACK_PROJECTS)

  useEffect(() => {
    // Skip local fetch in production
    if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') && API_URL.includes('localhost')) {
      return
    }
    fetch(`${API_URL}/api/realisations?limit=6`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        const list = Array.isArray(data) ? data : data?.data
        if (Array.isArray(list) && list.length > 0) {
          setProjects(list.filter((p: Realisation) => p.isActive))
        }
      })
      .catch(() => {})
  }, [])

  const labels: Record<string, { badge: string; title: string; subtitle: string; cta: string }> = {
    fr: { badge: "Nos réalisations", title: "Des projets concrets sur tout le territoire", subtitle: "De Cayenne aux communes de l'intérieur, nos équipes interviennent partout où la fibre est nécessaire.", cta: "Voir tous les projets" },
    en: { badge: "Our projects", title: "Real projects across the territory", subtitle: "From Cayenne to inland towns, our teams deploy fiber wherever needed.", cta: "See all projects" },
    es: { badge: "Nuestros proyectos", title: "Proyectos concretos en todo el territorio", subtitle: "De Cayena a las comunas del interior, intervenimos donde la fibra es necesaria.", cta: "Ver todos los proyectos" },
    pt: { badge: "Nossos projetos", title: "Projetos concretos em todo o território", subtitle: "De Caiena ao interior, nossas equipes atuam onde a fibra é necessária.", cta: "Ver todos os projetos" },
    nl: { badge: "Onze projecten", title: "Concrete projecten in het hele gebied", subtitle: "Van Cayenne tot het binnenland werken onze teams overal waar glasvezel nodig is.", cta: "Alle projecten bekijken" },
    gcr: { badge: "Travay nou", title: "Projé konkré toutpatou", subtitle: "Soti Kayèn jis andidan péyi-a, lékip nou ka entèvni patou fib-la ni bézwen.", cta: "Wè tout projé" },
    ar: { badge: "إنجازاتنا", title: "مشاريع واقعية في كامل الإقليم", subtitle: "من كايين إلى المناطق الداخلية، نتدخل أينما كانت الألياف مطلوبة.", cta: "عرض جميع المشاريع" },
    zh: { badge: "我们的案例", title: "覆盖全境的真实项目", subtitle: "从卡宴到内陆地区，我们在所有需要光纤的地方实施交付。", cta: "查看全部项目" },
  }
  const text = labels[locale] || labels.fr

  return (
    <section id="realisations" className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5 border border-primary/20">
              {text.badge}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
              {text.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              {text.subtitle}
            </p>
          </div>
          <Link
            href="/projets"
            className="flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all shrink-0"
          >
            {text.cta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => {
            const title = (locale === 'en' && project.titleEn) ? project.titleEn : project.titleFr
            const imgSrc = resolveMediaUrl(project.images?.[0], "/images/project-cayenne.jpg")
            return (
              <article
                key={project.id}
                className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display font-semibold text-foreground text-base mb-2 leading-snug">{title}</h3>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {project.location} — {project.scope}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {(project.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}