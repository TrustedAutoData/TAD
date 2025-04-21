"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
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

export function ConnectedCarsChart() {
  return (
    <ChartContainer
      config={{
        cars: {
          label: "Connected Cars",
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
      >
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent indicator="bar" />} />
        <Bar dataKey="cars" fill="var(--color-cars)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
