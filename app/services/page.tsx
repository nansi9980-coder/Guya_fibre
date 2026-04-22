"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CTABanner } from "@/components/cta-banner"
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react"
import { Compass, HardHat, Home, Zap, Server, Settings } from "lucide-react"
import * as Icons from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const ICON_MAP: Record<string, any> = {
  Compass,
  HardHat,
  Home,
  Zap,
  Server,
  Settings,
  Wifi: Icons.Wifi,
  PenTool: Icons.PenTool,
  Wrench: Icons.Wrench,
}

export default function ServicesPage() {
  const { locale, t } = useLanguage()
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
      const response = await fetch(`${API_URL}/api/services-content`)
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      } else {
        setServices(getDefaultServices())
      }
    } catch {
      setServices(getDefaultServices())
    } finally {
      setIsLoading(false)
    }
  }

  const getDefaultServices = () => [
    {
      id: "etudes",
      slug: "etudes",
      number: "01",
      icon: "Compass",
      titleFr: "Études & Ingénierie",
      descFr: "Avant tout déploiement, nous réalisons une analyse complète du terrain, de la réglementation et des contraintes techniques pour garantir la faisabilité du projet.",
      features: ["Études de faisabilité FTTH / FTTO", "Conception de réseaux", "Gestion SIG et cartographie", "Rapports techniques documentés"],
      image: "/images/service-etudes.jpg",
    },
    {
      id: "deploiement",
      slug: "deploiement",
      number: "02",
      icon: "HardHat",
      titleFr: "Déploiement de Réseaux",
      descFr: "Du génie civil au raccordement optique, nos équipes assurent l'intégralité du déploiement avec le matériel adapté aux conditions spécifiques du terrain guyanais.",
      features: ["Génie civil et tranchées", "Réseaux aériens", "Tirage de fibre et soudure", "Installation des boîtiers"],
      image: "/images/service-deploiement.jpg",
    },
    {
      id: "raccordement",
      slug: "raccordement",
      number: "03",
      icon: "Home",
      titleFr: "Raccordement Clients",
      descFr: "Du PBO jusqu'à l'abonné, nous assurons une mise en service soignée, testée et validée avec remise d'un bon de recette signé.",
      features: ["FTTH particuliers", "FTTO entreprises", "Tests et mesures OTDR", "Assistance à la connexion"],
      image: "/images/service-raccordement.jpg",
    },
    {
      id: "maintenance",
      slug: "maintenance",
      number: "04",
      icon: "Zap",
      titleFr: "Maintenance & Dépannage",
      descFr: "La continuité de service est garantie grâce à une maintenance préventive rigoureuse et une capacité d'intervention rapide.",
      features: ["Maintenance préventive", "Localisation de pannes", "Astreinte 7j/7", "Contrats de maintenance"],
      image: "/images/service-maintenance.jpg",
    },
    {
      id: "entreprises",
      slug: "entreprises",
      number: "05",
      icon: "Server",
      titleFr: "Solutions Entreprises",
      descFr: "Nous accompagnons les acteurs publics et privés dans leurs projets d'infrastructure numérique.",
      features: ["Réseaux LAN/WAN", "Aménagement numérique", "Partenariats collectivités", "Accompagnement global"],
      image: "/images/service-entreprises.jpg",
    },
  ]

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

  const displayServices = services.length > 0 ? services : getDefaultServices()
  const pageText = {
    fr: {
      badge: "Nos prestations",
      title: "Services fibre optique en Guyane",
      subtitle: "De l'étude de faisabilité à la maintenance long terme, GUYA FIBRE couvre l'intégralité de la chaîne de valeur des réseaux fibre, avec une expertise unique adaptée au terrain guyanais.",
    },
    en: {
      badge: "Our services",
      title: "Fiber optic services in French Guiana",
      subtitle: "From feasibility studies to long-term maintenance, GUYA FIBRE covers the full fiber value chain with local field expertise.",
    },
    es: {
      badge: "Nuestros servicios",
      title: "Servicios de fibra óptica en Guayana Francesa",
      subtitle: "Desde el estudio de viabilidad hasta el mantenimiento, GUYA FIBRE cubre toda la cadena de valor de la fibra.",
    },
    pt: {
      badge: "Nossos serviços",
      title: "Serviços de fibra óptica na Guiana Francesa",
      subtitle: "Da viabilidade à manutenção de longo prazo, a GUYA FIBRE cobre toda a cadeia de valor da fibra.",
    },
    nl: {
      badge: "Onze diensten",
      title: "Glasvezeldiensten in Frans-Guyana",
      subtitle: "Van haalbaarheidsstudies tot langetermijnonderhoud, GUYA FIBRE dekt de volledige glasvezelketen.",
    },
    gcr: {
      badge: "Sèrvis nou",
      title: "Sèrvis fib optik an Lagwiyàn",
      subtitle: "Dépi létid fèzabilité jis antrétyenn long tèm, GUYA FIBRE ka kouvè tout chenn valè fib-la.",
    },
    ar: {
      badge: "خدماتنا",
      title: "خدمات الألياف الضوئية في غويانا الفرنسية",
      subtitle: "من دراسة الجدوى إلى الصيانة طويلة الأمد، تقدم GUYA FIBRE سلسلة خدمات ألياف متكاملة.",
    },
    zh: {
      badge: "我们的服务",
      title: "法属圭亚那光纤服务",
      subtitle: "从可行性研究到长期运维，GUYA FIBRE 提供完整的光纤价值链服务。",
    },
  } as const
  const text = pageText[locale as keyof typeof pageText] || pageText.fr
  const localizedField = (service: any, base: string) => {
    const suffix: Record<string, string> = { fr: "Fr", en: "En", es: "Es", pt: "Pt", nl: "Nl", gcr: "Gcr", ar: "Ar", zh: "Zh" }
    const key = `${base}${suffix[locale] || "Fr"}`
    return service[key] || service[`${base}Fr`] || service[base] || ""
  }
  const servicesByLocale: Record<string, Record<string, { title: string; desc: string; features: string[] }>> = {
    en: {
      etudes: { title: "Studies & Engineering", desc: "Before deployment, we perform full terrain, regulation and technical analysis to guarantee project feasibility.", features: ["FTTH / FTTO feasibility studies", "Network design", "GIS and mapping management", "Documented technical reports"] },
      deploiement: { title: "Network Deployment", desc: "From civil works to optical connection, our teams handle full deployment with equipment adapted to local constraints.", features: ["Civil works and trenches", "Aerial networks", "Fiber pulling and splicing", "Distribution box installation"] },
      raccordement: { title: "Customer Connection", desc: "From distribution point to end customer, we deliver a validated service activation with acceptance documentation.", features: ["Residential FTTH", "Business FTTO", "OTDR tests and measurements", "Connection support"] },
      maintenance: { title: "Maintenance & Troubleshooting", desc: "Service continuity is ensured through preventive maintenance and rapid intervention capability.", features: ["Preventive maintenance", "Fault location", "24/7 on-call", "Maintenance contracts"] },
      entreprises: { title: "Enterprise Solutions", desc: "We support public and private actors with digital infrastructure projects.", features: ["LAN/WAN networks", "Digital infrastructure planning", "Public-sector partnerships", "End-to-end support"] },
    },
    es: {
      etudes: { title: "Estudios e Ingeniería", desc: "Antes del despliegue, realizamos un análisis completo del terreno, normativa y requisitos técnicos.", features: ["Estudios FTTH / FTTO", "Diseño de red", "Gestión SIG y cartografía", "Informes técnicos documentados"] },
      deploiement: { title: "Despliegue de Redes", desc: "Desde obra civil hasta conexión óptica, realizamos el despliegue integral.", features: ["Obra civil y zanjas", "Redes aéreas", "Tendido y empalme de fibra", "Instalación de cajas"] },
      raccordement: { title: "Conexión de Clientes", desc: "Del punto de distribución al abonado, activación validada con acta técnica.", features: ["FTTH residencial", "FTTO empresas", "Pruebas OTDR", "Asistencia de conexión"] },
      maintenance: { title: "Mantenimiento y Soporte", desc: "Continuidad del servicio mediante mantenimiento preventivo y respuesta rápida.", features: ["Mantenimiento preventivo", "Localización de fallas", "Guardia 24/7", "Contratos de mantenimiento"] },
      entreprises: { title: "Soluciones Empresariales", desc: "Acompañamos proyectos de infraestructura digital pública y privada.", features: ["Redes LAN/WAN", "Planificación digital", "Alianzas institucionales", "Acompañamiento integral"] },
    },
    pt: {
      etudes: { title: "Estudos e Engenharia", desc: "Antes da implantação, realizamos análise completa do terreno, normas e requisitos técnicos.", features: ["Estudos FTTH / FTTO", "Projeto de rede", "Gestão SIG e cartografia", "Relatórios técnicos documentados"] },
      deploiement: { title: "Implantação de Redes", desc: "Do civil ao óptico, executamos a implantação completa com equipamentos adequados ao território.", features: ["Obra civil e valas", "Redes aéreas", "Lançamento e fusão de fibra", "Instalação de caixas"] },
      raccordement: { title: "Conexão de Clientes", desc: "Do ponto de distribuição ao assinante, ativação validada com documentação técnica.", features: ["FTTH residencial", "FTTO empresarial", "Testes OTDR", "Suporte de conexão"] },
      maintenance: { title: "Manutenção e Suporte", desc: "Continuidade de serviço com manutenção preventiva e resposta rápida.", features: ["Manutenção preventiva", "Localização de falhas", "Plantão 24/7", "Contratos de manutenção"] },
      entreprises: { title: "Soluções Empresariais", desc: "Apoiamos projetos digitais para setores público e privado.", features: ["Redes LAN/WAN", "Planejamento digital", "Parcerias institucionais", "Suporte completo"] },
    },
    nl: {
      etudes: { title: "Studies & Engineering", desc: "Voor uitrol voeren wij een volledige analyse uit van terrein, regelgeving en technische eisen.", features: ["FTTH / FTTO haalbaarheidsstudies", "Netwerkontwerp", "GIS/cartografie", "Technische rapportage"] },
      deploiement: { title: "Netwerkuitrol", desc: "Van civiele werken tot optische aansluiting: volledige uitvoering met lokaal geschikte middelen.", features: ["Civiele werken en sleuven", "Luchtlijnen", "Vezeltrekken en lassen", "Installatie verdeelpunten"] },
      raccordement: { title: "Klantenaansluiting", desc: "Van distributiepunt tot abonnee met gevalideerde oplevering.", features: ["FTTH residentieel", "FTTO bedrijven", "OTDR-tests", "Aansluithulp"] },
      maintenance: { title: "Onderhoud & Storing", desc: "Dienstcontinuïteit via preventief onderhoud en snelle interventie.", features: ["Preventief onderhoud", "Storingslokalisatie", "24/7 wachtdienst", "Onderhoudscontracten"] },
      entreprises: { title: "Zakelijke Oplossingen", desc: "Wij ondersteunen publieke en private digitale infrastructuurprojecten.", features: ["LAN/WAN-netwerken", "Digitale planning", "Publieke partnerschappen", "Volledige begeleiding"] },
    },
    gcr: {
      etudes: { title: "Étid épi Enjènyri", desc: "Avan déplwayman, nou ka fè analiz tèren, règleman épi kontrent teknik pou garanti fèzabilité.", features: ["Étid FTTH / FTTO", "Konsépsyon rézo", "Jèsyon SIG épi katografi", "Rapò teknik dokimanté"] },
      deploiement: { title: "Déplwayman Rézo", desc: "Dépi jéni sivil jis rakorèman optik, nou ka fè tout déplwayman-an.", features: ["Jéni sivil épi tranché", "Rézo aérien", "Tiraj fib épi soudaj", "Instalasyon bwat"] },
      raccordement: { title: "Rakorèman Klyan", desc: "Dépi PBO jis abonné-a, nou ka fè miz an sèrvis validé épi bon rékèt.", features: ["FTTH patikilyé", "FTTO biznis", "Tès OTDR", "Asistans koneksyon"] },
      maintenance: { title: "Antrétyenn épi Dépannaj", desc: "Kontinite sèrvis ka garanti épi antrétyenn préventif épi entèrvansyon vit.", features: ["Antrétyenn préventif", "Lokalizasyon pann", "Astreynt 24/7", "Kontra antrétyenn"] },
      entreprises: { title: "Solisyon Biznis", desc: "Nou ka akonpanyé aktè piblik épi privé an projé enfrastrikti dijital.", features: ["Rézo LAN/WAN", "Aménajman dijital", "Patnarya kolektivité", "Akonpayman global"] },
    },
    ar: {
      etudes: { title: "الدراسات والهندسة", desc: "قبل أي تنفيذ، نجري تحليلًا كاملًا للميدان واللوائح والمتطلبات التقنية لضمان الجدوى.", features: ["دراسات FTTH / FTTO", "تصميم الشبكة", "إدارة GIS والخرائط", "تقارير تقنية موثقة"] },
      deploiement: { title: "نشر الشبكات", desc: "من الأشغال المدنية إلى الربط البصري، ننفذ كامل المشروع بمعدات مناسبة للبيئة المحلية.", features: ["أشغال مدنية وخنادق", "شبكات هوائية", "سحب ولحام الألياف", "تركيب الصناديق"] },
      raccordement: { title: "ربط العملاء", desc: "من نقطة التوزيع إلى العميل، تفعيل مُتحقق مع وثائق استلام.", features: ["FTTH للأفراد", "FTTO للشركات", "اختبارات OTDR", "دعم الاتصال"] },
      maintenance: { title: "الصيانة والدعم", desc: "استمرارية الخدمة عبر صيانة وقائية وقدرة تدخل سريع.", features: ["صيانة وقائية", "تحديد الأعطال", "دعم 24/7", "عقود صيانة"] },
      entreprises: { title: "حلول الأعمال", desc: "ندعم الجهات العامة والخاصة في مشاريع البنية الرقمية.", features: ["شبكات LAN/WAN", "تخطيط رقمي", "شراكات مؤسسية", "مرافقة شاملة"] },
    },
    zh: {
      etudes: { title: "勘察与工程设计", desc: "在部署前，我们会对地形、法规和技术约束进行完整分析，确保项目可行。", features: ["FTTH / FTTO 可行性研究", "网络设计", "GIS 管理与制图", "技术文档报告"] },
      deploiement: { title: "网络部署实施", desc: "从土建到光纤接入，我们提供全流程部署，适配当地环境条件。", features: ["土建与沟槽", "架空网络", "光纤敷设与熔接", "配线箱安装"] },
      raccordement: { title: "客户接入开通", desc: "从分纤点到用户端，提供规范化测试、验收与开通。", features: ["家庭 FTTH", "企业 FTTO", "OTDR 测试与测量", "接入支持"] },
      maintenance: { title: "运维与故障处理", desc: "通过预防性维护与快速响应，保障业务连续性。", features: ["预防性维护", "故障定位", "7x24 值守", "运维合同"] },
      entreprises: { title: "企业级解决方案", desc: "为公共与私营机构提供数字基础设施项目支持。", features: ["LAN/WAN 网络", "数字化基础设施规划", "政企合作", "全流程支持"] },
    },
  }
  const getLocalizedService = (service: any) => {
    const local = servicesByLocale[locale]?.[service.id]
    return {
      title: local?.title ?? localizedField(service, "title"),
      desc: local?.desc ?? localizedField(service, "desc"),
      features: local?.features ?? service.features ?? [],
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-slate-50 to-background dark:from-slate-950/50 dark:to-slate-950">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-muted rounded-full text-sm text-muted-foreground font-medium mb-6">
              {text.badge}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5 text-balance">
              {text.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              {text.subtitle}
            </p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-wide flex flex-col gap-20">
            {displayServices.map((service: any, index: number) => {
              const IconComponent = ICON_MAP[service.icon] || Compass
              const isEven = index % 2 === 1
              const local = getLocalizedService(service)
              return (
                <article
                  key={service.id || service.slug}
                  id={service.slug}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className={isEven ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center gap-2 bg-[oklch(0.65_0.13_180)] text-white text-xs font-bold px-3 py-1.5 rounded-md">
                        <span>{service.number}</span>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">
                      {local.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-pretty">
                      {local.desc}
                    </p>
                    <ul className="flex flex-col gap-3 mb-7">
                      {(local.features || []).map((f: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                          <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.13_180)] shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.65_0.13_180)] text-white text-sm font-semibold rounded-lg hover:bg-[oklch(0.58_0.13_180)] transition-colors"
                    >
                      {t("nav.quote")}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className={`relative rounded-2xl overflow-hidden h-72 lg:h-96 ${isEven ? "lg:order-1" : ""}`}>
                    <Image
                      src={service.image || "/images/service-default.jpg"}
                      alt={localizedField(service, "title")}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
