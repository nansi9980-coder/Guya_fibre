'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemePaletteCustomizer } from '@/components/theme-palette-customizer'
import { settingsApi } from '@/lib/api/settings.api'
import { useThemeCustom } from '@/lib/theme-custom'
import { toast } from 'sonner'
import {
  Building2, Mail, Phone, MapPin, Globe, Save, Bell, Palette, Server, Loader2,
} from 'lucide-react'

export default function AdminSettingsPage() {
  const { paletteKey, setPalette } = useThemeCustom()
  const [loadingCompany, setLoadingCompany] = useState(true)
  const [savingCompany, setSavingCompany] = useState(false)
  const [savingTheme, setSavingTheme] = useState(false)

  const [companySettings, setCompanySettings] = useState({
    name: '', email: '', phone: '', address: '',
    city: '', postalCode: '', siret: '', website: '',
  })

  const [seoSettings, setSeoSettings] = useState({
    title: '', description: '', keywords: '',
  })

  const [notifications, setNotifications] = useState({
    newQuote: true, quoteResponse: true, urgentQuote: true, weeklyReport: false,
  })

  useEffect(() => {
    Promise.all([
      settingsApi.getGroup('company').catch(() => ({})),
      settingsApi.getGroup('seo').catch(() => ({})),
      settingsApi.getGroup('notifications').catch(() => ({})),
    ]).then(([company, seo, notif]) => {
      setCompanySettings({
        name: String(company.name || ''),
        email: String(company.email || ''),
        phone: String(company.phone || ''),
        address: String(company.address || ''),
        city: String(company.city || ''),
        postalCode: String(company.postalCode || ''),
        siret: String(company.siret || ''),
        website: String(company.website || ''),
      })
      setSeoSettings({
        title: String(seo.title || ''),
        description: String(seo.description || ''),
        keywords: String(seo.keywords || ''),
      })
      if (Object.keys(notif).length > 0) {
        setNotifications({
          newQuote: Boolean(notif.newQuote ?? true),
          quoteResponse: Boolean(notif.quoteResponse ?? true),
          urgentQuote: Boolean(notif.urgentQuote ?? true),
          weeklyReport: Boolean(notif.weeklyReport ?? false),
        })
      }
    }).finally(() => setLoadingCompany(false))
  }, [])

  const handleSaveCompany = async () => {
    setSavingCompany(true)
    try {
      await settingsApi.updateGroup('company', companySettings)
      toast.success('Informations société sauvegardées')
    } catch { toast.error('Erreur lors de la sauvegarde') }
    setSavingCompany(false)
  }

  const handleSaveSeo = async () => {
    setSavingCompany(true)
    try {
      await settingsApi.updateGroup('seo', seoSettings)
      toast.success('Paramètres SEO sauvegardés')
    } catch { toast.error('Erreur lors de la sauvegarde') }
    setSavingCompany(false)
  }

  const handleSaveNotifications = async () => {
    setSavingCompany(true)
    try {
      await settingsApi.updateGroup('notifications', notifications)
      toast.success('Notifications sauvegardées')
    } catch { toast.error('Erreur lors de la sauvegarde') }
    setSavingCompany(false)
  }

  const handleSaveTheme = async () => {
    setSavingTheme(true)
    try {
      await settingsApi.updateGroup('theme', { activePalette: paletteKey })
      toast.success('Thème appliqué au site vitrine')
    } catch { toast.error('Erreur lors de la sauvegarde du thème') }
    setSavingTheme(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Paramètres</h1>
        <p className="text-muted-foreground">
          Configurez les paramètres de votre application et personnalisez l&apos;apparence du site
        </p>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Apparence</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Entreprise</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Personnalisation des couleurs
              </CardTitle>
              <CardDescription>
                Choisissez parmi 20 palettes — le changement s&apos;applique à tous les visiteurs du site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ThemePaletteCustomizer />
              <Button onClick={handleSaveTheme} disabled={savingTheme} className="gap-2">
                {savingTheme ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Appliquer le thème au site
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Informations de l&apos;entreprise
              </CardTitle>
              <CardDescription>Mettez à jour les détails de votre entreprise</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loadingCompany ? (
                <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nom de l&apos;entreprise</Label>
                      <Input value={companySettings.name} onChange={e => setCompanySettings(s => ({ ...s, name: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>SIRET</Label>
                      <Input value={companySettings.siret} onChange={e => setCompanySettings(s => ({ ...s, siret: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1"><Mail className="h-4 w-4" /> Email</Label>
                      <Input type="email" value={companySettings.email} onChange={e => setCompanySettings(s => ({ ...s, email: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1"><Phone className="h-4 w-4" /> Téléphone</Label>
                      <Input value={companySettings.phone} onChange={e => setCompanySettings(s => ({ ...s, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Adresse</Label>
                    <Input value={companySettings.address} onChange={e => setCompanySettings(s => ({ ...s, address: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Ville</Label>
                      <Input value={companySettings.city} onChange={e => setCompanySettings(s => ({ ...s, city: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Code postal</Label>
                      <Input value={companySettings.postalCode} onChange={e => setCompanySettings(s => ({ ...s, postalCode: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Globe className="h-4 w-4" /> Site web</Label>
                    <Input value={companySettings.website} onChange={e => setCompanySettings(s => ({ ...s, website: e.target.value }))} />
                  </div>
                  <Button onClick={handleSaveCompany} disabled={savingCompany} className="gap-2">
                    {savingCompany ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Sauvegarder
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Paramètres SEO
              </CardTitle>
              <CardDescription>Configurez les métadonnées pour le référencement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loadingCompany ? (
                <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Titre de la page</Label>
                    <Input value={seoSettings.title} onChange={e => setSeoSettings(s => ({ ...s, title: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={seoSettings.description} onChange={e => setSeoSettings(s => ({ ...s, description: e.target.value }))} className="min-h-24" />
                  </div>
                  <div className="space-y-2">
                    <Label>Mots-clés (séparés par des virgules)</Label>
                    <Textarea value={seoSettings.keywords} onChange={e => setSeoSettings(s => ({ ...s, keywords: e.target.value }))} className="min-h-20" />
                  </div>
                  <Button onClick={handleSaveSeo} disabled={savingCompany} className="gap-2">
                    {savingCompany ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Sauvegarder
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Préférences de notifications
              </CardTitle>
              <CardDescription>Configurez les notifications que vous souhaitez recevoir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'newQuote' as const, label: 'Nouvelles demandes de devis', desc: 'Recevoir une notification à chaque nouvelle demande' },
                { id: 'quoteResponse' as const, label: 'Réponses aux devis', desc: 'Recevoir une notification quand un client répond' },
                { id: 'urgentQuote' as const, label: 'Devis urgents', desc: 'Recevoir une notification pour les demandes prioritaires' },
                { id: 'weeklyReport' as const, label: 'Rapport hebdomadaire', desc: 'Recevoir un résumé hebdomadaire' },
              ].map(item => (
                <div key={item.id} className="flex items-start justify-between p-3 rounded-lg border border-border bg-secondary">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.id]}
                    onCheckedChange={checked => setNotifications(n => ({ ...n, [item.id]: checked }))}
                  />
                </div>
              ))}
              <Button onClick={handleSaveNotifications} disabled={savingCompany} className="gap-2">
                {savingCompany ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Sauvegarder
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
