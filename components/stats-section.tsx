"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/i18n/context"

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

function StatCard({ value, suffix, label, description, start }: {
  value: number; suffix: string; label: string; description: string; start: boolean
}) {
  const count = useCountUp(value, 1800, start)
  return (
    <div className="flex flex-col items-center text-center p-8">
      <div className="font-display text-5xl md:text-6xl font-bold text-primary mb-2 tabular-nums">
        {count}{suffix}
      </div>
      <div className="font-display text-lg font-semibold text-foreground mb-1">{label}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
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
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats" ref={ref} className="bg-muted/40 dark:bg-background border-y border-border">
      <div className="container-wide px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
          {stats.map((stat) => (
            <StatCard
              key={stat.labelKey}
              value={stat.value}
              suffix={stat.suffix}
              label={getText(stat.labelKey)}
              description={getText(stat.descKey)}
              start={started}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
