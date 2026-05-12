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
    { href: '/#activites', label: t('nav.activities') },
    { href: '/#architecture', label: t('nav.architecture') },
    { href: '/#deploiement', label: t('nav.deployment') },
    { href: '/#ftte', label: t('nav.ftte') },
    { href: '/#couverture', label: t('nav.coverage') },
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 dark:bg-black/95 shadow-sm border-b border-border'
          : 'bg-white/50 dark:bg-black/50 backdrop-blur-sm'
      )}
    >
      <div className="mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-6 lg:px-10 max-w-7xl">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative w-32 h-10 md:w-40 md:h-12 dark:invert">
            <Image
              src="/site-icon.png"
              alt="GUYA FIBRE"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-[13px] tracking-widest font-medium transition-colors uppercase',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-foreground/70 hover:text-primary'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="px-8 py-2.5 bg-black dark:bg-white text-white dark:text-black text-[13px] font-bold tracking-widest uppercase transition-all hover:bg-black/80 dark:hover:bg-white/80"
          >
            {t('nav.contact')}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Menu mobile"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-black border-t border-border">
          <nav className="flex flex-col px-6 py-8 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-widest uppercase text-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex items-center gap-4">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <Link
              href="/contact"
              className="mt-4 w-full text-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-sm font-bold tracking-widest uppercase"
            >
              {t('nav.contact')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}