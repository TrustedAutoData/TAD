import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, Car, FileText, Search, Users, Wrench } from "lucide-react"
import Link from "next/link"
import { ConnectedCarsChart } from "@/components/connected-cars-chart"
import { MaintenanceCertificates } from "@/components/maintenance-certificates"
import { CarMakeChart } from "@/components/car-make-chart"
import { EngineHealthDistributionChart } from "@/components/engine-health-distribution-chart"

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" /> Find Car
          </Button>
          <Button asChild>
            <Link href="/dashboard/admin/certificates/new">
              <FileText className="mr-2 h-4 w-4" /> New Certificate
            </Link>
          </Button>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Service Alert</AlertTitle>
        <AlertDescription>
          5 cars are due for maintenance in the next 7 days. Check the maintenance schedule.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Connected Cars</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96</div>
            <p className="text-xs text-muted-foreground">+8 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+28 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Services</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">5 due in the next week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Car Distribution by Make</CardTitle>
            <CardDescription>Breakdown of connected cars by manufacturer</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <CarMakeChart />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Engine Health Distribution</CardTitle>
            <CardDescription>Overall health status of connected vehicles</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <EngineHealthDistributionChart />
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
            <ConnectedCarsChart />
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
    </div>
  )
}
