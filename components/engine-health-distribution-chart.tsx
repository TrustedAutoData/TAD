"use client"

import { Cell, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Good", value: 75 },
  { name: "Fair", value: 15 },
  { name: "Poor", value: 10 },
]

const COLORS = [
  "hsl(142, 76%, 36%)", // Green for Good
  "hsl(41, 88%, 64%)", // Yellow for Fair
  "hsl(0, 84%, 60%)", // Red for Poor
]

export function EngineHealthDistributionChart() {
  return (
    <ChartContainer
      config={{
        good: {
          label: "Good",
          color: "hsl(142, 76%, 36%)",
        },
        fair: {
          label: "Fair",
          color: "hsl(41, 88%, 64%)",
        },
        poor: {
          label: "Poor",
          color: "hsl(0, 84%, 60%)",
        },
      }}
      className="h-[300px]"
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
  )
}
