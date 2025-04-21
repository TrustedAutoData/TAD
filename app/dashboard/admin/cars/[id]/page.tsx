import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Car,
  CheckCircle,
  ChevronLeft,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Fuel,
  Gauge,
  Shield,
  Wrench,
} from "lucide-react"
import Link from "next/link"
import { CarHealthChart } from "@/components/car-health-chart"
import { CarBlockchainTransactionsChart } from "@/components/car-blockchain-transactions-chart"
import { CarOBDDataChart } from "@/components/car-obd-data-chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch car data based on the ID
  const carId = params.id
  const carData = {
    id: carId,
    make: "Toyota",
    model: "Camry",
    year: 2022,
    vin: "1HGCM82633A123456",
    licensePlate: "ABC-1234",
    owner: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
    status: "Connected",
    mileage: 78432,
    lastUpdate: "Today, 9:30 AM",
    blockchainData: {
      transactions: 42,
      lastTransaction: "10 minutes ago",
      address: "8ZJ7UG3cZDem5ENjQRQxA3dA9FtUDxjVFJJqFvQEiLQN",
    },
    raspberryPi: {
      deviceId: "RPi-OBD-1234",
      firmwareVersion: "v2.3.1",
      lastPing: "2 minutes ago",
      batteryLevel: "98%",
      signalStrength: "Good",
    },
    dealerAccess: ["AutoCare Service Center", "Toyota Dealership"],
    obdData: {
      engineTemp: "90°C",
      batteryVoltage: "12.7V",
      fuelLevel: "65%",
      oilLife: "75%",
      tirePressure: {
        frontLeft: "32 PSI",
        frontRight: "33 PSI",
        rearLeft: "32 PSI",
        rearRight: "32 PSI",
      },
      dtcCodes: [],
    },
  }

  const blockchainTransactions = [
    {
      id: "tx1",
      timestamp: "Today, 9:25 AM",
      type: "OBD Data",
      signature: "4Qozk7d...8mPvbf",
      status: "Confirmed",
    },
    {
      id: "tx2",
      timestamp: "Today, 9:10 AM",
      type: "Mileage Update",
      signature: "3xRTp2...9nQwer",
      status: "Confirmed",
    },
    {
      id: "tx3",
      timestamp: "Today, 8:55 AM",
      type: "Engine Status",
      signature: "7zKjL5...2pRtyu",
      status: "Confirmed",
    },
    {
      id: "tx4",
      timestamp: "Today, 8:40 AM",
      type: "OBD Data",
      signature: "9qAzWs...3eDcvb",
      status: "Confirmed",
    },
    {
      id: "tx5",
      timestamp: "Today, 8:25 AM",
      type: "Fuel Level",
      signature: "2xCvBn...7mLkjh",
      status: "Confirmed",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/admin/cars">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Car Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
            <CardDescription>Car details and owner information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="h-48 w-full rounded-md bg-muted flex items-center justify-center">
                <img
                  src={`/placeholder-graphic.png?height=192&width=320&text=${encodeURIComponent(carData.make + " " + carData.model)}`}
                  alt={`${carData.make} ${carData.model}`}
                  className="h-full object-contain"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Make:</span>
                <span className="text-sm">{carData.make}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Model:</span>
                <span className="text-sm">{carData.model}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Year:</span>
                <span className="text-sm">{carData.year}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">VIN:</span>
                <span className="text-sm">{carData.vin}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">License Plate:</span>
                <span className="text-sm">{carData.licensePlate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Mileage:</span>
                <span className="text-sm">{carData.mileage} km</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t">
              <h4 className="text-sm font-medium">Owner Information</h4>
              <div className="space-y-1">
                <div className="text-sm">{carData.owner.name}</div>
                <div className="text-sm text-muted-foreground">{carData.owner.email}</div>
                <div className="text-sm text-muted-foreground">{carData.owner.phone}</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t">
              <h4 className="text-sm font-medium">Dealer Access</h4>
              <div className="space-y-1">
                {carData.dealerAccess.map((dealer, index) => (
                  <div key={index} className="text-sm flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {dealer}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Car className="mr-2 h-4 w-4" /> Edit Car Details
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Raspberry Pi OBD Adapter</CardTitle>
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <CheckCircle className="mr-1 h-3 w-3" /> Connected
              </Badge>
            </div>
            <CardDescription>Real-time data from the OBD adapter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Device Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Device ID:</span>
                      <span className="text-sm">{carData.raspberryPi.deviceId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Firmware:</span>
                      <span className="text-sm">{carData.raspberryPi.firmwareVersion}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Last Ping:</span>
                      <span className="text-sm">{carData.raspberryPi.lastPing}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Battery:</span>
                      <span className="text-sm">{carData.raspberryPi.batteryLevel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Signal:</span>
                      <span className="text-sm">{carData.raspberryPi.signalStrength}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Blockchain Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Transactions:</span>
                      <span className="text-sm">{carData.blockchainData.transactions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Last Transaction:</span>
                      <span className="text-sm">{carData.blockchainData.lastTransaction}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">Solana Address:</span>
                      <div className="flex items-center gap-1">
                        <code className="text-xs bg-muted p-1 rounded">{carData.blockchainData.address}</code>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="h-[250px]">
              <CarOBDDataChart />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="obd" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="obd">OBD Data</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="obd" className="space-y-6 mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Engine Temperature</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{carData.obdData.engineTemp}</div>
                <p className="text-xs text-muted-foreground">Normal operating range</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Battery Voltage</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{carData.obdData.batteryVoltage}</div>
                <p className="text-xs text-muted-foreground">Good condition</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Fuel Level</CardTitle>
                <Fuel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{carData.obdData.fuelLevel}</div>
                <p className="text-xs text-muted-foreground">Approximately 450 km range</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Oil Life</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{carData.obdData.oilLife}</div>
                <p className="text-xs text-muted-foreground">Next change in 1,500 km</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tire Pressure</CardTitle>
              <CardDescription>Current tire pressure readings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8 py-4">
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium mb-1">Front Left</div>
                  <div className="text-2xl font-bold">{carData.obdData.tirePressure.frontLeft}</div>
                  <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Normal
                  </Badge>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium mb-1">Front Right</div>
                  <div className="text-2xl font-bold">{carData.obdData.tirePressure.frontRight}</div>
                  <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Normal
                  </Badge>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium mb-1">Rear Left</div>
                  <div className="text-2xl font-bold">{carData.obdData.tirePressure.rearLeft}</div>
                  <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Normal
                  </Badge>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium mb-1">Rear Right</div>
                  <div className="text-2xl font-bold">{carData.obdData.tirePressure.rearRight}</div>
                  <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Normal
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engine Health History</CardTitle>
              <CardDescription>Last 30 days performance</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <CarHealthChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Transactions</CardTitle>
              <CardDescription>Solana blockchain transaction history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-[250px]">
                <CarBlockchainTransactionsChart />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Signature</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blockchainTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{tx.timestamp}</span>
                          </div>
                        </TableCell>
                        <TableCell>{tx.type}</TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted p-1 rounded">{tx.signature}</code>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" /> {tx.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href="https://explorer.solana.com" target="_blank">
                              <ExternalLink className="mr-1 h-3 w-3" /> View
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Export Transaction History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance History</CardTitle>
              <CardDescription>Verified service records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Oil Change & Filter</div>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      <Shield className="mr-1 h-3 w-3" /> Blockchain Verified
                    </Badge>
                  </div>
                  <div className="mt-1 text-sm">March 15, 2025</div>
                  <div className="mt-2 text-xs text-muted-foreground">Mileage: 75,230 km • Next: 80,230 km</div>
                  <div className="mt-3 flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-1 h-3 w-3" /> Certificate
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://explorer.solana.com" target="_blank">
                        <ExternalLink className="mr-1 h-3 w-3" /> Blockchain
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Brake Inspection</div>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      <Shield className="mr-1 h-3 w-3" /> Blockchain Verified
                    </Badge>
                  </div>
                  <div className="mt-1 text-sm">February 2, 2025</div>
                  <div className="mt-2 text-xs text-muted-foreground">Mileage: 72,105 km • Brake pads at 70%</div>
                  <div className="mt-3 flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-1 h-3 w-3" /> Certificate
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://explorer.solana.com" target="_blank">
                        <ExternalLink className="mr-1 h-3 w-3" /> Blockchain
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" /> Create New Certificate
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
