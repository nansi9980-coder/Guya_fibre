"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ThemeToggleProps = {
  /** Sur fond sombre (hero) : bordures et icônes claires */
  onDarkBackground?: boolean
}

export function ThemeToggle({ onDarkBackground = false }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"
  const onDark = onDarkBackground

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={
          onDark
            ? "w-9 h-9 border border-white/10 bg-white/5"
            : "w-9 h-9 border border-border bg-muted/50"
        }
      >
        <Sun className={cn("h-4 w-4", onDark ? "text-white/60" : "text-muted-foreground")} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "w-9 h-9 border transition-all",
        onDark
          ? "border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10"
          : "border-border hover:border-border/80 bg-muted/50 hover:bg-muted text-foreground"
      )}
      title={isDark ? "Mode clair" : "Mode sombre"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-yellow-500 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-primary transition-transform hover:-rotate-12" />
      )}
      <span className="sr-only">{isDark ? "Mode clair" : "Mode sombre"}</span>
    </Button>
  )
}
