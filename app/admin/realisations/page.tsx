"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Star,
  Loader2,
  MapPin,
  Calendar,
  Filter,
} from "lucide-react"
import realisationsApi, { Realisation } from "@/lib/api/realisations.api"
import { toast } from "sonner"

const defaultRealisation = {
  slug: "",
  titleFr: "",
  titleEn: "",
  location: "",
  date: "",
  scope: "",
  descFr: "",
  descEn: "",
  tags: [] as string[],
  images: [] as string[],
  client: "",
  isFeatured: false,
}

export default function AdminRealisationsPage() {
  const [realisations, setRealisations] = useState<Realisation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingRealisation, setEditingRealisation] = useState<typeof defaultRealisation | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [filterTag, setFilterTag] = useState("all")
  const [newTag, setNewTag] = useState("")
  const [newImage, setNewImage] = useState("")

  useEffect(() => {
    fetchRealisations()
  }, [])

  const fetchRealisations = async () => {
    try {
      const response = await realisationsApi.findAll()
      setRealisations(response.data || response)
    } catch (error) {
      toast.error("Erreur lors du chargement des réalisations")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (realisation?: Realisation) => {
    if (realisation) {
      setEditingRealisation({
        slug: realisation.slug,
        titleFr: realisation.titleFr,
        titleEn: realisation.titleEn || "",
        location: realisation.location,
        date: realisation.date,
        scope: realisation.scope,
        descFr: realisation.descFr,
        descEn: realisation.descEn || "",
        tags: realisation.tags || [],
        images: realisation.images || [],
        client: realisation.client || "",
        isFeatured: realisation.isFeatured,
      })
    } else {
      setEditingRealisation(defaultRealisation)
    }
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!editingRealisation) return

    setIsSaving(true)
    try {
      if (editingRealisation.slug && realisations.find(r => r.slug === editingRealisation.slug)) {
        const existing = realisations.find(r => r.slug === editingRealisation.slug)
        if (existing) {
          await realisationsApi.update(existing.id, editingRealisation)
        }
      } else {
        await realisationsApi.create(editingRealisation)
      }
      toast.success("Réalisation enregistrée avec succès")
      setDialogOpen(false)
      fetchRealisations()
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement")
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggleFeatured = async (realisation: Realisation) => {
    try {
      await realisationsApi.toggleFeatured(realisation.id)
      fetchRealisations()
      toast.success(realisation.isFeatured ? "Retiré des mis en avant" : "Ajouté aux mis en avant")
    } catch (error) {
      toast.error("Erreur lors de la mise à jour")
    }
  }

  const handleDelete = async (realisation: Realisation) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette réalisation ?")) return

    try {
      await realisationsApi.delete(realisation.id)
      toast.success("Réalisation supprimée")
      fetchRealisations()
    } catch (error) {
      toast.error("Erreur lors de la suppression")
    }
  }

  const addTag = () => {
    if (!editingRealisation || !newTag.trim()) return
    setEditingRealisation({
      ...editingRealisation,
      tags: [...editingRealisation.tags, newTag.trim()],
    })
    setNewTag("")
  }

  const removeTag = (index: number) => {
    if (!editingRealisation) return
    setEditingRealisation({
      ...editingRealisation,
      tags: editingRealisation.tags.filter((_, i) => i !== index),
    })
  }

  const addImage = () => {
    if (!editingRealisation || !newImage.trim()) return
    setEditingRealisation({
      ...editingRealisation,
      images: [...editingRealisation.images, newImage.trim()],
    })
    setNewImage("")
  }

  const removeImage = (index: number) => {
    if (!editingRealisation) return
    setEditingRealisation({
      ...editingRealisation,
      images: editingRealisation.images.filter((_, i) => i !== index),
    })
  }

  const allTags = [...new Set(realisations.flatMap(r => r.tags))]

  const filteredRealisations = filterTag === "all"
    ? realisations
    : realisations.filter(r => r.tags.includes(filterTag))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Réalisations
          </h1>
          <p className="text-muted-foreground">
            Gérez les projets et réalisations affichés sur le site
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle réalisation
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mr-2">Filtrer:</span>
            <Button
              size="sm"
              variant={filterTag === "all" ? "default" : "outline"}
              onClick={() => setFilterTag("all")}
            >
              Tous
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                size="sm"
                variant={filterTag === tag ? "default" : "outline"}
                onClick={() => setFilterTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

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
                  <TableHead>Image</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>En avant</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRealisations.map((realisation) => (
                  <TableRow key={realisation.id}>
                    <TableCell>
                      {realisation.images?.[0] ? (
                        <img
                          src={realisation.images[0]}
                          alt={realisation.titleFr}
                          className="h-12 w-16 object-cover rounded"
                        />
                      ) : (
                        <div className="h-12 w-16 bg-muted rounded" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{realisation.titleFr}</div>
                      <div className="text-xs text-muted-foreground">{realisation.scope}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {realisation.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {realisation.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {realisation.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{realisation.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={realisation.isFeatured}
                        onCheckedChange={() => handleToggleFeatured(realisation)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenDialog(realisation)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(realisation)}
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
              {editingRealisation?.slug ? "Modifier la réalisation" : "Nouvelle réalisation"}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du projet
            </DialogDescription>
          </DialogHeader>

          {editingRealisation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Slug (URL)</Label>
                  <Input
                    value={editingRealisation.slug}
                    onChange={(e) => setEditingRealisation({ ...editingRealisation, slug: e.target.value })}
                    placeholder="ftth-cayenne..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Input
                    value={editingRealisation.client}
                    onChange={(e) => setEditingRealisation({ ...editingRealisation, client: e.target.value })}
                    placeholder="Nom du client"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Titre (Français)</Label>
                <Input
                  value={editingRealisation.titleFr}
                  onChange={(e) => setEditingRealisation({ ...editingRealisation, titleFr: e.target.value })}
                  placeholder="Titre du projet"
                />
              </div>

              <div className="space-y-2">
                <Label>Titre (Anglais)</Label>
                <Input
                  value={editingRealisation.titleEn}
                  onChange={(e) => setEditingRealisation({ ...editingRealisation, titleEn: e.target.value })}
                  placeholder="Project title (English)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Localisation</Label>
                  <Input
                    value={editingRealisation.location}
                    onChange={(e) => setEditingRealisation({ ...editingRealisation, location: e.target.value })}
                    placeholder="Cayenne"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    value={editingRealisation.date}
                    onChange={(e) => setEditingRealisation({ ...editingRealisation, date: e.target.value })}
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Portée du projet</Label>
                <Input
                  value={editingRealisation.scope}
                  onChange={(e) => setEditingRealisation({ ...editingRealisation, scope: e.target.value })}
                  placeholder="1 200 prises raccordées"
                />
              </div>

              <div className="space-y-2">
                <Label>Description (Français)</Label>
                <Textarea
                  value={editingRealisation.descFr}
                  onChange={(e) => setEditingRealisation({ ...editingRealisation, descFr: e.target.value })}
                  placeholder="Description détaillée du projet..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Ajouter un tag..."
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button onClick={addTag} variant="outline">
                    Ajouter
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {editingRealisation.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 pr-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-1 hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Images (URLs)</Label>
                <div className="flex gap-2">
                  <Input
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="/images/project.jpg"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                  />
                  <Button onClick={addImage} variant="outline">
                    Ajouter
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {editingRealisation.images.map((img, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 pr-1">
                      {img}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="ml-1 hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="featured"
                  checked={editingRealisation.isFeatured}
                  onCheckedChange={(checked) => setEditingRealisation({ ...editingRealisation, isFeatured: checked })}
                />
                <Label htmlFor="featured">Mettre en avant sur l&apos;accueil</Label>
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
