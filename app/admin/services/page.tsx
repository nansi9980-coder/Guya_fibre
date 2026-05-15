"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  Loader2,
  Wifi,
  PenTool,
  Wrench,
  HardHat,
  Server,
  Home,
  Zap,
  Compass,
  Settings,
  Shield,
} from "lucide-react"
import servicesApi, { ServiceContent } from "@/lib/api/services.api"
import { toast } from "sonner"

const ICON_OPTIONS = [
  { value: "Wifi", label: "Wifi", icon: Wifi },
  { value: "PenTool", label: "PenTool", icon: PenTool },
  { value: "Wrench", label: "Wrench", icon: Wrench },
  { value: "HardHat", label: "HardHat", icon: HardHat },
  { value: "Server", label: "Server", icon: Server },
  { value: "Home", label: "Home", icon: Home },
  { value: "Zap", label: "Zap", icon: Zap },
  { value: "Compass", label: "Compass", icon: Compass },
  { value: "Settings", label: "Settings", icon: Settings },
]

const defaultService = {
  slug: "",
  number: "",
  icon: "Wifi",
  titleFr: "",
  titleEn: "",
  descFr: "",
  descEn: "",
  features: [] as string[],
  benefit: "",
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceContent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<typeof defaultService | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [newFeature, setNewFeature] = useState("")

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const data = await servicesApi.findAll()
      setServices(data)
    } catch (error) {
      toast.error("Erreur lors du chargement des services")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (service?: ServiceContent) => {
    if (service) {
      setEditingService({
        slug: service.slug,
        number: service.number,
        icon: service.icon,
        titleFr: service.titleFr,
        titleEn: service.titleEn || "",
        descFr: service.descFr,
        descEn: service.descEn || "",
        features: service.features || [],
        benefit: service.benefit || "",
      })
    } else {
      setEditingService({
        ...defaultService,
        number: String(services.length + 1).padStart(2, "0"),
      })
    }
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!editingService) return
    
    setIsSaving(true)
    try {
      if (editingService.slug && services.find(s => s.slug === editingService.slug)) {
        const existing = services.find(s => s.slug === editingService.slug)
        if (existing) {
          await servicesApi.update(existing.id, editingService)
        }
      } else {
        await servicesApi.create(editingService)
      }
      toast.success("Service enregistré avec succès")
      setDialogOpen(false)
      fetchServices()
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement")
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggle = async (service: ServiceContent) => {
    try {
      await servicesApi.toggle(service.id)
      fetchServices()
      toast.success(service.isActive ? "Service désactivé" : "Service activé")
    } catch (error) {
      toast.error("Erreur lors de la mise à jour")
    }
  }

  const handleDelete = async (service: ServiceContent) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return
    
    try {
      await servicesApi.delete(service.id)
      toast.success("Service supprimé")
      fetchServices()
    } catch (error) {
      toast.error("Erreur lors de la suppression")
    }
  }

  const addFeature = () => {
    if (!editingService || !newFeature.trim()) return
    setEditingService({
      ...editingService,
      features: [...editingService.features, newFeature.trim()],
    })
    setNewFeature("")
  }

  const removeFeature = (index: number) => {
    if (!editingService) return
    setEditingService({
      ...editingService,
      features: editingService.features.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Services
          </h1>
          <p className="text-muted-foreground">
            Gérez les services affichés sur le site
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau service
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Ordre</TableHead>
                  <TableHead>Icône</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    </TableCell>
                    <TableCell className="font-medium">{service.number}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {service.icon}
                      </Badge>
                    </TableCell>
                    <TableCell>{service.titleFr}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={service.isActive}
                          onCheckedChange={() => handleToggle(service)}
                        />
                        <span className={service.isActive ? "text-emerald-500" : "text-muted-foreground"}>
                          {service.isActive ? "Actif" : "Inactif"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenDialog(service)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(service)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingService?.slug ? "Modifier le service" : "Nouveau service"}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du service
            </DialogDescription>
          </DialogHeader>

          {editingService && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Slug (URL)</Label>
                  <Input
                    value={editingService.slug}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                    placeholder="ftth, maintenance..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ordre d&apos;affichage</Label>
                  <Input
                    value={editingService.number}
                    onChange={(e) => setEditingService({ ...editingService, number: e.target.value })}
                    placeholder="01"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Icône</Label>
                <div className="grid grid-cols-5 gap-2">
                  {ICON_OPTIONS.map((icon) => (
                    <button
                      key={icon.value}
                      type="button"
                      onClick={() => setEditingService({ ...editingService, icon: icon.value })}
                      className={`p-3 rounded-lg border flex items-center justify-center ${
                        editingService.icon === icon.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <icon.icon className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Titre (Français)</Label>
                <Input
                  value={editingService.titleFr}
                  onChange={(e) => setEditingService({ ...editingService, titleFr: e.target.value })}
                  placeholder="Titre du service"
                />
              </div>

              <div className="space-y-2">
                <Label>Titre (Anglais)</Label>
                <Input
                  value={editingService.titleEn}
                  onChange={(e) => setEditingService({ ...editingService, titleEn: e.target.value })}
                  placeholder="Service title (English)"
                />
              </div>

              <div className="space-y-2">
                <Label>Description (Français)</Label>
                <Textarea
                  value={editingService.descFr}
                  onChange={(e) => setEditingService({ ...editingService, descFr: e.target.value })}
                  placeholder="Description détaillée du service..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Description (Anglais)</Label>
                <Textarea
                  value={editingService.descEn}
                  onChange={(e) => setEditingService({ ...editingService, descEn: e.target.value })}
                  placeholder="Service description (English)..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Points clés (fonctionnalités)</Label>
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Ajouter une fonctionnalité..."
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                  />
                  <Button onClick={addFeature} variant="outline">
                    Ajouter
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {editingService.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 pr-1">
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-1 hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bénéfice clé</Label>
                <Input
                  value={editingService.benefit}
                  onChange={(e) => setEditingService({ ...editingService, benefit: e.target.value })}
                  placeholder="Ex: Connexion ultra-rapide"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
