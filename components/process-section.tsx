"use client"

import { ClipboardList, Compass, HardHat, Cable, ShieldCheck, Footprints } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { ScrollReveal } from "./scroll-reveal"

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Audit & Diagnostic",
    description: "Visite terrain complète, analyse des besoins, étude du périmètre géographique. Définition clara des objectifs techniques et budgétaires.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Conception Réseau",
    description: "Relevés topographiques précis, modélisation 3D, plans APS/APD/DOE. Conception optimisée adaptée au terrain guyanais (forêt, fleuve, zones urbaines).",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Déploiement Complet",
    description: "Génie civil (tranchées, fourreaux, chambres), tirage fibre optique, soudure par fusion, installation équipements PBO/BPE. Respect calendrier strict.",
  },
  {
    number: "04",
    icon: Cable,
    title: "Qualification & Tests",
    description: "Tests OTDR complets, mesures niveaux optiques, certification conformité normes. Livrables documentés (rapports, schémas, bon de recette).",
  },
  {
    number: "05",
    icon: ShieldCheck,
    title: "Mise en Service Opérationnelle",
    description: "Activation réseau, formation utilisateurs, démarrage maintenance contractuelle 24/7. Support technique permanent garanti.",
  },
]

export function ProcessSection() {
  const { locale } = useLanguage()
  const i18n = {
    fr: {
      badge: "Notre méthode",
      title: "Un processus rigoureux",
      subtitle: "De la conception à la mise en service, nous suivons une méthodologie stricte pour garantir la pérennité de vos infrastructures.",
      steps: steps,
    },
    en: {
      badge: "Our method",
      title: "A rigorous process",
      subtitle: "From design to commissioning, we follow a strict methodology to guarantee the sustainability of your infrastructure.",
      steps: [
        { ...steps[0], title: "Audit & Diagnosis", description: "Complete site visit, needs analysis, geographic scope study. Clear definition of technical and budget goals." },
        { ...steps[1], title: "Network Design", description: "Accurate surveys, 3D modeling, APS/APD/DOE plans. Optimized design adapted to Guianese terrain." },
        { ...steps[2], title: "Full Deployment", description: "Civil works, fiber pulling, fusion splicing and PBO/BPE installation with strict timeline control." },
        { ...steps[3], title: "Qualification & Testing", description: "Complete OTDR testing, optical level checks, standards compliance and documented deliverables." },
        { ...steps[4], title: "Operational Go-Live", description: "Network activation, user handover and 24/7 support readiness for reliable operations." },
      ],
    },
    // ... potentially other locales (keeping it simple for now as per base)
  }
  
  const content = i18n[locale as keyof typeof i18n] || i18n.fr

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold text-primary mb-6 tracking-widest uppercase">
              <Footprints className="w-4 h-4" />
              <span>{content.badge}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              {content.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed text-pretty max-w-2xl">
              {content.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div
            className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-border rounded-full"
            aria-hidden="true"
          >
            <div className="h-full bg-primary/30 w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {(content.steps || []).map((step, i) => {
              const Icon = step.icon
              return (
                <ScrollReveal key={step.number} delay={((i % 5) + 1) as 1 | 2 | 3 | 4} className="relative z-10">
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                    {/* Circle */}
                    <div className="relative mb-8">
                      <div className="w-24 h-24 rounded-3xl glass flex items-center justify-center relative z-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-xl shadow-black/5">
                        <Icon className="w-10 h-10" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-display font-black text-sm shadow-lg shadow-primary/30 z-20 group-hover:scale-110 transition-transform">
                        {step.number}
                      </div>
                    </div>

                    <h3 className="font-display text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">{step.description}</p>
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
