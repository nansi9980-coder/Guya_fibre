"use client"

import { useLanguage } from "@/lib/i18n/context"

const STEPS = [
  {
    code: "NRA",
    name: "Nœud de Raccordement Abonnés",
    desc: "Le cœur du réseau où arrivent les fibres de transport. C'est le point de départ de la connectivité optique.",
  },
  {
    code: "PM",
    name: "Point de Mutualisation",
    desc: "Armoire de rue assurant la distribution de la fibre vers les différents quartiers et immeubles.",
  },
  {
    code: "D1 / D2 / D3",
    name: "Segments de Distribution",
    desc: "Différentes phases du transport de la fibre : du transport principal jusqu'à la distribution locale.",
  },
  {
    code: "PBO",
    name: "Point de Branchement Optique",
    desc: "Boîtier situé à proximité immédiate des habitations ou bureaux, permettant le raccordement final.",
  },
]

export function ArchitectureSection() {
  const { t } = useLanguage()

  return (
    <section id="architecture" className="py-24 bg-gray-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-[11px] tracking-[0.2em] font-bold uppercase text-primary">Architecture</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-normal leading-tight">
            Architecture <br />
            <span className="font-serif-italic">Réseau Optique</span>
          </h2>
          <p className="mt-6 text-foreground/60 max-w-2xl leading-relaxed">
            Du NRA jusqu'au point de livraison final, nous maîtrisons chaque segment de l'infrastructure pour garantir une performance optimale.
          </p>
        </div>

        {/* Visual Diagram Placeholder/representation */}
        <div className="relative mb-20 py-20 border-y border-black/5 dark:border-white/5">
          <div className="flex justify-between items-center relative overflow-x-auto pb-8 gap-4">
            {["NRA", "PM", "D1", "D2", "D3", "BL", "CM", "Maison"].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-4 flex-none">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-[10px] font-bold text-primary bg-white dark:bg-black shrink-0">
                    {step}
                  </div>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-foreground/40 whitespace-nowrap">{step}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-8 md:w-16 lg:w-24 h-[1px] bg-black/10 dark:bg-white/10 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {STEPS.map((step, i) => (
            <div key={i} className="p-8 border border-black/5 dark:border-white/5 bg-white dark:bg-black/40">
              <div className="flex items-start gap-6">
                <span className="text-2xl font-serif-italic opacity-50">{step.code}</span>
                <div>
                  <h3 className="text-lg font-bold mb-2">{step.name}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
