"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, Mail, Eye, EyeOff, ArrowRight, Shield } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth.store"
import { toast } from "sonner"

export default function AdminLoginPage() {
  const router = useRouter()
  const { login, isLoading, error, clearError } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    try {
      await login(formData)
      toast.success("Connexion réussie")
      router.push("/admin")
    } catch (err: any) {
      const message = err.response?.data?.message || "Email ou mot de passe incorrect"
      toast.error(message)
    }
  }

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.025_250)] flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Card className="relative w-full max-w-md bg-[oklch(0.15_0.025_250)] border-white/10">
        <div className="h-1 animated-border rounded-t-lg" />
        <CardContent className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.jpg"
                alt="GUYA FIBRE"
                width={160}
                height={56}
                className="h-12 w-auto object-contain mx-auto dark:[filter:invert(1)_brightness(1.1)]"
              />
            </Link>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Espace Administrateur</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@guyafibre.com"
                  className="pl-11 bg-[oklch(0.12_0.025_250)] border-white/10 text-white placeholder:text-white/30 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Votre mot de passe"
                  className="pl-11 pr-11 bg-[oklch(0.12_0.025_250)] border-white/10 text-white placeholder:text-white/30 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Credentials hint */}
          <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-white/50 text-center">
              Utilisez vos identifiants administrateur
            </p>
          </div>

          {/* Back to site */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-white/50 hover:text-white/70 transition-colors"
            >
              Retour au site
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
