"use client"

import { useEffect, useState } from "react"
import { Phone, Mail, MapPin, Send, CheckCircle, MessageSquare } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { PhoneInput } from "@/components/ui/phone-input"
import { ScrollReveal } from "./scroll-reveal"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://guyafibrebackend-production.up.railway.app'

interface CompanySettings {
  phone: string
  email: string
  address: string
  city: string
}

const DEFAULTS: CompanySettings = {
  phone: "+594 06 94 43 54 84",
  email: "contact@guyafibre.com",
  address: "12 Rue des Palmiers",
  city: "Saint-Laurent-du-Maroni",
}

export function ContactSection() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", countryCode: "+594", message: "" })
  const [company, setCompany] = useState<CompanySettings>(DEFAULTS)

  useEffect(() => {
    fetch(`${API_URL}/api/settings/company/public`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setCompany({
            phone: data.phone || DEFAULTS.phone,
            email: data.email || DEFAULTS.email,
            address: data.address || DEFAULTS.address,
            city: data.city || DEFAULTS.city,
          })
        }
      })
      .catch(() => {})
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Message de ${form.name} — GUYA FIBRE`)
    const body = encodeURIComponent(
      `Nom: ${form.name}\nEmail: ${form.email}\nTéléphone: ${form.countryCode} ${form.phone}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-1/4 h-1/2 bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left — info and direct links */}
          <div className="space-y-12">
            <div>
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold text-primary mb-8 tracking-widest uppercase">
                  <MessageSquare className="w-4 h-4" />
                  <span>{t("contact.title")}</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={1}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 text-balance leading-tight">
                  {t("contact.subtitle")}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={2}>
                <p className="text-muted-foreground text-lg leading-relaxed text-pretty max-w-xl">
                  {t("footer.description")}
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <ScrollReveal delay={3}>
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-6 p-8 glass rounded-3xl border border-border hover:border-primary/40 transition-all duration-500 group shadow-sm hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                    <Phone className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-widest">{t("contact.phone")}</div>
                    <div className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{company.phone}</div>
                  </div>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={4}>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-6 p-8 glass rounded-3xl border border-border hover:border-primary/40 transition-all duration-500 group shadow-sm hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                    <Mail className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-widest">{t("contact.email")}</div>
                    <div className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{company.email}</div>
                  </div>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={4}>
                <div className="flex items-center gap-6 p-8 glass rounded-3xl border border-border group shadow-sm">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-widest">{t("contact.address")}</div>
                    <div className="text-xl font-bold text-foreground">{company.city}</div>
                    <div className="text-sm text-muted-foreground">Guyane française</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right — form */}
          <ScrollReveal delay={2}>
            <div className="bg-card rounded-[3rem] border border-border p-8 md:p-12 shadow-2xl shadow-black/5 dark:shadow-primary/5">
              <div className="mb-10 text-center lg:text-left">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Envoyez-nous un message</h3>
                <p className="text-sm text-muted-foreground">Réponse sous 24h ouvrées garantie.</p>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">{t("common.success")}</h3>
                  <p className="text-muted-foreground">Votre demande a été préparée dans votre application de messagerie.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        {t("contact.name")}
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-background border border-border rounded-2xl text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        {t("contact.phone")}
                      </label>
                      <PhoneInput
                        value={form.phone}
                        onChange={e => setForm(prev => ({...prev, phone: e.target.value}))}
                        countryCode={form.countryCode}
                        onCountryCodeChange={code => setForm(prev => ({...prev, countryCode: code}))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      {t("contact.email")}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-background border border-border rounded-2xl text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      {t("contact.message")}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-background border border-border rounded-2xl text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
                  >
                    <Send className="w-5 h-5" />
                    {t("contact.send")}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}