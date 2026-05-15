"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage, languages, Locale } from "@/lib/i18n/context"
import { ChevronDown, Check } from "lucide-react"

// Flag images using country-flags CDN
const flagUrls: Record<Locale, string> = {
  fr: "https://flagcdn.com/w40/fr.png",
  en: "https://flagcdn.com/w40/gb.png",
  es: "https://flagcdn.com/w40/es.png",
  pt: "https://flagcdn.com/w40/br.png",
  nl: "https://flagcdn.com/w40/nl.png",
  gcr: "https://flagcdn.com/w40/gf.png",
  ar: "https://flagcdn.com/w40/sa.png",
  zh: "https://flagcdn.com/w40/cn.png",
}

export function LanguageSwitcher() {
  const { locale, setLocale, currentLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 px-2.5 h-9 text-foreground/70 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-100 border border-slate-200 dark:border-slate-300/20 hover:border-slate-300 transition-colors"
        >
          <Image
            src={flagUrls[locale]}
            alt={currentLanguage.name}
            width={24}
            height={16}
            className="rounded-sm object-cover"
            style={{ width: "24px", height: "auto" }}
            unoptimized
          />
          <span className="text-xs uppercase font-medium hidden sm:inline">{locale}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-card dark:bg-[oklch(0.15_0.025_250)] border-border dark:border-white/10">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`flex items-center gap-3 cursor-pointer py-3 ${
              locale === lang.code ? "bg-primary/10 text-primary" : ""
            }`}
          >
            <Image
              src={flagUrls[lang.code]}
              alt={lang.name}
              width={28}
              height={20}
              className="rounded-sm object-cover shadow-sm border border-border/30"
              style={{ width: "28px", height: "auto" }}
              unoptimized
            />
            <div className="flex flex-col flex-1">
              <span className="font-medium text-sm">{lang.nativeName}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{lang.countryCode}</span>
            </div>
            {locale === lang.code && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
