"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { InteractiveMap } from "@/components/interactive-map"
import { MapPin } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function LocalisationPage() {
  const { locale } = useLanguage()
  const text = {
    fr: { badge: "Notre localisation", title: "Venez nous rencontrer", subtitle: "Notre équipe vous accueille du lundi au samedi à Saint-Laurent-du-Maroni. Retrouvez toutes les informations pour nous rejoindre facilement." },
    en: { badge: "Our location", title: "Come meet us", subtitle: "Our team welcomes you Monday to Saturday in Saint-Laurent-du-Maroni." },
    es: { badge: "Nuestra ubicación", title: "Venga a conocernos", subtitle: "Nuestro equipo le recibe de lunes a sábado en Saint-Laurent-du-Maroni." },
    pt: { badge: "Nossa localização", title: "Venha nos encontrar", subtitle: "Nossa equipe atende de segunda a sábado em Saint-Laurent-du-Maroni." },
    nl: { badge: "Onze locatie", title: "Kom ons bezoeken", subtitle: "Ons team ontvangt u van maandag tot zaterdag in Saint-Laurent-du-Maroni." },
    gcr: { badge: "Koté nou yé", title: "Vini jwenn nou", subtitle: "Lékip nou ka résévwa zòt lendi pou samdi an Sen-Loran di Maroni." },
    ar: { badge: "موقعنا", title: "تعالوا لزيارتنا", subtitle: "يستقبلكم فريقنا من الاثنين إلى السبت في سان-لوران دو ماروني." },
    zh: { badge: "我们的位置", title: "欢迎到访", subtitle: "我们的团队周一至周六在圣洛朗-迪马罗尼接待您。" },
  } as const
  const tr = text[locale as keyof typeof text] || text.fr
  return (
    <>
      <Navbar />
      <main className="min-h-screen brand-dark-bg">
        {/* Header */}
        <section className="pt-32 pb-12 px-4 md:px-8">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.65_0.13_180)]/10 border border-[oklch(0.65_0.13_180)]/30 mb-6">
                <MapPin className="w-4 h-4 text-[oklch(0.65_0.13_180)]" />
                <span className="text-[oklch(0.65_0.13_180)] text-sm font-medium">{tr.badge}</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
                {tr.title}
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                {tr.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="pb-20 px-4 md:px-8">
          <div className="container-wide max-w-4xl">
            <InteractiveMap />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
