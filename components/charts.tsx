"use client"

import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const lineData = [
  { date: "Jan", users: 400, cars: 240, certificates: 100 },
  { date: "Feb", users: 300, cars: 220, certificates: 120 },
  { date: "Mar", users: 500, cars: 340, certificates: 150 },
  { date: "Apr", users: 450, cars: 280, certificates: 130 },
  { date: "May", users: 600, cars: 390, certificates: 200 },
  { date: "Jun", users: 750, cars: 490, certificates: 250 },
  { date: "Jul", users: 800, cars: 520, certificates: 280 },
  { date: "Aug", users: 850, cars: 550, certificates: 300 },
  { date: "Sep", users: 900, cars: 580, certificates: 320 },
  { date: "Oct", users: 950, cars: 600, certificates: 350 },
  { date: "Nov", users: 1000, cars: 650, certificates: 380 },
  { date: "Dec", users: 1100, cars: 700, certificates: 400 },
]

const barData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 45 },
  { name: "Apr", value: 50 },
  { name: "May", value: 65 },
  { name: "Jun", value: 75 },
  { name: "Jul", value: 85 },
  { name: "Aug", value: 90 },
  { name: "Sep", value: 100 },
  { name: "Oct", value: 110 },
  { name: "Nov", value: 120 },
  { name: "Dec", value: 130 },
]

export function LineChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
        <Line type="monotone" dataKey="cars" stroke="#10b981" strokeWidth={2} />
        <Line type="monotone" dataKey="certificates" stroke="#f59e0b" strokeWidth={2} />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export function BarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
