"use client"

import Image, { type ImageProps } from "next/image"
import { resolveMediaUrl } from "@/lib/utils/media"

type CmsImageProps = Omit<ImageProps, "src"> & {
  src?: string | null
  fallback?: string
}

/** Image CMS (admin / API) avec URL résolue et sans optimisation Next pour les URLs distantes. */
export function CmsImage({
  src,
  fallback = "/images/hero-bg.jpg",
  alt,
  ...props
}: CmsImageProps) {
  const resolved = resolveMediaUrl(src, fallback)
  const isRemote = resolved.startsWith("http://") || resolved.startsWith("https://")

  return (
    <Image
      src={resolved}
      alt={alt ?? ""}
      unoptimized={isRemote}
      {...props}
    />
  )
}
