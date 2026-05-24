"use client"

import { useCompanySettings } from "@/lib/hooks/use-company-settings"
import { buildGoogleMapsEmbedUrl } from "@/lib/utils/google-maps"
import { cn } from "@/lib/utils"

interface ClickableMapLinkProps {
  className?: string
  aspectClass?: string
}

export function ClickableMapLink({
  className,
  aspectClass = "aspect-[4/3]",
}: ClickableMapLinkProps) {
  const { company, mapsUrl, formattedAddress } = useCompanySettings()

  const mapQuery =
    formattedAddress || "GUYA FIBRE, Saint-Laurent-du-Maroni, Guyane française"
  const embedUrl = buildGoogleMapsEmbedUrl(mapQuery)

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-xl border border-border bg-muted/30 transition-all",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        aspectClass,
        className
      )}
    >
      <iframe
        title={`Carte Google Maps — ${formattedAddress || company.name}`}
        src={embedUrl}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      {/* Zone cliquable → ouvre Google Maps (même adresse) */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ouvrir ${formattedAddress || company.name} dans Google Maps`}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      {/* Masque la barre native Google (nom du lieu + icônes lien/directions) */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-[13] h-14 bg-muted/30"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-[11] bg-gradient-to-t from-black/80 via-black/15 to-transparent"
        aria-hidden
      />

      {formattedAddress && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[12] p-6 text-center">
          <p className="mx-auto max-w-sm text-xs text-white/90 drop-shadow">{formattedAddress}</p>
        </div>
      )}
    </div>
  )
}
