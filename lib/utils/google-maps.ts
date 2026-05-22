export interface CompanyLocation {
  name?: string
  address?: string
  city?: string
  postalCode?: string
}

export function formatCompanyAddress(company: CompanyLocation): string {
  const parts = [company.address, company.postalCode, company.city].filter(Boolean)
  return parts.join(', ').trim()
}

export function buildGoogleMapsSearchUrl(company: CompanyLocation): string {
  const query = formatCompanyAddress(company) || company.name || 'GUYA FIBRE Guyane française'
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/** Aperçu carte Google Maps intégrée (sans clé API) */
export function buildGoogleMapsEmbedUrl(query: string): string {
  const q = query.trim() || 'GUYA FIBRE, Saint-Laurent-du-Maroni, Guyane française'
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&hl=fr&z=15&output=embed`
}
