"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "Jan", points: 250 },
  { date: "Feb", points: 450 },
  { date: "Mar", points: 650 },
  { date: "Apr", points: 800 },
  { date: "May", points: 950 },
  { date: "Jun", points: 1050 },
  { date: "Jul", points: 1150 },
  { date: "Aug", points: 1200 },
  { date: "Sep", points: 1250 },
]

export function UserPointsHistoryChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="points" stroke="#f59e0b" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
