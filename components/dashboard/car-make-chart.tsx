"use client"

import { Cell, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {ChartDataPoint} from "@/lib/types";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
]

interface CarMakeChartProps {
    data: ChartDataPoint[]
}
export function CarMakeChart({ data }: CarMakeChartProps) {

    if (!data.length) return <div></div>

    const dynamicConfig = data.reduce((acc, item, index) => {
        const name = String(item.name || "") // safely cast
        const key = name.toLowerCase().replace(/\s+/g, "_")
        acc[key] = {
            label: name,
            color: COLORS[index % COLORS.length],
        }
        return acc
    }, {} as Record<string, { label: string; color: string }>)

    return (
    <ChartContainer
      config={dynamicConfig}
      className="h-[300px]"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
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
