"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  MoreHorizontal,
  Eye,
  Trash2,
  Loader2,
  Search,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle,
  Filter,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import { toast } from "sonner"

// Import défensif: si l'API échoue à importer, on ne crash pas la page
let contactApi: any = null
try {
  const mod = require("@/lib/api/contact.api")
  contactApi = mod.default || mod.contactApi
} catch (e) {
  console.error("Failed to load contactApi:", e)
}

interface Contact {
  id: string
  reference: string
  name: string
  email: string
  phone?: string
  subject: string
  address?: string
  city?: string
  message: string
  isRead: boolean
  createdAt: string
  updatedAt?: string
}

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchContacts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      if (!contactApi) {
        throw new Error("API non disponible")
      }
      const params: any = { page, limit: 20 }
      if (search) params.search = search

      const response = await contactApi.findAll(params)

      // Gestion défensive de la réponse
      let data: Contact[] = []
      if (Array.isArray(response)) {
        data = response
      } else if (response?.data && Array.isArray(response.data)) {
        data = response.data
        setTotalPages(response.meta?.totalPages || 1)
      } else if (response?.contacts && Array.isArray(response.contacts)) {
        data = response.contacts
      }

      // Filtrage côté client si le filtre isRead n'est pas supporté par l'API
      if (filter === "unread") {
        data = data.filter(c => !c.isRead)
      } else if (filter === "read") {
        data = data.filter(c => c.isRead)
      }

      setContacts(data)
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Erreur lors du chargement des messages"
      setError(msg)
      console.error("Contact fetch error:", err)
    } finally {
      setIsLoading(false)
    }
  }, [filter, page, search])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  const handleMarkAsRead = async (contact: Contact) => {
    try {
      if (!contactApi?.markAsRead) return
      await contactApi.markAsRead(contact.id)
      setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, isRead: true } : c))
      toast.success("Message marqué comme lu")
    } catch (error) {
      toast.error("Erreur lors de la mise à jour")
    }
  }

  const handleDelete = async (contact: Contact) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return
    try {
      if (!contactApi?.remove) return
      await contactApi.remove(contact.id)
      toast.success("Message supprimé")
      setDetailOpen(false)
      setContacts(prev => prev.filter(c => c.id !== contact.id))
    } catch (error) {
      toast.error("Erreur lors de la suppression")
    }
  }

  const openDetail = async (contact: Contact) => {
    setSelectedContact(contact)
    setDetailOpen(true)
    if (!contact.isRead) {
      handleMarkAsRead(contact)
    }
  }

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return date
    }
  }

  const unreadCount = contacts.filter(c => !c.isRead).length

  // État d'erreur critique (page ne peut pas charger)
  if (error && contacts.length === 0 && !isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Prises de contact
          </h1>
          <p className="text-muted-foreground">Gérez les messages reçus via le formulaire</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <p className="text-lg font-semibold text-foreground mb-2">Impossible de charger les messages</p>
            <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">{error}</p>
            <Button onClick={fetchContacts}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Prises de contact
          </h1>
          <p className="text-muted-foreground">
            Gérez les messages reçus via le formulaire de contact
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-sm px-3 py-1">
              {unreadCount} non lu(s)
            </Badge>
          )}
          <Button variant="outline" size="sm" onClick={fetchContacts} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Filter className="h-4 w-4 text-muted-foreground self-center" />
              {(["all", "unread", "read"] as const).map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? "default" : "outline"}
                  onClick={() => { setFilter(f); setPage(1) }}
                >
                  {f === "all" ? "Tous" : f === "unread" ? "Non lus" : "Lus"}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun message trouvé</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8"></TableHead>
                    <TableHead>Référence</TableHead>
                    <TableHead>Expéditeur</TableHead>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow
                      key={contact.id}
                      className={`cursor-pointer hover:bg-muted/50 ${!contact.isRead ? "bg-primary/5 font-medium" : ""}`}
                      onClick={() => openDetail(contact)}
                    >
                      <TableCell>
                        {!contact.isRead && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Badge variant="outline" className="font-mono text-xs">
                          {contact.reference || contact.id.slice(0, 8)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">{contact.email}</div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <span className="truncate block">{contact.subject}</span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(contact.createdAt)}
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openDetail(contact)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir détails
                            </DropdownMenuItem>
                            {!contact.isRead && (
                              <DropdownMenuItem onClick={() => handleMarkAsRead(contact)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Marquer comme lu
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(contact)}
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

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 p-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Précédent
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Dialog détail */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="font-mono">
                    {selectedContact.reference || selectedContact.id.slice(0, 8)}
                  </Badge>
                  {!selectedContact.isRead && (
                    <Badge variant="default">Non lu</Badge>
                  )}
                </DialogTitle>
                <DialogDescription>
                  Reçu le {formatDate(selectedContact.createdAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Nom</p>
                    <p className="font-semibold">{selectedContact.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-primary hover:underline text-sm"
                      >
                        {selectedContact.email}
                      </a>
                    </div>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Téléphone</p>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <a href={`tel:${selectedContact.phone}`} className="text-sm">
                          {selectedContact.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {selectedContact.address && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Adresse d'intervention</p>
                      <p className="text-sm">{selectedContact.address}</p>
                    </div>
                  )}
                  {selectedContact.city && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Ville / Région</p>
                      <p className="text-sm">{selectedContact.city}</p>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Sujet</p>
                  <p className="font-semibold">{selectedContact.subject}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Message</p>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    window.location.href = `mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(selectedContact.subject)}`
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Répondre par email
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedContact)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}