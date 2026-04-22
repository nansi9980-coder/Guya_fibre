"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Filter,
  Loader2,
  Plus,
  Edit,
  Trash2,
  LogIn,
  LogOut,
  Eye,
  CheckCircle,
  XCircle,
  Bell,
  Settings,
  FileText,
  Mail,
  RefreshCw,
} from "lucide-react"
import logsApi, { ActivityLog } from "@/lib/api/logs.api"
import { toast } from "sonner"

const ACTION_CONFIG: Record<string, { label: string; icon: any; color: string }> = {
  CREATE: { label: "Création", icon: Plus, color: "bg-emerald-500" },
  UPDATE: { label: "Modification", icon: Edit, color: "bg-blue-500" },
  DELETE: { label: "Suppression", icon: Trash2, color: "bg-red-500" },
  LOGIN: { label: "Connexion", icon: LogIn, color: "bg-violet-500" },
  LOGOUT: { label: "Déconnexion", icon: LogOut, color: "bg-gray-500" },
  STATUS_CHANGE: { label: "Changement statut", icon: RefreshCw, color: "bg-amber-500" },
  NOTE_ADD: { label: "Note ajoutée", icon: FileText, color: "bg-cyan-500" },
  RESPONSE_SENT: { label: "Réponse envoyée", icon: Mail, color: "bg-pink-500" },
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterAction, setFilterAction] = useState("all")
  const [filterEntity, setFilterEntity] = useState("all")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchLogs()
  }, [filterAction, filterEntity, page])

  const fetchLogs = async () => {
    setIsLoading(true)
    try {
      const params: any = { page, limit: 20 }
      if (filterAction !== "all") params.action = filterAction
      if (filterEntity !== "all") params.entity = filterEntity

      const response = await logsApi.findAll(params)
      setLogs(response.data || response)
      setTotalPages(response.meta?.totalPages || 1)
    } catch (error) {
      toast.error("Erreur lors du chargement des logs")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "À l'instant"
    if (minutes < 60) return `Il y a ${minutes} min`
    if (hours < 24) return `Il y a ${hours}h`
    if (days < 7) return `Il y a ${days}j`
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Historique d&apos;activité
        </h1>
        <p className="text-muted-foreground">
          Consultez toutes les actions effectuées sur le site
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filtrer:</span>
            </div>
            <Select value={filterAction} onValueChange={(v) => { setFilterAction(v); setPage(1); }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les actions</SelectItem>
                {Object.entries(ACTION_CONFIG).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterEntity} onValueChange={(v) => { setFilterEntity(v); setPage(1); }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Entité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les entités</SelectItem>
                <SelectItem value="Devis">Devis</SelectItem>
                <SelectItem value="User">Utilisateurs</SelectItem>
                <SelectItem value="Service">Services</SelectItem>
                <SelectItem value="Contact">Contact</SelectItem>
                <SelectItem value="EmailTemplate">Templates email</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Aucun log trouvé
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Action</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => {
                    const config = ACTION_CONFIG[log.action] || {
                      label: log.action,
                      icon: Settings,
                      color: "bg-gray-500",
                    }
                    const Icon = config.icon

                    return (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className={`w-8 h-8 rounded-full ${config.color} flex items-center justify-center`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{log.description}</div>
                          <div className="text-xs text-muted-foreground">
                            {log.entity}
                            {log.entityId && ` • ID: ${log.entityId}`}
                          </div>
                        </TableCell>
                        <TableCell>
                          {log.user ? (
                            <div className="text-sm">
                              {log.user.firstName} {log.user.lastName}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Système</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(log.createdAt)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 p-4 border-t">
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
    </div>
  )
}
