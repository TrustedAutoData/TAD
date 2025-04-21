"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"

interface CarHealthChartProps {
  data?: Array<{ date: string; health: number }>
  height?: number
}

const DEFAULT_DATA = [
  { date: "Apr 1", health: 95 },
  { date: "Apr 5", health: 94 },
  { date: "Apr 10", health: 96 },
  { date: "Apr 15", health: 95 },
  { date: "Apr 20", health: 93 },
  { date: "Apr 25", health: 92 },
  { date: "Apr 30", health: 90 },
  { date: "May 5", health: 91 },
  { date: "May 10", health: 93 },
  { date: "May 15", health: 92 },
  { date: "May 20", health: 94 },
]

export function CarHealthChart({ data = DEFAULT_DATA, height = 250 }: CarHealthChartProps) {
  return (
    <ResponsiveChartContainer height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[80, 100]} />
        <Tooltip />
        <Line type="monotone" dataKey="health" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveChartContainer>
  )
}
