"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Upload,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Search,
  Folder,
  Video,
  FileText,
  File,
  Download,
  Copy,
  Play,
  X,
  Film,
} from "lucide-react"
import mediasApi, { Media } from "@/lib/api/medias.api"
import { toast } from "sonner"

const FOLDERS = ["general", "services", "projets", "hero", "about", "videos"]

// Types de fichiers acceptés
const ACCEPT_ALL = "image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.mp3,.mp4,.mov,.avi,.webm"

type MediaType = "all" | "image" | "video" | "document" | "other"

function getMediaType(mimeType: string): MediaType {
  if (mimeType.startsWith("image/")) return "image"
  if (mimeType.startsWith("video/")) return "video"
  if (
    mimeType === "application/pdf" ||
    mimeType.includes("word") ||
    mimeType.includes("excel") ||
    mimeType.includes("powerpoint") ||
    mimeType.includes("spreadsheet") ||
    mimeType.includes("document")
  ) return "document"
  return "other"
}

function getMediaIcon(mimeType: string) {
  const type = getMediaType(mimeType)
  switch (type) {
    case "image": return ImageIcon
    case "video": return Video
    case "document": return FileText
    default: return File
  }
}

function getMediaTypeLabel(type: MediaType) {
  switch (type) {
    case "image": return "Images"
    case "video": return "Vidéos"
    case "document": return "Documents"
    case "other": return "Autres"
    default: return "Tous"
  }
}

export default function AdminMediasPage() {
  const [medias, setMedias] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [filterFolder, setFilterFolder] = useState("all")
  const [filterType, setFilterType] = useState<MediaType>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [mediaToDelete, setMediaToDelete] = useState<Media | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const fetchMedias = useCallback(async () => {
    try {
      const params: any = {}
      if (filterFolder !== "all") params.folder = filterFolder
      const response = await mediasApi.findAll(params)
      setMedias(Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [])
    } catch (error) {
      toast.error("Erreur lors du chargement des médias")
      setMedias([])
    } finally {
      setIsLoading(false)
    }
  }, [filterFolder])

  useEffect(() => {
    fetchMedias()
  }, [fetchMedias])

  const uploadFiles = async (files: File[]) => {
    if (!files.length) return
    setUploading(true)
    setUploadProgress(0)
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        await mediasApi.upload(file, filterFolder === "all" ? "general" : filterFolder)
        setUploadProgress(Math.round(((i + 1) / files.length) * 100))
      }
      toast.success(`${files.length} fichier(s) uploadé(s) avec succès`)
      fetchMedias()
    } catch (error) {
      toast.error("Erreur lors de l'upload")
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    await uploadFiles(files)
    e.target.value = ""
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    await uploadFiles(files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDelete = async () => {
    if (!mediaToDelete) return
    try {
      await mediasApi.delete(mediaToDelete.id)
      toast.success("Fichier supprimé")
      setDeleteDialogOpen(false)
      setMediaToDelete(null)
      fetchMedias()
    } catch (error) {
      toast.error("Erreur lors de la suppression")
    }
  }

  const confirmDelete = (media: Media) => {
    setMediaToDelete(media)
    setDeleteDialogOpen(true)
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success("URL copiée dans le presse-papier")
  }

  const filteredMedias = medias.filter((media) => {
    const matchesSearch = media.originalName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || getMediaType(media.mimeType) === filterType
    return matchesSearch && matchesType
  })

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const countByType = (type: MediaType) =>
    type === "all" ? medias.length : medias.filter(m => getMediaType(m.mimeType) === type).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Médiathèque
          </h1>
          <p className="text-muted-foreground">
            Images, vidéos, documents et autres fichiers du site
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={filterFolder} onValueChange={setFilterFolder}>
            <SelectTrigger className="w-[150px]">
              <Folder className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les dossiers</SelectItem>
              {FOLDERS.map((folder) => (
                <SelectItem key={folder} value={folder}>
                  {folder}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[200px]"
            />
          </div>
          <div>
            <input
              type="file"
              id="file-upload"
              multiple
              accept={ACCEPT_ALL}
              className="hidden"
              onChange={handleUpload}
            />
            <label htmlFor="file-upload">
              <Button asChild disabled={uploading} className="cursor-pointer">
                <span>
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {uploadProgress > 0 ? `${uploadProgress}%` : "Upload..."}
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </>
                  )}
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>

      {/* Filtres par type */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "image", "video", "document", "other"] as MediaType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
              filterType === type
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            {type === "image" && <ImageIcon className="h-3.5 w-3.5" />}
            {type === "video" && <Video className="h-3.5 w-3.5" />}
            {type === "document" && <FileText className="h-3.5 w-3.5" />}
            {type === "other" && <File className="h-3.5 w-3.5" />}
            {getMediaTypeLabel(type)}
            <span className="ml-0.5 opacity-70">({countByType(type)})</span>
          </button>
        ))}
      </div>

      {/* Zone de drop */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border hover:border-primary/40"
        }`}
      >
        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          Glissez-déposez vos fichiers ici, ou{" "}
          <label htmlFor="file-upload" className="text-primary cursor-pointer hover:underline">
            parcourez
          </label>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Images · Vidéos (MP4, MOV, AVI, WebM) · PDF · Documents · ZIP — Taille max : 100 MB
        </p>
      </div>

      {/* Grille médias */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredMedias.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucun fichier trouvé</p>
            <p className="text-sm text-muted-foreground mt-1">
              Uploadez vos premiers fichiers
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedias.map((media) => {
            const type = getMediaType(media.mimeType)
            const Icon = getMediaIcon(media.mimeType)
            return (
              <Card
                key={media.id}
                className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all group"
                onClick={() => setSelectedMedia(media)}
              >
                <div className="aspect-square relative bg-muted">
                  {type === "image" ? (
                    <img
                      src={media.url}
                      alt={media.originalName}
                      className="object-cover w-full h-full"
                    />
                  ) : type === "video" ? (
                    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-violet-900/30 to-blue-900/30">
                      <div className="relative">
                        <Film className="h-10 w-10 text-violet-400" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Play className="h-3 w-3 text-primary-foreground fill-current" />
                        </div>
                      </div>
                    </div>
                  ) : type === "document" ? (
                    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-orange-900/20 to-red-900/20">
                      <FileText className="h-10 w-10 text-orange-400" />
                      <span className="mt-2 text-xs font-bold text-orange-400 uppercase">
                        {media.mimeType.includes("pdf") ? "PDF" :
                          media.mimeType.includes("word") || media.mimeType.includes("document") ? "DOC" :
                          media.mimeType.includes("excel") || media.mimeType.includes("spreadsheet") ? "XLS" : "FILE"}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Icon className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  {/* Overlay actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); copyUrl(media.url) }}
                      className="p-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
                      title="Copier l'URL"
                    >
                      <Copy className="h-3.5 w-3.5 text-white" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); confirmDelete(media) }}
                      className="p-1.5 bg-red-500/60 rounded-full hover:bg-red-500/80 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-white" />
                    </button>
                  </div>
                  {/* Badge type */}
                  <div className="absolute top-1.5 left-1.5">
                    <Badge variant="secondary" className="text-[9px] px-1.5 py-0.5 h-auto">
                      {type === "image" ? "IMG" : type === "video" ? "VID" : type === "document" ? "DOC" : "FILE"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-2">
                  <p className="text-xs truncate font-medium">{media.originalName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(media.size)}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Dialog détail */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-3xl">
          {selectedMedia && (() => {
            const type = getMediaType(selectedMedia.mimeType)
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {type === "image" && <ImageIcon className="h-5 w-5 text-primary" />}
                    {type === "video" && <Video className="h-5 w-5 text-violet-500" />}
                    {type === "document" && <FileText className="h-5 w-5 text-orange-500" />}
                    {type === "other" && <File className="h-5 w-5 text-muted-foreground" />}
                    {selectedMedia.originalName}
                  </DialogTitle>
                  <DialogDescription>Détails du fichier</DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    {type === "image" ? (
                      <img
                        src={selectedMedia.url}
                        alt={selectedMedia.originalName}
                        className="object-contain w-full h-full"
                      />
                    ) : type === "video" ? (
                      <video
                        src={selectedMedia.url}
                        controls
                        className="w-full h-full"
                        preload="metadata"
                      >
                        Votre navigateur ne supporte pas la lecture vidéo.
                      </video>
                    ) : type === "document" && selectedMedia.mimeType === "application/pdf" ? (
                      <iframe
                        src={selectedMedia.url}
                        className="w-full h-full"
                        title={selectedMedia.originalName}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <File className="h-16 w-16 text-muted-foreground" />
                        <a
                          href={selectedMedia.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          <Download className="h-4 w-4" />
                          Télécharger le fichier
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-muted-foreground">Nom original</Label>
                      <p className="font-medium">{selectedMedia.originalName}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Type</Label>
                      <p className="font-medium">{selectedMedia.mimeType}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Taille</Label>
                      <p className="font-medium">{formatFileSize(selectedMedia.size)}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Dossier</Label>
                      <p className="font-medium">{selectedMedia.folder}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">URL</Label>
                      <div className="flex gap-2 mt-1">
                        <Input value={selectedMedia.url} readOnly className="text-xs" />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyUrl(selectedMedia.url)}
                          title="Copier l'URL"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          title="Ouvrir dans un nouvel onglet"
                        >
                          <a href={selectedMedia.url} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setSelectedMedia(null)
                      confirmDelete(selectedMedia)
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </Button>
                </DialogFooter>
              </>
            )
          })()}
        </DialogContent>
      </Dialog>

      {/* Dialog suppression */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le fichier</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer <strong>{mediaToDelete?.originalName}</strong> ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}