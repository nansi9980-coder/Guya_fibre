# Code Guidelines - GUYA FIBRE

## 📝 Conventions de Codage

### TypeScript

```typescript
// ✅ DO: Type explicit declarations
const user: { name: string; email: string } = {
  name: "John",
  email: "john@guyafibre.com"
}

// ❌ DON'T: Implicit any
const user = { ... } // any

// ✅ DO: Use interfaces for complex types
interface UserContact {
  name: string
  email: string
  phone?: string
}

// ❌ DON'T: Use type for objects (use interface)
type UserContact = {
  name: string
  email: string
}
```

### React Components

```typescript
// ✅ DO: Use functional components
export function UserCard({ name, email }: { name: string; email: string }) {
  return <div>{name}</div>
}

// ✅ DO: Use "use client" only when needed
"use client"
import { useState } from "react"

// ❌ DON'T: Export default for pages
// ✅ DO: Export default only for page.tsx and layout.tsx
export default function HomePage() {}

// ✅ DO: Extract complex logic to custom hooks
const useContactForm = () => { ... }

// ✅ DO: Separate concerns - one component = one responsibility
```

### Styling

```typescript
// ✅ DO: Use Tailwind CSS utility classes
<div className="px-4 py-8 md:px-8 lg:px-16">

// ✅ DO: Use CSS variables for brand colors
className="text-primary bg-card"

// ❌ DON'T: Hardcode hex colors
className="text-[#0891b2]"

// ✅ DO: Use Tailwind for responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ✅ DO: Use dark: prefix for dark mode
<div className="bg-white dark:bg-slate-900">
```

### File Organization

```
✅ GOOD:
components/
├── hero-section.tsx
├── stats-section.tsx
└── ui/
    ├── button.tsx
    ├── card.tsx
    └── form.tsx

❌ BAD:
components/
├── Component1.tsx
├── MyCustomComponent.tsx
├── Helper.tsx
└── index.ts (re-exports)
```

### Naming Conventions

```typescript
// ✅ DO: Descriptive names
const handleFormSubmit = () => {}
const userEmail = "user@guyafibre.com"
const isLoading = true
const MAX_RETRIES = 3

// ❌ DON'T: Ambiguous names
const handle = () => {}
const email = "..."  // could be anything
const x = true
const m = 3
```

### Comments

```typescript
// ✅ DO: Explain WHY, not WHAT
// We retry the API call 3 times because of network instability in Guyana
const MAX_RETRIES = 3

// ✅ DO: Use comments for complex logic
// Check if user has permission before allowing form submission
if (hasPermission && isFormValid) {
  submitForm()
}

// ❌ DON'T: Obvious comments
const name = "John" // Set name to John
```

### Imports

```typescript
// ✅ DO: Use absolute imports with aliases
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/context"

// ❌ DON'T: Relative imports
import { Button } from "../../../../components/ui/button"

// ✅ DO: Group imports
import { useState, useEffect } from "react"           // React
import Image from "next/image"                         // Next
import { Phone, Mail } from "lucide-react"            // Third-party
import { Button } from "@/components/ui/button"       // Components
import { CONTACT } from "@/lib/constants"             // App code
```

---

## 🏗️ Architecture

### Folder Structure

```
app/                      # Pages & routing
├── page.tsx              # Home page
├── layout.tsx            # Root layout
├── globals.css           # Global styles
├── [page-name]/
│   └── page.tsx          # Page route

components/               # Reusable components
├── [component-name].tsx
├── ui/                   # Base components
└── sections/             # Page sections

lib/                       # Utilities & services
├── api/                  # API clients
├── i18n/                 # Translations
├── utils.ts              # Helpers
└── constants.ts          # Constants

public/                   # Static assets
├── images/
└── robots.txt
```

### Component Structure

```typescript
"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { CONTACT } from "@/lib/constants"

interface ComponentProps {
  title: string
  onSubmit?: (data: FormData) => void
}

export function MyComponent({ title, onSubmit }: ComponentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Logic here
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? t("common.loading") : t("common.submit")}
      </Button>
    </div>
  )
}
```

---

## ✅ Quality Checklist

Before committing:

- [ ] Code is TypeScript typed
- [ ] No `any` types used
- [ ] ESLint passes (`npm run lint`)
- [ ] Component has proper props interface
- [ ] Dark mode supported
- [ ] Mobile responsive
- [ ] Translations added
- [ ] Comments explain complex logic
- [ ] No hardcoded values (use constants)
- [ ] Accessible (a11y)
- [ ] No console.log (use proper logging)
- [ ] Performance optimized

---

## 🚀 Performance

```typescript
// ✅ DO: Lazy load heavy components
import dynamic from "next/dynamic"
const HeavyComponent = dynamic(() => import("./HeavyComponent"))

// ✅ DO: Memoize expensive computations
import { useMemo } from "react"
const expensive = useMemo(() => calculate(), [deps])

// ✅ DO: Use Next Image for optimization
import Image from "next/image"

// ❌ DON'T: Use img tag directly
<img src="/image.jpg" />

// ✅ DO: Lazy load images
<Image src="/image.jpg" alt="description" loading="lazy" />
```

---

## 🔒 Security

```typescript
// ✅ DO: Sanitize user input
const sanitizedInput = userInput.trim().toLowerCase()

// ✅ DO: Never expose secrets
const API_KEY = process.env.NEXT_PUBLIC_API_KEY // only public keys

// ❌ DON'T: Expose sensitive data
const SECRET = "super-secret-key" // Exposed in bundle!

// ✅ DO: Use environment variables for sensitive data
const PRIVATE_KEY = process.env.PRIVATE_API_KEY // Not in NEXT_PUBLIC

// ✅ DO: Validate on server
// Server Actions in Next.js are safe
"use server"
export async function submitForm(data) {
  // Always validate on server
  validateData(data)
}
```

---

## 📖 Testing

```typescript
// Components should be testable
export function Greeting({ name }: { name: string }) {
  return <p>Hello, {name}!</p>
}

// Easy to test:
import { render, screen } from "@testing-library/react"
render(<Greeting name="John" />)
expect(screen.getByText("Hello, John!")).toBeInTheDocument()
```

---

## 🎯 Best Practices

1. **DRY** - Don't Repeat Yourself
2. **SOLID** - Single responsibility, Open/closed, etc.
3. **KISS** - Keep It Simple, Stupid
4. **YAGNI** - You Aren't Gonna Need It
5. **Optimize for Readability** - Code is read more than written

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Best Practices](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Accessibility (a11y)](https://www.w3.org/WAI/fundamentals/)

---

**Last Updated:** 2026
