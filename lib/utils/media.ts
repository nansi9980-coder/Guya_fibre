/**
 * Résout une URL de média en URL absolue pointant vers le backend.
 * Les médias uploadés sont stockés comme "/api/medias/file/xxx.jpg" côté backend,
 * mais Next.js Image a besoin d'une URL absolue pour les optimiser correctement.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export function resolveMediaUrl(src: string | null | undefined, fallback: string): string {
  if (!src) return fallback
  // Déjà une URL absolue (http/https)
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  // URL relative commençant par /api/medias — on préfixe avec l'URL du backend
  if (src.startsWith('/api/medias') || src.startsWith('api/medias')) {
    return `${API_URL}${src.startsWith('/') ? '' : '/'}${src}`
  }
  // Autre chemin relatif (fichiers locaux /images/...)
  return src
}