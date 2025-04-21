import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Award, Download, Filter, Search, Trophy } from "lucide-react"
import Link from "next/link"
import { UserPointsChart } from "@/components/user-points-chart"
import { UserActivityChart } from "@/components/user-activity-chart"

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users & Points</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Data
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Points Distribution</CardTitle>
            <CardDescription>Points earned by users across the platform</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <UserPointsChart />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Monthly active users and engagement</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <UserActivityChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Database</CardTitle>
          <CardDescription>View and manage all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by name, email..." className="w-full bg-background pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Cars</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">john.doe@example.com</div>
                  </TableCell>
                  <TableCell>
                    <Badge>2 Cars</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span>1,250 pts</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      <Trophy className="mr-1 h-3 w-3" /> Level 5
                    </Badge>
                  </TableCell>
                  <TableCell>Jan 15, 2025</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/admin/users/1">View</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" /> Export
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-sm text-muted-foreground">jane.smith@example.com</div>
                  </TableCell>
                  <TableCell>
                    <Badge>1 Car</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span>850 pts</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      <Trophy className="mr-1 h-3 w-3" /> Level 3
                    </Badge>
                  </TableCell>
                  <TableCell>Feb 3, 2025</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/admin/users/2">View</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" /> Export
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Robert Johnson</div>
                    <div className="text-sm text-muted-foreground">robert.johnson@example.com</div>
                  </TableCell>
                  <TableCell>
                    <Badge>3 Cars</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span>2,150 pts</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      <Trophy className="mr-1 h-3 w-3" /> Level 8
                    </Badge>
                  </TableCell>
                  <TableCell>Dec 10, 2024</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/admin/users/3">View</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" /> Export
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Michael Brown</div>
                    <div className="text-sm text-muted-foreground">michael.brown@example.com</div>
                  </TableCell>
                  <TableCell>
                    <Badge>1 Car</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span>750 pts</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      <Trophy className="mr-1 h-3 w-3" /> Level 2
                    </Badge>
                  </TableCell>
                  <TableCell>Mar 5, 2025</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/admin/users/4">View</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" /> Export
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Sarah Williams</div>
                    <div className="text-sm text-muted-foreground">sarah.williams@example.com</div>
                  </TableCell>
                  <TableCell>
                    <Badge>2 Cars</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span>1,650 pts</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      <Trophy className="mr-1 h-3 w-3" /> Level 6
                    </Badge>
                  </TableCell>
                  <TableCell>Jan 22, 2025</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/admin/users/5">View</Link>
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
          <div className="text-sm text-muted-foreground">Showing 5 of 96 users</div>
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
    </div>
  )
}
