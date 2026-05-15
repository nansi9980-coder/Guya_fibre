"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Plus,
  Trash2,
  Loader2,
  Save,
  RotateCcw,
  Image as ImageIcon,
  Globe,
  Type,
} from "lucide-react"
import siteContentApi from "@/lib/api/site-content.api"
import { toast } from "sonner"

interface ContentData {
  badge?: string
  titleFr?: string
  titleEn?: string
  subtitle?: string
  subtitleFr?: string
  ctaPrimary?: string
  ctaSecondary?: string
  backgroundImage?: string
  [key: string]: any
}

export default function AdminContentPage() {
  const [sections, setSections] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("hero")
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editData, setEditData] = useState<ContentData>({})

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const data = await siteContentApi.getAll()
      const sectionsObj: Record<string, any> = {}
      data.forEach((item: any) => {
        sectionsObj[item.section] = item.content
      })
      setSections(sectionsObj)
    } catch (error) {
      toast.error("Erreur lors du chargement du contenu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!editingSection) return

    setSaving(true)
    try {
      await siteContentApi.update(editingSection, editData)
      toast.success("Contenu enregistré avec succès")
      setEditingSection(null)
      fetchContent()
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement")
    } finally {
      setSaving(false)
    }
  }

  const handleReset = async (section: string) => {
    if (!confirm("Êtes-vous sûr de vouloir réinitialiser cette section aux valeurs par défaut ?")) return

    try {
      await siteContentApi.reset(section)
      toast.success("Section réinitialisée")
      fetchContent()
    } catch (error) {
      toast.error("Erreur lors de la réinitialisation")
    }
  }

  const openEdit = (section: string) => {
    setEditingSection(section)
    setEditData(sections[section] || {})
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Contenu du site
        </h1>
        <p className="text-muted-foreground">
          Modifiez le contenu éditorial du site public
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">À propos</TabsTrigger>
          <TabsTrigger value="cta">CTA</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Section Hero</CardTitle>
                  <CardDescription>
                    Modifiez le contenu de la bannière principale
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleReset("hero")}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Réinitialiser
                  </Button>
                  <Button size="sm" onClick={() => openEdit("hero")}>
                    <Type className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Badge:</span>
                  <span className="font-medium">{sections.hero?.badge || "—"}</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Titre FR:</p>
                  <p className="font-medium">{sections.hero?.titleFr || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sous-titre FR:</p>
                  <p className="text-sm text-muted-foreground">{sections.hero?.subtitleFr || sections.hero?.subtitle || "—"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Section À propos</CardTitle>
                  <CardDescription>
                    Modifiez la section à propos de l&apos;entreprise
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleReset("about")}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Réinitialiser
                  </Button>
                  <Button size="sm" onClick={() => openEdit("about")}>
                    <Type className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Titre:</p>
                  <p className="font-medium">{sections.about?.title || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Description:</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {sections.about?.description || "—"}
                  </p>
                </div>
                {sections.about?.stats && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Statistiques:</p>
                    <div className="flex flex-wrap gap-2">
                      {sections.about.stats.map((stat: any, i: number) => (
                        <div key={i} className="bg-muted px-3 py-1 rounded-lg">
                          <span className="font-bold">{stat.value}</span>
                          <span className="text-sm text-muted-foreground ml-2">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cta" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Section CTA</CardTitle>
                  <CardDescription>
                    Modifiez la bannière d&apos;appel à l&apos;action
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleReset("cta")}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Réinitialiser
                  </Button>
                  <Button size="sm" onClick={() => openEdit("cta")}>
                    <Type className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Titre FR:</p>
                  <p className="font-medium">{sections.cta?.titleFr || sections.cta?.title || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sous-titre:</p>
                  <p className="text-sm text-muted-foreground">
                    {sections.cta?.subtitleFr || sections.cta?.subtitle || "—"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm text-muted-foreground">Bouton:</span>
                  <span className="font-medium">
                    {sections.cta?.buttonText || sections.cta?.ctaPrimary || "—"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pied de page</CardTitle>
                  <CardDescription>
                    Modifiez le contenu du footer
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleReset("footer")}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Réinitialiser
                  </Button>
                  <Button size="sm" onClick={() => openEdit("footer")}>
                    <Type className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Description:</p>
                  <p className="text-sm">{sections.footer?.description || "—"}</p>
                </div>
                {sections.footer?.legalLinks && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Liens légaux:</p>
                    <div className="flex flex-wrap gap-2">
                      {sections.footer.legalLinks.map((link: any, i: number) => (
                        <span key={i} className="bg-muted px-3 py-1 rounded-lg text-sm">
                          {link.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingSection} onOpenChange={() => setEditingSection(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier {editingSection}</DialogTitle>
            <DialogDescription>
              Modifiez le contenu de cette section
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {editingSection === "hero" && (
              <>
                <div className="space-y-2">
                  <Label>Badge</Label>
                  <Input
                    value={editData.badge || ""}
                    onChange={(e) => setEditData({ ...editData, badge: e.target.value })}
                    placeholder="Ex: Experts Fibre Optique"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Titre (Français)</Label>
                  <Input
                    value={editData.titleFr || ""}
                    onChange={(e) => setEditData({ ...editData, titleFr: e.target.value })}
                    placeholder="Titre principal"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Titre (Anglais)</Label>
                  <Input
                    value={editData.titleEn || ""}
                    onChange={(e) => setEditData({ ...editData, titleEn: e.target.value })}
                    placeholder="Main title (English)"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sous-titre (Français)</Label>
                  <Textarea
                    value={editData.subtitleFr || ""}
                    onChange={(e) => setEditData({ ...editData, subtitleFr: e.target.value })}
                    placeholder="Description..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bouton principal</Label>
                    <Input
                      value={editData.ctaPrimary || ""}
                      onChange={(e) => setEditData({ ...editData, ctaPrimary: e.target.value })}
                      placeholder="Demander une prise de contact"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bouton secondaire</Label>
                    <Input
                      value={editData.ctaSecondary || ""}
                      onChange={(e) => setEditData({ ...editData, ctaSecondary: e.target.value })}
                      placeholder="Nos services"
                    />
                  </div>
                </div>
              </>
            )}

            {editingSection === "about" && (
              <>
                <div className="space-y-2">
                  <Label>Titre</Label>
                  <Input
                    value={editData.title || ""}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    placeholder="Titre de la section"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editData.description || ""}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    placeholder="Description..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image (chemin)</Label>
                  <Input
                    value={editData.image || ""}
                    onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                    placeholder="/images/about.jpg"
                  />
                </div>
              </>
            )}

            {editingSection === "cta" && (
              <>
                <div className="space-y-2">
                  <Label>Titre</Label>
                  <Input
                    value={editData.titleFr || editData.title || ""}
                    onChange={(e) => setEditData({ ...editData, titleFr: e.target.value })}
                    placeholder="Titre du CTA"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sous-titre</Label>
                  <Textarea
                    value={editData.subtitleFr || editData.subtitle || ""}
                    onChange={(e) => setEditData({ ...editData, subtitleFr: e.target.value })}
                    placeholder="Sous-titre..."
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Texte du bouton</Label>
                    <Input
                      value={editData.buttonText || editData.ctaPrimary || ""}
                      onChange={(e) => setEditData({ ...editData, buttonText: e.target.value })}
                      placeholder="Demander une prise de contact"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Lien du bouton</Label>
                    <Input
                      value={editData.buttonLink || ""}
                      onChange={(e) => setEditData({ ...editData, buttonLink: e.target.value })}
                      placeholder="/devis"
                    />
                  </div>
                </div>
              </>
            )}

            {editingSection === "footer" && (
              <>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editData.description || ""}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    placeholder="Description du footer..."
                    rows={3}
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSection(null)}>
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
