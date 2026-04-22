"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CTABanner } from "@/components/cta-banner"
import { CheckCircle2, ArrowRight, Phone } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const offers = [
  {
    id: "starter",
    name: "Raccordement",
    badge: "Particuliers",
    price: "Sur devis",
    description: "Pour les particuliers souhaitant se raccorder à la fibre optique (FTTH).",
    features: [
      "Visite technique préalable gratuite",
      "Tirage du câble jusqu'à la prise optique",
      "Pose de la PTO et installation ONT",
      "Mise en service et tests OTDR",
      "Bon de recette signé",
      "Assistance à la première connexion",
    ],
    cta: "Demander une prise de contact",
    highlight: false,
  },
  {
    id: "pro",
    name: "Entreprise",
    badge: "PME & Entreprises",
    price: "Sur devis",
    description: "Pour les entreprises nécessitant une liaison FTTO dédiée avec garanties de service.",
    features: [
      "Étude de faisabilité et ingénierie",
      "Fibre dédiée non mutualisée",
      "Équipements professionnels inclus",
      "Documentation technique complète",
      "Tests et mesures certifiés",
      "Contrat de maintenance inclus (1 an)",
      "Astreinte technique 7j/7",
    ],
    cta: "Demander une prise de contact",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Territoire",
    badge: "Collectivités & Opérateurs",
    price: "Sur devis",
    description: "Pour les projets d'envergure : déploiement territorial, smart city et contrats d'astreinte.",
    features: [
      "Étude complète APS / APD / DOE",
      "Gestion SIG et cartographie géoréférencée",
      "Déploiement multi-sites clé en main",
      "Génie civil et réseaux aériens",
      "Contrat de maintenance longue durée",
      "Interventions zones isolées incluses",
      "Reporting et suivi de projet dédié",
    ],
    cta: "Nous contacter",
    highlight: false,
  },
]

const comparaisonData = [
  { feature: "Étude de faisabilité", starter: false, pro: true, enterprise: true },
  { feature: "Visite technique gratuite", starter: true, pro: true, enterprise: true },
  { feature: "Déploiement réseau", starter: false, pro: false, enterprise: true },
  { feature: "Fibre dédiée", starter: false, pro: true, enterprise: true },
  { feature: "Documentation DOE", starter: false, pro: true, enterprise: true },
  { feature: "Maintenance incluse", starter: false, pro: true, enterprise: true },
  { feature: "Astreinte 7j/7", starter: false, pro: true, enterprise: true },
  { feature: "Zones isolées", starter: false, pro: false, enterprise: true },
]

export default function OffresPage() {
  const { locale } = useLanguage()
  const texts = {
    fr: { badge: "Tarification", title: "Des offres adaptées à chaque projet", subtitle: "Chaque projet fibre est unique. Nos offres s'adaptent à votre situation, de la résidence individuelle au déploiement territorial. Devis gratuit, sans engagement.", recommended: "Recommandé", compare: "Comparatif des offres", feature: "Fonctionnalité", customTitle: "Tarification sur mesure", customDesc: "Chaque projet est étudié individuellement. Contactez-nous pour obtenir un devis personnalisé adapté à votre terrain et vos besoins.", call: "Nous appeler", quote: "Devis gratuit" },
    en: { badge: "Pricing", title: "Plans for every project", subtitle: "Every fiber project is unique. Our offers adapt to your needs.", recommended: "Recommended", compare: "Offer comparison", feature: "Feature", customTitle: "Custom pricing", customDesc: "Each project is evaluated individually for a tailored quote.", call: "Call us", quote: "Free quote" },
    es: { badge: "Tarifas", title: "Ofertas para cada proyecto", subtitle: "Cada proyecto de fibra es único. Nuestras ofertas se adaptan a su situación.", recommended: "Recomendado", compare: "Comparativa de ofertas", feature: "Funcionalidad", customTitle: "Tarificación a medida", customDesc: "Cada proyecto se estudia individualmente para un presupuesto personalizado.", call: "Llamarnos", quote: "Presupuesto gratis" },
    pt: { badge: "Preços", title: "Ofertas para cada projeto", subtitle: "Cada projeto de fibra é único. Nossas ofertas se adaptam ao seu cenário.", recommended: "Recomendado", compare: "Comparativo de ofertas", feature: "Funcionalidade", customTitle: "Preço sob medida", customDesc: "Cada projeto é analisado individualmente para orçamento personalizado.", call: "Ligar", quote: "Orçamento grátis" },
    nl: { badge: "Prijzen", title: "Aanbiedingen per project", subtitle: "Elk glasvezelproject is uniek. Onze aanbiedingen passen zich aan uw situatie aan.", recommended: "Aanbevolen", compare: "Vergelijking van aanbiedingen", feature: "Functionaliteit", customTitle: "Prijs op maat", customDesc: "Elk project wordt individueel beoordeeld voor een offerte op maat.", call: "Bel ons", quote: "Gratis offerte" },
    gcr: { badge: "Pri", title: "Ofri pou chak projé", subtitle: "Chak projé fib diferan. Ofri nou ka adapté pou sitiyasyon zòt.", recommended: "Rekòmandé", compare: "Konparasyon ofri", feature: "Fonksyon", customTitle: "Pri asou mezi", customDesc: "Chak projé ka étidyé pou fè on devi pèsonalizé.", call: "Rélé nou", quote: "Devi gratis" },
    ar: { badge: "الأسعار", title: "عروض تناسب كل مشروع", subtitle: "كل مشروع ألياف مختلف، وعروضنا تتكيف مع احتياجك.", recommended: "موصى به", compare: "مقارنة العروض", feature: "الميزة", customTitle: "تسعير مخصص", customDesc: "كل مشروع يُدرس بشكل فردي للحصول على عرض مناسب.", call: "اتصل بنا", quote: "عرض مجاني" },
    zh: { badge: "价格方案", title: "适配各类项目的方案", subtitle: "每个光纤项目都不同，我们提供匹配场景的定制方案。", recommended: "推荐", compare: "方案对比", feature: "功能", customTitle: "定制报价", customDesc: "每个项目都会单独评估并提供个性化报价。", call: "致电我们", quote: "免费报价" },
  } as const
  const tr = texts[locale as keyof typeof texts] || texts.fr
  return (
    <>
      <Navbar />
      <main>
        {/* Page Hero */}
        <section className="pt-32 pb-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-slate-50 to-background dark:from-slate-950/50 dark:to-slate-950">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-6 border border-primary/20">
              {tr.badge}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5 text-balance">
              {tr.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              {tr.subtitle}
            </p>
          </div>
        </section>

        {/* Offers grid */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`rounded-2xl p-8 flex flex-col ${
                    offer.highlight
                      ? "bg-[oklch(0.13_0.025_250)] border-2 border-[oklch(0.65_0.13_180/0.5)] shadow-xl shadow-[oklch(0.65_0.13_180/0.15)] relative overflow-hidden"
                      : "bg-card border border-border"
                  }`}
                >
                  {offer.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[oklch(0.65_0.13_180)]" />
                  )}
                  {offer.highlight && (
                    <div className="absolute top-5 right-5 bg-[oklch(0.65_0.13_180)] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {tr.recommended}
                    </div>
                  )}

                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 w-fit ${
                    offer.highlight ? "bg-white/10 text-white/80" : "bg-muted text-foreground"
                  }`}>
                    {offer.badge}
                  </div>

                  <h2 className={`font-display text-2xl font-bold mb-2 ${offer.highlight ? "text-white" : "text-foreground"}`}>
                    {offer.name}
                  </h2>
                  <div className={`text-xl font-bold mb-3 ${offer.highlight ? "text-[oklch(0.65_0.13_180)]" : "text-[oklch(0.50_0.13_180)]"}`}>
                    {offer.price}
                  </div>
                  <p className={`text-sm leading-relaxed mb-7 ${offer.highlight ? "text-white/70" : "text-muted-foreground"}`}>
                    {offer.description}
                  </p>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {offer.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${offer.highlight ? "text-[oklch(0.65_0.13_180)]" : "text-[oklch(0.65_0.13_180)]"}`} />
                        <span className={offer.highlight ? "text-white/80" : "text-foreground/80"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={offer.id === "enterprise" ? "/contact" : "/devis"}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-sm transition-colors ${
                      offer.highlight
                        ? "bg-[oklch(0.65_0.13_180)] text-white hover:bg-[oklch(0.58_0.13_180)]"
                        : "border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {offer.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Comparison table */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
                {tr.compare}
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">{tr.feature}</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Raccordement</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-[oklch(0.50_0.13_180)] bg-[oklch(0.65_0.13_180/0.05)]">Entreprise</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Territoire</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparaisonData.map((row, i) => (
                      <tr key={row.feature} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                        <td className="px-6 py-3.5 text-sm text-foreground">{row.feature}</td>
                        <td className="px-6 py-3.5 text-center">
                          {row.starter ? <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.13_180)] mx-auto" /> : <span className="text-slate-500 dark:text-slate-400/70 text-lg">—</span>}
                        </td>
                        <td className="px-6 py-3.5 text-center bg-[oklch(0.65_0.13_180/0.03)]">
                          {row.pro ? <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.13_180)] mx-auto" /> : <span className="text-slate-500/50 dark:text-slate-400/40 text-lg">—</span>}
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          {row.enterprise ? <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.13_180)] mx-auto" /> : <span className="text-slate-500/50 dark:text-slate-400/40 text-lg">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Info block */}
        <section className="py-12 px-4 md:px-8 lg:px-16 bg-muted/40 border-y border-border">
          <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h3 className="font-display font-bold text-lg text-foreground mb-1">{tr.customTitle}</h3>
              <p className="text-sm text-muted-foreground">
                {tr.customDesc}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="tel:+594 0694435484"
                className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-background transition-colors"
              >
                <Phone className="w-4 h-4" />
                {tr.call}
              </a>
              <Link
                href="/devis"
                className="flex items-center gap-2 px-5 py-2.5 bg-[oklch(0.65_0.13_180)] text-white text-sm font-semibold rounded-lg hover:bg-[oklch(0.58_0.13_180)] transition-colors"
              >
                {tr.quote}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
