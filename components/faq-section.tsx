"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"

export function FAQSection() {
  const { locale } = useLanguage()
  const labels = {
    fr: { badge: "Questions fréquentes", title: "Vos questions, nos réponses", subtitle: "Vous ne trouvez pas la réponse à votre question ? N'hésitez pas à nous contacter directement.", cta: "Poser une question" },
    en: { badge: "FAQ", title: "Your questions, our answers", subtitle: "Can’t find your answer? Contact us directly.", cta: "Ask a question" },
    es: { badge: "Preguntas frecuentes", title: "Tus preguntas, nuestras respuestas", subtitle: "¿No encuentra su respuesta? Contáctenos directamente.", cta: "Hacer una pregunta" },
    pt: { badge: "Perguntas frequentes", title: "Suas perguntas, nossas respostas", subtitle: "Não encontrou a resposta? Fale conosco diretamente.", cta: "Fazer uma pergunta" },
    nl: { badge: "Veelgestelde vragen", title: "Uw vragen, onze antwoorden", subtitle: "Vindt u uw antwoord niet? Neem direct contact met ons op.", cta: "Een vraag stellen" },
    gcr: { badge: "Kèsyon souvan", title: "Kèsyon zòt, répons nou", subtitle: "Si ou pa ka jwenn répons-la, kontakté nou dirèkman.", cta: "Pozé on kèsyon" },
    ar: { badge: "الأسئلة الشائعة", title: "أسئلتكم وإجاباتنا", subtitle: "لم تجد الإجابة؟ تواصل معنا مباشرة.", cta: "اطرح سؤالًا" },
    zh: { badge: "常见问题", title: "你的问题，我们来解答", subtitle: "如果没有找到答案，欢迎直接联系我们。", cta: "提交问题" },
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
    es: [
      { q: "¿Cuál es el plazo típico de despliegue?", a: "Depende del alcance: conexión simple 3–5 días; despliegue multi-zona 4–12 semanas. El estudio de viabilidad fija el calendario." },
      { q: "¿Intervienen en zonas aisladas del interior?", a: "Sí. Es nuestra especialidad: logística adaptada, incluso acceso por río si es necesario." },
      { q: "FTTH vs FTTO: ¿cuál es la diferencia?", a: "FTTH es fibra residencial compartida. FTTO es fibra dedicada para empresas con SLA." },
      { q: "¿Qué SLA ofrecen?", a: "Hasta 99,9% según contrato, con mantenimiento preventivo e intervenciones prioritarias." },
      { q: "¿Cuánto cuesta un proyecto de fibra?", a: "Depende del terreno, distancia y nivel de servicio. Presupuesto gratuito y detallado." },
      { q: "¿Ofrecen mantenimiento después de la instalación?", a: "Sí: mantenimiento preventivo, informes y opciones de guardia 24/7." },
    ],
    pt: [
      { q: "Qual é o prazo típico de implantação?", a: "Depende do escopo: ligação simples 3–5 dias; implantação multi-zonas 4–12 semanas. O estudo define o cronograma." },
      { q: "Vocês atuam em áreas isoladas do interior?", a: "Sim. É nossa especialidade, com logística adaptada às condições locais." },
      { q: "FTTH vs FTTO: qual a diferença?", a: "FTTH é fibra residencial compartilhada. FTTO é fibra dedicada para empresas com SLA." },
      { q: "Qual SLA vocês oferecem?", a: "Até 99,9% conforme contrato, com manutenção preventiva e atendimento prioritário." },
      { q: "Quanto custa um projeto de fibra?", a: "Varia por terreno, distância e nível de serviço. Orçamento gratuito e detalhado." },
      { q: "Vocês fazem manutenção após a instalação?", a: "Sim: manutenção preventiva, relatórios e opção de plantão 24/7." },
    ],
    nl: [
      { q: "Wat is jullie gemiddelde doorlooptijd?", a: "Afhankelijk van scope: eenvoudige aansluiting 3–5 dagen; uitrol 4–12 weken. Een haalbaarheidsstudie bepaalt de planning." },
      { q: "Werken jullie in afgelegen binnenlandgebieden?", a: "Ja. We passen logistiek en uitvoering aan, inclusief riviertransport waar nodig." },
      { q: "FTTH vs FTTO: wat is het verschil?", a: "FTTH is gedeelde residentiële glasvezel. FTTO is dedicated glasvezel voor bedrijven met SLA." },
      { q: "Welke SLA bieden jullie?", a: "Tot 99,9% afhankelijk van contract, met preventief onderhoud en prioritaire interventies." },
      { q: "Wat kost een glasvezelproject?", a: "Afhankelijk van terrein, afstand en serviceniveau. Gratis en gedetailleerde offerte." },
      { q: "Doen jullie onderhoud na oplevering?", a: "Ja: preventief onderhoud, rapportage en 24/7 opties." },
    ],
    gcr: [
      { q: "Konmen tan on déplwayman ka pran?", a: "Sa dépend projé-a: ti rakorèman 3–5 jou, gran déplwayman 4–12 semèn. Létid ka fixé dat-la." },
      { q: "Zòt ka alé an zòn izolé?", a: "Wi. Sé spesyalité nou: logistik adapté, pirog si fo, lékip mobil." },
      { q: "FTTH vs FTTO, ki diferans?", a: "FTTH sé pou lakay, souvan mutualizé. FTTO sé fib dédiyé pou biznis, épi SLA." },
      { q: "Ki SLA zòt ka bay?", a: "Jiska 99.9% selon kontra, épi antrétyenn préventif épi entèrvansyon priyorité." },
      { q: "Konbyen sa ka kouté?", a: "Sa dépend tèren, distans, sèrvis. Nou ka fè devi gratis épi klè." },
      { q: "Zòt ka fè antrétyenn apré?", a: "Wi: antrétyenn préventif, rapò, astreynt selon kontra." },
    ],
    ar: [
      { q: "ما مدة التنفيذ المعتادة؟", a: "بحسب النطاق: اتصال بسيط 3–5 أيام، وتنفيذ واسع 4–12 أسبوعًا. دراسة الجدوى تحدد الجدول." },
      { q: "هل تعملون في المناطق الداخلية المعزولة؟", a: "نعم، هذه من تخصصاتنا مع لوجستيات مناسبة حتى للوصول النهري." },
      { q: "ما الفرق بين FTTH وFTTO؟", a: "FTTH ألياف منزلية مشتركة، وFTTO ألياف مخصصة للأعمال مع SLA." },
      { q: "ما مستوى SLA المتاح؟", a: "حتى 99.9% حسب العقد، مع صيانة وقائية وتدخلات ذات أولوية." },
      { q: "كم تكلفة مشروع ألياف؟", a: "تختلف حسب التضاريس والمسافات ومستوى الخدمة. نقدم عرضًا مجانيًا ومفصلاً." },
      { q: "هل توفرون صيانة بعد التركيب؟", a: "نعم: صيانة وقائية وتقارير وخيارات دعم 24/7." },
    ],
    zh: [
      { q: "通常部署周期多久？", a: "视规模而定：简单接入 3–5 天，多区域部署 4–12 周。可行性研究会给出明确计划。" },
      { q: "能否覆盖偏远内陆地区？", a: "可以，这是我们的优势。会按地形与交通条件制定合适的实施与运输方案。" },
      { q: "FTTH 和 FTTO 有何区别？", a: "FTTH 为家庭共享接入；FTTO 为企业专线（SLA、带宽保障、完整交付文档）。" },
      { q: "可提供什么 SLA？", a: "根据合同最高可到 99.9%，包含预防性维护与优先响应。" },
      { q: "项目费用如何计算？", a: "取决于地形、距离与服务等级。我们提供免费且清晰的报价。" },
      { q: "是否提供后续运维？", a: "是的：预防性维护、报告与 7x24 值守选项。" },
    ],
  } as const
  const faqs = faqsByLocale[locale as keyof typeof faqsByLocale] || faqsByLocale.fr
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — header */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5 border border-primary/20">
              {text.badge}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              {text.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-pretty">
              {text.subtitle}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm font-medium rounded-lg hover:bg-card transition-colors"
            >
              {text.cta}
            </Link>
          </div>

          {/* Right — accordion */}
          <div>
            <Accordion type="single" collapsible className="flex flex-col gap-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card/80 dark:bg-secondary/60 border border-border/60 rounded-xl px-5 overflow-hidden hover:border-border hover:bg-card dark:hover:bg-secondary transition-all data-[state=open]:border-primary/50 data-[state=open]:bg-card dark:data-[state=open]:bg-secondary data-[state=open]:shadow-lg"
                >
                  <AccordionTrigger className="text-sm font-semibold text-foreground text-left py-4 hover:no-underline hover:text-primary transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
