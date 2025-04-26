"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {Search} from "lucide-react"
import DashboardCards from "@/components/dashboard/dashboard-cards";
import {CarMakeChart} from "@/components/dashboard/car-make-chart";
import {EngineHealthDistributionChart} from "@/components/dashboard/engine-health-distribution-chart";
import {ConnectedCarsChart} from "@/components/dashboard/connected-cars-chart";
import {useEffect} from "react";
import {useDashboard} from "@/lib/hooks/stats-hooks";
import {MaintenanceCertificates} from "@/components/dashboard/maintenance-certificates";
import CarSearch from "@/components/dashboard/car-search";

export default function AdminDashboard() {
  const {fetchDashboard, carDistributionChart, engineHealthChart, carGrowthChart, loading} = useDashboard();

  useEffect(() => {
    fetchDashboard()
  }, [])

  if (loading || !carDistributionChart || !engineHealthChart|| !carGrowthChart)
    return <div>Loading...</div>

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <CarSearch/>
      </div>

      <DashboardCards/>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Car Distribution by Make</CardTitle>
            <CardDescription>Breakdown of connected cars by manufacturer</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <CarMakeChart data={carDistributionChart.data}/>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Engine Health Distribution</CardTitle>
            <CardDescription>Overall health status of connected vehicles</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <EngineHealthDistributionChart data={engineHealthChart.data}/>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Connected Cars Growth</CardTitle>
            <CardDescription>Monthly growth over the past year</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ConnectedCarsChart data={carGrowthChart.data}/>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Certificates</CardTitle>
            <CardDescription>Latest maintenance records</CardDescription>
          </CardHeader>
          <CardContent>
            <MaintenanceCertificates />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
