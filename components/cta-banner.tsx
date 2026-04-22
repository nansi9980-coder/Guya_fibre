"use client"

import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export function CTABanner() {
  const { locale } = useLanguage()
  const labels = {
    fr: {
      title: "Prêt à connecter votre projet fibre",
      accent: "avec les meilleurs du terrain ?",
      subtitle: "GUYA FIBRE transforme les défis les plus complexes en solutions fiables et performantes. Déploiement complet, maintenance 24/7, expertise locale incomparable. Devis gratuit, sans engagement.",
      cta: "Demander une prise de contact",
      call: "Appeler directement",
    },
    en: {
      title: "Ready to connect your fiber project",
      accent: "with trusted local experts?",
      subtitle: "GUYA FIBRE turns complex constraints into reliable high-performance solutions across French Guiana.",
      cta: "Request a contact",
      call: "Call now",
    },
    es: {
      title: "¿Listo para conectar su proyecto de fibra",
      accent: "con los mejores del terreno?",
      subtitle: "GUYA FIBRE convierte los desafíos más complejos en soluciones confiables y de alto rendimiento.",
      cta: "Solicitar contacto",
      call: "Llamar ahora",
    },
    pt: {
      title: "Pronto para conectar seu projeto de fibra",
      accent: "com os melhores especialistas locais?",
      subtitle: "A GUYA FIBRE transforma desafios complexos em soluções confiáveis e de alto desempenho.",
      cta: "Solicitar contato",
      call: "Ligar agora",
    },
    nl: {
      title: "Klaar om uw glasvezelproject te verbinden",
      accent: "met de beste lokale experts?",
      subtitle: "GUYA FIBRE zet complexe uitdagingen om in betrouwbare en krachtige oplossingen.",
      cta: "Contact aanvragen",
      call: "Direct bellen",
    },
    gcr: {
      title: "Ou paré pou konèkté projé fib ou",
      accent: "épi méyè pwofesyonèl tèren-an?",
      subtitle: "GUYA FIBRE ka tounen pi gwo défi an solisyon seryé épi performan. Devi gratis, san angajman.",
      cta: "Mandé on devi gratis",
      call: "Rélé dirèk",
    },
    ar: {
      title: "هل أنت مستعد لربط مشروع الألياف",
      accent: "مع أفضل خبراء الميدان؟",
      subtitle: "GUYA FIBRE تحوّل التحديات المعقدة إلى حلول موثوقة وعالية الأداء في جميع أنحاء غويانا الفرنسية.",
      cta: "طلب تواصل",
      call: "اتصال مباشر",
    },
    zh: {
      title: "准备好连接你的光纤项目了吗",
      accent: "交给本地一线专家更放心",
      subtitle: "GUYA FIBRE 将复杂挑战转化为可靠、高性能的光纤解决方案。",
      cta: "提交联系请求",
      call: "立即致电",
    },
  } as const
  const text = labels[locale as keyof typeof labels] || labels.fr
  return (
    <section
      className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))",
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, oklch(0.65 0.13 180 / 0.4), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container-wide text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
          {text.title} <span className="text-primary">{text.accent}</span>
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto text-pretty">
          {text.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
          >
            {text.cta}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:+594 694435484"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            <Phone className="w-5 h-5" />
            {text.call}
          </a>
        </div>
      </div>
    </section>
  )
}