'use client'

import { useThemeCustom, THEME_PALETTES } from '@/lib/theme-custom'
import { Check } from 'lucide-react'

export function ThemePaletteCustomizer() {
  const { paletteKey, setPalette, palettes } = useThemeCustom()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">Palette de couleurs</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Sélectionnez une palette — la modification est appliquée immédiatement sur le site vitrine.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        {Object.entries(palettes).map(([key, p]) => (
          <button
            key={key}
            onClick={() => setPalette(key)}
            className={`relative p-3 rounded-xl border-2 transition-all text-left ${
              paletteKey === key
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50'
            }`}
          >
            {paletteKey === key && (
              <div className="absolute top-2 right-2">
                <Check className="w-4 h-4 text-primary" />
              </div>
            )}
            <div className="space-y-2">
              <p className="font-medium text-xs text-foreground truncate pr-5">{p.name}</p>
              <div className="flex gap-1">
                {[p.darkBg, p.primary, p.accent, p.secondary].map((color, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded border border-border flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
        La palette active est sauvegardée en base de données et s'applique à tous les visiteurs du site.
      </p>
    </div>
  )
}
