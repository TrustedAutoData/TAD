import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { ChartCard } from "@/components/ui/chart-card"
import { MaintenanceTypeChart } from "@/components/charts/maintenance-type-chart"
import { MaintenanceCertificates } from "@/components/dashboard/maintenance-certificates"
import { Calendar, Download, FileText, Filter } from "lucide-react"
import Link from "next/link"

export default function MaintenancePage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Maintenance History"
        actions={
          <>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Schedule Service
            </Button>
            <Button asChild>
              <Link href="/dashboard/maintenance/certificates">
                <FileText className="mr-2 h-4 w-4" /> View All Certificates
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard title="Maintenance Types" description="Breakdown of maintenance services">
          <MaintenanceTypeChart />
        </ChartCard>

        <Card>
          <CardHeader>
            <CardTitle>Recent Certificates</CardTitle>
            <CardDescription>Latest maintenance records</CardDescription>
          </CardHeader>
          <CardContent>
            <MaintenanceCertificates />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Schedule</CardTitle>
          <CardDescription>Upcoming and past maintenance services</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={[
              {
                id: "1",
                service: "Oil Change",
                car: "Toyota Camry",
                dueDate: "June 15, 2025",
                status: "Pending",
                mileage: "80,000 km",
              },
              {
                id: "2",
                service: "Tire Rotation",
                car: "Toyota Camry",
                dueDate: "July 10, 2025",
                status: "Pending",
                mileage: "82,000 km",
              },
              {
                id: "3",
                service: "Brake Inspection",
                car: "Tesla Model 3",
                dueDate: "May 2, 2025",
                status: "Completed",
                mileage: "15,000 km",
              },
            ]}
            columns={[
              {
                key: "service",
                header: "Service",
                cell: (item) => (
                  <div>
                    <div className="font-medium">{item.service}</div>
                    <div className="text-sm text-muted-foreground">{item.car}</div>
                  </div>
                ),
              },
              {
                key: "dueDate",
                header: "Due Date",
                cell: (item) => <div>{item.dueDate}</div>,
              },
              {
                key: "mileage",
                header: "Mileage",
                cell: (item) => <div>{item.mileage}</div>,
              },
              {
                key: "status",
                header: "Status",
                cell: (item) => <StatusBadge status={item.status as any} />,
              },
              {
                key: "actions",
                header: "Actions",
                cell: (item) => (
                  <div className="flex items-center justify-end gap-2">
                    {item.status === "Completed" ? (
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Certificate
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" /> Schedule
                      </Button>
                    )}
                  </div>
                ),
              },
            ]}
            searchPlaceholder="Search services..."
            onSearch={() => {}}
            actions={
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
