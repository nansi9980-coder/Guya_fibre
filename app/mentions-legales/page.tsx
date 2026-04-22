"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { useLanguage } from "@/lib/i18n/context"

export default function MentionsLegalesPage() {
  const { locale } = useLanguage()
  const t = {
    fr: {
      title: "Mentions Légales",
      updated: "Dernière mise à jour : Janvier 2026",
      sections: [
        {
          title: "1. Informations légales",
          body: [
            "Raison sociale : GUYA FIBRE SARL",
            "Siège social : 12 Rue des Palmiers, 97320 Saint-Laurent-du-Maroni, Guyane française",
            "SIRET : 123 456 789 00012",
            "Capital social : 10 000 EUR",
            "Téléphone : +594 6 94 43 54 84",
            "Email : contact@guyafibre.com",
            "Directeur de publication : Shivaro Alasa",
          ],
        },
        { title: "2. Hébergement", body: ["Hébergeur : Vercel Inc.", "Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA", "Site web : https://vercel.com"] },
        { title: "3. Propriété intellectuelle", body: ["L'ensemble du contenu du site (textes, images, logos, graphismes) est protégé par les droits de propriété intellectuelle.", "Toute reproduction totale ou partielle est interdite sans autorisation écrite préalable de GUYA FIBRE."] },
        { title: "4. Données personnelles", body: ["Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition.", "Pour exercer vos droits : rgpd@guyafibre.com."] },
        { title: "5. Cookies", body: ["Le site utilise des cookies techniques et analytiques pour améliorer l'expérience utilisateur.", "Vous pouvez configurer votre navigateur pour refuser les cookies."] },
        { title: "6. Responsabilité", body: ["GUYA FIBRE met tout en œuvre pour fournir des informations fiables, sans garantie d'exhaustivité.", "La société ne peut être tenue responsable des dommages liés à l'utilisation du site."] },
        { title: "7. Droit applicable", body: ["Les présentes mentions légales sont soumises au droit français.", "En cas de litige, les tribunaux compétents sont les juridictions françaises."] },
      ],
    },
    en: {
      title: "Legal Notice",
      updated: "Last updated: January 2026",
      sections: [
        { title: "1. Legal information", body: ["Company name: GUYA FIBRE SARL", "Registered office: 12 Rue des Palmiers, 97320 Saint-Laurent-du-Maroni, French Guiana", "SIRET: 123 456 789 00012", "Share capital: EUR 10,000", "Phone: +594 6 94 43 54 84", "Email: contact@guyafibre.com", "Publishing director: Shivaro Alasa"] },
        { title: "2. Hosting", body: ["Hosting provider: Vercel Inc.", "Address: 340 S Lemon Ave #4133, Walnut, CA 91789, USA", "Website: https://vercel.com"] },
        { title: "3. Intellectual property", body: ["All website content is protected by intellectual property laws.", "Any full or partial reproduction is prohibited without prior written authorization."] },
        { title: "4. Personal data", body: ["In accordance with GDPR, you have rights of access, rectification, deletion and objection.", "To exercise your rights: rgpd@guyafibre.com."] },
        { title: "5. Cookies", body: ["This website uses technical and analytics cookies.", "You may configure your browser to refuse cookies."] },
        { title: "6. Liability", body: ["GUYA FIBRE strives to provide reliable information without guaranteeing completeness.", "The company is not liable for damages resulting from site use."] },
        { title: "7. Applicable law", body: ["These legal notices are governed by French law.", "In case of dispute, French courts have jurisdiction."] },
      ],
    },
    es: { title: "Aviso legal", updated: "Última actualización: Enero 2026", sections: [] },
    pt: { title: "Aviso legal", updated: "Última atualização: Janeiro 2026", sections: [] },
    nl: { title: "Juridische kennisgeving", updated: "Laatst bijgewerkt: januari 2026", sections: [] },
    gcr: { title: "Mansyon legal", updated: "Dènnyé mizajou: Janvyé 2026", sections: [] },
    ar: {
      title: "الإشعارات القانونية",
      updated: "آخر تحديث: يناير 2026",
      sections: [
        { title: "1. المعلومات القانونية", body: ["الاسم التجاري: GUYA FIBRE SARL", "المقر: 12 Rue des Palmiers, 97320 Saint-Laurent-du-Maroni, Guyane française", "الهاتف: +594 6 94 43 54 84", "البريد: contact@guyafibre.com", "مدير النشر: Shivaro Alasa"] },
        { title: "2. الاستضافة", body: ["مزود الاستضافة: Vercel Inc.", "الموقع: https://vercel.com"] },
        { title: "3. الملكية الفكرية", body: ["جميع محتويات الموقع محمية بحقوق الملكية الفكرية.", "يُمنع النسخ الكلي أو الجزئي دون إذن كتابي مسبق."] },
        { title: "4. البيانات الشخصية", body: ["وفقًا للائحة GDPR، لك حق الوصول والتصحيح والحذف والاعتراض.", "للتواصل: rgpd@guyafibre.com"] },
        { title: "5. ملفات تعريف الارتباط", body: ["يستخدم الموقع ملفات تعريف ارتباط تقنية وتحليلية.", "يمكنك تعطيلها من إعدادات المتصفح."] },
        { title: "6. المسؤولية", body: ["تسعى GUYA FIBRE لتقديم معلومات دقيقة دون ضمان الشمولية الكاملة.", "لا تتحمل الشركة أضرار الاستخدام غير المباشر للموقع."] },
        { title: "7. القانون المطبق", body: ["تخضع هذه الصفحة للقانون الفرنسي.", "الاختصاص القضائي للمحاكم الفرنسية."] },
      ],
    },
    zh: {
      title: "法律声明",
      updated: "最后更新：2026年1月",
      sections: [
        { title: "1. 法律信息", body: ["公司名称：GUYA FIBRE SARL", "注册地址：12 Rue des Palmiers, 97320 Saint-Laurent-du-Maroni, Guyane française", "电话：+594 6 94 43 54 84", "邮箱：contact@guyafibre.com", "出版负责人：Shivaro Alasa"] },
        { title: "2. 托管服务", body: ["托管商：Vercel Inc.", "官网：https://vercel.com"] },
        { title: "3. 知识产权", body: ["网站全部内容受知识产权法保护。", "未经书面授权，禁止全部或部分复制。"] },
        { title: "4. 个人数据", body: ["根据 GDPR，你享有访问、更正、删除与反对处理等权利。", "联系邮箱：rgpd@guyafibre.com"] },
        { title: "5. Cookie", body: ["网站使用技术与统计类 Cookie。", "你可在浏览器中自行管理或禁用 Cookie。"] },
        { title: "6. 责任声明", body: ["GUYA FIBRE 努力提供准确信息，但不保证绝对完整。", "对因使用网站产生的间接损失不承担责任。"] },
        { title: "7. 适用法律", body: ["本法律声明适用法国法律。", "争议由法国法院管辖。"] },
      ],
    },
  } as const
  const tr = t[locale as keyof typeof t] || t.fr
  const sections = tr.sections.length > 0 ? tr.sections : t.en.sections
  return (
    <>
      <Navbar />
      <main className="min-h-screen brand-dark-bg pt-32 pb-20">
        <div className="container-wide px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">{tr.title}</h1>

            <div className="prose prose-invert prose-lg max-w-none">
              {sections.map((section) => (
                <section key={section.title} className="mb-10">
                  <h2 className="font-display text-2xl font-semibold text-white mb-4 border-b border-[oklch(0.25_0.025_250)] pb-2">
                    {section.title}
                  </h2>
                  <div className="bg-[oklch(0.18_0.025_250)] rounded-lg p-6 border border-[oklch(0.25_0.025_250)]">
                    {section.body.map((line) => (
                      <p key={line} className="text-gray-300 mb-2">
                        {line}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <p className="text-gray-500 text-sm mt-10 pt-6 border-t border-[oklch(0.25_0.025_250)]">{tr.updated}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
