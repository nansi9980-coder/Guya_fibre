"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { resolveMediaUrl } from "@/lib/utils/media"

type CmsImageProps = {
  src?: string | null
  fallback?: string
  alt?: string
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
}

/** Image CMS — évite /_next/image pour les URLs Cloudinary et chemins API. */
export function CmsImage({
  src,
  fallback = "/placeholder.svg",
  alt = "",
  fill,
  className,
  priority,
}: CmsImageProps) {
  const resolved = resolveMediaUrl(src, fallback)
  const [currentSrc, setCurrentSrc] = useState(resolved)

  useEffect(() => {
    setCurrentSrc(resolved)
  }, [resolved])

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => {
        if (currentSrc !== fallback) setCurrentSrc(fallback)
      }}
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
    />
  )
}
