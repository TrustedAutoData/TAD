"use client"

import { Area, AreaChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"

interface MonthlyGrowthChartProps {
  data?: Array<{ month: string; cars: number }>
  height?: number
}

const DEFAULT_DATA = [
  { month: "May", cars: 78 },
  { month: "Jun", cars: 82 },
  { month: "Jul", cars: 90 },
  { month: "Aug", cars: 94 },
  { month: "Sep", cars: 98 },
  { month: "Oct", cars: 105 },
  { month: "Nov", cars: 110 },
  { month: "Dec", cars: 115 },
  { month: "Jan", cars: 120 },
  { month: "Feb", cars: 122 },
  { month: "Mar", cars: 125 },
  { month: "Apr", cars: 128 },
]

export function MonthlyGrowthChart({ data = DEFAULT_DATA, height = 300 }: MonthlyGrowthChartProps) {
  return (
    <ResponsiveChartContainer height={height}>
      <ChartContainer
        config={{
          cars: {
            label: "Connected Cars",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <ChartTooltip content={<ChartTooltipContent indicator="area" />} />
          <Area type="monotone" dataKey="cars" stroke="var(--color-cars)" fill="var(--color-cars)" fillOpacity={0.2} />
        </AreaChart>
      </ChartContainer>
    </ResponsiveChartContainer>
  )
}
