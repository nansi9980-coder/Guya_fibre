import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/i18n/context"
import Link from "next/link"

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

function StatItem({ value, suffix, label, start }: {
  value: number; suffix: string; label: string; start: boolean
}) {
  const count = useCountUp(value, 1800, start)
  return (
    <div className="flex flex-col items-center text-center py-8 px-4">
      <div className="font-display text-5xl md:text-6xl font-normal text-primary mb-3 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-[11px] tracking-[0.2em] uppercase font-bold text-foreground/60">{label}</div>
    </div>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  const { t } = useLanguage()

  const stats = [
    { value: 150, suffix: "+", label: t('stats.projects') },
    { value: 98, suffix: "%", label: t('stats.clients') },
    { value: 100, suffix: "%", label: t('stats.availability') },
    { value: 350, suffix: "+", label: t('stats.km') },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats" ref={ref} className="bg-white dark:bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-0 mb-20 border border-black dark:border-white">
          <Link
            href="#activites"
            className="bg-black dark:bg-white text-white dark:text-black py-10 px-8 text-center text-[13px] font-bold tracking-[0.3em] uppercase hover:bg-black/90 dark:hover:bg-white/90 transition-all border-b md:border-b-0 md:border-r border-white dark:border-black"
          >
            Nos Activités
          </Link>
          <Link
            href="/contact"
            className="bg-white dark:bg-black text-black dark:text-white py-10 px-8 text-center text-[13px] font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            Nous Contacter
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              start={started}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
