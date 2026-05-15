/**
 * Résout une URL de média en URL absolue pointant vers le backend.
 * Les médias uploadés sont maintenant servés via /files/xxx.jpg
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export function resolveMediaUrl(src: string | null | undefined, fallback: string): string {
  if (!src) return fallback
  
  // Déjà une URL absolue (http/https)
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  
  // URL relative commençant par /files — on préfixe avec l'URL du backend
  // C'est le nouveau chemin pour les fichiers statiques
  if (src.startsWith('/files')) {
    return `${API_URL}${src}`
  }
  
  // Rétrocompatibilité : ancien chemin /api/medias
  if (src.startsWith('/api/medias') || src.startsWith('api/medias')) {
    // Remplacer /api/medias/file/ par /files/
    const filename = src.replace(/^\/?(api\/)?medias\/file\//, '')
    return `${API_URL}/files/${filename}`
  }
  
  // Autre chemin relatif (fichiers locaux /images/...)
  return src
}