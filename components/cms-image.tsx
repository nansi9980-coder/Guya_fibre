"use client"

import { useEffect, useState } from "react"
import Image, { type ImageProps } from "next/image"
import { resolveMediaUrl } from "@/lib/utils/media"

type CmsImageProps = Omit<ImageProps, "src"> & {
  src?: string | null
  fallback?: string
}

/** Image CMS (admin / API) avec URL résolue et sans optimisation Next pour les URLs distantes. */
export function CmsImage({
  src,
  fallback = "/placeholder.svg",
  alt,
  onError,
  ...props
}: CmsImageProps) {
  const resolved = resolveMediaUrl(src, fallback)
  const [currentSrc, setCurrentSrc] = useState(resolved)
  const isRemote =
    currentSrc.startsWith("http://") || currentSrc.startsWith("https://")

  useEffect(() => {
    setCurrentSrc(resolved)
  }, [resolved])

  return (
    <Image
      src={currentSrc}
      alt={alt ?? ""}
      unoptimized={isRemote}
      onError={(e) => {
        if (currentSrc !== fallback) setCurrentSrc(fallback)
        onError?.(e)
      }}
      {...props}
    />
  )
}
