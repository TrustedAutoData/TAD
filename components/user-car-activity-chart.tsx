"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { week: "Week 1", miles: 120 },
  { week: "Week 2", miles: 145 },
  { week: "Week 3", miles: 105 },
  { week: "Week 4", miles: 130 },
  { week: "Week 5", miles: 160 },
  { week: "Week 6", miles: 125 },
  { week: "Week 7", miles: 140 },
  { week: "Week 8", miles: 110 },
]

export function UserCarActivityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="miles" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
