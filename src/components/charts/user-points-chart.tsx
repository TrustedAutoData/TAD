"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"

interface UserPointsChartProps {
  data?: Array<{ name: string; users: number }>
  height?: number
}

const DEFAULT_DATA = [
  { name: "Level 1", users: 15 },
  { name: "Level 2", users: 22 },
  { name: "Level 3", users: 18 },
  { name: "Level 4", users: 15 },
  { name: "Level 5", users: 12 },
  { name: "Level 6", users: 8 },
  { name: "Level 7", users: 4 },
  { name: "Level 8+", users: 2 },
]

export function UserPointsChart({ data = DEFAULT_DATA, height = 300 }: UserPointsChartProps) {
  return (
    <ResponsiveChartContainer height={height}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveChartContainer>
  )
}
