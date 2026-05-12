"use client"

import { ClipboardList, Compass, HardHat, Cable, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Audit & Diagnostic",
    description: "Visite terrain complète, analyse des besoins, étude du périmètre géographique. Définition clara des objectifs techniques et budgétaires.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Conception Réseau",
    description: "Relevés topographiques précis, modélisation 3D, plans APS/APD/DOE. Conception optimisée adaptée au terrain guyanais (forêt, fleuve, zones urbaines).",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Déploiement Complet",
    description: "Génie civil (tranchées, fourreaux, chambres), tirage fibre optique, soudure par fusion, installation équipements PBO/BPE. Respect calendrier strict.",
  },
  {
    number: "04",
    icon: Cable,
    title: "Qualification & Tests",
    description: "Tests OTDR complets, mesures niveaux optiques, certification conformité normes. Livrables documentés (rapports, schémas, bon de recette).",
  },
  {
    number: "05",
    icon: ShieldCheck,
    title: "Mise en Service Opérationnelle",
    description: "Activation réseau, formation utilisateurs, démarrage maintenance contractuelle 24/7. Support technique permanent garanti.",
  },
]

export function ProcessSection() {
  const { locale } = useLanguage()
  const i18n = {
    fr: {
      badge: "Notre méthode",
      title: "De la conception à la mise en service",
      subtitle: "Un processus rigoureux en 5 étapes, de la première prise de contact jusqu'à l'activation de votre réseau.",
      steps: steps,
    },
    en: {
      badge: "Our method",
      title: "From design to commissioning",
      subtitle: "A rigorous 5-step process, from first contact to full network activation.",
      steps: [
        { ...steps[0], title: "Audit & Diagnosis", description: "Complete site visit, needs analysis, geographic scope study. Clear definition of technical and budget goals." },
        { ...steps[1], title: "Network Design", description: "Accurate surveys, 3D modeling, APS/APD/DOE plans. Optimized design adapted to Guianese terrain." },
        { ...steps[2], title: "Full Deployment", description: "Civil works, fiber pulling, fusion splicing and PBO/BPE installation with strict timeline control." },
        { ...steps[3], title: "Qualification & Testing", description: "Complete OTDR testing, optical level checks, standards compliance and documented deliverables." },
        { ...steps[4], title: "Operational Go-Live", description: "Network activation, user handover and 24/7 support readiness for reliable operations." },
      ],
    },
    es: {
      badge: "Nuestro método",
      title: "De la concepción a la puesta en servicio",
      subtitle: "Un proceso riguroso en 5 etapas, desde el primer contacto hasta la activación de su red.",
      steps: [
        { ...steps[0], title: "Auditoría y diagnóstico", description: "Visita de campo completa, análisis de necesidades y alcance geográfico." },
        { ...steps[1], title: "Diseño de red", description: "Levantamientos precisos, modelado y planos APS/APD/DOE adaptados al terreno." },
        { ...steps[2], title: "Despliegue completo", description: "Obra civil, tendido de fibra, fusión e instalación de equipamientos." },
        { ...steps[3], title: "Calificación y pruebas", description: "Pruebas OTDR, mediciones ópticas y validación de conformidad." },
        { ...steps[4], title: "Puesta en operación", description: "Activación, acompañamiento y soporte técnico continuo." },
      ],
    },
    pt: {
      badge: "Nosso método",
      title: "Da concepção à ativação",
      subtitle: "Um processo rigoroso em 5 etapas, do primeiro contato até a ativação da sua rede.",
      steps: steps,
    },
    nl: {
      badge: "Onze methode",
      title: "Van ontwerp tot ingebruikname",
      subtitle: "Een strikt proces in 5 stappen, van eerste contact tot netwerkactivatie.",
      steps: steps,
    },
    gcr: {
      badge: "Méthòd nou",
      title: "Dépi konsépsyon jis miz an sèrvis",
      subtitle: "On prosesis seryé an 5 pa, dépi premye kontakté jis aktivasyon rézo ou.",
      steps: steps,
    },
    ar: {
      badge: "منهجيتنا",
      title: "من التصميم إلى التشغيل",
      subtitle: "مسار دقيق من 5 مراحل، من أول تواصل حتى تفعيل الشبكة بالكامل.",
      steps: [
        { ...steps[0], title: "تدقيق وتشخيص", description: "زيارة ميدانية شاملة وتحليل الاحتياجات وتحديد النطاق الجغرافي." },
        { ...steps[1], title: "تصميم الشبكة", description: "مسوحات دقيقة ونمذجة وخطط APS/APD/DOE ملائمة للميدان المحلي." },
        { ...steps[2], title: "تنفيذ كامل", description: "أشغال مدنية وسحب الألياف واللحام وتركيب المعدات وفق جدول صارم." },
        { ...steps[3], title: "تأهيل واختبارات", description: "اختبارات OTDR وقياسات ضوئية وتحقق كامل من المطابقة." },
        { ...steps[4], title: "تشغيل فعلي", description: "تفعيل الخدمة وتسليم التشغيل مع دعم فني مستمر." },
      ],
    },
    zh: {
      badge: "我们的流程",
      title: "从设计到正式开通",
      subtitle: "严格的五步流程，从首次沟通到网络全面上线。",
      steps: [
        { ...steps[0], title: "审计与诊断", description: "完整现场勘查、需求分析与地理范围确认。" },
        { ...steps[1], title: "网络设计", description: "精确测绘、建模与 APS/APD/DOE 图纸设计，适配当地环境。" },
        { ...steps[2], title: "全面部署", description: "土建、光缆敷设、熔接与设备安装，严格按计划执行。" },
        { ...steps[3], title: "验收与测试", description: "OTDR 全面测试、光功率测量与合规验证。" },
        { ...steps[4], title: "正式开通", description: "网络开通、用户交付与持续技术保障。" },
      ],
    },
  } as const
  const content = i18n[locale as keyof typeof i18n] || i18n.fr
  return (
    <section className="section-padding bg-secondary dark:bg-card">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5 border border-primary/20">
            {content.badge}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {content.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            {content.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div
            className="hidden lg:block absolute top-[3.25rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {content.steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="flex flex-col items-center text-center relative">
                  {/* Circle */}
                  <div className="relative mb-5">
                    <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center relative z-10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-[9px] font-bold text-primary-foreground">{step.number}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-base font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
