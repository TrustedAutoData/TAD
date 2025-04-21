"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"

interface BlockchainTransactionsChartProps {
  data?: Array<{ day: string; transactions: number }>
  height?: number
}

const DEFAULT_DATA = [
  { day: "Mon", transactions: 145 },
  { day: "Tue", transactions: 132 },
  { day: "Wed", transactions: 164 },
  { day: "Thu", transactions: 156 },
  { day: "Fri", transactions: 179 },
  { day: "Sat", transactions: 146 },
  { day: "Sun", transactions: 120 },
]

export function BlockchainTransactionsChart({ data = DEFAULT_DATA, height = 250 }: BlockchainTransactionsChartProps) {
  return (
    <ResponsiveChartContainer height={height}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="transactions" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveChartContainer>
  )
}
