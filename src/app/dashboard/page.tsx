import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { StatCard } from "@/components/ui/stat-card"
import { ChartCard } from "@/components/ui/chart-card"
import { CarHealthChart } from "@/components/charts/car-health-chart"
import { RecentTrips } from "@/components/dashboard/recent-trips"
import { AlertCircle, Car, Calendar, Award, Wrench } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Dashboard"
        actions={
          <Button asChild>
            <Link href="/dashboard/cars">
              <Car className="mr-2 h-4 w-4" /> View My Cars
            </Link>
          </Button>
        }
      />

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Maintenance Alert</AlertTitle>
        <AlertDescription>
          Your Toyota Camry is due for an oil change in 500 km. Schedule a service appointment.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Connected Cars" value="2" description="+1 from last month" icon={Car} />
        <StatCard title="Upcoming Services" value="3" description="Next: Oil Change (June 15)" icon={Calendar} />
        <StatCard
          title="Reward Points"
          value="1,250"
          trend={{ value: "+150 this month", positive: true }}
          icon={Award}
        />
        <StatCard title="Maintenance Score" value="92%" description="Good condition" icon={Wrench} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard title="Car Health" description="Overall health status of your vehicles">
          <CarHealthChart />
        </ChartCard>

        <Card>
          <CardHeader>
            <CardTitle>Recent Trips</CardTitle>
            <CardDescription>Your latest driving activity</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTrips />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
