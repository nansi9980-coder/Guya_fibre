"use client"

import { useLanguage } from "@/lib/i18n/context"

const PHASES = [
  { num: "01", title: "Études de faisabilité & Relevés", desc: "Analyses terrain et conception technique APS/APD/DOE." },
  { num: "02", title: "Déploiement infrastructures", desc: "Génie civil, pose de supports et infrastructures passives." },
  { num: "03", title: "Tirage & Raccordement", desc: "Passage de câbles et soudures par fusion haute précision." },
  { num: "04", title: "Qualification & Mesures", desc: "Tests de continuité et certification par réflectométrie OTDR." },
  { num: "05", title: "Mise en exploitation", desc: "Audit final, recette technique et mise en service." },
  { num: "06", title: "Maintenance & Support", desc: "Supervision réseau 24/7 et interventions préventives." },
]

export function ProcessSection() {
  const { t } = useLanguage()

  return (
    <section id="deploiement" className="py-24 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Visual Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-[#FFC107] p-8 aspect-square flex flex-col justify-between">
                  <span className="text-sm font-bold uppercase tracking-widest text-black/40">Phase 06</span>
                  <h4 className="text-2xl font-bold text-black">Maintenance</h4>
                </div>
                <div className="bg-[#00BCD4] p-8 aspect-[4/3] flex flex-col justify-between">
                  <span className="text-sm font-bold uppercase tracking-widest text-white/40">Certification</span>
                  <h4 className="text-2xl font-bold text-white">OTDR</h4>
                </div>
              </div>
              <div className="pt-12">
                <div className="bg-[#FF5722] p-8 aspect-[3/4] flex flex-col justify-between">
                  <span className="text-sm font-bold uppercase tracking-widest text-white/40">Recette</span>
                  <h4 className="text-2xl font-bold text-white">PV de Fin de Travaux</h4>
                </div>
              </div>
            </div>
            {/* Background text decoration */}
            <div className="absolute -z-10 -bottom-20 -left-20 text-[150px] font-bold text-black/[0.03] dark:text-white/[0.03] select-none">
              PROCESS
            </div>
          </div>

          {/* Right Side: List */}
          <div>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-primary" />
                <span className="text-[11px] tracking-[0.2em] font-bold uppercase text-primary">Déploiement</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-normal leading-tight">
                Processus de <br />
                <span className="font-serif-italic">Mise en Œuvre</span>
              </h2>
            </div>

            <div className="space-y-8">
              {PHASES.map((phase) => (
                <div key={phase.num} className="flex gap-6 group">
                  <span className="text-sm font-bold text-primary tabular-nums pt-1">{phase.num}</span>
                  <div className="pb-8 border-b border-black/5 dark:border-white/5 flex-1">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{phase.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
