"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { PhoneInput } from "@/components/ui/phone-input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  FileDown,
  Clock,
  Shield,
  Zap,
  Award,
  ArrowRight,
  Calendar,
  Upload,
  X,
  Sparkles
} from "lucide-react"
import { toast } from "sonner"
import { devisApi, CreateDevisRequest } from "@/lib/api/devis.api"

const serviceOptions = [
  { id: "etudes", label: "Études techniques & Conception", icon: "📐" },
  { id: "deploiement", label: "Déploiement fibre optique", icon: "🔌" },
  { id: "raccordement", label: "Raccordement client (FTTH/FTTO)", icon: "🏠" },
  { id: "maintenance", label: "Maintenance & SAV", icon: "🔧" },
  { id: "audit", label: "Audit de réseau", icon: "🔍" },
  { id: "formation", label: "Formation technique", icon: "📚" },
]

const projectTypes = [
  { value: "particulier", label: "Particulier", icon: "🏠" },
  { value: "entreprise", label: "Entreprise", icon: "🏢" },
  { value: "collectivite", label: "Collectivité", icon: "🏛️" },
  { value: "operateur", label: "Opérateur télécom", icon: "📡" },
]

const urgencyOptions = [
  { value: "normal", label: "Normal (sous 48h)", color: "bg-green-500/20 text-green-400" },
  { value: "urgent", label: "Urgent (sous 24h)", color: "bg-yellow-500/20 text-yellow-400" },
  { value: "tres-urgent", label: "Très urgent (sous 12h)", color: "bg-red-500/20 text-red-400" },
]

const steps = [
  { id: 1, title: "Informations", icon: User },
  { id: 2, title: "Projet", icon: Building2 },
  { id: 3, title: "Services", icon: Zap },
  { id: 4, title: "Détails", icon: FileText },
]

export default function DevisPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+594",
    company: "",
    projectType: "",
    address: "",
    postalCode: "",
    city: "",
    services: [] as string[],
    urgency: "normal",
    preferredDate: "",
    description: "",
    attachments: [] as File[],
    acceptTerms: false,
    newsletter: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files].slice(0, 5)
    }))
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      case 2:
        return formData.projectType && formData.address && formData.postalCode && formData.city
      case 3:
        return formData.services.length > 0
      case 4:
        return formData.description && formData.acceptTerms
      default:
        return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const submitData: CreateDevisRequest = {
        clientName: `${formData.firstName} ${formData.lastName}`,
        clientEmail: formData.email,
        clientPhone: `${formData.countryCode} ${formData.phone}`,
        company: formData.company || undefined,
        services: formData.services,
        location: formData.city,
        address: formData.address,
        postalCode: formData.postalCode,
        description: formData.description,
        urgency: (formData.urgency === 'tres-urgent' ? 'HIGH' : formData.urgency.toUpperCase()) as 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT',
      }
      
      await devisApi.create(submitData)
      setIsSubmitted(true)
    } catch (error: any) {
      const message = error.response?.data?.message || "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer."
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-24 pb-20">
          <div className="container-wide px-4 md:px-8">
            <Card className="max-w-2xl mx-auto bg-card border-border overflow-hidden">
              {/* Animated top border */}
              <div className="h-1 animated-border" />
              <CardContent className="p-12 text-center">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                  <div className="relative w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Prise de contact envoyée avec succès !
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-md mx-auto">
                  Merci pour votre prise de contact. Notre équipe va l&apos;analyser et vous 
                  recontactera dans les plus brefs délais. Un récapitulatif a été envoyé 
                  à votre adresse email.
                </p>
                
                {/* Reference number */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Référence:</span>
                  <span className="font-mono font-bold text-primary">GF-2026-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => window.location.href = "/"}
                  >
                    Retour à l&apos;accueil
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <FileDown className="w-4 h-4 mr-2" />
                    Télécharger le récapitulatif
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header with gradient */}
        <section className="relative pt-32 pb-16 px-4 md:px-8 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container-wide relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-pulse-glow">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Demande de prise de contact</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Prenez contact avec notre équipe
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
                Remplissez le formulaire ci-dessous et notre équipe vous recontactera 
                sous 24 à 48 heures. Notre équipe d&apos;experts analysera votre projet.
              </p>
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="px-4 md:px-8 pb-8">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between relative">
                {/* Progress line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-border">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                  />
                </div>
                
                {steps.map((step) => {
                  const Icon = step.icon
                  const isActive = step.id === currentStep
                  const isCompleted = step.id < currentStep
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                      disabled={step.id > currentStep}
                      className={`relative flex flex-col items-center gap-2 transition-all ${
                        step.id <= currentStep ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive 
                          ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30" 
                          : isCompleted 
                            ? "bg-primary text-primary-foreground"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className={`text-xs font-medium hidden sm:block ${
                        isActive ? "text-primary" : "text-slate-600 dark:text-slate-400"
                      }`}>
                        {step.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="pb-20 px-4 md:px-8">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="bg-card border-border overflow-hidden">
                  {/* Step indicator bar */}
                  <div className="h-1 bg-slate-100 dark:bg-slate-800">
                    <div 
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${(currentStep / 4) * 100}%` }}
                    />
                  </div>
                  
                  <CardContent className="p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      
                      {/* Step 1: Personal Info */}
                      {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-display text-xl font-semibold text-foreground">
                                Informations personnelles
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Dites-nous qui vous êtes</p>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground">Prénom *</label>
                              <Input 
                                required
                                value={formData.firstName}
                                onChange={e => setFormData({...formData, firstName: e.target.value})}
                                className="bg-background border-input"
                                placeholder="Votre prénom"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground">Nom *</label>
                              <Input 
                                required
                                value={formData.lastName}
                                onChange={e => setFormData({...formData, lastName: e.target.value})}
                                className="bg-background border-input"
                                placeholder="Votre nom"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" /> Email *
                              </label>
                              <Input 
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                className="bg-background border-input"
                                placeholder="votre@email.com"
                              />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                              <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary" /> Téléphone *
                              </label>
                              <PhoneInput
                                required
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                countryCode={formData.countryCode}
                                onCountryCodeChange={code => setFormData({...formData, countryCode: code})}
                                placeholder="6 94 00 00 00"
                              />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                              <label className="block text-sm font-medium text-foreground">
                                Entreprise (optionnel)
                              </label>
                              <Input 
                                value={formData.company}
                                onChange={e => setFormData({...formData, company: e.target.value})}
                                className="bg-background border-input"
                                placeholder="Nom de votre entreprise"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Project Info */}
                      {currentStep === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-display text-xl font-semibold text-foreground">
                                Informations projet
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Parlez-nous de votre projet</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <label className="block text-sm font-medium text-foreground">Type de projet *</label>
                            <div className="grid grid-cols-2 gap-3">
                              {projectTypes.map(type => (
                                <button
                                  key={type.value}
                                  type="button"
                                  onClick={() => setFormData({...formData, projectType: type.value})}
                                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                                    formData.projectType === type.value
                                      ? "border-primary bg-primary/10"
                                      : "border-border hover:border-primary/50"
                                  }`}
                                >
                                  <span className="text-2xl">{type.icon}</span>
                                  <span className="font-medium text-foreground">{type.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 space-y-2">
                              <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" /> Adresse d&apos;intervention *
                              </label>
                              <Input 
                                required
                                value={formData.address}
                                onChange={e => setFormData({...formData, address: e.target.value})}
                                className="bg-background border-input"
                                placeholder="Adresse complète"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground">Boîte postale *</label>
                              <Input 
                                required
                                value={formData.postalCode}
                                onChange={e => setFormData({...formData, postalCode: e.target.value})}
                                className="bg-background border-input"
                                placeholder="BP 1234"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground">Ville *</label>
                              <Input 
                                required
                                value={formData.city}
                                onChange={e => setFormData({...formData, city: e.target.value})}
                                className="bg-background border-input"
                                placeholder="Ex: Cayenne, Kourou..."
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" /> Date souhaitée
                              </label>
                              <Input 
                                type="date"
                                value={formData.preferredDate}
                                onChange={e => setFormData({...formData, preferredDate: e.target.value})}
                                className="bg-background border-input"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Services */}
                      {currentStep === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-display text-xl font-semibold text-foreground">
                                Services demandés
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Sélectionnez les services dont vous avez besoin</p>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-3">
                            {serviceOptions.map(service => (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => handleServiceToggle(service.id)}
                                className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                                  formData.services.includes(service.id)
                                    ? "border-primary bg-primary/10"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <span className="text-2xl">{service.icon}</span>
                                <span className="font-medium text-foreground flex-1">{service.label}</span>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                  formData.services.includes(service.id)
                                    ? "border-primary bg-primary"
                                    : "border-slate-300 dark:border-slate-600"
                                }`}>
                                  {formData.services.includes(service.id) && (
                                    <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Urgency */}
                          <div className="space-y-3 pt-4">
                            <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" /> Niveau d&apos;urgence
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {urgencyOptions.map(opt => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => setFormData({...formData, urgency: opt.value})}
                                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    formData.urgency === opt.value
                                      ? opt.color + " ring-2 ring-offset-2 ring-offset-background"
                                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 4: Details */}
                      {currentStep === 4 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-display text-xl font-semibold text-foreground">
                                Détails du projet
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Décrivez votre besoin en détail</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-foreground">Description du projet *</label>
                            <Textarea 
                              required
                              rows={6}
                              value={formData.description}
                              onChange={e => setFormData({...formData, description: e.target.value})}
                              className="bg-background border-input resize-none"
                              placeholder="Décrivez votre projet en détail : nombre de points de raccordement, longueur estimée, contraintes particulières..."
                            />
                          </div>

                          {/* File upload */}
                          <div className="space-y-3">
                            <label className="block text-sm font-medium text-foreground">
                              Pièces jointes (optionnel)
                            </label>
                            <div 
                              onClick={() => fileInputRef.current?.click()}
                              className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                            >
                              <Upload className="w-8 h-8 text-slate-600 dark:text-slate-400 mx-auto mb-2" />
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Cliquez pour ajouter des fichiers (plans, photos...)
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                PDF, JPG, PNG - Max 5 fichiers
                              </p>
                            </div>
                            <input
                              ref={fileInputRef}
                              type="file"
                              multiple
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            {formData.attachments.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {formData.attachments.map((file, index) => (
                                  <div key={index} className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm">
                                    <span className="truncate max-w-32">{file.name}</span>
                                    <button type="button" onClick={() => removeFile(index)}>
                                      <X className="w-4 h-4 text-slate-600 dark:text-slate-400 hover:text-destructive" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Terms */}
                          <div className="space-y-3 pt-4">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <Checkbox
                                checked={formData.acceptTerms}
                                onCheckedChange={(checked) => setFormData({...formData, acceptTerms: checked as boolean})}
                                className="mt-1"
                              />
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                J&apos;accepte que mes données soient utilisées pour traiter ma demande 
                                conformément à la <a href="/mentions-legales" className="text-primary hover:underline">politique de confidentialité</a>. *
                              </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                              <Checkbox
                                checked={formData.newsletter}
                                onCheckedChange={(checked) => setFormData({...formData, newsletter: checked as boolean})}
                                className="mt-1"
                              />
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                Je souhaite recevoir les actualités et offres de GUYA FIBRE
                              </span>
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Navigation buttons */}
                      <div className="flex items-center justify-between pt-6 border-t border-border">
                        {currentStep > 1 ? (
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={() => setCurrentStep(currentStep - 1)}
                          >
                            Retour
                          </Button>
                        ) : (
                          <div />
                        )}
                        
                        <Button 
                          type="submit"
                          disabled={!canProceed() || isSubmitting}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-40"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                              Envoi en cours...
                            </>
                          ) : currentStep < 4 ? (
                            <>
                              Continuer
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Envoyer ma demande
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Why choose us */}
                <Card className="bg-card border-border overflow-hidden">
                  <div className="h-1 animated-border" />
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Pourquoi GUYA FIBRE ?
                    </h3>
                    <ul className="space-y-3">
                      {[
                        { icon: Shield, text: "Prise de contact gratuite" },
                        { icon: Clock, text: "Réponse garantie sous 24-48h" },
                        { icon: Award, text: "Expertise locale certifiée" },
                        { icon: CheckCircle2, text: "Techniciens certifiés FTTH" },
                        { icon: MapPin, text: "Intervention sur toute la Guyane" },
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                          <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Contact direct */}
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      Contact direct
                    </h3>
                    <div className="space-y-4">
                      <a 
                        href="tel:+594 694435484"
                        className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Guyane (+594)</div>
                          <div className="font-semibold text-foreground"> +594 06 94 43 54 84</div>
                        </div>
                      </a>
                      <a 
                        href="mailto:contact@guyafibre.com"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Email</div>
                          <div className="font-medium text-foreground">contact@guyafibre.com</div>
                        </div>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Summary card - shows selected services */}
                {formData.services.length > 0 && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                        Votre sélection
                      </h3>
                      <ul className="space-y-2">
                        {formData.services.map(serviceId => {
                          const service = serviceOptions.find(s => s.id === serviceId)
                          return service ? (
                          <li key={serviceId} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <span>{service.icon}</span>
                              <span>{service.label}</span>
                            </li>
                          ) : null
                        })}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}