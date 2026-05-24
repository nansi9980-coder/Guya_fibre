"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, ArrowRight, Camera } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { CmsImage } from "@/components/cms-image"
import { ScrollReveal } from "./scroll-reveal"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://guya-fibre-backend.onrender.com'

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
  { id: "1", slug: "ftth-cayenne", titleFr: "Déploiement FTTH — Expansion Cayenne Centre", location: "Cayenne", scope: "1 200 prises résidentielles", tags: ["FTTH", "Génie civil"], images: ["/images/project-cayenne.jpg"], isActive: true, isFeatured: true, order: 1 },
  { id: "2", slug: "lycee-melkior", titleFr: "Infrastructure Éducation — Lycée Melkior-Garré", location: "Cayenne", scope: "Réseaux inter-bâtiments 1Gbps", tags: ["FTTO", "Éducation"], images: ["/images/project-lycee.jpg"], isActive: true, isFeatured: true, order: 2 },
  { id: "3", slug: "communes-ouest", titleFr: "Aménagement Rural — Communes Ouest", location: "Saint-Laurent-du-Maroni", scope: "45 km fibre aérien", tags: ["Aérien", "Zone rurale"], images: ["/images/project-rural.jpg"], isActive: true, isFeatured: true, order: 3 },
]

export function RealisationsSection() {
  const { locale, t } = useLanguage()
  const [projects, setProjects] = useState<Realisation[]>(FALLBACK_PROJECTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/api/realisations?isActive=true&limit=6`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        const list = Array.isArray(data) ? data : data?.data
        if (Array.isArray(list) && list.length > 0) {
          setProjects(list.filter((p: Realisation) => p.isActive))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const labels = {
    fr: { badge: "Nos réalisations", title: "Projets concrets &", titleHighlight: "impact local", subtitle: "De Cayenne aux communes de l'intérieur, découvrez nos interventions sur l'ensemble du territoire guyanais.", cta: "Voir tous les projets" },
    en: { badge: "Our projects", title: "Real projects &", titleHighlight: "local impact", subtitle: "From Cayenne to inland towns, discover our deployments across the entire Guianese territory.", cta: "See all projects" },
  }
  const text = labels[locale as keyof typeof labels] || labels.fr

  return (
    <section id="realisations" className="section-padding bg-background relative overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold text-primary mb-8 tracking-widest uppercase">
                <Camera className="w-4 h-4" />
                <span>{text.badge}</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance leading-tight">
                {text.title} <span className="text-primary">{text.titleHighlight}</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                {text.subtitle}
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={3}>
            <Link
              href="/projets"
              className="group flex items-center gap-3 text-foreground font-bold hover:text-primary transition-colors py-2 border-b-2 border-primary/20 hover:border-primary"
            >
              {text.cta} 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => {
            const title = (locale === 'en' && project.titleEn) ? project.titleEn : project.titleFr
            return (
              <ScrollReveal key={project.id} delay={((i % 3) + 1) as 1 | 2 | 3 | 4}>
                <article className="group h-full flex flex-col glass rounded-[2.5rem] overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5">
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden">
                    <CmsImage
                      src={project.images?.[0]}
                      fallback="/placeholder.svg"
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Tags */}
                    <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                      {(project.tags || []).slice(0, 2).map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    
                    <h3 className="font-display text-xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 line-clamp-2">
                      {project.scope}
                    </p>

                    <Link 
                      href={`/projets/${project.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-foreground hover:text-primary transition-colors group/link"
                    >
                      Détails du projet
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}