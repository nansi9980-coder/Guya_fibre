"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Shield, Lock, Eye, Database, Mail, Clock } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function PolitiqueConfidentialitePage() {
  const { locale } = useLanguage()
  const text = {
    fr: {
      badge: "Protection des données",
      title: "Politique de Confidentialité",
      updated: "Dernière mise à jour : Janvier 2026",
      introTitle: "Introduction",
      intro: "GUYA FIBRE s'engage à protéger la vie privée des utilisateurs de son site et de ses services, conformément au RGPD.",
      dataTitle: "Données collectées",
      dataList: [
        "Données d'identification : nom, email, téléphone",
        "Données professionnelles : entreprise, fonction, adresse",
        "Données de navigation : IP, navigateur, pages visitées",
        "Données projet : besoins exprimés et documents transmis",
      ],
      purposeTitle: "Finalités du traitement",
      purposeList: [
        "Répondre aux demandes de devis et de contact",
        "Gérer la relation commerciale",
        "Améliorer nos services et la qualité du site",
        "Respecter les obligations légales",
      ],
      retentionTitle: "Durée de conservation",
      retentionList: [
        "Demandes de contact : jusqu'à 3 ans",
        "Données clients : durée contractuelle + 5 ans",
        "Données de navigation : 13 mois maximum",
      ],
      rightsTitle: "Vos droits",
      rightsList: [
        "Droit d'accès",
        "Droit de rectification",
        "Droit à l'effacement",
        "Droit à la portabilité",
        "Droit d'opposition et de limitation",
      ],
      contactTitle: "Contact",
      contactText: "Pour toute demande RGPD, contactez-nous à rgpd@guyafibre.com.",
    },
    en: {
      badge: "Data protection",
      title: "Privacy Policy",
      updated: "Last updated: January 2026",
      introTitle: "Introduction",
      intro: "GUYA FIBRE is committed to protecting user privacy in accordance with GDPR.",
      dataTitle: "Data collected",
      dataList: ["Identification data: name, email, phone", "Business data: company, role, address", "Browsing data: IP, browser, visited pages", "Project data: request details and uploaded documents"],
      purposeTitle: "Processing purposes",
      purposeList: ["Respond to contact and quote requests", "Manage customer relationship", "Improve website and services", "Comply with legal obligations"],
      retentionTitle: "Retention period",
      retentionList: ["Contact requests: up to 3 years", "Customer data: contract period + 5 years", "Browsing data: up to 13 months"],
      rightsTitle: "Your rights",
      rightsList: ["Right of access", "Right to rectification", "Right to erasure", "Right to portability", "Right to object and restrict processing"],
      contactTitle: "Contact",
      contactText: "For GDPR requests, contact us at rgpd@guyafibre.com.",
    },
    es: { badge: "Protección de datos", title: "Política de privacidad", updated: "Última actualización: Enero 2026", introTitle: "Introducción", intro: "GUYA FIBRE protege su privacidad conforme al RGPD.", dataTitle: "Datos recopilados", dataList: ["Identificación", "Profesionales", "Navegación", "Proyecto"], purposeTitle: "Finalidades", purposeList: ["Responder solicitudes", "Gestionar relación comercial", "Mejorar servicios", "Cumplimiento legal"], retentionTitle: "Conservación", retentionList: ["Contacto: 3 años", "Clientes: contrato + 5 años", "Navegación: 13 meses"], rightsTitle: "Sus derechos", rightsList: ["Acceso", "Rectificación", "Supresión", "Portabilidad", "Oposición"], contactTitle: "Contacto", contactText: "Para RGPD: rgpd@guyafibre.com." },
    pt: { badge: "Proteção de dados", title: "Política de Privacidade", updated: "Última atualização: Janeiro 2026", introTitle: "Introdução", intro: "A GUYA FIBRE protege sua privacidade em conformidade com o RGPD.", dataTitle: "Dados coletados", dataList: ["Identificação", "Profissionais", "Navegação", "Projeto"], purposeTitle: "Finalidades", purposeList: ["Responder solicitações", "Gerir relação comercial", "Melhorar serviços", "Cumprimento legal"], retentionTitle: "Retenção", retentionList: ["Contato: 3 anos", "Clientes: contrato + 5 anos", "Navegação: 13 meses"], rightsTitle: "Seus direitos", rightsList: ["Acesso", "Retificação", "Exclusão", "Portabilidade", "Oposição"], contactTitle: "Contato", contactText: "Para RGPD: rgpd@guyafibre.com." },
    nl: { badge: "Gegevensbescherming", title: "Privacybeleid", updated: "Laatst bijgewerkt: januari 2026", introTitle: "Inleiding", intro: "GUYA FIBRE beschermt uw privacy conform de AVG.", dataTitle: "Verzamelde gegevens", dataList: ["Identificatie", "Zakelijke gegevens", "Browsegegevens", "Projectgegevens"], purposeTitle: "Doeleinden", purposeList: ["Aanvragen beantwoorden", "Commerciële relatie beheren", "Diensten verbeteren", "Wettelijke naleving"], retentionTitle: "Bewaartermijn", retentionList: ["Contact: 3 jaar", "Klanten: contract + 5 jaar", "Navigatie: 13 maanden"], rightsTitle: "Uw rechten", rightsList: ["Inzage", "Rectificatie", "Verwijdering", "Portabiliteit", "Bezwaar"], contactTitle: "Contact", contactText: "Voor AVG-verzoeken: rgpd@guyafibre.com." },
    gcr: { badge: "Pwotèksyon done", title: "Politik konfidansyalité", updated: "Dènnyé mizajou: Janvyé 2026", introTitle: "Entrodiksyon", intro: "GUYA FIBRE ka pwotéjé vi priv zòt dapré règleman RGPD.", dataTitle: "Done kolekté", dataList: ["Done idantifikasyon", "Done profèsyonèl", "Done navigasyon", "Done projé"], purposeTitle: "Poukisa nou ka sèvi épi yo", purposeList: ["Réponn mandé", "Jéré relasyon kliyan", "Amélioré sèvis", "Respékte lwa"], retentionTitle: "Konbyen tan", retentionList: ["Kontakté: 3 lanné", "Klyan: kontra + 5 lanné", "Navigasyon: 13 mwa"], rightsTitle: "Dwa zòt", rightsList: ["Aksè", "Rèktifikasyon", "Efásman", "Portabilité", "Opozisyon"], contactTitle: "Kontakté", contactText: "Pou RGPD: rgpd@guyafibre.com." },
    ar: { badge: "حماية البيانات", title: "سياسة الخصوصية", updated: "آخر تحديث: يناير 2026", introTitle: "مقدمة", intro: "تلتزم GUYA FIBRE بحماية خصوصية المستخدمين وفقًا لـ GDPR.", dataTitle: "البيانات المجمعة", dataList: ["بيانات الهوية", "بيانات مهنية", "بيانات التصفح", "بيانات المشروع"], purposeTitle: "أغراض المعالجة", purposeList: ["الرد على الطلبات", "إدارة العلاقة التجارية", "تحسين الخدمات", "الالتزام القانوني"], retentionTitle: "مدة الاحتفاظ", retentionList: ["طلبات التواصل: 3 سنوات", "بيانات العملاء: مدة العقد + 5 سنوات", "التصفح: 13 شهرًا"], rightsTitle: "حقوقكم", rightsList: ["حق الوصول", "حق التصحيح", "حق الحذف", "حق النقل", "حق الاعتراض"], contactTitle: "اتصال", contactText: "لطلبات GDPR: rgpd@guyafibre.com." },
    zh: { badge: "数据保护", title: "隐私政策", updated: "最后更新：2026年1月", introTitle: "简介", intro: "GUYA FIBRE 承诺依据 GDPR 保护用户隐私。", dataTitle: "收集的数据", dataList: ["身份信息", "职业信息", "浏览信息", "项目信息"], purposeTitle: "处理目的", purposeList: ["回复咨询与报价", "管理客户关系", "优化网站与服务", "履行法律义务"], retentionTitle: "保存期限", retentionList: ["联系请求：3年", "客户数据：合同期+5年", "浏览数据：13个月"], rightsTitle: "你的权利", rightsList: ["访问权", "更正权", "删除权", "可携权", "反对与限制处理"], contactTitle: "联系方式", contactText: "GDPR 请求请发送至：rgpd@guyafibre.com。" },
  } as const
  const tr = text[locale as keyof typeof text] || text.fr
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="pt-32 pb-16 px-4 md:px-8 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">{tr.badge}</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                {tr.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {tr.updated}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-20 px-4 md:px-8">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto space-y-12">
              
              {/* Introduction */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary" />
                  {tr.introTitle}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {tr.intro}
                </p>
              </div>

              {/* Données collectées */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Database className="w-6 h-6 text-primary" />
                  {tr.dataTitle}
                </h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>{tr.dataTitle}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    {tr.dataList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Finalités */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-primary" />
                  {tr.purposeTitle}
                </h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>{tr.purposeTitle}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    {tr.purposeList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Durée de conservation */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" />
                  {tr.retentionTitle}
                </h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>{tr.retentionTitle}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    {tr.retentionList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Droits */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  {tr.rightsTitle}
                </h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>{tr.rightsTitle}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    {tr.rightsList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-primary/5 rounded-2xl border border-primary/20 p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" />
                  {tr.contactTitle}
                </h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>{tr.contactText}</p>
                  <ul className="space-y-2">
                    <li><strong>Email</strong> : rgpd@guyafibre.com</li>
                    <li><strong>Courrier</strong> : GUYA FIBRE - Service RGPD, Saint-Laurent-du-Maroni, 97320 Guyane française</li>
                    <li><strong>Téléphone</strong> : +594 694 43 54 84</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
