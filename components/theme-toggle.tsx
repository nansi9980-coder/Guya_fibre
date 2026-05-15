"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="w-9 h-9 border border-white/10 bg-white/5"
      >
        <Sun className="h-4 w-4 text-white/60" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all"
      title={isDark ? "Mode clair" : "Mode sombre"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-yellow-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-blue-300 transition-transform hover:-rotate-12" />
      )}
      <span className="sr-only">{isDark ? "Mode clair" : "Mode sombre"}</span>
    </Button>
  )
}
