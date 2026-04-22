"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { PhoneInput } from "@/components/ui/phone-input"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageCircle,
  CheckCircle2,
  Navigation,
  Car,
  Plane
} from "lucide-react"
import { toast } from "sonner"
import { contactApi, CreateContactRequest } from "@/lib/api/contact.api"
import { useLanguage } from "@/lib/i18n/context"

const contactInfo = [
  {
    icon: MapPin,
    titleKey: "contact.address",
    content: "12 Rue des Palmiers",
    subcontent: "97320 Saint-Laurent-du-Maroni, Guyane française",
  },
  {
    icon: Phone,
    titleKey: "contact.phone",
    content: "+594 6 94 43 54 84",
    subcontent: "Lun-Ven: 8h-18h | Sam: 8h-12h",
  },
  {
    icon: Mail,
    titleKey: "contact.email",
    content: "contact@guyafibre.com",
    subcontent: "Réponse sous 24h",
  },
  {
    icon: Clock,
    titleKey: "contact.hours",
    content: "Lundi - Vendredi: 8h - 18h",
    subcontent: "Samedi: 8h - 12h",
  },
]

const directions = [
  {
    icon: Car,
    titleKey: "contact.byCar",
    descriptionKey: "contact.byCarDesc",
    timeKey: "contact.byCarTime",
  },
  {
    icon: Plane,
    titleKey: "contact.byPlane",
    descriptionKey: "contact.byPlaneDesc",
    timeKey: "contact.byPlaneTime",
  },
  {
    icon: Navigation,
    titleKey: "contact.gpsCoordinates",
    descriptionKey: "contact.gpsCoordinatesDesc",
    timeKey: "contact.gpsCoordinatesTime",
  },
]

export default function ContactPage() {
  const { t } = useLanguage()
  const COMPANY_LOCATION = {
    lat: 5.5026,
    lng: -54.0333,
    label: "GUYA FIBRE",
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+594",
    subject: "",
    address: "",
    postalCode: "",
    city: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const submitData: CreateContactRequest = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}` || undefined,
        subject: formData.subject,
        address: formData.address || undefined,
        postalCode: formData.postalCode || undefined,
        city: formData.city || undefined,
        message: formData.message,
      }
      
      await contactApi.create(submitData)
      setIsSubmitted(true)
    } catch (error: any) {
      const message = error.response?.data?.message || "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer."
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="pt-32 pb-16 px-4 md:px-8">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.65_0.13_180)]/10 border border-[oklch(0.65_0.13_180)]/30 mb-6">
                <MessageCircle className="w-4 h-4 text-[oklch(0.65_0.13_180)]" />
                <span className="text-[oklch(0.65_0.13_180)] text-sm font-medium">{t("nav.contact")}</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {t("contact.title")}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("contact.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="pb-12 px-4 md:px-8">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-[oklch(0.65_0.13_180)]/10 flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-[oklch(0.65_0.13_180)]" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">{t(info.titleKey)}</h3>
                    <p className="text-foreground font-medium">{info.content}</p>
                    <p className="text-muted-foreground text-sm mt-1">{info.subcontent}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Map & Form Section */}
        <section className="pb-20 px-4 md:px-8">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Map */}
              <div className="space-y-6">
                <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] relative">
                      <iframe
                        src={`https://www.google.com/maps?q=${COMPANY_LOCATION.lat},${COMPANY_LOCATION.lng}&z=18&hl=fr&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                      />
                      <div className="absolute top-4 left-4 z-10 rounded-full bg-background/90 backdrop-blur-sm border border-border px-3 py-1.5 shadow-md flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                        </span>
                        <span className="text-xs font-semibold text-foreground">{COMPANY_LOCATION.label}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Directions */}
                <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-6">{t("contact.directions")}</h3>
                    <div className="space-y-6">
                      {directions.map((dir, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[oklch(0.65_0.13_180)]/10 flex items-center justify-center flex-shrink-0">
                            <dir.icon className="w-5 h-5 text-[oklch(0.65_0.13_180)]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground">{t(dir.titleKey)}</h4>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-[oklch(0.75_0.16_65)]/10 text-[oklch(0.75_0.16_65)]">
                                {t(dir.timeKey)}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {t(dir.descriptionKey)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      asChild
                      className="w-full mt-6 bg-[oklch(0.65_0.13_180)] hover:bg-[oklch(0.55_0.13_180)] text-white"
                    >
                      <a 
                        href="https://www.google.com/maps/dir/?api=1&destination=5.5026,-54.0333" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        {t("contact.openInGoogleMaps")}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-[oklch(0.65_0.13_180)]/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-[oklch(0.65_0.13_180)]" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">{t("contact.messageSent")}</h3>
                      <p className="text-muted-foreground mb-6">{t("contact.thankYou")}</p>
                      <Button 
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="border-[oklch(0.65_0.13_180)] text-[oklch(0.65_0.13_180)]"
                      >
                        {t("contact.anotherMessage")}
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-display text-2xl font-semibold text-foreground mb-6">{t("contact.sendMessage")}</h3>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">{t("contact.name")}</label>
                            <Input 
                              value={formData.name}
                              onChange={e => setFormData({...formData, name: e.target.value})}
                              className="bg-white dark:bg-slate-950 border-gray-300 dark:border-gray-700 text-foreground"
                              placeholder={t("contact.fullName")}
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">{t("contact.email")}</label>
                            <Input 
                              type="email"
                              value={formData.email}
                              onChange={e => setFormData({...formData, email: e.target.value})}
                              className="bg-white dark:bg-slate-950 border-gray-300 dark:border-gray-700 text-foreground"
                              placeholder="votre@email.com"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm text-muted-foreground mb-2">{t("contact.phone")}</label>
                            <PhoneInput
                              value={formData.phone}
                              onChange={e => setFormData({...formData, phone: e.target.value})}
                              countryCode={formData.countryCode}
                              onCountryCodeChange={code => setFormData({...formData, countryCode: code})}
                              placeholder="6 94 00 00 00"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">{t("contact.subject")}</label>
                            <Input 
                              value={formData.subject}
                              onChange={e => setFormData({...formData, subject: e.target.value})}
                              className="bg-white dark:bg-slate-950 border-gray-300 dark:border-gray-700 text-foreground"
                              placeholder={t("contact.projectSubject")}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-muted-foreground mb-2">{t("contact.address")}</label>
                          <Input 
                            value={formData.address}
                            onChange={e => setFormData({...formData, address: e.target.value})}
                            className="bg-white dark:bg-slate-950 border-gray-300 dark:border-gray-700 text-foreground"
                            placeholder={t("contact.address")}
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">{t("contact.postalCode")}</label>
                            <Input 
                              value={formData.postalCode}
                              onChange={e => setFormData({...formData, postalCode: e.target.value})}
                              className="bg-white dark:bg-slate-950 border-gray-300 dark:border-gray-700 text-foreground"
                              placeholder="97320"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">{t("contact.city")}</label>
                            <Input 
                              value={formData.city}
                              onChange={e => setFormData({...formData, city: e.target.value})}
                              className="bg-white dark:bg-slate-950 border-gray-300 dark:border-gray-700 text-foreground"
                              placeholder={t("contact.city")}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-muted-foreground mb-2">{t("contact.message")}</label>
                          <Textarea 
                            rows={6}
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                            className="bg-white dark:bg-slate-950 border-gray-300 dark:border-gray-700 text-foreground resize-none"
                            placeholder="Décrivez votre demande..."
                          />
                        </div>
                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[oklch(0.65_0.13_180)] hover:bg-[oklch(0.55_0.13_180)] text-white h-12"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              {t("contact.sendMessage")}
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
