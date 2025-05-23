import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import PrivyProviders from "@/components/privy-provider"
import { JotaiProvider } from "@/components/jotai-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trusted Auto Data",
  description: "Verified car data for maintenance, insurance, and resale",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PrivyProviders>
          <JotaiProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
          </JotaiProvider>
        </PrivyProviders>
      </body>
    </html>
  )
}
