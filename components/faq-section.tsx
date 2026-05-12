"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"
import { ScrollReveal } from "./scroll-reveal"
import { HelpCircle, ArrowRight } from "lucide-react"

export function FAQSection() {
  const { locale } = useLanguage()
  const labels = {
    fr: { badge: "Questions fréquentes", title: "Vos questions, nos réponses", subtitle: "Vous ne trouvez pas la réponse à votre question ? N'hésitez pas à nous contacter directement.", cta: "Poser une question" },
    en: { badge: "FAQ", title: "Your questions, our answers", subtitle: "Can’t find your answer? Contact us directly.", cta: "Ask a question" },
    // ... locales
  } as const
  const text = labels[locale as keyof typeof labels] || labels.fr
  
  const faqsByLocale = {
    fr: [
      {
        q: "Quel est votre délai de déploiement standard ?",
        a: "Selon le projet : un raccordement simple = 3–5 jours. Un déploiement multi-zones = 4–12 semaines. L'étude de faisabilité (2–3 semaines) précise le calendrier.",
      },
      {
        q: "Intervenez-vous en zone isolée de l’Intérieur ?",
        a: "Oui. C’est notre spécialité : accès par pirogue si nécessaire, équipes mobiles et logistique adaptée aux contraintes amazoniennes.",
      },
      {
        q: "FTTH ou FTTO : quelle différence ?",
        a: "FTTH = fibre résidentielle mutualisée. FTTO = fibre dédiée entreprise (SLA, débit garanti, documentation complète).",
      },
      {
        q: "Quel est votre SLA (disponibilité) ?",
        a: "FTTO : SLA jusqu’à 99,9% selon contrat. Maintenance préventive + interventions prioritaires selon criticité.",
      },
      {
        q: "Quel budget prévoir pour un projet fibre ?",
        a: "Le coût dépend du terrain, des distances et du niveau de service. Nous proposons un devis gratuit, détaillé et adapté à la Guyane.",
      },
      {
        q: "Proposez-vous la maintenance après installation ?",
        a: "Oui : maintenance préventive, rapports, astreinte 24/7 et interventions d’urgence selon contrat.",
      },
    ],
    en: [
      { q: "What is your typical deployment timeline?", a: "It depends on scope: simple connection 3–5 days; multi-zone rollout 4–12 weeks. A feasibility study clarifies the schedule." },
      { q: "Do you operate in remote inland areas?", a: "Yes—this is our specialty. We adapt logistics (including river access) and field constraints." },
      { q: "FTTH vs FTTO: what’s the difference?", a: "FTTH is shared residential fiber. FTTO is dedicated business fiber with SLA and guaranteed bandwidth." },
      { q: "What SLA do you offer?", a: "For business links, SLA up to 99.9% depending on contract, with preventive maintenance and priority interventions." },
      { q: "How much does a fiber project cost?", a: "It depends on terrain, distance and service level. We provide a free, detailed quote tailored to French Guiana." },
      { q: "Do you provide post-install maintenance?", a: "Yes: preventive maintenance, reports and 24/7 on-call options." },
    ],
    // ...
  } as const
  const faqs = faqsByLocale[locale as keyof typeof faqsByLocale] || faqsByLocale.fr

  return (
    <section className="section-padding bg-muted/20 relative overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left — header */}
          <div className="lg:sticky lg:top-32 self-start">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold text-primary mb-8 tracking-widest uppercase">
                <HelpCircle className="w-4 h-4" />
                <span>{text.badge}</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance leading-tight">
                {text.title}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 text-pretty">
                {text.subtitle}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={3}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-background border border-border text-foreground font-bold rounded-2xl hover:border-primary/40 hover:text-primary transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5"
              >
                {text.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Right — accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <ScrollReveal key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                  <AccordionItem
                    value={`faq-${i}`}
                    className="glass border-border/40 rounded-3xl px-8 overflow-hidden hover:border-primary/30 transition-all duration-300 data-[state=open]:border-primary/50 data-[state=open]:shadow-2xl data-[state=open]:shadow-primary/5"
                  >
                    <AccordionTrigger className="text-base md:text-lg font-bold text-foreground text-left py-6 hover:no-underline hover:text-primary transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-8 text-sm md:text-base">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
