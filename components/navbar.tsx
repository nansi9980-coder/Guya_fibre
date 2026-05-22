'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLanguage } from '@/lib/i18n/context'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()
  const isHome = pathname === '/'

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/apropos', label: t('nav.about') },
    { href: '/services#etudes', label: t('services.studies') },
    { href: '/offres', label: t('nav.offers') },
    { href: '/contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Navbar transparente partout → logo BLANC partout pour être visible sur tous les backgrounds
  const forceWhiteLogo = true

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-transparent border-transparent shadow-none'
      )}
    >
      <div className="mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-6 lg:px-10 max-w-[1600px]">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {/*
            Sur la home (forceWhiteLogo=true) → toujours logo BLANC, car la navbar est transparente sur fond hero sombre.
            Sur les autres pages → bascule selon le thème :
            - site-icon.png       → BLANCHE → mode CLAIR
            - site-icon-dark.png  → NOIRE   → mode SOMBRE
            Pour changer les logos, modifier les src dans les Image ci-dessous
          */}
          <div className="relative w-32 h-10 md:w-40 md:h-12">
            {forceWhiteLogo ? (
              <>
                {/* Logo pour la page d'accueil (toujours blanc) - icône dans public/images/site-icon.png */}
                <Image
                  src="/images/site-icon.png"
                  alt="GUYA FIBRE"
                  fill
                  className="object-contain"
                  priority
                />
              </>
            ) : (
              <>
                {/* Logo pour mode clair - icône dans public/images/site-icon.png */}
                <Image
                  src="/images/site-icon-dark.png"
                  alt="GUYA FIBRE"
                  fill
                  className="object-contain block dark:hidden"
                  priority
                />
                {/* Logo pour mode sombre - icône dans public/images/site-icon-dark.png */}
                <Image
                  src="/images/site-icon-dark.png"
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-contain hidden dark:block"
                  priority
                />
              </>
            )}
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === link.href || (link.href.includes('#') && pathname === link.href.split('#')[0])
                  ? forceWhiteLogo ? 'text-white font-semibold underline underline-offset-4' : 'text-primary font-semibold'
                  : forceWhiteLogo ? 'text-white hover:text-white/80' : 'text-foreground hover:text-primary'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link
            href="/devis"
            className={cn(
              'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
              forceWhiteLogo
                ? 'bg-white/15 text-white border border-white/35 hover:bg-white/25'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
          >
            {t('nav.quote')}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            'lg:hidden p-2 rounded-lg transition-colors',
            forceWhiteLogo ? 'text-white hover:text-white/80' : 'text-foreground hover:text-primary'
          )}
          aria-label="Menu mobile"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-black/95 border-t border-slate-200/70 dark:border-black/70">
          <nav className="flex flex-col px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href ? 'text-primary bg-primary/5' : 'text-foreground hover:text-primary hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <Link
              href="/devis"
              className="mt-2 w-full text-center px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              {t('nav.quote')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}