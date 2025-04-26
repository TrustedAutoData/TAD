"use client"

import { useEffect } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import {useDashboard} from "@/lib/hooks/stats-hooks";

export function UserActivityChart() {
  const {userActivityChart, fetchUserActivity, loading} = useDashboard();

  useEffect(() => {
    fetchUserActivity()
  }, [])

  if (loading || !userActivityChart)
    return <div>Loading...</div>

  return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={userActivityChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
