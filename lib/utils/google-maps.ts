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

/** Centre par défaut — Saint-Laurent-du-Maroni (si géocodage indisponible) */
export const DEFAULT_MAP_CENTER = { lat: 5.4994, lng: -54.0335 }

export function buildStaticMapImageUrl(
  lat: number,
  lng: number,
  width = 800,
  height = 450
): string {
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=15&size=${width}x${height}&markers=${lat},${lng},red-pushpin`
}

export async function geocodeAddress(
  address: string
): Promise<{ lat: number; lng: number }> {
  const query = address.trim()
  if (!query) return DEFAULT_MAP_CENTER

  try {
    const res = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1&lang=fr`
    )
    if (!res.ok) return DEFAULT_MAP_CENTER
    const data = (await res.json()) as {
      features?: { geometry?: { coordinates?: [number, number] } }[]
    }
    const coords = data.features?.[0]?.geometry?.coordinates
    if (coords?.length === 2) {
      return { lat: coords[1], lng: coords[0] }
    }
  } catch {
    /* fallback */
  }
  return DEFAULT_MAP_CENTER
}
