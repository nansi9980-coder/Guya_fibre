"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/i18n/context"
import { ScrollReveal } from "./scroll-reveal"
import { Briefcase, UserCheck, Map, Users } from "lucide-react"

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])

  return count
}

const ICON_MAP = {
  "stats.projects": Briefcase,
  "stats.clients": UserCheck,
  "stats.availability": Map,
  "stats.connected": Users,
}

function StatCard({ value, suffix, label, description, start, iconKey, delay }: {
  value: number; suffix: string; label: string; description: string; start: boolean; iconKey: string; delay: 1 | 2 | 3 | 4
}) {
  const count = useCountUp(value, 1800, start)
  const Icon = ICON_MAP[iconKey as keyof typeof ICON_MAP] || Briefcase
  
  return (
    <ScrollReveal delay={delay} className="h-full">
      <div className="group h-full flex flex-col items-center text-center p-8 glass rounded-3xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-7 h-7" />
        </div>
        <div className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3 tabular-nums">
          {count}{suffix}
        </div>
        <div className="font-display text-base font-bold text-foreground mb-2 uppercase tracking-wider">{label}</div>
        <div className="text-sm text-muted-foreground leading-relaxed">{description}</div>
      </div>
    </ScrollReveal>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  const { t } = useLanguage()

  const stats = [
    { value: 150, suffix: "+", labelKey: "stats.projects", descKey: "stats.projectsDesc" },
    { value: 98, suffix: "%", labelKey: "stats.clients", descKey: "stats.clientsDesc" },
    { value: 100, suffix: "%", labelKey: "stats.availability", descKey: "stats.availabilityDesc" },
    { value: 5000, suffix: "+", labelKey: "stats.connected", descKey: "stats.connectedDesc" },
  ]

  const defaultLabels: Record<string, string> = {
    "stats.projects": "Projets réalisés",
    "stats.projectsDesc": "Installations complètes en Guyane",
    "stats.clients": "Satisfaction client",
    "stats.clientsDesc": "Taux de satisfaction mesuré",
    "stats.availability": "Couverture territoriale",
    "stats.availabilityDesc": "Toute la Guyane",
    "stats.connected": "Familles & Entreprises",
    "stats.connectedDesc": "Connectées en Guyane",
  }

  const getText = (key: string) => {
    const translated = t(key)
    return translated === key ? defaultLabels[key] || key : translated
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats" ref={ref} className="section-padding relative overflow-hidden bg-background">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.labelKey}
              value={stat.value}
              suffix={stat.suffix}
              label={getText(stat.labelKey)}
              description={getText(stat.descKey)}
              start={started}
              iconKey={stat.labelKey}
              delay={(i + 1) as 1 | 2 | 3 | 4}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
