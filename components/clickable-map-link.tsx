"use client"

import { MapPin, ExternalLink } from "lucide-react"
import { useCompanySettings } from "@/lib/hooks/use-company-settings"
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
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-muted/40 to-primary/10"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 transition-transform group-hover:scale-110">
          <MapPin className="h-8 w-8 text-primary" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-foreground">{company.name}</p>
          {formattedAddress && (
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">{formattedAddress}</p>
          )}
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
          Ouvrir dans Google Maps
          <ExternalLink className="h-4 w-4" />
        </span>
      </div>

      {showOverlay && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1.5 shadow-md backdrop-blur-sm">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-semibold text-foreground">{company.name}</span>
        </div>
      )}
    </a>
  )
}
