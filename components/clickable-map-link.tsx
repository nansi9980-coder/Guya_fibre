"use client"

import { MapPin } from "lucide-react"
import { useCompanySettings } from "@/lib/hooks/use-company-settings"
import { buildGoogleMapsEmbedUrl } from "@/lib/utils/google-maps"
import { cn } from "@/lib/utils"

interface ClickableMapLinkProps {
  className?: string
  aspectClass?: string
  showOverlay?: boolean
}

export function ClickableMapLink({
  className,
  aspectClass = "aspect-[4/3]",
  showOverlay = true,
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

      <div
        className="pointer-events-none absolute inset-0 z-[11] bg-gradient-to-t from-black/80 via-black/15 to-transparent"
        aria-hidden
      />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[12] flex flex-col items-center gap-2 p-6 text-center">
        <p className="font-display text-sm font-semibold text-white drop-shadow-md">
          {company.name}
        </p>
        {formattedAddress && (
          <p className="max-w-sm text-xs text-white/90 drop-shadow">{formattedAddress}</p>
        )}
      </div>

      {/* Masque le bouton natif "ouvrir dans Google Maps" de l'iframe */}
      <div
        className="pointer-events-none absolute top-3 left-[7.5rem] z-[13] h-9 w-9 rounded-md bg-background/95"
        aria-hidden
      />

      {showOverlay && (
        <div className="pointer-events-none absolute top-4 left-4 z-[12] flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 shadow-md backdrop-blur-sm">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-semibold text-white">{company.name}</span>
        </div>
      )}

      <div className="pointer-events-none absolute top-4 right-4 z-[12] flex h-10 w-10 items-center justify-center rounded-xl bg-primary/90 text-white shadow-lg transition-transform group-hover:scale-110">
        <MapPin className="h-5 w-5" />
      </div>
    </div>
  )
}
