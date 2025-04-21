import type React from "react"
import { ResponsiveContainer } from "recharts"

interface ResponsiveChartProps {
  children: React.ReactNode
  height?: number | string
}

export function ResponsiveChart({ children, height = 300 }: ResponsiveChartProps) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}
