"use client"

import { useState } from "react"
import { Network, Home, Layers, Cable, Box, Building2, ArrowRight } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

interface ArchNode {
  id: string
  code: string
  label: string
  sublabel: string
  icon: React.ElementType
  color: string
  description: string
  details: string[]
}

const NODES: ArchNode[] = [
  {
    id: "nro",
    code: "NRO",
    label: "Nœud de Raccordement Optique",
    sublabel: "Point de départ",
    icon: Network,
    color: "#C8A84B",
    description: "Cœur du réseau FTTH, le NRO héberge les équipements actifs OLT qui génèrent et gèrent le signal optique distribué vers l'ensemble des abonnés.",
    details: [
      "Équipements OLT (Optical Line Terminal)",
      "Concentration de tous les câbles primaires",
      "Supervision centralisée du réseau",
      "Capacité : jusqu'à 100 000 lignes",
    ],
  },
  {
    id: "pm",
    code: "PM",
    label: "Point de Mutualisation",
    sublabel: "Armoire de rue",
    icon: Box,
    color: "#1E6B6B",
    description: "Armoire de rue ou chambre souterraine permettant la mutualisation entre opérateurs. Interface entre le réseau primaire et la distribution secondaire.",
    details: [
      "Accès ouvert à tout opérateur (mutualisation)",
      "Protection étanche IP55 minimum",
      "Connectique SC/APC standard",
      "Capacité : 24 à 576 fibres",
    ],
  },
  {
    id: "d1",
    code: "D1",
    label: "Distribution Primaire",
    sublabel: "Backbone réseau",
    icon: Cable,
    color: "#2C5F8A",
    description: "Câble optique de forte capacité reliant le NRO au PM. Constitue l'épine dorsale du réseau FTTH et supporte l'ensemble du trafic agrégé.",
    details: [
      "72 à 288 fibres optiques",
      "Pose aérienne ou souterraine",
      "Câble G.652.D certifié",
      "Distance : jusqu'à 20 km",
    ],
  },
  {
    id: "d2",
    code: "D2",
    label: "Distribution Secondaire",
    sublabel: "Ramification locale",
    icon: Cable,
    color: "#3A7CB5",
    description: "Segment intermédiaire reliant le PM aux zones de distribution tertiaire. Assure la capillarité du réseau vers les quartiers et îlots desservis.",
    details: [
      "24 à 72 fibres optiques",
      "Dessert plusieurs quartiers et îlots",
      "Optimisé pour zones denses",
      "Distance : 500 m à 2 km",
    ],
  },
  {
    id: "d3",
    code: "D3",
    label: "Distribution Tertiaire",
    sublabel: "Dernier kilomètre",
    icon: Cable,
    color: "#1A4A7A",
    description: "Dernier maillon de la distribution passive, raccordant les câbles secondaires directement aux boîtiers limite (PBO) de chaque immeuble ou groupement.",
    details: [
      "6 à 24 fibres optiques",
      "Câble micro-module ou mono-tube",
      "Pose sur façade ou souterraine",
      "Distance : 50 à 500 m",
    ],
  },
  {
    id: "bl",
    code: "BL",
    label: "Boîtier Limite / PBO",
    sublabel: "Point de branchement",
    icon: Box,
    color: "#1A3D5C",
    description: "Point de Branchement Optique : interface passive entre le réseau de distribution et le réseau d'abonnés. Chaque abonné dispose d'une fibre dédiée depuis ce point.",
    details: [
      "Connectique SC/APC individuelle",
      "Mise en coupure par abonné",
      "Installation en façade ou local",
      "Étanchéité IP66",
    ],
  },
  {
    id: "cm",
    code: "D3",
    label: "Colonne Montante",
    sublabel: "Distribution immeuble",
    icon: Building2,
    color: "#102A3E",
    description: "Infrastructure passive verticale à l'intérieur d'un immeuble, reliant la distribution jusqu'aux prises terminales optiques (PTO) de chaque étage et appartement.",
    details: [
      "Gaine technique dédiée fibre",
      "1 fibre par logement",
      "Manchons de protection par palier",
      "Conforme NF C 15-900",
    ],
  },
  {
    id: "home",
    code: "PTO",
    label: "Logement — L'Abonné",
    sublabel: "Prise terminale",
    icon: Home,
    color: "#C8A84B",
    description: "La prise terminale optique (PTO) installée dans le logement constitue le point de terminaison du réseau passif. L'ONT de l'opérateur s'y connecte pour fournir Internet.",
    details: [
      "PTO murale encastrée",
      "ONT (Optical Network Terminal)",
      "Débit jusqu'à 10 Gbps",
      "Triple play : Internet, TV, Téléphone",
    ],
  },
]

const EXCLUDED_NODE_IDS = new Set(["d3", "bl"])
const VISIBLE_NODES = NODES.filter((n) => !EXCLUDED_NODE_IDS.has(n.id))

export function FtthArchitectureSection() {
  const [activeId, setActiveId] = useState<string | null>(null)

  const active = VISIBLE_NODES.find((n) => n.id === activeId) ?? null

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold text-primary mb-6 tracking-widest uppercase">
              <Layers className="w-4 h-4" />
              <span>Infrastructure FTTH</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
              Architecture{" "}
              <span className="text-primary">Réseau FTTH</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed text-pretty max-w-2xl">
              Du NRO jusqu&apos;à l&apos;abonné — infrastructure passive et active de bout en bout.{" "}
              <span className="text-foreground/70">Cliquez sur chaque nœud pour découvrir son rôle.</span>
            </p>
          </ScrollReveal>
        </div>

        {/* Architecture chain — scrollable */}
        <ScrollReveal delay={2}>
          <div className="relative">
            {/* Scroll hint fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-background/60 to-transparent z-10 rounded-l-2xl" aria-hidden />
            <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-background/60 to-transparent z-10 rounded-r-2xl" aria-hidden />

            <div
              className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent"
              style={{ scrollbarWidth: "thin" }}
            >
              <div className="flex items-center gap-0 w-max mx-auto px-4">
                {VISIBLE_NODES.map((node, idx) => {
                  const Icon = node.icon
                  const isActive = activeId === node.id
                  const isLast = idx === VISIBLE_NODES.length - 1

                  return (
                    <div key={node.id} className="flex items-center">
                      {/* Card button */}
                      <button
                        onClick={() => setActiveId(isActive ? null : node.id)}
                        className={`
                          group relative flex flex-col items-center gap-3 px-5 py-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center w-[130px]
                          ${isActive
                            ? "border-primary bg-primary text-white shadow-2xl shadow-primary/40 -translate-y-2"
                            : "border-border glass hover:border-primary/60 hover:-translate-y-1 hover:shadow-xl"
                          }
                        `}
                        aria-expanded={isActive}
                        aria-controls={`detail-${node.id}`}
                      >
                        {/* Icon */}
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isActive ? "bg-white/20" : "bg-primary/10"
                          }`}
                          style={isActive ? {} : { borderTop: `3px solid ${node.color}` }}
                        >
                          <Icon className={`w-7 h-7 ${isActive ? "text-white" : "text-primary"}`} />
                        </div>

                        {/* Code */}
                        <span className={`font-display text-2xl font-black leading-none ${isActive ? "text-white" : "text-foreground"}`}>
                          {node.code}
                        </span>

                        {/* Label */}
                        <span className={`text-[11px] font-medium leading-tight ${isActive ? "text-white/90" : "text-muted-foreground"}`}>
                          {node.sublabel}
                        </span>
                      </button>

                      {/* Arrow between nodes */}
                      {!isLast && (
                        <div className="flex items-center px-1 text-muted-foreground/40 flex-shrink-0">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Detail panel */}
        <div
          id={`detail-${activeId}`}
          className={`mt-8 transition-all duration-500 overflow-hidden ${
            active ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-live="polite"
        >
          {active && (
            <div className="glass rounded-3xl border border-border p-8 md:p-10 flex flex-col md:flex-row gap-8">
              {/* Left: code + title */}
              <div className="flex-shrink-0 flex flex-col items-start gap-4 md:w-56">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: `${active.color}20`, borderTop: `4px solid ${active.color}` }}
                >
                  <active.icon className="w-8 h-8" style={{ color: active.color }} />
                </div>
                <div>
                  <p className="font-display text-4xl font-black text-primary leading-none">{active.code}</p>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">{active.sublabel}</p>
                </div>
                <p className="text-sm font-semibold text-foreground leading-snug">{active.label}</p>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-border" />

              {/* Right: description + details */}
              <div className="flex-1 flex flex-col gap-6">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{active.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {active.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm text-foreground/80 leading-snug">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Hint when nothing selected */}
        {!active && (
          <p className="text-center text-xs text-muted-foreground/50 mt-6 tracking-wide">
            ↑ Sélectionnez un nœud pour afficher ses détails
          </p>
        )}
      </div>
    </section>
  )
}
