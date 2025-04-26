"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {useEffect} from "react";
import {useDashboard} from "@/lib/hooks/stats-hooks";

export function UserCarActivityChart() {
  const {userCarActivityChart, fetchUserCarActivity, loading} = useDashboard();

  useEffect(() => {
    fetchUserCarActivity()
  }, [])

  if (loading || !userCarActivityChart)
    return <div>Loading...</div>

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={userCarActivityChart.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="miles" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
