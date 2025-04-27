import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Download, Filter, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function AdminCertificatesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Maintenance Certificates</h1>
        <Button asChild>
          <Link href="/dashboard/admin/certificates/new">
            <Plus className="mr-2 h-4 w-4" /> Create Certificate
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Certificate Database</CardTitle>
          <CardDescription>View and manage all maintenance certificates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by ID, car, service..." className="w-full bg-background pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate ID</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">CERT-1234</div>
                    <div className="text-sm text-muted-foreground">
                      <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                        View on Blockchain
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>Oil Change & Filter</div>
                    <div className="text-sm text-muted-foreground">AutoCare Service Center</div>
                  </TableCell>
                  <TableCell>
                    <div>Toyota Camry</div>
                    <div className="text-sm text-muted-foreground">John Doe</div>
                  </TableCell>
                  <TableCell>March 15, 2025</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/admin/certificates/1">View</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" /> Export
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">CERT-1233</div>
                    <div className="text-sm text-muted-foreground">
                      <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                        View on Blockchain
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>Brake Inspection</div>
                    <div className="text-sm text-muted-foreground">AutoCare Service Center</div>
                  </TableCell>
                  <TableCell>
                    <div>Toyota Camry</div>
                    <div className="text-sm text-muted-foreground">John Doe</div>
                  </TableCell>
                  <TableCell>February 2, 2025</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/admin/certificates/2">View</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" /> Export
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">CERT-1232</div>
                    <div className="text-sm text-muted-foreground">
                      <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                        View on Blockchain
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>Tire Rotation</div>
                    <div className="text-sm text-muted-foreground">QuickTire Shop</div>
                  </TableCell>
                  <TableCell>
                    <div>Toyota Camry</div>
                    <div className="text-sm text-muted-foreground">John Doe</div>
                  </TableCell>
                  <TableCell>January 10, 2025</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/admin/certificates/3">View</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" /> Export
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">CERT-1231</div>
                    <div className="text-sm text-muted-foreground">
                      <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                        View on Blockchain
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>Full Inspection</div>
                    <div className="text-sm text-muted-foreground">AutoCare Service Center</div>
                  </TableCell>
                  <TableCell>
                    <div>Honda Civic</div>
                    <div className="text-sm text-muted-foreground">Robert Johnson</div>
                  </TableCell>
                  <TableCell>January 5, 2025</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/admin/certificates/4">View</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" /> Export
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">CERT-1230</div>
                    <div className="text-sm text-muted-foreground">
                      <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                        View on Blockchain
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>Battery Replacement</div>
                    <div className="text-sm text-muted-foreground">AutoCare Service Center</div>
                  </TableCell>
                  <TableCell>
                    <div>Ford F-150</div>
                    <div className="text-sm text-muted-foreground">Michael Brown</div>
                  </TableCell>
                  <TableCell>December 20, 2024</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/admin/certificates/5">View</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" /> Export
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Showing 5 of 42 certificates</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
