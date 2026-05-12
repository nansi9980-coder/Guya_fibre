"use client"

import { useLanguage } from "@/lib/i18n/context"
import Image from "next/image"
import { Check } from "lucide-react"

const FEATURES = [
  "Débit Symétrique Garanti (jusqu'à 10 Gbps)",
  "Garantie de Temps de Rétablissement (GTR 4h)",
  "Adresse IP Fixe incluse",
  "Support Technique Dédié & Local",
]

export function FTTESection() {
  const { t } = useLanguage()

  return (
    <section id="ftte" className="py-24 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side: Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[400px] lg:h-[500px] w-full grayscale hover:grayscale-0 transition-all duration-700">
              <Image
                src="/images/service-entreprises.jpg"
                alt="Fibre Entreprise Guyane"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-primary text-white p-8 hidden md:block">
              <p className="text-3xl font-bold">GTR 4H</p>
              <p className="text-[10px] tracking-widest uppercase font-bold opacity-70">Engagement de service</p>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="order-1 lg:order-2">
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-primary" />
                <span className="text-[11px] tracking-[0.2em] font-bold uppercase text-primary">Solutions Pro</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-normal leading-tight mb-6">
                FTTE & <br />
                <span className="font-serif-italic">Connectivité Dédiée</span>
              </h2>
              <p className="text-foreground/60 leading-relaxed mb-8">
                Pour les entreprises exigeantes, nous déployons des solutions de Fibre Optique dédiée (FTTE) offrant une stabilité et une sécurité maximales pour vos activités critiques.
              </p>
            </div>

            <div className="grid gap-4">
              {FEATURES.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border border-black/5 dark:border-white/5 bg-gray-50/50 dark:bg-zinc-900/50">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
