import type React from "react"
import { ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

interface ResponsiveChartContainerProps {
  children: React.ReactNode
  height?: number | string
  className?: string
}

export function ResponsiveChartContainer({ children, height = 300, className }: ResponsiveChartContainerProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}
