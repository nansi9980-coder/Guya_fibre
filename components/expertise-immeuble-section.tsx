import { useLanguage } from "@/lib/i18n/context"
import Image from "next/image"

const BENEFITS = [
  {
    title: "Conventionnement Gratuit",
    desc: "Nous prenons en charge l'intégralité des frais d'installation de la fibre dans les parties communes de l'immeuble.",
    icon: "01",
  },
  {
    title: "Valorisation du Patrimoine",
    desc: "Un immeuble raccordé à la fibre optique est plus attractif pour les futurs locataires et acquéreurs.",
    icon: "02",
  },
  {
    title: "Conformité Réglementaire",
    desc: "Nous assurons le respect strict des normes de déploiement et des obligations liées au fibrage des immeubles.",
    icon: "03",
  },
]

export function ExpertiseImmeubleSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-gray-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-[11px] tracking-[0.2em] font-bold uppercase text-primary">Syndics & Bailleurs</span>
            <div className="h-[1px] w-12 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-normal leading-tight mb-6">
            Expertise <br />
            <span className="font-serif-italic">Immeuble & Copropriété</span>
          </h2>
          <p className="text-foreground/60 leading-relaxed">
            Nous accompagnons les gestionnaires immobiliers dans la modernisation numérique de leurs actifs. Un déploiement soigné, sans frais pour la copropriété.
          </p>
        </div>

        <div className="relative h-[400px] lg:h-[500px] w-full mb-16 overflow-hidden">
          <Image
            src="/images/service-raccordement.jpg"
            alt="Expertise Immeuble Guyane"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, i) => (
            <div key={i} className="p-10 bg-white dark:bg-black border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
              <span className="text-4xl font-serif-italic text-primary/20 mb-6">{benefit.icon}</span>
              <h3 className="text-lg font-bold mb-4">{benefit.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
