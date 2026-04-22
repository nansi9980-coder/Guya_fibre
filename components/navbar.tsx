'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLanguage } from '@/lib/i18n/context'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()
  const isHomeTop = pathname === '/' && !isScrolled && !mobileOpen

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/apropos', label: t('nav.about') },
    {
      href: '/services',
      label: t('nav.services'),
      children: [
        { href: '/services#etudes', label: t('services.studies') },
        { href: '/services#deploiement', label: t('services.deployment') },
        { href: '/services#raccordement', label: t('services.connection') },
        { href: '/services#maintenance', label: t('services.maintenance') },
        { href: '/services#entreprises', label: t('services.enterprise') },
      ],
    },
    { href: '/offres', label: t('nav.offers') },
    { href: '/projets', label: t('nav.projects') },
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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md',
        isHomeTop
          ? 'bg-transparent border-transparent shadow-none'
          : isScrolled
            ? 'bg-white/90 dark:bg-black/90 shadow-lg border-b border-slate-200/60 dark:border-black/60'
            : 'bg-white/75 dark:bg-black/75 border-b border-slate-200/50 dark:border-black/50'
      )}
    >
      <div className="mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-6 lg:px-10 max-w-[1600px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-32 h-10 md:w-40 md:h-12 [filter:invert(1)_brightness(1.1)] dark:[filter:none]">
            <Image
              src="/images/logo.jpg"
              alt="GUYA FIBRE"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href} className="relative group">
                <button
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isHomeTop ? 'text-white hover:text-white/80' : 'text-foreground hover:text-primary'
                  )}
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block bg-card border border-border rounded-lg shadow-lg min-w-48 overflow-hidden">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? isHomeTop ? 'text-white font-semibold underline underline-offset-4' : 'text-primary font-semibold'
                    : isHomeTop ? 'text-white hover:text-white/80' : 'text-foreground hover:text-primary'
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link
            href="/devis"
            className={cn(
              'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
              isHomeTop
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
            isHomeTop ? 'text-white hover:text-white/80' : 'text-foreground hover:text-primary'
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
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="space-y-2">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full text-left px-3 py-2 text-foreground font-medium hover:text-primary transition-colors flex items-center justify-between"
                  >
                    {link.label}
                    <ChevronDown className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')} />
                  </button>
                  {servicesOpen && (
                    <div className="pl-4 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
              )
            )}
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