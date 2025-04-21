import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { BlockchainLink } from "@/components/ui/blockchain-link"
import { ChartCard } from "@/components/ui/chart-card"
import { CarHealthChart } from "@/components/charts/car-health-chart"
import { CarDistributionChart } from "@/components/charts/car-distribution-chart"
import { Download, Plus, Search, Shield } from "lucide-react"
import Link from "next/link"

export default function CarsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="My Cars"
        actions={
          <>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
            <Button asChild>
              <Link href="/dashboard/cars/add">
                <Plus className="mr-2 h-4 w-4" /> Add Car
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard title="Car Health" description="Overall health status of your vehicles">
          <CarHealthChart />
        </ChartCard>

        <ChartCard title="Car Distribution" description="Breakdown of your cars by manufacturer">
          <CarDistributionChart />
        </ChartCard>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Vehicles</CardTitle>
          <CardDescription>View and manage all your registered vehicles</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={[
              {
                id: "1",
                make: "Toyota",
                model: "Camry",
                year: 2022,
                status: "Connected",
                lastUpdate: "Today, 9:30 AM",
                blockchainTransactions: 42,
              },
              {
                id: "2",
                make: "Tesla",
                model: "Model 3",
                year: 2023,
                status: "Not Connected",
                lastUpdate: "N/A",
                blockchainTransactions: 0,
              },
            ]}
            columns={[
              {
                key: "car",
                header: "Car",
                cell: (car) => (
                  <div>
                    <div className="font-medium">
                      {car.make} {car.model}
                    </div>
                    <div className="text-sm text-muted-foreground">{car.year}</div>
                  </div>
                ),
              },
              {
                key: "status",
                header: "Status",
                cell: (car) => <StatusBadge status={car.status} />,
              },
              {
                key: "blockchain",
                header: "Blockchain Data",
                cell: (car) => (
                  <div>
                    <div className="flex items-center gap-1">
                      <Shield
                        className={`h-4 w-4 ${
                          car.blockchainTransactions > 0 ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span>{car.blockchainTransactions} transactions</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {car.blockchainTransactions > 0 ? `Last: ${car.lastUpdate}` : "No data available"}
                    </div>
                  </div>
                ),
              },
              {
                key: "actions",
                header: "Actions",
                cell: (car) => (
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/cars/${car.id}`}>View</Link>
                    </Button>
                    <BlockchainLink address={`car-${car.id}`} disabled={car.blockchainTransactions === 0} />
                  </div>
                ),
              },
            ]}
            searchPlaceholder="Search by make, model..."
            onSearch={() => {}}
            actions={
              <Button variant="outline" size="sm">
                <Search className="mr-2 h-4 w-4" /> Filter
              </Button>
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
