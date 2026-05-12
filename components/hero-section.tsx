import { useLanguage } from "@/lib/i18n/context"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative pt-24 lg:pt-32 pb-0 overflow-hidden bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side: Content */}
          <div className="relative z-10 py-12 lg:py-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8">
              L'expertise fibre <br />
              <span className="font-serif-italic">au cœur de la Guyane.</span>
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed mb-12 max-w-lg">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-primary text-white font-bold tracking-widest uppercase text-[13px] hover:bg-primary/90 transition-all"
              >
                {t('hero.cta')}
              </Link>
              <Link
                href="#activites"
                className="inline-flex items-center justify-center px-10 py-4 border border-black dark:border-white text-black dark:text-white font-bold tracking-widest uppercase text-[13px] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                {t('hero.ctaSecondary')}
              </Link>
            </div>
          </div>

          {/* Right side: Image */}
          <div className="relative h-[400px] lg:h-[600px] w-full">
            <div className="absolute inset-0 bg-slate-100 dark:bg-zinc-900 overflow-hidden">
              <Image
                src="/images/hero-bg.jpg"
                alt="GUYA FIBRE Expertise"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Geometric accents */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-l border-b border-primary/30 hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Bottom Info Banner */}
      <div className="bg-black text-white py-10 mt-12 lg:mt-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] tracking-[0.2em] text-white/50 uppercase font-bold">Email</p>
              <p className="text-sm font-medium">contact@guyafibre.gf</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] tracking-[0.2em] text-white/50 uppercase font-bold">Site Web</p>
              <p className="text-sm font-medium">www.guyafibre.gf</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] tracking-[0.2em] text-white/50 uppercase font-bold">Zones Desservies</p>
              <p className="text-sm font-medium">Cayenne · Kourou · Saint-Laurent</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}