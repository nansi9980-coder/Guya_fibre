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
  ExternalLink,
  Copy,
  Check
} from "lucide-react"

const COMPANY_LOCATION = {
  lat: 5.5026,
  lng: -54.0333,
  placeName: "GUYA FIBRE, Saint-Laurent-du-Maroni",
  address: "12 Rue des Palmiers",
  city: "Saint-Laurent-du-Maroni",
  postalCode: "97320",
  country: "Guyane française",
  phone: "+594 6 94 43 54 84",
  email: "contact@guyafibre.com",
}

const directions = [
  {
    icon: Car,
    title: "En voiture depuis Cayenne",
    description: "Prenez la RN1 direction ouest vers Saint-Laurent-du-Maroni. Traversez Kourou et Sinnamary. À l'entrée de Saint-Laurent, suivez les panneaux \"Centre-ville\". Après le rond-point du port, tournez à droite rue des Palmiers. Notre local est à 200m sur la gauche.",
    duration: "2h30 - 3h",
    distance: "250 km",
  },
  {
    icon: Plane,
    title: "En avion",
    description: "L'aéroport de Saint-Laurent-du-Maroni se trouve à 5 km du centre-ville. Des taxis sont disponibles à la sortie. Vous pouvez également nous contacter pour organiser une navette.",
    duration: "45 min depuis Cayenne",
    distance: "Vol direct",
  },
  {
    icon: Navigation,
    title: "Coordonnées GPS",
    description: `Latitude: ${COMPANY_LOCATION.lat}° N\nLongitude: ${COMPANY_LOCATION.lng}° W\n\nEntrez ces coordonnées dans votre application GPS favorite pour un guidage précis jusqu'à notre local.`,
    duration: "Navigation GPS",
    distance: "Précision 10m",
  },
]

const transportModes = [
  { id: "driving", label: "Voiture", icon: Car },
  { id: "transit", label: "Transport", icon: Navigation },
]

export function InteractiveMap() {
  const [copiedGPS, setCopiedGPS] = useState(false)
  const [selectedMode, setSelectedMode] = useState("driving")

  const copyGPSCoordinates = () => {
    navigator.clipboard.writeText(`${COMPANY_LOCATION.lat}, ${COMPANY_LOCATION.lng}`)
    setCopiedGPS(true)
    setTimeout(() => setCopiedGPS(false), 2000)
  }

  const openGoogleMaps = () => {
    const destination = encodeURIComponent(`${COMPANY_LOCATION.placeName} ${COMPANY_LOCATION.address}`)
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=${selectedMode}`
    window.open(url, "_blank")
  }

  const openWaze = () => {
    const url = `https://waze.com/ul?ll=${COMPANY_LOCATION.lat},${COMPANY_LOCATION.lng}&navigate=yes`
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-6">
      {/* Map Embed */}
      <Card className="overflow-hidden bg-card border-border">
        <CardContent className="p-0">
          <div className="aspect-video relative">
            <iframe
              src={`https://www.google.com/maps?q=${COMPANY_LOCATION.lat},${COMPANY_LOCATION.lng}&z=18&hl=fr&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
            <div className="absolute top-4 left-4 z-10 rounded-full bg-background/90 backdrop-blur-sm border border-border px-3 py-1.5 shadow-md flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <span className="text-xs font-semibold text-foreground">GUYA FIBRE</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Adresse
            </h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">{COMPANY_LOCATION.address}</p>
              <p>{COMPANY_LOCATION.postalCode} {COMPANY_LOCATION.city}</p>
              <p>{COMPANY_LOCATION.country}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={copyGPSCoordinates}
                className="flex-1"
              >
                {copiedGPS ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copier GPS
                  </>
                )}
              </Button>
            </div>
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

      {/* Navigation Options */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            Obtenir l&apos;itinéraire
          </h3>
          
          {/* Transport Mode Selection */}
          <div className="flex gap-2 mb-4">
            {transportModes.map((mode) => (
              <Button
                key={mode.id}
                variant={selectedMode === mode.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMode(mode.id)}
                className={selectedMode === mode.id ? "bg-primary text-primary-foreground" : ""}
              >
                <mode.icon className="w-4 h-4 mr-2" />
                {mode.label}
              </Button>
            ))}
          </div>

          {/* Navigation Apps */}
          <div className="grid sm:grid-cols-2 gap-3">
            <Button 
              onClick={openGoogleMaps}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Ouvrir Google Maps
              <ExternalLink className="w-3 h-3 ml-2" />
            </Button>
            <Button 
              onClick={openWaze}
              variant="outline"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Ouvrir Waze
              <ExternalLink className="w-3 h-3 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Directions */}
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

      {/* Contact Quick Links */}
      <div className="grid sm:grid-cols-2 gap-4">
        <a 
          href={`tel:${COMPANY_LOCATION.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Téléphone</div>
            <div className="font-medium text-foreground">{COMPANY_LOCATION.phone}</div>
          </div>
        </a>
        <a 
          href={`mailto:${COMPANY_LOCATION.email}`}
          className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Email</div>
            <div className="font-medium text-foreground">{COMPANY_LOCATION.email}</div>
          </div>
        </a>
      </div>
    </div>
  )
}
