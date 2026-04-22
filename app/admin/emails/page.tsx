"use client"

import { type ChangeEvent, useState, useEffect } from "react"
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
  Edit,
  Mail,
  Send,
  Loader2,
  Clock,
  Variable,
} from "lucide-react"
import emailTemplatesApi, { EmailTemplate } from "@/lib/api/email-templates.api"
import { toast } from "sonner"

export default function AdminEmailsPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [testDialogOpen, setTestDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [testEmail, setTestEmail] = useState("")
  const [sendingTest, setSendingTest] = useState(false)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const data = await emailTemplatesApi.findAll()
      setTemplates(data)
    } catch (error) {
      toast.error("Erreur lors du chargement des templates")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = async (template: EmailTemplate) => {
    setEditingTemplate({
      ...template,
      subject: template.subject,
      bodyHtml: template.bodyHtml,
      bodyText: template.bodyText || "",
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!editingTemplate) return

    setIsSaving(true)
    try {
      await emailTemplatesApi.update(editingTemplate.slug, {
        subject: editingTemplate.subject,
        bodyHtml: editingTemplate.bodyHtml,
        bodyText: editingTemplate.bodyText,
      })
      toast.success("Template enregistré avec succès")
      setDialogOpen(false)
      fetchTemplates()
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSendTest = async () => {
    if (!editingTemplate || !testEmail) return

    setSendingTest(true)
    try {
      await emailTemplatesApi.sendTest(editingTemplate.slug, testEmail)
      toast.success(`Email de test envoyé à ${testEmail}`)
      setTestDialogOpen(false)
      setTestEmail("")
    } catch (error) {
      toast.error("Erreur lors de l'envoi du test")
    } finally {
      setSendingTest(false)
    }
  }

  const insertVariable = (variable: string) => {
    if (!editingTemplate) return
    setEditingTemplate({
      ...editingTemplate,
      bodyHtml: editingTemplate.bodyHtml + `{{${variable}}}`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Templates Email
        </h1>
        <p className="text-muted-foreground">
          Gérez les modèles d&apos;emails envoyés automatiquement
        </p>
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
                  <TableHead>Nom</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Sujet</TableHead>
                  <TableHead>Variables</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{template.slug}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{template.subject}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.slice(0, 3).map((v) => (
                          <Badge key={v} variant="secondary" className="text-xs">
                            {v}
                          </Badge>
                        ))}
                        {template.variables.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.variables.length - 3}
                          </Badge>
                        )}
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
                          <DropdownMenuItem onClick={() => handleEdit(template)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setEditingTemplate(template)
                            setTestDialogOpen(true)
                          }}>
                            <Send className="mr-2 h-4 w-4" />
                            Envoyer un test
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le template</DialogTitle>
            <DialogDescription>
              {editingTemplate?.name}
            </DialogDescription>
          </DialogHeader>

          {editingTemplate && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Variables disponibles</Label>
                <div className="flex flex-wrap gap-2">
                  {editingTemplate.variables.map((v) => (
                    <Badge
                      key={v}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => insertVariable(v)}
                    >
                      <Variable className="h-3 w-3 mr-1" />
                      {v}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sujet</Label>
                <Input
                  value={editingTemplate.subject}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                  placeholder="Objet de l'email..."
                />
              </div>

              <div className="space-y-2">
                <Label>Corps HTML</Label>
                <Textarea
                  value={editingTemplate.bodyHtml}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEditingTemplate({ ...editingTemplate, bodyHtml: e.target.value })}
                  placeholder="<h1>Bonjour {{name}}</h1>..."
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label>Texte alternatif (plain text)</Label>
                <Textarea
                  value={editingTemplate.bodyText}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEditingTemplate({ ...editingTemplate, bodyText: e.target.value })}
                  placeholder="Bonjour {{name}}, ..."
                  rows={6}
                  className="font-mono text-sm"
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

      <Dialog open={testDialogOpen} onOpenChange={setTestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Envoyer un email de test</DialogTitle>
            <DialogDescription>
              Envoyez un email de test à l&apos;adresse de votre choix
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Adresse email</Label>
              <Input
                type="email"
                value={testEmail}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTestEmail(e.target.value)}
                placeholder="test@exemple.com"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setTestDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendTest} disabled={sendingTest || !testEmail}>
              {sendingTest && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Send className="mr-2 h-4 w-4" />
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Textarea({ value, onChange, placeholder, rows, className }: any) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={className}
      style={{
        width: "100%",
        padding: "0.75rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--border)",
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      }}
    />
  )
}
