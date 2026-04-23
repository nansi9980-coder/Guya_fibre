'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type ThemePalette = {
  name: string
  primary: string
  secondary: string
  accent: string
  darkBg: string
  lightBg: string
}

export const THEME_PALETTES: Record<string, ThemePalette> = {
  default: {
    name: 'Défaut',
    primary: 'oklch(0.65 0.13 180)',
    secondary: 'oklch(0.95 0.005 250)',
    accent: 'oklch(0.75 0.16 65)',
    darkBg: 'oklch(0.13 0.025 250)',
    lightBg: 'oklch(0.98 0 0)',
  },
  ocean: {
    name: 'Océan',
    primary: 'oklch(0.5 0.15 220)',
    secondary: 'oklch(0.93 0.01 200)',
    accent: 'oklch(0.8 0.14 40)',
    darkBg: 'oklch(0.1 0.02 220)',
    lightBg: 'oklch(0.99 0 0)',
  },
  forest: {
    name: 'Forêt',
    primary: 'oklch(0.6 0.12 150)',
    secondary: 'oklch(0.94 0.008 160)',
    accent: 'oklch(0.78 0.15 70)',
    darkBg: 'oklch(0.12 0.03 150)',
    lightBg: 'oklch(0.98 0 0)',
  },
  sunset: {
    name: 'Coucher de soleil',
    primary: 'oklch(0.68 0.14 30)',
    secondary: 'oklch(0.96 0.004 0)',
    accent: 'oklch(0.75 0.16 70)',
    darkBg: 'oklch(0.14 0.03 30)',
    lightBg: 'oklch(0.99 0 0)',
  },
  tech: {
    name: 'Tech',
    primary: 'oklch(0.55 0.18 280)',
    secondary: 'oklch(0.92 0.01 280)',
    accent: 'oklch(0.7 0.16 180)',
    darkBg: 'oklch(0.1 0.02 280)',
    lightBg: 'oklch(0.98 0.005 280)',
  },
  ruby: {
    name: 'Ruby',
    primary: 'oklch(0.58 0.2 15)',
    secondary: 'oklch(0.95 0.005 15)',
    accent: 'oklch(0.72 0.15 55)',
    darkBg: 'oklch(0.11 0.03 15)',
    lightBg: 'oklch(0.99 0 0)',
  },
  midnight: {
    name: 'Minuit',
    primary: 'oklch(0.62 0.16 260)',
    secondary: 'oklch(0.9 0.01 260)',
    accent: 'oklch(0.78 0.18 80)',
    darkBg: 'oklch(0.08 0.02 260)',
    lightBg: 'oklch(0.97 0.005 260)',
  },
  amber: {
    name: 'Ambre',
    primary: 'oklch(0.72 0.17 60)',
    secondary: 'oklch(0.96 0.006 60)',
    accent: 'oklch(0.55 0.14 200)',
    darkBg: 'oklch(0.13 0.025 60)',
    lightBg: 'oklch(0.99 0 0)',
  },
  rose: {
    name: 'Rose',
    primary: 'oklch(0.65 0.18 350)',
    secondary: 'oklch(0.95 0.006 350)',
    accent: 'oklch(0.7 0.14 140)',
    darkBg: 'oklch(0.12 0.025 350)',
    lightBg: 'oklch(0.99 0 0)',
  },
  slate: {
    name: 'Ardoise',
    primary: 'oklch(0.5 0.06 240)',
    secondary: 'oklch(0.92 0.005 240)',
    accent: 'oklch(0.68 0.14 200)',
    darkBg: 'oklch(0.15 0.02 240)',
    lightBg: 'oklch(0.98 0.002 240)',
  },
  emerald: {
    name: 'Émeraude',
    primary: 'oklch(0.62 0.14 162)',
    secondary: 'oklch(0.94 0.008 162)',
    accent: 'oklch(0.75 0.16 55)',
    darkBg: 'oklch(0.11 0.025 162)',
    lightBg: 'oklch(0.98 0 0)',
  },
  gold: {
    name: 'Or',
    primary: 'oklch(0.74 0.15 75)',
    secondary: 'oklch(0.96 0.006 75)',
    accent: 'oklch(0.52 0.12 240)',
    darkBg: 'oklch(0.13 0.02 75)',
    lightBg: 'oklch(0.99 0 0)',
  },
  indigo: {
    name: 'Indigo',
    primary: 'oklch(0.52 0.22 265)',
    secondary: 'oklch(0.93 0.01 265)',
    accent: 'oklch(0.72 0.16 35)',
    darkBg: 'oklch(0.1 0.03 265)',
    lightBg: 'oklch(0.98 0.004 265)',
  },
  coral: {
    name: 'Corail',
    primary: 'oklch(0.66 0.17 25)',
    secondary: 'oklch(0.96 0.005 25)',
    accent: 'oklch(0.6 0.15 200)',
    darkBg: 'oklch(0.12 0.03 25)',
    lightBg: 'oklch(0.99 0 0)',
  },
  mint: {
    name: 'Menthe',
    primary: 'oklch(0.68 0.12 170)',
    secondary: 'oklch(0.95 0.007 170)',
    accent: 'oklch(0.7 0.15 300)',
    darkBg: 'oklch(0.11 0.02 170)',
    lightBg: 'oklch(0.98 0 0)',
  },
  lavender: {
    name: 'Lavande',
    primary: 'oklch(0.62 0.14 295)',
    secondary: 'oklch(0.94 0.008 295)',
    accent: 'oklch(0.72 0.15 55)',
    darkBg: 'oklch(0.11 0.025 295)',
    lightBg: 'oklch(0.98 0.003 295)',
  },
  crimson: {
    name: 'Cramoisi',
    primary: 'oklch(0.55 0.22 8)',
    secondary: 'oklch(0.95 0.005 8)',
    accent: 'oklch(0.7 0.14 75)',
    darkBg: 'oklch(0.1 0.03 8)',
    lightBg: 'oklch(0.99 0 0)',
  },
  teal: {
    name: 'Teal',
    primary: 'oklch(0.6 0.13 195)',
    secondary: 'oklch(0.94 0.007 195)',
    accent: 'oklch(0.72 0.16 50)',
    darkBg: 'oklch(0.11 0.025 195)',
    lightBg: 'oklch(0.98 0 0)',
  },
  bronze: {
    name: 'Bronze',
    primary: 'oklch(0.6 0.1 50)',
    secondary: 'oklch(0.94 0.006 50)',
    accent: 'oklch(0.52 0.12 200)',
    darkBg: 'oklch(0.12 0.02 50)',
    lightBg: 'oklch(0.99 0 0)',
  },
  neon: {
    name: 'Néon',
    primary: 'oklch(0.75 0.22 130)',
    secondary: 'oklch(0.93 0.01 130)',
    accent: 'oklch(0.7 0.22 300)',
    darkBg: 'oklch(0.08 0.01 130)',
    lightBg: 'oklch(0.97 0.005 130)',
  },
}

type ThemeContextType = {
  palette: ThemePalette
  paletteKey: string
  setPalette: (key: string) => void
  palettes: Record<string, ThemePalette>
  saving: boolean
}

const ThemeCustomContext = createContext<ThemeContextType | undefined>(undefined)

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

async function fetchActivePalette(): Promise<string> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/settings/theme/public`, { cache: 'no-store' })
    if (!res.ok) return 'default'
    const data = await res.json()
    return data.activePalette || 'default'
  } catch {
    return 'default'
  }
}

export function ThemeCustomProvider({ children }: { children: React.ReactNode }) {
  const [paletteKey, setPaletteKey] = useState<string>('default')
  const [mounted, setMounted] = useState(false)
  const [saving] = useState(false)

  useEffect(() => {
    setMounted(true)
    const local = typeof window !== 'undefined' ? localStorage.getItem('guya-theme-palette') : null
    if (local && THEME_PALETTES[local]) {
      setPaletteKey(local)
    }
    fetchActivePalette().then((key) => {
      const validKey = THEME_PALETTES[key] ? key : 'default'
      setPaletteKey(validKey)
      if (typeof window !== 'undefined') {
        localStorage.setItem('guya-theme-palette', validKey)
      }
    })
  }, [])

  const palette = THEME_PALETTES[paletteKey] || THEME_PALETTES.default

  const handleSetPalette = (key: string) => {
    if (!THEME_PALETTES[key]) return
    setPaletteKey(key)
    if (typeof window !== 'undefined') {
      localStorage.setItem('guya-theme-palette', key)
    }
  }

  return (
    <ThemeCustomContext.Provider
      value={{ palette, paletteKey, setPalette: handleSetPalette, palettes: THEME_PALETTES, saving }}
    >
      {mounted && (
        <style>{`
          :root {
            --primary: ${palette.primary};
            --secondary: ${palette.secondary};
            --accent: ${palette.accent};
            --brand-dark: ${palette.darkBg};
            --brand-light: ${palette.lightBg};
          }
        `}</style>
      )}
      {children}
    </ThemeCustomContext.Provider>
  )
}

export function useThemeCustom() {
  const context = useContext(ThemeCustomContext)
  if (!context) {
    return {
      palette: THEME_PALETTES.default,
      paletteKey: 'default',
      setPalette: () => {},
      palettes: THEME_PALETTES,
      saving: false,
    }
  }
  return context
}