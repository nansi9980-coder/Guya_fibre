"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function NotFound() {
  const { locale } = useLanguage()
  const text = {
    fr: {
      title: "Page introuvable",
      subtitle: "Oups ! La page que vous recherchez semble avoir été déconnectée du réseau. Pas de panique, nos techniciens n'ont pas coupé la fibre !",
      home: "Retour à l'accueil",
      contact: "Contactez-nous",
      popular: "Pages populaires :",
      links: ["Nos services", "Nos offres", "Demander une prise de contact", "Nos réalisations"],
    },
    en: {
      title: "Page not found",
      subtitle: "The page you are looking for is unavailable. No worries, our team can guide you to the right section.",
      home: "Back to home",
      contact: "Contact us",
      popular: "Popular pages:",
      links: ["Our services", "Our offers", "Request contact", "Our projects"],
    },
    es: {
      title: "Página no encontrada",
      subtitle: "La página que busca no está disponible. Nuestro equipo puede ayudarle a encontrar la información correcta.",
      home: "Volver al inicio",
      contact: "Contáctenos",
      popular: "Páginas populares:",
      links: ["Nuestros servicios", "Nuestras ofertas", "Solicitar contacto", "Nuestros proyectos"],
    },
    pt: {
      title: "Página não encontrada",
      subtitle: "A página solicitada não está disponível. Nossa equipe pode orientá-lo para a seção correta.",
      home: "Voltar ao início",
      contact: "Fale conosco",
      popular: "Páginas populares:",
      links: ["Nossos serviços", "Nossas ofertas", "Solicitar contato", "Nossos projetos"],
    },
    nl: {
      title: "Pagina niet gevonden",
      subtitle: "De gevraagde pagina is niet beschikbaar. Ons team helpt u graag verder.",
      home: "Terug naar home",
      contact: "Neem contact op",
      popular: "Populaire pagina's:",
      links: ["Onze diensten", "Onze aanbiedingen", "Contact aanvragen", "Onze projecten"],
    },
    gcr: {
      title: "Paj-la pa jwenn",
      subtitle: "Paj ou ka chèché-a pa disponib. Lékip nou ké gidé zòt vitman.",
      home: "Tounen lakai",
      contact: "Kontakté nou",
      popular: "Paj popilè :",
      links: ["Sèrvis nou", "Ofri nou", "Mandé on devi gratis", "Travay nou"],
    },
    ar: {
      title: "الصفحة غير موجودة",
      subtitle: "الصفحة المطلوبة غير متاحة حاليًا. يمكن لفريقنا توجيهك إلى القسم المناسب.",
      home: "العودة للرئيسية",
      contact: "اتصل بنا",
      popular: "صفحات شائعة:",
      links: ["خدماتنا", "عروضنا", "طلب تواصل", "مشاريعنا"],
    },
    zh: {
      title: "页面未找到",
      subtitle: "你访问的页面当前不可用，我们可以带你前往正确的内容。",
      home: "返回首页",
      contact: "联系我们",
      popular: "热门页面：",
      links: ["我们的服务", "我们的方案", "提交联系请求", "我们的案例"],
    },
  } as const
  const tr = text[locale as keyof typeof text] || text.fr
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Visual */}
          <div className="relative mb-8">
            <div className="text-[150px] md:text-[200px] font-display font-bold text-secondary leading-none select-none" aria-hidden="true">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                <Search className="w-10 h-10 md:w-14 md:h-14 text-primary" />
              </div>
            </div>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {tr.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
            {tr.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                {tr.home}
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="border-border text-foreground hover:bg-card"
            >
              <Link href="/contact">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {tr.contact}
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{tr.popular}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { href: "/services", label: tr.links[0] },
                { href: "/offres", label: tr.links[1] },
                { href: "/contact", label: tr.links[2] },
                { href: "/projets", label: tr.links[3] },
              ].map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="text-primary hover:text-primary/80 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
