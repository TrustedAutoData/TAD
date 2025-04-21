"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface ThemeContextProps {
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
  resolvedTheme?: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "light",
})

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: "system" | "light" | "dark"
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<"system" | "light" | "dark">(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    let mounted = true

    function updateTheme() {
      if (!mounted) {
        return
      }

      let newTheme: "light" | "dark" = "light"

      if (theme === "system") {
        newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      } else {
        newTheme = theme
      }

      setResolvedTheme(newTheme)

      if (attribute === "class") {
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(newTheme)
      } else {
        document.documentElement.setAttribute("data-theme", newTheme)
      }
    }

    updateTheme()

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      if (theme === "system") {
        updateTheme()
      }
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mounted = false
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, attribute])

  return <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
