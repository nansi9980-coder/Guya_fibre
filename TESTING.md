# Checklist de Tests - GUYA FIBRE

## 🧪 Tests Manuels

### ✅ Desktop

- [ ] Homepage charge correctement
- [ ] Tous les liens fonctionnent
- [ ] Navigation responsive fonctionne
- [ ] Dark mode toggle fonctionne
- [ ] Language switcher change la langue
- [ ] Stats section s'anime au scroll
- [ ] Formulaire contact fonctionne
- [ ] Formulaire devis fonctionne
- [ ] WhatsApp button apparaît et fonctionne
- [ ] Page 404 s'affiche correctement
- [ ] Images chargent rapidement
- [ ] Aucun console error

### ✅ Mobile (iOS & Android)

- [ ] Layout responsive sur tous les breakpoints
- [ ] Touch interactions fonctionnent
- [ ] Menu mobile s'ouvre/ferme
- [ ] Formulaires accessibles au clavier
- [ ] WhatsApp button positionné correctement
- [ ] Pas de overflow horizontal
- [ ] Text lisible sans zoom
- [ ] Boutons cliquables facilement

### ✅ Accessibilité

- [ ] Navigation au clavier fonctionnelle
- [ ] Alt text sur toutes les images
- [ ] Focus ring visible
- [ ] Contraste couleurs OK (WCAG AA)
- [ ] Lecteur écran fonctionne (NVDA, JAWS)
- [ ] Formulaires avec labels corrects
- [ ] Aria-labels sur boutons iconiques

### ✅ Mode Sombre/Clair

- [ ] Logo visible en light mode
- [ ] Logo visible en dark mode
- [ ] Tous les textes lisibles
- [ ] Contraste approprié
- [ ] Images visibles
- [ ] Transitions fluides

### ✅ Performance

- [ ] Lighthouse score > 75
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Images optimisées (AVIF/WebP)
- [ ] No render-blocking resources

### ✅ SEO

- [ ] Title & description s'affichent dans les SERP
- [ ] Meta tags présents
- [ ] Open Graph images chargent
- [ ] Sitemap.xml accessible
- [ ] robots.txt valide
- [ ] Schema.json valide
- [ ] Structured data visible (Google Rich Results)
- [ ] Mobile-friendly (Google Mobile)

---

## 🔍 Vérifications Spécifiques

### Formulaires
- [ ] Validation client-side
- [ ] Messages d'erreur clairs
- [ ] Success message s'affiche
- [ ] Email envoyé correctement
- [ ] Phone format accepte +594
- [ ] Pas d'injection XSS

### Images
- [ ] Hero image charge
- [ ] Project images load lazy
- [ ] Images responsive srcset
- [ ] Pas de missing images (404)

### Traductions
- [ ] FR: Contenu complet
- [ ] EN: Contenu complet
- [ ] ES: Contenu complet
- [ ] PT: Contenu complet
- [ ] NL: Contenu complet
- [ ] GCR: Contenu complet
- [ ] Pas de clés manquantes

---

## ⚡ Tests de Performance

```bash
# Lighthouse
npm install -g lighthouse
lighthouse https://guyafibre.com --view

# Chrome DevTools
# F12 > Performance > Record
```

### Targets
- Desktop: 75+
- Mobile: 65+
- Accessibility: 90+
- Best Practices: 85+
- SEO: 95+

---

## 🔒 Tests de Sécurité

```bash
# Check for vulnerabilities
npm audit

# Check for outdated packages
npm outdated

# Check for security headers
curl -I https://guyafibre.com
```

### Headers à vérifier
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security
- Content-Security-Policy

---

## 📊 Analytics

- [ ] Google Analytics tracking OK
- [ ] Events firing correctly
- [ ] Goals tracked
- [ ] Conversions measured
- [ ] No privacy issues

---

## 📱 Device Testing

### Breakpoints
- [ ] xs (320px)
- [ ] sm (640px)  
- [ ] md (768px)
- [ ] lg (1024px)
- [ ] xl (1280px)
- [ ] 2xl (1536px)

### Devices
- [ ] iPhone 12
- [ ] iPhone 14
- [ ] iPad (portrait & landscape)
- [ ] Android phone (Samsung S21)
- [ ] Desktop (1920x1080)
- [ ] Ultrawide (2560x1440)

---

## 🌐 Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 🐛 Known Issues

(À compléter lors des tests)

- Issue #1: ...
- Issue #2: ...

---

## ✨ Checklist Final

- [ ] Tous les tests manuels passés
- [ ] Lighthouse 75+ sur desktop
- [ ] Lighthouse 65+ sur mobile
- [ ] Aucun console error/warning
- [ ] Aucun broken link
- [ ] SEO optimisé
- [ ] Accessible WCAG AA
- [ ] Performance OK
- [ ] Sécurité OK
- [ ] Prêt pour production

---

**Reminder:** Tester régulièrement après chaque déploiement!
