"use client"

import { useLanguage } from "@/lib/i18n/context"
import Link from "next/link"

const SERVICES = [
  {
    number: "01",
    title: "Études & Ingénierie",
    desc: "Étude de site, relevés terrain, conception de réseaux et dossiers APS/APD/DOE.",
    tag: "CARTOGRAPHIE SIG",
  },
  {
    number: "02",
    title: "Déploiement Réseau",
    desc: "Génie civil, réseaux aériens, tirage fibre et installation d'infrastructures passives.",
    tag: "INFRASTRUCTURE DURABLE",
  },
  {
    number: "03",
    title: "Raccordement Fibre",
    desc: "Installation FTTH particuliers et FTTO entreprises, tests de continuité et mesures OTDR.",
    tag: "PERFORMANCE GARANTIE",
  },
  {
    number: "04",
    title: "Maintenance & Dépannage",
    desc: "Audit de réseau, localisation de pannes par réflectométrie et interventions curatives.",
    tag: "DISPONIBILITÉ 24/7",
  },
  {
    number: "05",
    title: "Solutions Entreprises",
    desc: "Réseaux privés, fibre dédiée, interconnexion de sites et projets smart city.",
    tag: "SOLUTIONS SUR MESURE",
  },
]

export function ServicesSection() {
  const { t } = useLanguage()

  return (
    <section id="activites" className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-[11px] tracking-[0.2em] font-bold uppercase text-primary">Activités</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-normal leading-tight">
            5 Domaines <br />
            <span className="font-serif-italic">d'Activité</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/10 dark:border-white/10">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="p-10 border-r border-b border-black/10 dark:border-white/10 flex flex-col min-h-[320px] group hover:bg-black dark:hover:bg-white transition-colors duration-500"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-4xl font-normal text-black/10 dark:text-white/10 group-hover:text-white/20 dark:group-hover:text-black/20 transition-colors">
                  {service.number}
                </span>
                <span className="text-[9px] tracking-[0.1em] font-bold uppercase py-1 px-2 border border-black/10 dark:border-white/10 text-foreground/40 group-hover:text-white/60 dark:group-hover:text-black/60 group-hover:border-white/20 dark:group-hover:border-black/20">
                  {service.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-white dark:group-hover:text-black transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed group-hover:text-white/70 dark:group-hover:text-black/70 transition-colors">
                {service.desc}
              </p>
            </div>
          ))}

          {/* CTA Tile */}
          <div className="p-10 border-r border-b border-black/10 dark:border-white/10 bg-primary/5 flex flex-col justify-center items-center text-center">
            <h3 className="text-xl font-bold mb-6 text-balance">Prêt à connecter <br />votre projet ?</h3>
            <Link
              href="/contact"
              className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black text-[11px] font-bold tracking-widest uppercase hover:bg-black/90 dark:hover:bg-white/90 transition-all"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}