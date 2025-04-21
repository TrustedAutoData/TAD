"use client"

import { Cell, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"

interface CarDistributionChartProps {
  data?: Array<{ name: string; value: number }>
  height?: number
}

const DEFAULT_DATA = [
  { name: "Toyota", value: 35 },
  { name: "Honda", value: 25 },
  { name: "Ford", value: 15 },
  { name: "Tesla", value: 10 },
  { name: "BMW", value: 8 },
  { name: "Others", value: 7 },
]

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
]

export function CarDistributionChart({ data = DEFAULT_DATA, height = 300 }: CarDistributionChartProps) {
  return (
    <ResponsiveChartContainer height={height}>
      <ChartContainer
        config={{
          toyota: {
            label: "Toyota",
            color: "hsl(var(--chart-1))",
          },
          honda: {
            label: "Honda",
            color: "hsl(var(--chart-2))",
          },
          ford: {
            label: "Ford",
            color: "hsl(var(--chart-3))",
          },
          tesla: {
            label: "Tesla",
            color: "hsl(var(--chart-4))",
          },
          bmw: {
            label: "BMW",
            color: "hsl(var(--chart-5))",
          },
          others: {
            label: "Others",
            color: "hsl(var(--chart-6))",
          },
        }}
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent indicator="pie" />} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </ResponsiveChartContainer>
  )
}
