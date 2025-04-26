"use client"

import { useEffect } from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import {useDashboard} from "@/lib/hooks/stats-hooks";


export function UserPointsChart() {

  const {userPointsChart, fetchUserPoints, loading} = useDashboard();

  useEffect(() => {
    fetchUserPoints()
  }, [])

  if (loading || !userPointsChart)
    return <div>Loading...</div>

  return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={userPointsChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
  )
}
