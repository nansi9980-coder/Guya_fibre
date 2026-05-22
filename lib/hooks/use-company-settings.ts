"use client"

import { useEffect, useState } from "react"
import { buildGoogleMapsSearchUrl, type CompanyLocation } from "@/lib/utils/google-maps"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://guya-fibre-backend.onrender.com"

export interface CompanySettings extends CompanyLocation {
  phone: string
  email: string
}

const DEFAULTS: CompanySettings = {
  name: "GUYA FIBRE",
  phone: "+594 06 94 43 54 84",
  email: "contact@guyafibre.com",
  address: "12 Rue des Palmiers",
  city: "Saint-Laurent-du-Maroni",
  postalCode: "97320",
}

export function useCompanySettings() {
  const [company, setCompany] = useState<CompanySettings>(DEFAULTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/settings/company/public`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setCompany({
            name: data.name || DEFAULTS.name,
            phone: data.phone || DEFAULTS.phone,
            email: data.email || DEFAULTS.email,
            address: data.address || DEFAULTS.address,
            city: data.city || DEFAULTS.city,
            postalCode: data.postalCode || DEFAULTS.postalCode,
          })
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return {
    company,
    loading,
    mapsUrl: buildGoogleMapsSearchUrl(company),
    formattedAddress: [company.address, company.postalCode, company.city].filter(Boolean).join(", "),
  }
}
