"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Navigation,
  Car,
  Plane,
  Clock,
  Phone,
  Mail,
  Copy,
  Check,
} from "lucide-react"
import { ClickableMapLink } from "@/components/clickable-map-link"
import { useCompanySettings } from "@/lib/hooks/use-company-settings"

const directions = [
  {
    icon: Car,
    title: "En voiture depuis Cayenne",
    description:
      "Prenez la RN1 direction ouest vers Saint-Laurent-du-Maroni. Traversez Kourou et Sinnamary. À l'entrée de Saint-Laurent, suivez les panneaux \"Centre-ville\". Après le rond-point du port, tournez à droite rue des Palmiers. Notre local est à 200m sur la gauche.",
    duration: "2h30 - 3h",
    distance: "250 km",
  },
  {
    icon: Plane,
    title: "En avion",
    description:
      "L'aéroport de Saint-Laurent-du-Maroni se trouve à 5 km du centre-ville. Des taxis sont disponibles à la sortie. Vous pouvez également nous contacter pour organiser une navette.",
    duration: "45 min depuis Cayenne",
    distance: "Vol direct",
  },
  {
    icon: Navigation,
    title: "Coordonnées GPS",
    description:
      "Utilisez l'adresse configurée dans nos paramètres ou ouvrez directement Google Maps via la carte interactive ci-dessus.",
    duration: "Navigation GPS",
    distance: "Précision 10m",
  },
]

export function InteractiveMap() {
  const { company, formattedAddress } = useCompanySettings()
  const [copiedAddress, setCopiedAddress] = useState(false)

  const copyAddress = () => {
    if (!formattedAddress) return
    navigator.clipboard.writeText(formattedAddress)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  return (
    <div className="space-y-6">
      <ClickableMapLink aspectClass="aspect-video" />

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Adresse
            </h3>
            <div className="text-sm text-muted-foreground space-y-1">
              {company.address && <p className="font-medium text-foreground">{company.address}</p>}
              {(company.postalCode || company.city) && (
                <p>
                  {[company.postalCode, company.city].filter(Boolean).join(" ")}
                </p>
              )}
              <p>Guyane française</p>
            </div>
            {formattedAddress && (
              <div className="mt-4">
                <Button size="sm" variant="outline" onClick={copyAddress} className="w-full">
                  {copiedAddress ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copié !
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copier l&apos;adresse
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Horaires d&apos;ouverture
            </h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lundi - Vendredi</span>
                <span className="font-medium text-foreground">8h00 - 18h00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Samedi</span>
                <span className="font-medium text-foreground">8h00 - 12h00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimanche</span>
                <span className="text-muted-foreground">Fermé</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-6">
            Comment nous rejoindre
          </h3>
          <div className="space-y-6">
            {directions.map((dir, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <dir.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">{dir.title}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground">
                      {dir.duration}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary dark:bg-primary/25 dark:text-primary-foreground">
                      {dir.distance}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {dir.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <a
          href={`tel:${company.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Téléphone</div>
            <div className="font-medium text-foreground">{company.phone}</div>
          </div>
        </a>
        <a
          href={`mailto:${company.email}`}
          className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Email</div>
            <div className="font-medium text-foreground">{company.email}</div>
          </div>
        </a>
      </div>
    </div>
  )
}
