import { API_BASE_URL } from "@/lib/constants"

/**
 * Résout une URL de média en URL absolue utilisable par le site vitrine.
 * - Cloudinary / URLs absolues : retournées telles quelles
 * - Chemins backend (/files, /api/medias) : préfixés avec l'API
 * - Chemins locaux (/images/...) : conservés pour le dossier public Next.js
 */
export function resolveMediaUrl(src: string | null | undefined, fallback: string): string {
  const trimmed = typeof src === "string" ? src.trim() : ""
  if (!trimmed) return fallback

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed
  if (trimmed.startsWith("//")) return `https:${trimmed}`

  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`

  if (cleanPath.startsWith("/files") || cleanPath.startsWith("/api/medias")) {
    return `${API_BASE_URL}${cleanPath}`
  }

  if (/\.(jpe?g|png|gif|webp|svg)$/i.test(trimmed) && !trimmed.startsWith("/")) {
    return `${API_BASE_URL}/files/${trimmed}`
  }

  return cleanPath
}
