"use client"

import { useState } from "react"
import {
  Box,
  Cable,
  Building2,
  Home,
  ChevronRight,
  Network,
} from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { useLanguage } from "@/lib/i18n/context"

const NODES = [
  {
    id: "PM",
    icon: Box,
    titleFr: "PM",
    subtitleFr: "Armoire de rue",
    descFr:
      "Point de mutualisation en voirie. Concentration des fibres de distribution vers les abonnés du secteur.",
  },
  {
    id: "D1",
    icon: Cable,
    titleFr: "D1",
    subtitleFr: "Backbone réseau",
    descFr:
      "Tronçon principal du réseau de distribution. Assure le transport de capacité entre les zones de regroupement.",
  },
  {
    id: "D2",
    icon: Cable,
    titleFr: "D2",
    subtitleFr: "Ramification locale",
    descFr:
      "Branche locale qui alimente les quartiers et immeubles. Raccordement des points de distribution secondaires.",
  },
  {
    id: "CM",
    icon: Building2,
    titleFr: "CM",
    subtitleFr: "Distribution immeuble",
    descFr:
      "Colonne montante et distribution verticale dans le bâtiment jusqu'aux logements ou locaux professionnels.",
  },
  {
    id: "PTO",
    icon: Home,
    titleFr: "PTO",
    subtitleFr: "Prise terminale",
    descFr:
      "Prise optique chez l'abonné. Point final de la fibre, connecté au modem (ONT) pour la mise en service.",
  },
] as const

export function FtthArchitectureSection() {
  const { locale } = useLanguage()
  const [activeId, setActiveId] = useState<string>(NODES[0].id)

  const text = {
    fr: {
      badge: "Infrastructure FTTH",
      title: "Architecture réseau FTTH",
      subtitle:
        "De l'armoire de rue jusqu'à l'abonné — infrastructure passive et active de bout en bout. Cliquez sur chaque nœud pour découvrir son rôle.",
      hint: "Sélectionnez un nœud pour afficher ses détails",
    },
    en: {
      badge: "FTTH Infrastructure",
      title: "FTTH Network Architecture",
      subtitle:
        "From the street cabinet to the subscriber — end-to-end passive and active infrastructure. Click each node to learn its role.",
      hint: "Select a node to view details",
    },
  } as const

  const tr = text[locale as keyof typeof text] || text.fr
  const active = NODES.find((n) => n.id === activeId) ?? NODES[0]

  return (
    <section id="architecture-ftth" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-wide relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold text-primary mb-8 tracking-widest uppercase">
            <Network className="w-4 h-4" />
            <span>{tr.badge}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {tr.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-12">
            {tr.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex items-center gap-2 min-w-max md:min-w-0 md:justify-center">
              {NODES.map((node, index) => {
                const Icon = node.icon
                const isActive = node.id === activeId
                return (
                  <div key={node.id} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveId(node.id)}
                      className={`flex flex-col items-center gap-3 p-5 rounded-2xl border min-w-[120px] transition-all duration-300 ${
                        isActive
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/10 scale-[1.02]"
                          : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-center">
                        <p className="font-display font-bold text-foreground">{node.titleFr}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{node.subtitleFr}</p>
                      </div>
                    </button>
                    {index < NODES.length - 1 && (
                      <ChevronRight className="w-5 h-5 text-muted-foreground/50 shrink-0 hidden sm:block" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <div className="mt-8 p-6 md:p-8 rounded-2xl border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest">{tr.hint}</p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shrink-0">
                <active.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                  {active.titleFr} — {active.subtitleFr}
                </h3>
                <p className="text-muted-foreground leading-relaxed mt-3">{active.descFr}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
