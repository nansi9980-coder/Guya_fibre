"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CTABanner } from "@/components/cta-banner"
import { MapPin, Calendar, ArrowRight, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function ProjetsPage() {
  const { locale, t } = useLanguage()
  const tagLabels: Record<string, Record<string, string>> = {
    FTTH: { fr: "FTTH", en: "FTTH", es: "FTTH", pt: "FTTH", nl: "FTTH", gcr: "FTTH", ar: "FTTH", zh: "FTTH" },
    FTTO: { fr: "FTTO", en: "FTTO", es: "FTTO", pt: "FTTO", nl: "FTTO", gcr: "FTTO", ar: "FTTO", zh: "FTTO" },
    "Génie civil": { fr: "Génie civil", en: "Civil works", es: "Obra civil", pt: "Obra civil", nl: "Civiele werken", gcr: "Jéni sivil", ar: "أشغال مدنية", zh: "土建工程" },
    Soudure: { fr: "Soudure", en: "Splicing", es: "Empalme", pt: "Fusão", nl: "Lassen", gcr: "Soudaj", ar: "لحام", zh: "熔接" },
    "Soudure fusion": { fr: "Soudure fusion", en: "Fusion splicing", es: "Fusión", pt: "Fusão", nl: "Fusielassen", gcr: "Fusion", ar: "لحام انصهاري", zh: "熔接" },
    Urbain: { fr: "Urbain", en: "Urban", es: "Urbano", pt: "Urbano", nl: "Stedelijk", gcr: "Vil", ar: "حضري", zh: "城市" },
    Aérien: { fr: "Aérien", en: "Aerial", es: "Aéreo", pt: "Aéreo", nl: "Lucht", gcr: "Aérien", ar: "هوائي", zh: "架空" },
    "Zone rurale": { fr: "Zone rurale", en: "Rural", es: "Rural", pt: "Rural", nl: "Landelijk", gcr: "Kanpay", ar: "ريفي", zh: "乡村" },
    Maintenance: { fr: "Maintenance", en: "Maintenance", es: "Mantenimiento", pt: "Manutenção", nl: "Onderhoud", gcr: "Antrétyenn", ar: "صيانة", zh: "运维" },
    Urgence: { fr: "Urgence", en: "Emergency", es: "Urgencia", pt: "Urgência", nl: "Nood", gcr: "Ijans", ar: "طارئ", zh: "应急" },
    "7j/7": { fr: "7j/7", en: "24/7", es: "24/7", pt: "24/7", nl: "24/7", gcr: "24/7", ar: "24/7", zh: "7x24" },
    Éducation: { fr: "Éducation", en: "Education", es: "Educación", pt: "Educação", nl: "Onderwijs", gcr: "Edikasyon", ar: "تعليم", zh: "教育" },
    "Infra réseau": { fr: "Infra réseau", en: "Network infra", es: "Infra red", pt: "Infra rede", nl: "Netwerk infra", gcr: "Enfra rézo", ar: "بنية شبكة", zh: "网络基础" },
    Câblage: { fr: "Câblage", en: "Cabling", es: "Cableado", pt: "Cabeamento", nl: "Bekabeling", gcr: "Kab", ar: "تسليك", zh: "布线" },
    Support: { fr: "Support", en: "Support", es: "Soporte", pt: "Suporte", nl: "Support", gcr: "Sipò", ar: "دعم", zh: "支持" },
    Nationwide: { fr: "Territoire", en: "Territory-wide", es: "Territorio", pt: "Território", nl: "Gebied", gcr: "Téritwa", ar: "على الإقليم", zh: "全域" },
  }
  const displayTag = (tag: string) => tagLabels[tag]?.[locale] || tag
  const projectLocaleMap: Record<string, Record<string, { title?: string; scope?: string; desc?: string; location?: string }>> = {
    zh: {
      "ftth-cayenne": { title: "FTTH 部署 — 卡宴中心", scope: "1200 户接入", desc: "在卡宴市中心完成 FTTH 网络整体部署。", location: "卡宴" },
      "lycee-melkior": { title: "校园光纤网络 — Melkior-Garré 高中", scope: "楼宇互联 10Gbps", desc: "为校园不同建筑部署完整光纤网络。", location: "卡宴" },
      "communes-ouest": { title: "网络延伸 — 西部市镇", scope: "45 公里架空光纤", desc: "在圭亚那西部多市镇完成 45 公里架空光纤延伸。", location: "圣洛朗-迪马罗尼" },
      "maintenance-operateur": { title: "运维合同 — 国家运营商", scope: "全境 7x24 值守", desc: "覆盖全域的预防性维护与应急值守服务。", location: "法属圭亚那全境" },
    },
    ar: {
      "ftth-cayenne": { title: "نشر FTTH — وسط كايين", scope: "1200 خط موصول", desc: "تنفيذ كامل لشبكة FTTH في وسط مدينة كايين.", location: "كايين" },
      "lycee-melkior": { title: "شبكة ألياف — ثانوية Melkior-Garré", scope: "ربط بين المباني 10Gbps", desc: "تركيب شبكة ألياف متكاملة لربط مباني المؤسسة التعليمية.", location: "كايين" },
      "communes-ouest": { title: "توسعة الشبكة — بلديات الغرب", scope: "45 كم ألياف هوائية", desc: "توسعة الألياف الهوائية لربط عدة بلديات في غرب غويانا.", location: "سان لوران دو ماروني" },
      "maintenance-operateur": { title: "عقد صيانة — مشغل وطني", scope: "دعم 24/7 على كامل الإقليم", desc: "صيانة وقائية واستجابة سريعة لشبكة تغطي كامل الإقليم.", location: "كامل غويانا الفرنسية" },
    },
  }
  const localizedProjectValue = (project: any, field: "title" | "scope" | "desc" | "location") => {
    const fromMap = projectLocaleMap[locale]?.[project.id]?.[field]
    if (fromMap) return fromMap
    const suffix: Record<string, string> = { fr: "Fr", en: "En", es: "Es", pt: "Pt", nl: "Nl", gcr: "Gcr", ar: "Ar", zh: "Zh" }
    const key = `${field}${suffix[locale] || "Fr"}`
    if (field === "desc") return project[key] || project.descFr || project.description || ""
    return project[key] || project[`${field}Fr`] || project[field] || ""
  }
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const allTagLabel = locale === "en" ? "All" : locale === "es" ? "Todos" : locale === "pt" ? "Todos" : locale === "nl" ? "Alle" : locale === "gcr" ? "Tout" : locale === "ar" ? "الكل" : locale === "zh" ? "全部" : "Tous"
  const [filterTag, setFilterTag] = useState(allTagLabel)

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    setFilterTag(allTagLabel)
  }, [allTagLabel])

  const fetchProjects = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
      const response = await fetch(`${API_URL}/api/realisations`)
      if (response.ok) {
        const data = await response.json()
        setProjects(data.data || data)
      } else {
        setProjects(getDefaultProjects())
      }
    } catch {
      setProjects(getDefaultProjects())
    } finally {
      setIsLoading(false)
    }
  }

  const getDefaultProjects = () => [
    {
      id: "ftth-cayenne",
      slug: "ftth-cayenne",
      titleFr: "Déploiement FTTH — Cayenne Centre",
      location: "Cayenne",
      date: "2024",
      scope: "1 200 prises raccordées",
      descFr: "Déploiement complet d'un réseau FTTH dans le centre-ville de Cayenne.",
      tags: ["FTTH", "Génie civil", "Soudure", "Urbain"],
      images: ["/images/project-cayenne.jpg"],
      client: "Opérateur national",
    },
    {
      id: "lycee-melkior",
      slug: "lycee-melkior",
      titleFr: "Réseau fibre — Lycée Melkior-Garré",
      location: "Cayenne",
      date: "2024",
      scope: "Câblage inter-bâtiments 10 Gbps",
      descFr: "Installation d'un réseau fibre optique complet reliant les différents bâtiments du lycée.",
      tags: ["FTTO", "Éducation", "Infra réseau", "Câblage"],
      images: ["/images/project-lycee.jpg"],
      client: "Collectivité régionale",
    },
    {
      id: "communes-ouest",
      slug: "communes-ouest",
      titleFr: "Extension réseau — Communes Ouest",
      location: "Saint-Laurent-du-Maroni",
      date: "2023",
      scope: "45 km de fibre aérienne",
      descFr: "Extension du réseau de fibre aérienne sur 45 km reliant plusieurs communes de l'ouest guyanais.",
      tags: ["Aérien", "Zone rurale", "Tirage", "Longue distance"],
      images: ["/images/project-rural.jpg"],
      client: "Opérateur régional",
    },
    {
      id: "maintenance-operateur",
      slug: "maintenance-operateur",
      titleFr: "Contrat de maintenance — Opérateur national",
      location: "Toute la Guyane",
      date: "2023 — présent",
      scope: "Astreinte 24/7 sur tout le territoire",
      descFr: "Contrat d'astreinte et de maintenance préventive pour un réseau fibre couvrant l'ensemble du territoire.",
      tags: ["Maintenance", "OTDR", "Urgence", "7j/7"],
      images: ["/images/project-maintenance.jpg"],
      client: "Opérateur national",
    },
  ]

  const allTags = [allTagLabel, ...new Set(projects.flatMap((p) => p.tags || []))]

  const filteredProjects = filterTag === allTagLabel
    ? projects
    : projects.filter((p) => (p.tags || []).includes(filterTag))

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </>
    )
  }

  const displayProjects = filteredProjects.length > 0 ? filteredProjects : getDefaultProjects()
  const text = {
    fr: { badge: "Portfolio", title: "Nos réalisations en Guyane", subtitle: "De Cayenne aux villages les plus isolés, découvrez les projets fibre que nous avons réalisés.", filter: "Filtrer :", nextProject: "Votre projet sera notre prochaine réalisation", nextSubtitle: "Que ce soit en zone urbaine ou dans les sites les plus isolés, nous avons l'expertise pour connecter votre infrastructure.", nextCta: "Démarrer mon projet", stats: ["Projets réalisés", "Fibre aérienne", "Prises raccordées", "Astreinte active"] },
    en: { badge: "Portfolio", title: "Our projects in French Guiana", subtitle: "From Cayenne to remote villages, discover our delivered fiber projects.", filter: "Filter:", nextProject: "Your project can be our next success", nextSubtitle: "Urban area or remote site, we have the expertise to connect your infrastructure.", nextCta: "Start my project", stats: ["Projects completed", "Aerial fiber", "Connected lines", "On-call support"] },
    es: { badge: "Portafolio", title: "Nuestros proyectos en Guayana", subtitle: "De Cayena a los pueblos más aislados, descubra nuestros proyectos de fibra.", filter: "Filtrar:", nextProject: "Su proyecto será nuestra próxima realización", nextSubtitle: "En zona urbana o aislada, tenemos la experiencia para conectar su infraestructura.", nextCta: "Iniciar mi proyecto", stats: ["Proyectos", "Fibra aérea", "Conexiones", "Soporte activo"] },
    pt: { badge: "Portfólio", title: "Nossos projetos na Guiana", subtitle: "De Caiena às áreas mais isoladas, veja nossos projetos de fibra.", filter: "Filtrar:", nextProject: "Seu projeto pode ser o próximo", nextSubtitle: "Em área urbana ou remota, temos experiência para conectar sua infraestrutura.", nextCta: "Iniciar meu projeto", stats: ["Projetos", "Fibra aérea", "Conexões", "Suporte ativo"] },
    nl: { badge: "Portfolio", title: "Onze projecten in Frans-Guyana", subtitle: "Van Cayenne tot afgelegen dorpen: ontdek onze glasvezelrealisaties.", filter: "Filter:", nextProject: "Uw project wordt onze volgende realisatie", nextSubtitle: "Stedelijk of afgelegen, wij hebben de expertise om uw infrastructuur te verbinden.", nextCta: "Start mijn project", stats: ["Projecten", "Luchtglasvezel", "Aansluitingen", "Actieve wachtdienst"] },
    gcr: { badge: "Travay", title: "Travay nou an Lagwiyàn", subtitle: "Soti Kayèn jis an vilaj pli izolé, gadé projé fib nou réalizé.", filter: "Triyé :", nextProject: "Projé ou ké pwochen réalisasyon nou", nextSubtitle: "Vil ouswa zòn izolé, nou ni ekspètiz pou konèkté enfrastrikti ou.", nextCta: "Kòmansé projé mwen", stats: ["Travay fèt", "Fib aérien", "Priz rakòré", "Astreynt aktif"] },
    ar: { badge: "الأعمال", title: "مشاريعنا في غويانا الفرنسية", subtitle: "من كايين إلى القرى المعزولة، اكتشف مشاريع الألياف التي أنجزناها.", filter: "تصفية:", nextProject: "قد يكون مشروعك إنجازنا القادم", nextSubtitle: "سواء في المدن أو المناطق المعزولة، لدينا الخبرة لربط بنيتكم التحتية.", nextCta: "ابدأ مشروعي", stats: ["مشاريع منجزة", "ألياف هوائية", "وصلات", "دعم نشط"] },
    zh: { badge: "项目集", title: "我们在法属圭亚那的案例", subtitle: "从卡宴到偏远村镇，查看我们完成的光纤项目。", filter: "筛选：", nextProject: "你的项目将成为我们的下一项成果", nextSubtitle: "无论城市还是偏远地区，我们都有能力完成高质量连接。", nextCta: "启动我的项目", stats: ["已完成项目", "架空光纤", "已接入线路", "值守支持"] },
  } as const
  const tr = text[locale as keyof typeof text] || text.fr

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-slate-50 to-background dark:from-slate-950/50 dark:to-slate-950">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-12">
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                { value: "150+", label: tr.stats[0] },
                { value: "45 km", label: tr.stats[1] },
                { value: "1200+", label: tr.stats[2] },
                { value: "7j/7", label: tr.stats[3] },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-card rounded-xl border border-border">
                  <div className="font-display text-2xl font-bold text-[oklch(0.65_0.13_180)] mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="flex flex-wrap gap-2 mb-10">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mr-2 self-center">{tr.filter}</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                    filterTag === tag
                      ? "bg-[oklch(0.65_0.13_180)] text-white"
                      : "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary-foreground"
                  }`}
                >
                  {tag === allTagLabel ? allTagLabel : displayTag(tag)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayProjects.map((project: any) => (
                <article
                  key={project.id || project.slug}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.images?.[0] || "/images/project-default.jpg"}
                      alt={localizedProjectValue(project, "title")}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                      {(project.tags || []).slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-[10px] font-semibold bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded-md">
                          {displayTag(tag)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-xs text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[oklch(0.65_0.13_180)]" />
                        {localizedProjectValue(project, "location")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[oklch(0.65_0.13_180)]" />
                        {project.date}
                      </span>
                      {project.client && (
                        <span className="ml-auto text-[oklch(0.50_0.13_180)] font-medium">{project.client}</span>
                      )}
                    </div>

                    <h2 className="font-display text-xl font-bold text-foreground mb-2">
                      {localizedProjectValue(project, "title")}
                    </h2>

                    <div className="text-sm font-semibold text-[oklch(0.50_0.13_180)] mb-3">{localizedProjectValue(project, "scope")}</div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {localizedProjectValue(project, "desc")}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-slate-900 border-y border-gray-200 dark:border-gray-800">
          <div className="container-wide text-center max-w-xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-3 text-balance">
              {tr.nextProject}
            </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-pretty">
              {tr.nextSubtitle}
            </p>
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[oklch(0.65_0.13_180)] text-white font-semibold rounded-lg hover:bg-[oklch(0.58_0.13_180)] transition-colors"
            >
              {tr.nextCta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
