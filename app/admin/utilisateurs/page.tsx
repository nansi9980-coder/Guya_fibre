"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  DropdownMenuSeparator,
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
  Key,
  Loader2,
  Shield,
  User as UserIcon,
  Eye,
  EyeOff,
} from "lucide-react"
import usersApi, { User, CreateUserDto, UpdateUserDto } from "@/lib/api/users.api"
import { toast } from "sonner"

const ROLE_COLORS = {
  SUPER_ADMIN: "bg-red-500",
  EDITOR: "bg-blue-500",
  VIEWER: "bg-gray-500",
}

const ROLE_LABELS = {
  SUPER_ADMIN: "Super Admin",
  EDITOR: "Éditeur",
  VIEWER: "Lecteur",
}

const defaultUser: CreateUserDto & { password: string } = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  role: "EDITOR",
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UpdateUserDto | null>(null)
  const [creatingUser, setCreatingUser] = useState<CreateUserDto | null>(null)
  const [editingUserEmail, setEditingUserEmail] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await usersApi.findAll()
      setUsers(response.data || response)
    } catch (error) {
      toast.error("Erreur lors du chargement des utilisateurs")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      })
      setEditingUserEmail(user.email)
      setCreatingUser(null)
    } else {
      setCreatingUser(defaultUser)
      setEditingUser(null)
      setEditingUserEmail("")
    }
    setDialogOpen(true)
  }

  const handleSave = async () => {
    const userData = editingUser || creatingUser
    if (!userData) return

    const email = editingUser ? editingUserEmail : (creatingUser?.email || "")
    const firstName = userData.firstName
    const lastName = userData.lastName

    if (!email || !firstName || !lastName) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }

    setIsSaving(true)
    try {
      if (editingUser) {
        // Mise à jour d'utilisateur existant
        const existing = users.find(u => u.email === editingUserEmail)
        if (existing) {
          await usersApi.update(existing.id, editingUser)
        }
      } else if (creatingUser) {
        // Création d'un nouvel utilisateur
        await usersApi.create(creatingUser)
      }
      toast.success("Utilisateur enregistré avec succès")
      setDialogOpen(false)
      setEditingUser(null)
      setCreatingUser(null)
      setEditingUserEmail("")
      fetchUsers()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erreur lors de l'enregistrement")
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggleActive = async (user: User) => {
    try {
      await usersApi.update(user.id, { isActive: !user.isActive })
      toast.success(user.isActive ? "Utilisateur désactivé" : "Utilisateur activé")
      fetchUsers()
    } catch (error) {
      toast.error("Erreur lors de la mise à jour")
    }
  }

  const handleDelete = async (user: User) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.email} ?`)) return

    try {
      await usersApi.delete(user.id)
      toast.success("Utilisateur supprimé")
      fetchUsers()
    } catch (error) {
      toast.error("Erreur lors de la suppression")
    }
  }

  const handleChangePassword = async () => {
    if (!selectedUser || !newPassword) return

    setIsSaving(true)
    try {
      await usersApi.changePassword(selectedUser.id, currentPassword, newPassword)
      toast.success("Mot de passe modifié avec succès")
      setPasswordDialogOpen(false)
      setNewPassword("")
      setCurrentPassword("")
      setSelectedUser(null)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erreur lors du changement de mot de passe")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Utilisateurs
          </h1>
          <p className="text-muted-foreground">
            Gérez les comptes administrateurs
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel utilisateur
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
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.firstName} {user.lastName}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge className={ROLE_COLORS[user.role as keyof typeof ROLE_COLORS]}>
                        {ROLE_LABELS[user.role as keyof typeof ROLE_LABELS]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={user.isActive}
                          onCheckedChange={() => handleToggleActive(user)}
                        />
                        <span className={user.isActive ? "text-emerald-500" : "text-muted-foreground"}>
                          {user.isActive ? "Actif" : "Inactif"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString("fr-FR")
                        : "Jamais"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenDialog(user)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedUser(user)
                            setPasswordDialogOpen(true)
                          }}>
                            <Key className="mr-2 h-4 w-4" />
                            Changer mot de passe
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(user)}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations de l&apos;utilisateur
            </DialogDescription>
          </DialogHeader>

          {(editingUser || creatingUser) && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prénom</Label>
                  <Input
                    value={editingUser?.firstName || creatingUser?.firstName || ""}
                    onChange={(e) => {
                      if (editingUser) {
                        setEditingUser({ ...editingUser, firstName: e.target.value })
                      } else if (creatingUser) {
                        setCreatingUser({ ...creatingUser, firstName: e.target.value })
                      }
                    }}
                    placeholder="Prénom"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nom</Label>
                  <Input
                    value={editingUser?.lastName || creatingUser?.lastName || ""}
                    onChange={(e) => {
                      if (editingUser) {
                        setEditingUser({ ...editingUser, lastName: e.target.value })
                      } else if (creatingUser) {
                        setCreatingUser({ ...creatingUser, lastName: e.target.value })
                      }
                    }}
                    placeholder="Nom"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editingUser ? editingUserEmail : (creatingUser?.email || "")}
                  onChange={(e) => {
                    if (editingUser) {
                      setEditingUserEmail(e.target.value)
                    } else if (creatingUser) {
                      setCreatingUser({ ...creatingUser, email: e.target.value })
                    }
                  }}
                  placeholder="email@exemple.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Rôle</Label>
                <Select
                  value={editingUser?.role || creatingUser?.role || "EDITOR"}
                  onValueChange={(value: any) => {
                    if (editingUser) {
                      setEditingUser({ ...editingUser, role: value })
                    } else if (creatingUser) {
                      setCreatingUser({ ...creatingUser, role: value })
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                    <SelectItem value="EDITOR">Éditeur</SelectItem>
                    <SelectItem value="VIEWER">Lecteur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {creatingUser && (
                <div className="space-y-2">
                  <Label>Mot de passe</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={creatingUser.password}
                      onChange={(e) => setCreatingUser({ ...creatingUser, password: e.target.value })}
                      placeholder="Mot de passe"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}
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

      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer le mot de passe</DialogTitle>
            <DialogDescription>
              {selectedUser && `Modifier le mot de passe de ${selectedUser.email}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nouveau mot de passe</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPasswordDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleChangePassword} disabled={isSaving || !newPassword}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Modifier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
