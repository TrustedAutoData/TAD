"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Level 1", users: 15 },
  { name: "Level 2", users: 22 },
  { name: "Level 3", users: 18 },
  { name: "Level 4", users: 15 },
  { name: "Level 5", users: 12 },
  { name: "Level 6", users: 8 },
  { name: "Level 7", users: 4 },
  { name: "Level 8+", users: 2 },
]

export function UserPointsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
