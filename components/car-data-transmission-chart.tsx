"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { time: "00:00", packets: 120 },
  { time: "02:00", packets: 132 },
  { time: "04:00", packets: 101 },
  { time: "06:00", packets: 134 },
  { time: "08:00", packets: 190 },
  { time: "10:00", packets: 230 },
  { time: "12:00", packets: 220 },
  { time: "14:00", packets: 180 },
  { time: "16:00", packets: 165 },
  { time: "18:00", packets: 190 },
  { time: "20:00", packets: 170 },
  { time: "22:00", packets: 150 },
]

export function CarDataTransmissionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="packets" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
