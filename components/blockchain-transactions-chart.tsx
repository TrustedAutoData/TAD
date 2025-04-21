"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", transactions: 145 },
  { day: "Tue", transactions: 132 },
  { day: "Wed", transactions: 164 },
  { day: "Thu", transactions: 156 },
  { day: "Fri", transactions: 179 },
  { day: "Sat", transactions: 146 },
  { day: "Sun", transactions: 120 },
]

export function BlockchainTransactionsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="transactions" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
