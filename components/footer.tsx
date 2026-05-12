import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/context"

export function Footer() {
  const { t } = useLanguage()

  const navLinks = [
    { href: '/#activites', label: "Activités" },
    { href: '/#architecture', label: "Architecture" },
    { href: '/#deploiement', label: "Déploiement" },
    { href: '/#ftte', label: "FTTE" },
    { href: '/#couverture', label: "Couverture" },
  ]

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-8 invert">
              <Image
                src="/site-icon.png"
                alt="GUYA FIBRE"
                width={160}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Expertise et déploiement d'infrastructures fibre optique en Guyane française. Connectivité haute performance pour tous.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[10px] tracking-widest uppercase font-bold text-white/20 mb-8">Navigation</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[10px] tracking-widest uppercase font-bold text-white/20 mb-8">Contact</h3>
            <ul className="space-y-4">
              <li className="text-sm text-white/60">+594 694 43 54 84</li>
              <li className="text-sm text-white/60">contact@guyafibre.gf</li>
              <li className="text-sm text-white/60">12 Rue des Palmiers, 97320 SLM</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[10px] tracking-widest uppercase font-bold text-white/20 mb-8">Légal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/mentions-legales" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-widest uppercase text-white/20">
            &copy; {new Date().getFullYear()} GUYA FIBRE. TOUS DROITS RÉSERVÉS.
          </p>
          <div className="flex gap-6">
            {/* Social links placeholder */}
            <span className="text-[10px] tracking-widest uppercase text-white/20 hover:text-white cursor-pointer transition-colors">LinkedIn</span>
            <span className="text-[10px] tracking-widest uppercase text-white/20 hover:text-white cursor-pointer transition-colors">Instagram</span>
          </div>
        </div>
      </div>
    </footer>
  )
}