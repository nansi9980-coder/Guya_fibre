"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

interface CompanySettings {
  name: string
  phone: string
  email: string
  address: string
  city: string
  logo?: string
}

const DEFAULTS: CompanySettings = {
  name: "GUYA FIBRE",
  phone: "+594 06 94 43 54 84",
  email: "contact@guyafibre.com",
  address: "12 Rue des Palmiers",
  city: "Saint-Laurent-du-Maroni",
}

export function Footer() {
  const { t } = useLanguage()
  const [company, setCompany] = useState<CompanySettings>(DEFAULTS)

  useEffect(() => {
    fetch(`${API_URL}/api/settings/company/public`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setCompany({
            name: data.name || DEFAULTS.name,
            phone: data.phone || DEFAULTS.phone,
            email: data.email || DEFAULTS.email,
            address: data.address || DEFAULTS.address,
            city: data.city || DEFAULTS.city,
            logo: data.logo || undefined,
          })
        }
      })
      .catch(() => {})
  }, [])

  const brandLine1 = t("footer.brandLine1")
  const brandLine2 = t("footer.brandLine2")
  const locationCity = company.city || t("footer.locationCity")
  const locationCountry = t("footer.locationCountry")
  const phoneRegion = t("footer.phoneRegion")

  const logoSrc = company.logo
    ? (company.logo.startsWith('http') ? company.logo : `${API_URL}${company.logo}`)
    : "/images/logo.jpg"

  const services = [
    { href: "/services#etudes", labelKey: "services.studies" },
    { href: "/services#deploiement", labelKey: "services.deployment" },
    { href: "/services#raccordement", labelKey: "services.connection" },
    { href: "/services#maintenance", labelKey: "services.maintenance" },
    { href: "/services#entreprises", labelKey: "services.enterprise" },
  ]

  const legal = [
    { href: "/", labelKey: "nav.home" },
    { href: "/apropos", labelKey: "nav.about" },
    { href: "/mentions-legales", labelKey: "footer.legalNotice" },
    { href: "/politique-confidentialite", labelKey: "footer.privacy" },
  ]

  return (
    <footer className="bg-secondary dark:bg-card text-foreground border-t border-border">
      <div className="container-wide px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              {company.logo ? (
                // Logo personnalisé venant du backend — on l'affiche tel quel
                <Image
                  src={logoSrc}
                  alt={company.name}
                  width={160}
                  height={56}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                // Logo par défaut — s'adapte au fond du footer
                // Footer fond clair en mode clair → logo NOIR
                // Footer fond sombre en mode sombre → logo BLANC
                <div className="relative h-12 w-40">
                  <Image
                    src="/site-icon-dark.png"
                    alt={company.name}
                    fill
                    className="object-contain object-left block dark:hidden"
                  />
                  <Image
                    src="/site-icon.png"
                    alt=""
                    aria-hidden="true"
                    fill
                    className="object-contain object-left hidden dark:block"
                  />
                </div>
              )}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t("footer.description")}
            </p>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5 font-display">
              {t("nav.services")}
            </h3>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(s.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Liens */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5 font-display">
              {t("footer.quickLinks")}
            </h3>
            <ul className="flex flex-col gap-3">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5 font-display">
              {t("nav.contact")}
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">{phoneRegion}</span>
                    <span className="font-medium text-foreground">{company.phone}</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span>{company.email}</span>
                </a>
              </li>
              <li>
                <Link
                  href="/localisation"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="block text-foreground">{locationCity}</span>
                    <span className="text-xs text-muted-foreground">{locationCountry}</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Animated Logo Banner */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-r from-muted via-card to-muted p-6">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-[100%] animate-[spin_8s_linear_infinite] bg-gradient-conic from-primary/20 via-transparent to-primary/20" />
            </div>
            <div className="absolute inset-[1px] rounded-xl bg-card" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute -inset-2 bg-primary/20 rounded-xl blur-xl animate-pulse" />
                  {company.logo ? (
                    <Image
                      src={logoSrc}
                      alt={company.name}
                      width={180}
                      height={64}
                      className="relative h-14 w-auto object-contain"
                    />
                  ) : (
                    <div className="relative h-14 w-44">
                      <Image
                        src="/site-icon-dark.png"
                        alt={company.name}
                        fill
                        className="object-contain object-left block dark:hidden"
                      />
                      <Image
                        src="/site-icon.png"
                        alt=""
                        aria-hidden="true"
                        fill
                        className="object-contain object-left hidden dark:block"
                      />
                    </div>
                  )}
                </div>
                <div className="hidden md:block h-12 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
                <div className="text-center md:text-left">
                  <p className="text-lg font-display font-bold text-foreground">
                    {brandLine1}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {brandLine2}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">{company.phone}</span>
                  <span className="sm:hidden">{t("common.callUs")}</span>
                </a>
                <Link
                  href="/devis"
                  className="flex items-center gap-2 px-5 py-3 rounded-lg border border-primary text-primary font-semibold text-sm hover:bg-primary/10 transition-all"
                >
                  {t("nav.quote")}
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <p className="text-sm text-muted-foreground text-center md:mx-8">
            &copy; {new Date().getFullYear()} {company.name}. {t("footer.rights")}.
          </p>
          <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>
      </div>
    </footer>
  )
}