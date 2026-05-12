"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Leaf, Map, ShieldCheck, Zap, Users, Gift } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

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
          // Merge: backend keys may be flat (badge, title…) or prefixed (about.badge…)
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
    <section id="apropos" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — text */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5 border border-primary/20">
              {getText("about.badge")}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              {getText("about.title")}{" "}
              <span className="text-primary">{getText("about.titleHighlight")}</span>
            </h2>
            <p className="text-foreground/80 dark:text-slate-300 leading-relaxed mb-5 text-pretty">
              {getText("about.description1")}
            </p>
            <p className="text-foreground/80 dark:text-slate-300 leading-relaxed mb-8 text-pretty">
              {getText("about.description2")}
            </p>

            {/* Team image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video">
              <Image
                src="/images/team-work.jpg"
                alt="Équipe GUYA FIBRE"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">{t("about.teamOnField")}</p>
                <p className="text-white/70 text-xs">{t("about.teamOnFieldDesc")}</p>
              </div>
            </div>

            {/* Founder card */}
            <div className="bg-white/95 dark:bg-slate-950/95 rounded-xl p-5 flex items-start gap-4 border border-slate-200/70 dark:border-slate-800/70 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold font-display text-lg shrink-0">
                {getText("about.founderName").split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-foreground dark:text-white font-display text-base md:text-lg">{getText("about.founderName")}</div>
                <div className="text-sm text-foreground/70 dark:text-white/75 mb-2">{getText("about.founderRole")}</div>
                <p className="text-sm text-foreground/80 dark:text-white/70 leading-relaxed">
                  {getText("about.founderBio")}
                </p>
              </div>
            </div>
          </div>

          {/* Right — strengths with images */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strengths.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.titleKey}
                    className="group relative bg-white/95 dark:bg-slate-950/95 rounded-xl border border-slate-200/70 dark:border-slate-800/70 hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={s.image}
                        alt={getText(s.titleKey)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card dark:from-muted via-card/60 dark:via-muted/60 to-transparent" />
                      <div className="absolute top-3 left-3 w-10 h-10 rounded-lg bg-primary/90 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-foreground dark:text-white text-sm mb-1.5">
                        {getText(s.titleKey)}
                      </h3>
                      <p className="text-sm text-foreground/75 dark:text-slate-300 leading-relaxed">
                        {getText(s.descKey)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
