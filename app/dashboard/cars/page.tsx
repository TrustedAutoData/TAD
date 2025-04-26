"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Plus, Shield } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/common/page-header"
import { ChartCard } from "@/components/common/chart-card"
import { DataTable } from "@/components/common/data-table"
import { StatusBadge } from "@/components/common/status-badge"
import { BlockchainLink } from "@/components/common/blockchain-link"
import { ResponsiveChart } from "@/components/common/responsive-chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import {useDashboard} from "@/lib/hooks/stats-hooks";
import {useCars} from "@/lib/hooks/car-hooks";

// Mock data for initial rendering
const mockCarDataChart = [
  { time: "00:00", packets: 120 },
  { time: "04:00", packets: 101 },
  { time: "08:00", packets: 190 },
  { time: "12:00", packets: 220 },
  { time: "16:00", packets: 165 },
  { time: "20:00", packets: 170 },
]

const mockBlockchainChart = [
  { day: "Mon", transactions: 145 },
  { day: "Tue", transactions: 132 },
  { day: "Wed", transactions: 164 },
  { day: "Thu", transactions: 156 },
  { day: "Fri", transactions: 179 },
  { day: "Sat", transactions: 146 },
  { day: "Sun", transactions: 120 },
]

export default function AdminCarsPage() {
  const { cars, loading, fetchCars, pagination, changePage } = useCars()
  const { blockchainTransactionsChart, carDataTransmissionChart, fetchAllChartData } = useDashboard()
  const [searchValue, setSearchValue] = useState("")
  const [dealerFilter, setDealerFilter] = useState("all")
  const [carDataChart, setCarDataChart] = useState(mockCarDataChart)
  const [blockchainChart, setBlockchainChart] = useState(mockBlockchainChart)

  useEffect(() => {
    fetchCars()
    fetchAllChartData()
  }, [fetchCars, fetchAllChartData])

  useEffect(() => {
    if (carDataTransmissionChart) {
      setCarDataChart(carDataTransmissionChart.data)
    }
    if (blockchainTransactionsChart) {
      setBlockchainChart(blockchainTransactionsChart.data)
    }
  }, [carDataTransmissionChart, blockchainTransactionsChart])

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.make.toLowerCase().includes(searchValue.toLowerCase()) ||
      car.model.toLowerCase().includes(searchValue.toLowerCase()) ||
      car.vin.toLowerCase().includes(searchValue.toLowerCase()) ||
      car.owner.name.toLowerCase().includes(searchValue.toLowerCase())

    const matchesDealer = dealerFilter === "all" || car.dealerAccess.includes(dealerFilter)

    return matchesSearch && matchesDealer
  })

  const columns = [
    {
      key: "car",
      header: "Car",
      cell: (car: any) => (
        <div>
          <div className="font-medium">
            {car.make} {car.model}
          </div>
          <div className="text-sm text-muted-foreground">
            {car.year} • VIN: {car.vin}
          </div>
        </div>
      ),
    },
    {
      key: "owner",
      header: "Owner",
      cell: (car: any) => (
        <div>
          <div>{car.owner.name}</div>
          <div className="text-sm text-muted-foreground">{car.owner.email}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (car: any) => <StatusBadge status={car.status} />,
    },
    {
      key: "blockchain",
      header: "Blockchain Data",
      cell: (car: any) => (
        <div>
          <div className="flex items-center gap-1">
            <Shield
              className={`h-4 w-4 ${car.blockchainData.transactions > 0 ? "text-primary" : "text-muted-foreground"}`}
            />
            <span>{car.blockchainData.transactions} transactions</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {car.blockchainData.transactions > 0 ? `Last: ${car.blockchainData.lastTransaction}` : "No data available"}
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (car: any) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/admin/cars/${car.id}`}>View</Link>
          </Button>
          <BlockchainLink address={car.blockchainData.address} disabled={car.blockchainData.transactions === 0} />
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Connected Cars"
        actions={
          <>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
            <Button asChild>
              <Link href="/dashboard/admin/cars/add">
                <Plus className="mr-2 h-4 w-4" /> Add Car
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard title="Raspberry Pi Data Transmission" description="Real-time data transmission from OBD adapters">
          <ResponsiveChart>
            <LineChart data={carDataChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="packets" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveChart>
        </ChartCard>

        <ChartCard title="Blockchain Transactions" description="Solana blockchain transaction volume">
          <ResponsiveChart>
            <BarChart data={blockchainChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="transactions" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveChart>
        </ChartCard>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Car Database</CardTitle>
          <CardDescription>View and manage all registered vehicles</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredCars}
            columns={columns}
            loading={loading}
            searchPlaceholder="Search by make, model, VIN..."
            searchValue={searchValue}
            onSearch={setSearchValue}
            pagination={{
              currentPage: pagination.page,
              totalPages: pagination.totalPages,
              onPageChange: changePage,
            }}
            actions={
              <Select value={dealerFilter} onValueChange={setDealerFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by dealer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dealers</SelectItem>
                  <SelectItem value="1">AutoCare Service</SelectItem>
                  <SelectItem value="2">Toyota Dealership</SelectItem>
                  <SelectItem value="3">Tesla Service</SelectItem>
                  <SelectItem value="4">QuickTire Shop</SelectItem>
                </SelectContent>
              </Select>
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
