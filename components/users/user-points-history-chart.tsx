"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {useEffect} from "react";
import {useDashboard} from "@/lib/hooks/stats-hooks";


export function UserPointsHistoryChart() {
  const {userPointsHistoryChart, fetchUserPointsHistory, loading} = useDashboard();

  useEffect(() => {
    fetchUserPointsHistory()
  }, [])

  if (loading || !userPointsHistoryChart?.data)
    return <div>Loading...</div>

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={userPointsHistoryChart.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="points" stroke="#f59e0b" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
