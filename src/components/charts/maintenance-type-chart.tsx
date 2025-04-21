"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"

interface MaintenanceTypeChartProps {
  data?: Array<{ name: string; value: number }>
  height?: number
}

const DEFAULT_DATA = [
  { name: "Oil Change", value: 120 },
  { name: "Tire Service", value: 85 },
  { name: "Brake Service", value: 65 },
  { name: "Inspection", value: 45 },
  { name: "Battery", value: 27 },
]

export function MaintenanceTypeChart({ data = DEFAULT_DATA, height = 300 }: MaintenanceTypeChartProps) {
  return (
    <ResponsiveChartContainer height={height}>
      <ChartContainer
        config={{
          value: {
            label: "Services",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 20,
          }}
          layout="vertical"
        >
          <XAxis type="number" tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={100} />
          <ChartTooltip content={<ChartTooltipContent indicator="bar" />} />
          <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ChartContainer>
    </ResponsiveChartContainer>
  )
}
