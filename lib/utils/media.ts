/**
 * Résout une URL de média en URL absolue pointant vers le backend.
 * Les médias uploadés sont maintenant servés via /files/xxx.jpg
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export function resolveMediaUrl(src: string | null | undefined, fallback: string): string {
  const trimmed = typeof src === "string" ? src.trim() : ""
  if (!trimmed) return fallback

  // Déjà une URL absolue (http/https)
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed

  // Protocol-relative
  if (trimmed.startsWith("//")) return `https:${trimmed}`

  // URL relative commençant par /files — on préfixe avec l'URL du backend
  if (trimmed.startsWith("/files")) {
    return `${API_URL}${trimmed}`
  }

  // Rétrocompatibilité : ancien chemin /api/medias
  if (trimmed.startsWith("/api/medias") || trimmed.startsWith("api/medias")) {
    const filename = trimmed.replace(/^\/?(api\/)?medias\/file\//, "")
    return `${API_URL}/files/${filename}`
  }

  // Nom de fichier seul (ex. uuid.jpg)
  if (!trimmed.startsWith("/") && /\.(jpe?g|png|gif|webp|svg)$/i.test(trimmed)) {
    return `${API_URL}/files/${trimmed}`
  }

  // Autre chemin relatif (fichiers locaux /images/...)
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`
}