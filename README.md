# GUYA FIBRE - Site Vitrine

🌐 **Site officiel de GUYA FIBRE** - Expert en déploiement et maintenance de réseaux fibre optique en Guyane française.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-blue)

---

## 📋 Table des Matières

- [Aperçu](#aperçu)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Développement](#développement)
- [Structure](#structure)
- [Déploiement](#déploiement)
- [Audit & Qualité](#audit--qualité)
- [Contribution](#contribution)

---

## 🎯 Aperçu

GUYA FIBRE est une plateforme web complète showcasing les services de déploiement fibre optique en Guyane. Le site inclut:

- 🏠 Page d'accueil avec hero section
- 📊 Statistiques et réalisations
- 🛠️ Présentation détaillée des services (Études, Déploiement, Raccordement, Maintenance, Entreprises)
- 💼 Section À propos avec fondateur
- 📝 Formulaire de devis
- 📞 Section contact avec intégration WhatsApp
- 🌍 Géolocalisation
- 🌙 Mode clair/sombre
- 🌐 Support multilingue (FR, EN, ES, PT, NL, GCR)

---

## 🛠️ Technologies

### Frontend
- **Next.js 16** - React framework avec App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Radix UI** - Accessible components
- **Lucide React** - Icons

### Internationalisation
- **Custom i18n Context** - Multi-language support (6 languages)

### UI Components
- Accordion, Button, Card, Dialog, Form, Input, Select, Textarea, Toast, etc.

### Utilitaires
- **Axios** - HTTP client
- **date-fns** - Date manipulation
- **Sonner** - Toast notifications
- **Vercel Analytics** - Performance tracking

---

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Setup

```bash
# 1. Clone le repository
git clone <repo-url>
cd guyafibre-frontend-main

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start development server
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le site.

---

## ⚙️ Configuration

### Variables d'environnement (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WHATSAPP_NUMBER=594694435484
NEXT_PUBLIC_CONTACT_EMAIL=contact@guyafibre.com
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

Voir `.env.example` pour la liste complète.

### Couleurs & Thème

Les variables CSS sont définies dans `app/globals.css`:
- **Primary (Cyan):** `oklch(0.65 0.13 180)`
- **Accent (Orange):** `oklch(0.75 0.16 65)`
- **Dark:** `oklch(0.13 0.025 250)`

Mode dark automatique et switchable via composant ThemeToggle.

---

## 👨‍💻 Développement

### Scripts disponibles

```bash
npm run dev      # Start dev server (hot reload)
npm run build    # Production build
npm start        # Start production server
npm run lint     # ESLint check
```

### Structure des fichiers

```
app/
├── page.tsx              # Home page
├── layout.tsx            # Root layout + SEO
├── globals.css           # Global styles
├── admin/                # Admin dashboard
├── apropos/              # About page
├── contact/              # Contact page
├── devis/                # Quote form page
├── services/             # Services detail page
├── offres/               # Offers page
├── projets/              # Projects page
└── ...                   # Other pages

components/
├── navbar.tsx            # Navigation
├── footer.tsx            # Footer
├── hero-section.tsx      # Hero banner
├── stats-section.tsx     # Statistics
├── services-section.tsx  # Services showcase
├── about-section.tsx     # About section
├── testimonials-section.tsx
├── faq-section.tsx
└── ui/                   # Reusable components

lib/
├── i18n/
│   └── context.tsx       # Language context + translations
├── api/                  # API clients
├── utils.ts              # Utilities
└── constants.ts          # Centralized constants

public/
├── images/               # Images
├── robots.txt            # SEO
└── favicon.ico
```

### Ajout d'une nouvelle page

1. Créer un dossier dans `app/[page-name]/`
2. Ajouter `page.tsx` avec le contenu
3. Importer composants réutilisables
4. Ajouter traductions dans `lib/i18n/context.tsx`
5. Ajouter route dans `lib/constants.ts` (LINKS)

### Ajout d'un composant

1. Créer dans `components/[component-name].tsx`
2. Utiliser `"use client"` si nécessaire (state, hooks)
3. Exporter fonction du composant
4. Utiliser dans les pages

---

## 🌍 Internationalisation

Le site supporte 6 langues:
- 🇫🇷 Français (par défaut)
- 🇬🇧 English
- 🇪🇸 Español
- 🇵🇹 Português
- 🇳🇱 Nederlands
- 🇬🇫 Kréyòl Gwiyanè (Guianese Creole)

Traductions dans `lib/i18n/context.tsx` - structure JSON hiérarchique.

Utilisation:
```tsx
import { useLanguage } from "@/lib/i18n/context"

export function Component() {
  const { t, locale } = useLanguage()
  return <h1>{t("nav.home")}</h1>
}
```

---

## 🚢 Déploiement

### Vercel (Recommandé)

```bash
# Push to main branch
git push origin main

# Automatic deploy on Vercel
```

### Docker

```bash
docker build -t guyafibre:latest .
docker run -p 3000:3000 guyafibre:latest
```

### Variables de production

Configurer dans Vercel dashboard ou `.env.production`:
```env
NEXT_PUBLIC_API_URL=https://api.guyafibre.com
NEXT_PUBLIC_SITE_URL=https://guyafibre.com
```

---

## 📊 Audit & Qualité

### Lighthouse Targets
- Performance: 75+
- Accessibility: 90+
- Best Practices: 85+
- SEO: 95+

### Checklist Qualité

- [x] TypeScript strict mode
- [x] ESLint configured
- [x] SEO optimized (metadata, schema, sitemap, robots.txt)
- [x] Dark/Light mode support
- [x] Mobile responsive
- [x] Accessibility (a11y) improved
- [ ] Unit tests
- [ ] E2E tests
- [ ] Performance monitoring
- [ ] Error tracking

Voir `AUDIT.md` pour détails complets.

---

## 🤝 Contribution

### Guidelines

1. Fork le repository
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Style Guide

- Utiliser TypeScript pour tout code nouveau
- Respecter les conventions ESLint
- Ajouter des commentaires pour logique complexe
- Mettre à jour les traductions
- Tester sur mobile & desktop
- Vérifier dark/light mode

---

## 📄 Licence

Propriétaire - GUYA FIBRE

---

## 📞 Support

- 📧 Email: contact@guyafibre.com
- 💬 WhatsApp: +594 6 94 43 54 84
- 🌐 Website: https://guyafibre.com

---

**Dernière mise à jour:** 2026 | Audit & corrections appliquées
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/filelien/v0-guyafibre" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
