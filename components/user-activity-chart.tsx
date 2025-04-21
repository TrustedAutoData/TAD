"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", active: 65, new: 12 },
  { month: "Feb", active: 68, new: 10 },
  { month: "Mar", active: 75, new: 15 },
  { month: "Apr", active: 82, new: 8 },
  { month: "May", active: 85, new: 5 },
  { month: "Jun", active: 90, new: 7 },
  { month: "Jul", active: 92, new: 4 },
  { month: "Aug", active: 88, new: 3 },
  { month: "Sep", active: 91, new: 6 },
  { month: "Oct", active: 95, new: 9 },
  { month: "Nov", active: 96, new: 2 },
  { month: "Dec", active: 96, new: 0 },
]

export function UserActivityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} />
        <Line type="monotone" dataKey="new" stroke="#10b981" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
