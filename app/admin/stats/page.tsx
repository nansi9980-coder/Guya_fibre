"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  DollarSign,
  Calendar,
  MapPin,
  ArrowUpRight,
  Download,
} from "lucide-react"

// Mock chart data
const monthlyData = [
  { month: "Jan", quotes: 45, revenue: 32000 },
  { month: "Fév", quotes: 52, revenue: 38500 },
  { month: "Mar", quotes: 61, revenue: 42000 },
  { month: "Avr", quotes: 58, revenue: 39000 },
  { month: "Mai", quotes: 72, revenue: 51000 },
  { month: "Juin", quotes: 85, revenue: 58000 },
  { month: "Juil", quotes: 78, revenue: 52000 },
  { month: "Août", quotes: 65, revenue: 44000 },
  { month: "Sep", quotes: 92, revenue: 63000 },
  { month: "Oct", quotes: 108, revenue: 75000 },
  { month: "Nov", quotes: 115, revenue: 82000 },
  { month: "Déc", quotes: 127, revenue: 89500 },
]

const serviceStats = [
  { name: "Raccordement FTTH", count: 312, percentage: 42, revenue: 140000 },
  { name: "Déploiement réseau", count: 156, percentage: 21, revenue: 320000 },
  { name: "Maintenance", count: 178, percentage: 24, revenue: 95000 },
  { name: "Études techniques", count: 67, percentage: 9, revenue: 85000 },
  { name: "Solutions entreprises", count: 29, percentage: 4, revenue: 125000 },
]

const locationStats = [
  { city: "Cayenne", count: 298, percentage: 40 },
  { city: "Saint-Laurent", count: 156, percentage: 21 },
  { city: "Kourou", count: 119, percentage: 16 },
  { city: "Matoury", count: 89, percentage: 12 },
  { city: "Rémire-Montjoly", count: 52, percentage: 7 },
  { city: "Autres", count: 28, percentage: 4 },
]

const conversionFunnel = [
  { stage: "Visites site", count: 12500, percentage: 100 },
  { stage: "Page devis consultée", count: 3750, percentage: 30 },
  { stage: "Formulaire commencé", count: 1875, percentage: 15 },
  { stage: "Demande envoyée", count: 742, percentage: 6 },
  { stage: "Devis accepté", count: 542, percentage: 4.3 },
]

export default function AdminStatsPage() {
  const maxQuotes = Math.max(...monthlyData.map(d => d.quotes))
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Statistiques
          </h1>
          <p className="text-muted-foreground">
            Analysez les performances de votre activité
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="year">
            <SelectTrigger className="w-[150px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Demandes totales",
            value: "742",
            change: "+18%",
            trend: "up",
            icon: FileText,
            color: "text-primary",
            bgColor: "bg-primary/10",
          },
          {
            title: "Revenus estimés",
            value: "765 000 €",
            change: "+24%",
            trend: "up",
            icon: DollarSign,
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10",
          },
          {
            title: "Taux de conversion",
            value: "73%",
            change: "+5%",
            trend: "up",
            icon: TrendingUp,
            color: "text-violet-500",
            bgColor: "bg-violet-500/10",
          },
          {
            title: "Clients actifs",
            value: "542",
            change: "+12%",
            trend: "up",
            icon: Users,
            color: "text-amber-500",
            bgColor: "bg-amber-500/10",
          },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Quotes Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Demandes mensuelles</CardTitle>
            <CardDescription>Évolution du nombre de demandes sur l&apos;année</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-2">
              {monthlyData.map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-primary/80 rounded-t transition-all hover:bg-primary"
                    style={{ height: `${(item.quotes / maxQuotes) * 180}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenus mensuels</CardTitle>
            <CardDescription>Chiffre d&apos;affaires estimé par mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-2">
              {monthlyData.map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-emerald-500/80 rounded-t transition-all hover:bg-emerald-500"
                    style={{ height: `${(item.revenue / maxRevenue) * 180}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service & Location Stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Services Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par service</CardTitle>
            <CardDescription>Performance de chaque catégorie de service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceStats.map((service) => (
                <div key={service.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{service.name}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">{service.count} demandes</span>
                      <span className="font-semibold text-foreground">
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(service.revenue)}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${service.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Répartition géographique
            </CardTitle>
            <CardDescription>Demandes par ville</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationStats.map((location) => (
                <div key={location.city}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{location.city}</span>
                    <span className="text-sm text-muted-foreground">
                      {location.count} ({location.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-violet-500"
                      style={{ width: `${location.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Entonnoir de conversion</CardTitle>
          <CardDescription>Du premier contact à la signature du devis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {conversionFunnel.map((stage, index) => (
              <div key={stage.stage} className="flex items-center gap-4">
                <div className="w-40 text-sm font-medium">{stage.stage}</div>
                <div className="flex-1 h-10 bg-muted rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all flex items-center justify-end pr-3"
                    style={{ width: `${stage.percentage}%` }}
                  >
                    <span className="text-sm font-semibold text-primary-foreground">
                      {stage.count.toLocaleString('fr-FR')}
                    </span>
                  </div>
                </div>
                <div className="w-16 text-right">
                  <span className="text-sm font-medium">{stage.percentage}%</span>
                </div>
                {index > 0 && (
                  <div className="w-20 text-right text-xs text-muted-foreground">
                    -{Math.round((1 - stage.percentage / conversionFunnel[index - 1].percentage) * 100)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Meilleur mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">Décembre</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  127 demandes
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Service le plus demandé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">FTTH</p>
                <p className="text-sm text-muted-foreground">42% des demandes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Zone la plus active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-violet-500/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-violet-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">Cayenne</p>
                <p className="text-sm text-muted-foreground">298 demandes (40%)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
