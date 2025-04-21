"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"

interface CarOBDDataChartProps {
  data?: Array<{ time: string; engineTemp: number; rpm: number; speed: number }>
  height?: number
}

const DEFAULT_DATA = [
  { time: "9:00", engineTemp: 85, rpm: 800, speed: 0 },
  { time: "9:05", engineTemp: 87, rpm: 1200, speed: 25 },
  { time: "9:10", engineTemp: 89, rpm: 1500, speed: 45 },
  { time: "9:15", engineTemp: 90, rpm: 2000, speed: 65 },
  { time: "9:20", engineTemp: 90, rpm: 1800, speed: 55 },
  { time: "9:25", engineTemp: 90, rpm: 1600, speed: 50 },
  { time: "9:30", engineTemp: 90, rpm: 800, speed: 0 },
]

export function CarOBDDataChart({ data = DEFAULT_DATA, height = 250 }: CarOBDDataChartProps) {
  return (
    <ResponsiveChartContainer height={height}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="engineTemp" name="Engine Temp (°C)" stroke="#ff0000" strokeWidth={2} />
        <Line type="monotone" dataKey="rpm" name="RPM" stroke="#0000ff" strokeWidth={2} />
        <Line type="monotone" dataKey="speed" name="Speed (km/h)" stroke="#00cc00" strokeWidth={2} />
      </LineChart>
    </ResponsiveChartContainer>
  )
}
