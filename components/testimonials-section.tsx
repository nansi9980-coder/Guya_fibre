"use client"

import { Quote, Star } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const testimonialsByLocale = {
  fr: [
    {
      initials: "MJ",
      name: "Marie-Josèphe L.",
      role: "Directrice d'école",
      company: "Maripasoula",
      rating: 5,
      quote:
        "L'équipe GUYA FIBRE a fait l'impossible : connecter notre école isolée accessible uniquement par pirogue. Travail impeccable, délais tenus, et surtout une équipe qui comprend nos défis uniques. Nos 80 élèves ont maintenant internet fiable pour étudier.",
    },
    {
      initials: "KR",
      name: "Kévin R.",
      role: "Directeur Technique",
      company: "PME Kourou",
      rating: 5,
      quote:
        "FTTO ultra-stable depuis 2 ans. Liaison dédiée 10 Gbps, 99.9% uptime garanti. Réactivité exceptionnelle : problème résolu en 2h. Meilleur choix comparé aux prestataires métropole. Prix agressif, service irréprochable.",
    },
    {
      initials: "CT",
      name: "Collectivité Territoriale",
      role: "Commune de Mana",
      company: "Guyane française",
      rating: 5,
      quote:
        "Partenaire stratégique sur projet infrastructure municipale 45 km. Budget maîtrisé, documentation technique parfaite, suivi post-installation exemplaire. GUYA FIBRE a dépassé attentes. Prêt pour une phase 2.",
    },
  ],
  en: [
    {
      initials: "MJ",
      name: "Marie-Josèphe L.",
      role: "School Principal",
      company: "Maripasoula",
      rating: 5,
      quote:
        "The GUYA FIBRE team achieved the impossible: connecting our remote school accessible only by river boat. Excellent execution, deadlines respected, and a team that truly understands local constraints.",
    },
    {
      initials: "KR",
      name: "Kévin R.",
      role: "Technical Director",
      company: "SME Kourou",
      rating: 5,
      quote:
        "Ultra-stable FTTO service for 2 years. Dedicated 10 Gbps link with 99.9% uptime. Outstanding responsiveness: incidents solved in around 2 hours.",
    },
    {
      initials: "CT",
      name: "Territorial Authority",
      role: "Municipality of Mana",
      company: "French Guiana",
      rating: 5,
      quote:
        "A strategic partner for our 45 km municipal infrastructure project. Controlled budget, excellent technical documentation, and exemplary post-deployment support.",
    },
  ],
  es: [
    {
      initials: "MJ",
      name: "Marie-Josèphe L.",
      role: "Directora escolar",
      company: "Maripasoula",
      rating: 5,
      quote:
        "El equipo de GUYA FIBRE logró lo imposible: conectar nuestra escuela aislada, accesible solo por piragua. Ejecución impecable y plazos cumplidos.",
    },
    {
      initials: "KR",
      name: "Kévin R.",
      role: "Director Técnico",
      company: "PyME Kourou",
      rating: 5,
      quote:
        "FTTO ultraestable desde hace 2 años. Enlace dedicado de 10 Gbps, 99,9% de disponibilidad y una capacidad de respuesta sobresaliente.",
    },
    {
      initials: "CT",
      name: "Colectividad Territorial",
      role: "Comuna de Mana",
      company: "Guayana Francesa",
      rating: 5,
      quote:
        "Socio estratégico en nuestro proyecto municipal de 45 km. Presupuesto controlado, documentación técnica sólida y excelente seguimiento.",
    },
  ],
  pt: [
    {
      initials: "MJ",
      name: "Marie-Josèphe L.",
      role: "Diretora escolar",
      company: "Maripasoula",
      rating: 5,
      quote:
        "A equipe da GUYA FIBRE fez o impossível: conectar nossa escola isolada, acessível apenas por piroga. Execução impecável e prazos respeitados.",
    },
    {
      initials: "KR",
      name: "Kévin R.",
      role: "Diretor Técnico",
      company: "PME Kourou",
      rating: 5,
      quote:
        "FTTO extremamente estável há 2 anos. Link dedicado de 10 Gbps, 99,9% de disponibilidade e resposta muito rápida em incidentes.",
    },
    {
      initials: "CT",
      name: "Coletividade Territorial",
      role: "Comuna de Mana",
      company: "Guiana Francesa",
      rating: 5,
      quote:
        "Parceiro estratégico no nosso projeto municipal de 45 km. Orçamento controlado, documentação técnica excelente e ótimo suporte pós-implantação.",
    },
  ],
  nl: [
    {
      initials: "MJ",
      name: "Marie-Josèphe L.",
      role: "Schooldirecteur",
      company: "Maripasoula",
      rating: 5,
      quote:
        "GUYA FIBRE wist het onmogelijke te doen: onze afgelegen school aansluiten, alleen bereikbaar per boot. Zeer professionele uitvoering en strakke planning.",
    },
    {
      initials: "KR",
      name: "Kévin R.",
      role: "Technisch Directeur",
      company: "MKB Kourou",
      rating: 5,
      quote:
        "FTTO al 2 jaar zeer stabiel. Dedicated 10 Gbps-link, 99,9% uptime en snelle interventie bij incidenten.",
    },
    {
      initials: "CT",
      name: "Territoriale Autoriteit",
      role: "Gemeente Mana",
      company: "Frans-Guyana",
      rating: 5,
      quote:
        "Strategische partner voor een gemeentelijk infrastructuurproject van 45 km. Goede budgetcontrole en sterke technische opvolging.",
    },
  ],
  gcr: [
    {
      initials: "MJ",
      name: "Marie-Josèphe L.",
      role: "Direktris lékol",
      company: "Maripasoula",
      rating: 5,
      quote:
        "Lékip GUYA FIBRE fè sa moun té ka kwè enposib: konekté lékol nou izolé, koté ou pé rivé sèlman an pirog. Travay pwòp épi bon rézilta.",
    },
    {
      initials: "KR",
      name: "Kévin R.",
      role: "Direktè teknik",
      company: "PME Kourou",
      rating: 5,
      quote:
        "FTTO ka maché fò épi stab dépi 2 lanné. Lyen 10 Gbps dédiyé, gwo disponiblité épi entèrvansyon vit.",
    },
    {
      initials: "CT",
      name: "Kolektivité teritoryal",
      role: "Komin Mana",
      company: "Lagwiyàn fransèz",
      rating: 5,
      quote:
        "Bon patnè estratéjik pou projé enfrastrikti minisipal 45 km. Bidjé byen jéré épi bon suiv teknik apré déplwayman.",
    },
  ],
  ar: [
    {
      initials: "MJ",
      name: "Marie-Josèphe L.",
      role: "مديرة مدرسة",
      company: "ماريباسولا",
      rating: 5,
      quote:
        "فريق GUYA FIBRE حقق ما بدا مستحيلاً: ربط مدرستنا المعزولة التي لا يمكن الوصول إليها إلا بالقارب. تنفيذ ممتاز واحترام للآجال.",
    },
    {
      initials: "KR",
      name: "Kévin R.",
      role: "مدير تقني",
      company: "شركة صغيرة - كورو",
      rating: 5,
      quote:
        "خدمة FTTO مستقرة جداً منذ عامين. وصلة مخصصة 10 جيجابت/ث، توفر 99.9% واستجابة سريعة عند الأعطال.",
    },
    {
      initials: "CT",
      name: "الهيئة المحلية",
      role: "بلدية مانا",
      company: "غويانا الفرنسية",
      rating: 5,
      quote:
        "شريك استراتيجي في مشروع بنية تحتية بلدية بطول 45 كم. تحكم جيد في الميزانية وتوثيق فني ممتاز ومتابعة جدية.",
    },
  ],
  zh: [
    {
      initials: "MJ",
      name: "Marie-Josèphe L.",
      role: "学校校长",
      company: "马里帕苏拉",
      rating: 5,
      quote:
        "GUYA FIBRE 团队完成了几乎不可能的任务：为仅能乘船抵达的偏远学校接入网络。执行专业、交付准时，真正理解本地挑战。",
    },
    {
      initials: "KR",
      name: "Kévin R.",
      role: "技术总监",
      company: "库鲁中小企业",
      rating: 5,
      quote:
        "FTTO 两年来非常稳定。10Gbps 专线，99.9% 可用性，出现问题后响应非常快。",
    },
    {
      initials: "CT",
      name: "地方政府",
      role: "马纳市镇",
      company: "法属圭亚那",
      rating: 5,
      quote:
        "在 45 公里市政基础设施项目中是非常可靠的战略伙伴。预算可控、技术文档完善、后续跟进到位。",
    },
  ],
} as const

export function TestimonialsSection() {
  const { locale } = useLanguage()
  const labels = {
    fr: { badge: "Avis clients", title: "Ce que disent nos clients", subtitle: "Des particuliers, entreprises et collectivités de toute la Guyane nous font confiance." },
    en: { badge: "Client reviews", title: "What our clients say", subtitle: "Individuals, businesses and public entities across French Guiana trust us." },
    es: { badge: "Opiniones", title: "Lo que dicen nuestros clientes", subtitle: "Particulares, empresas y entidades públicas confían en nosotros." },
    pt: { badge: "Depoimentos", title: "O que dizem nossos clientes", subtitle: "Particulares, empresas e coletividades confiam em nós em toda a Guiana." },
    nl: { badge: "Klantbeoordelingen", title: "Wat onze klanten zeggen", subtitle: "Particulieren, bedrijven en overheden in heel Frans-Guyana vertrouwen op ons." },
    gcr: { badge: "Avis klyan", title: "Sa klyan nou ka di", subtitle: "Patikilyé, biznis épi kolektivité ka fè konfyans an nou toutpatou an Lagwiyàn." },
    ar: { badge: "آراء العملاء", title: "ماذا يقول عملاؤنا", subtitle: "أفراد وشركات وجهات عامة في كل غويانا يثقون بخدماتنا." },
    zh: { badge: "客户评价", title: "客户怎么说", subtitle: "法属圭亚那各地的个人、企业与公共机构都在信赖我们。" },
  } as const
  const text = labels[locale as keyof typeof labels] || labels.fr
  const testimonials = testimonialsByLocale[locale as keyof typeof testimonialsByLocale] || testimonialsByLocale.fr
  const starsLabel = locale === "en"
    ? "stars out of 5"
    : locale === "es"
      ? "estrellas de 5"
      : locale === "pt"
        ? "estrelas de 5"
        : locale === "nl"
          ? "sterren op 5"
          : locale === "gcr"
            ? "zetwal asi 5"
            : locale === "ar"
              ? "نجوم من 5"
              : locale === "zh"
                ? "星（满分5）"
                : "étoiles sur 5"
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5 border border-primary/20">
            {text.badge}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {text.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            {text.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="bg-card rounded-2xl border border-border p-7 flex flex-col gap-5 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-primary/5 transition-all duration-200"
            >
              <Quote className="w-8 h-8 text-primary/40" aria-hidden="true" />

              <blockquote className="text-sm text-foreground/80 leading-relaxed flex-1 text-pretty">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold font-display text-sm shrink-0">
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role} — {t.company}
                  </div>
                </div>
                <div className="flex gap-0.5" role="img" aria-label={`${t.rating} ${starsLabel}`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
