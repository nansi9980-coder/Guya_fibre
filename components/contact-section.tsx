"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Send } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export function ContactSection() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const contactInfo = [
    { icon: Phone, label: "Téléphone", value: "+594 694 43 54 84", href: "tel:+594694435484" },
    { icon: Mail, label: "Email", value: "contact@guyafibre.gf", href: "mailto:contact@guyafibre.gf" },
    { icon: MapPin, label: "Siège Social", value: "12 Rue des Palmiers, 97320 SLM", href: "#" },
  ]

  return (
    <section id="contact" className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left: Info */}
          <div>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-primary" />
                <span className="text-[11px] tracking-[0.2em] font-bold uppercase text-primary">Contact</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-normal leading-tight mb-6">
                Parlons de votre <br />
                <span className="font-serif-italic">Prochain Projet</span>
              </h2>
              <p className="text-foreground/60 leading-relaxed max-w-lg">
                Que vous soyez une collectivité, une entreprise ou un bailleur, nos experts sont à votre disposition pour étudier vos besoins en connectivité optique.
              </p>
            </div>

            <div className="space-y-8">
              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-6 group max-w-sm"
                >
                  <div className="w-12 h-12 border border-black/5 dark:border-white/5 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <item.icon className="w-5 h-5 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase font-bold text-foreground/40">{item.label}</p>
                    <p className="text-sm font-bold">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-10 border border-black/5 dark:border-white/5 bg-gray-50/50 dark:bg-zinc-900/50">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase font-bold text-foreground/60">Nom Complet</label>
                <input
                  type="text"
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 p-4 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Jean Dupont"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase font-bold text-foreground/60">Email Professionnel</label>
                <input
                  type="email"
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 p-4 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="jean@entreprise.gf"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase font-bold text-foreground/60">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 p-4 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Décrivez votre projet..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black text-[11px] font-bold tracking-widest uppercase hover:bg-black/90 dark:hover:bg-white/90 transition-all flex items-center justify-center gap-3"
              >
                Envoyer le message
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}