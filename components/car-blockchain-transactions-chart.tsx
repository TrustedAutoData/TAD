"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "Apr 15", transactions: 12 },
  { date: "Apr 16", transactions: 15 },
  { date: "Apr 17", transactions: 13 },
  { date: "Apr 18", transactions: 18 },
  { date: "Apr 19", transactions: 16 },
  { date: "Apr 20", transactions: 14 },
  { date: "Apr 21", transactions: 19 },
  { date: "Apr 22", transactions: 21 },
  { date: "Apr 23", transactions: 18 },
  { date: "Apr 24", transactions: 23 },
  { date: "Apr 25", transactions: 20 },
  { date: "Today", transactions: 42 },
]

export function CarBlockchainTransactionsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="transactions" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
