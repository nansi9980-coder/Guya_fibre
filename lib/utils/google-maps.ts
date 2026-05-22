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
