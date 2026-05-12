"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Leaf, Map, ShieldCheck, Zap, Users, Gift, Info } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { ScrollReveal } from "./scroll-reveal"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://guyafibrebackend-production.up.railway.app'

const strengths = [
  { icon: Leaf, titleKey: "about.climate", descKey: "about.climateDesc", image: "/images/project-village.jpg" },
  { icon: Map, titleKey: "about.terrain", descKey: "about.terrainDesc", image: "/images/project-rural.jpg" },
  { icon: ShieldCheck, titleKey: "about.certified", descKey: "about.certifiedDesc", image: "/images/team-work.jpg" },
  { icon: Zap, titleKey: "about.reactive", descKey: "about.reactiveDesc", image: "/images/service-maintenance.jpg" },
  { icon: Users, titleKey: "about.global", descKey: "about.globalDesc", image: "/images/equipment.jpg" },
  { icon: Gift, titleKey: "about.freeQuote", descKey: "about.freeQuoteDesc", image: "/images/service-etudes.jpg" },
]

const STATIC_DEFAULTS: Record<string, string> = {
  "about.climate": "Expertise climatique",
  "about.climateDesc": "Maîtrise des contraintes tropicales : humidité, chaleur, UV et végétation dense.",
  "about.terrain": "Zones difficiles",
  "about.terrainDesc": "Interventions en forêt amazonienne, en pirogue sur les fleuves et sur sites isolés.",
  "about.certified": "Personnel certifié",
  "about.certifiedDesc": "Techniciens habilités, formés aux normes fibre optique et sécurité chantier.",
  "about.reactive": "Réactivité locale",
  "about.reactiveDesc": "Équipes basées en Guyane, mobilisables sans les délais d'une intervention métropole.",
  "about.global": "Approche globale",
  "about.globalDesc": "Un seul interlocuteur de l'étude jusqu'à la mise en service et au suivi.",
  "about.freeQuote": "Devis gratuit",
  "about.freeQuoteDesc": "Chaque projet est étudié individuellement, devis personnalisé sans engagement.",
  "about.badge": "Qui sommes-nous ?",
  "about.title": "Une entreprise guyanaise au cœur",
  "about.titleHighlight": "du terrain",
  "about.description1": "GUYA FIBRE est une entreprise guyanaise spécialisée dans la conception, le déploiement et la maintenance de réseaux fibre optique. Présents sur l'ensemble du territoire — zones urbaines, rurales et sites isolés de l'intérieur — nous accompagnons opérateurs, entreprises et collectivités de la phase d'étude jusqu'à la mise en service.",
  "about.description2": "Nos techniciens certifiés maîtrisent les contraintes uniques du terrain guyanais : climat tropical et forestier, chantiers en milieu difficile. Un seul interlocuteur, une exécution rigoureuse, un engagement fort sur les délais et la qualité.",
  "about.founderName": "Shivaro Alasa",
  "about.founderRole": "Dirigeant & Fondateur",
  "about.founderBio": "Passionné de réseaux et de terrain guyanais, Shivaro a fondé GUYA FIBRE en 2023 avec la mission de connecter chaque coin de la Guyane, des centres-villes aux villages les plus reculés.",
}

export function AboutSection() {
  const { t } = useLanguage()
  const [content, setContent] = useState<Record<string, string>>(STATIC_DEFAULTS)

  useEffect(() => {
    fetch(`${API_URL}/api/site-content/about`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          const raw = data.content ?? data
          const merged: Record<string, string> = { ...STATIC_DEFAULTS }
          for (const [k, v] of Object.entries(raw)) {
            if (typeof v === 'string') {
              merged[k.startsWith('about.') ? k : `about.${k}`] = v
            }
          }
          setContent(merged)
        }
      })
      .catch(() => {})
  }, [])

  const getText = (key: string) => {
    const translated = t(key)
    return translated === key ? (content[key] || key) : translated
  }

  return (
    <section id="apropos" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left — text content */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold text-primary mb-8 tracking-widest uppercase">
                <Info className="w-4 h-4" />
                <span>{getText("about.badge")}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance leading-tight">
                {getText("about.title")}{" "}
                <span className="text-primary">{getText("about.titleHighlight")}</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed mb-10">
                <p>{getText("about.description1")}</p>
                <p>{getText("about.description2")}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              {/* Founder card */}
              <div className="glass rounded-3xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-primary/10 shadow-xl shadow-primary/5 group">
                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-white font-black font-display text-2xl shrink-0 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                  {getText("about.founderName").split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-display text-xl font-bold text-foreground mb-1">{getText("about.founderName")}</h4>
                  <p className="text-primary font-bold text-sm mb-4 uppercase tracking-wider">{getText("about.founderRole")}</p>
                  <p className="text-muted-foreground text-sm italic leading-relaxed">
                    &ldquo;{getText("about.founderBio")}&rdquo;
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Strengths grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {strengths.map((s, i) => {
              const Icon = s.icon
              return (
                <ScrollReveal key={s.titleKey} delay={((i % 3) + 1) as 1 | 2 | 3 | 4}>
                  <div className="group h-full glass rounded-3xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 flex flex-col shadow-sm">
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={s.image}
                        alt={getText(s.titleKey)}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {getText(s.titleKey)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {getText(s.descKey)}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
</div>
        </div>
      </div>
    </section>
  )
}
