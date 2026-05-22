"use client"

import { useEffect, useState } from "react"
import { MapPin, ExternalLink } from "lucide-react"
import { useCompanySettings } from "@/lib/hooks/use-company-settings"
import {
  buildStaticMapImageUrl,
  geocodeAddress,
} from "@/lib/utils/google-maps"
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
  const [mapImageUrl, setMapImageUrl] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const address =
      formattedAddress || "12 Rue des Palmiers, 97320 Saint-Laurent-du-Maroni, Guyane française"

    geocodeAddress(address).then(({ lat, lng }) => {
      if (!cancelled) {
        setMapImageUrl(buildStaticMapImageUrl(lat, lng, 960, 540))
      }
    })

    return () => {
      cancelled = true
    }
  }, [formattedAddress])

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ouvrir ${formattedAddress || company.name} dans Google Maps`}
      className={cn(
        "group relative block w-full overflow-hidden rounded-xl border border-border bg-muted/30 transition-all",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        aspectClass,
        className
      )}
    >
      {mapImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={mapImageUrl}
          alt={`Carte — ${formattedAddress || company.name}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted/60 to-muted/30"
          aria-hidden
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden />

      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-2 p-6 text-center">
        <p className="font-display text-sm font-semibold text-white drop-shadow-md">
          {company.name}
        </p>
        {formattedAddress && (
          <p className="max-w-sm text-xs text-white/90 drop-shadow">{formattedAddress}</p>
        )}
        <span className="mt-1 inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors group-hover:bg-black/55">
          Ouvrir dans Google Maps
          <ExternalLink className="h-4 w-4" />
        </span>
      </div>

      {showOverlay && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 shadow-md backdrop-blur-sm">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-semibold text-white">{company.name}</span>
        </div>
      )}

      <div className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/90 text-white shadow-lg transition-transform group-hover:scale-110">
        <MapPin className="h-5 w-5" />
      </div>
    </a>
  )
}
