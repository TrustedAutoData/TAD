"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Oil Change", value: 120 },
  { name: "Tire Service", value: 85 },
  { name: "Brake Service", value: 65 },
  { name: "Inspection", value: 45 },
  { name: "Battery", value: 27 },
]

export function MaintenanceTypeChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Services",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
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
  )
}
