import { useLanguage } from "@/lib/i18n/context"
import { MapPin } from "lucide-react"

const CITIES = [
  "Cayenne",
  "Kourou",
  "Saint-Laurent-du-Maroni",
  "Matoury",
  "Remire-Montjoly",
  "Macouria",
  "Mana",
  "Maripasoula",
]

export function CoverageSection() {
  const { t } = useLanguage()

  return (
    <section id="couverture" className="py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Content */}
          <div>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-primary" />
                <span className="text-[11px] tracking-[0.2em] font-bold uppercase text-primary">Territoire</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-normal leading-tight mb-6">
                Couverture <br />
                <span className="font-serif-italic">Géographique</span>
              </h2>
              <p className="text-white/60 leading-relaxed max-w-lg">
                De l'île de Cayenne aux communes les plus isolées de l'Ouest et de l'Est, nos équipes interviennent sur l'ensemble de la Guyane française.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-4">
              {CITIES.map((city, i) => (
                <div key={i} className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-white/80">{city}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-8 border border-white/10 bg-white/5">
              <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">98%</p>
              <p className="text-lg font-medium">Taux de couverture des zones urbaines</p>
            </div>
          </div>

          {/* Right Side: Map Representation */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] bg-zinc-900 flex items-center justify-center border border-white/5">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              {/* Fake grid/dots representation of a map */}
              <div className="w-full h-full grid grid-cols-20 grid-rows-20 gap-2 p-10">
                 {Array.from({ length: 400 }).map((_, i) => (
                   <div key={i} className={`w-1 h-1 rounded-full ${Math.random() > 0.8 ? 'bg-primary' : 'bg-white/20'}`} />
                 ))}
              </div>
            </div>
            <div className="relative z-10 text-center">
              <div className="text-8xl font-bold text-white/5 select-none absolute -top-20 left-1/2 -translate-x-1/2">GUYANE</div>
              <div className="w-64 h-64 border border-primary/30 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-48 h-48 border border-primary/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
