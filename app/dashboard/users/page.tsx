"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {Award, ChevronLeft, ChevronRight, Download, Search, Trophy} from "lucide-react"
import Link from "next/link"
import {useEffect, useState} from "react";
import {useUsers} from "@/lib/hooks/user-hooks";
import {getUser} from "@/actions/users/get-users";
import {jsPDF} from "jspdf";
import {UserActivityChart} from "@/components/users/user-activity-chart";
import {UserPointsChart} from "@/components/users/user-points-chart";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("")
  const { tableUsers, loading, fetchUsers, pagination, changePage } = useUsers()

  useEffect(() => {
    fetchUsers({ search})
  }, [fetchUsers, search])

  const handleExport = async (userId: string) => {
    const user = await getUser(userId);

    if (!user) {
      alert("User not found");
      return;
    }

    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text(`User Profile: ${user.data.name}`, 10, 10);

    doc.setFontSize(12);
    doc.text(`Name: ${user.data.name}`, 10, 20);
    doc.text(`Email: ${user.data.email}`, 10, 30);
    doc.text(`Phone: ${user.data.phone}`, 10, 40);
    if (user.data.address) {
      doc.text(`Address: ${user.data.address}`, 10, 50);
    }
    doc.text(`Points: ${user.data.points}`, 10, 60);
    doc.text(`Level: ${user.data.level}`, 10, 70);
    doc.text(`Joined: ${new Date(user.data.joined).toLocaleDateString()}`, 10, 80);

    doc.save(`user-${user.data.id}.pdf`);
  };

  const handleExportAll = async () => {
    if (loading) {
      alert("Users are still loading, please wait.")
      return
    }

    const doc = new jsPDF()
    doc.setFont("helvetica", "normal")
    doc.setFontSize(16)
    doc.text("All Users Export", 10, 10)

    let yOffset = 20

    for (let i = 0; i < tableUsers.length; i++) {
      const user = tableUsers[i]

      const fullUser = await getUser(user.id)
      if (!fullUser) {
        alert(`User ${user.id} not found`)
        continue
      }

      if (yOffset > 250) {
        doc.addPage()
        yOffset = 10
      }

      doc.setFontSize(12)
      doc.text(`User ${i + 1}: ${fullUser.data.name}`, 10, yOffset)
      doc.text(`Email: ${fullUser.data.email}`, 10, yOffset + 10)
      doc.text(`Phone: ${fullUser.data.phone}`, 10, yOffset + 20)
      if (fullUser.data.address) {
        doc.text(`Address: ${fullUser.data.address}`, 10, yOffset + 30)
      }
      doc.text(`Points: ${fullUser.data.points}`, 10, yOffset + 40)
      doc.text(`Level: ${fullUser.data.level}`, 10, yOffset + 50)
      doc.text(`Joined: ${new Date(fullUser.data.joined).toLocaleDateString()}`, 10, yOffset + 60)

      yOffset += 200
    }

    doc.save("all-users.pdf")
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users & Points</h1>
        <Button variant="outline" onClick={handleExportAll}>
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
          <div className="relative w-full max-w-sm mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input
                type="search"
                placeholder="Search by name, email..."
                className="w-full bg-background pl-8"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
            />
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
                {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                ) : tableUsers.length > 0 ? (
                    tableUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </TableCell>
                          <TableCell>
                            <Badge>{user.cars} {user.cars === 1 ? "Car" : "Cars"}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4 text-amber-500" />
                              <span>{user.points} pts</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                              <Trophy className="mr-1 h-3 w-3" /> Level {user.level}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(user.joined).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/dashboard/users/${user.id}`}>View</Link>
                              </Button>
                              <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleExport(user.id)}
                              >
                                <Download className="mr-1 h-3 w-3" /> Export
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No users found
                      </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.pageSize + 1}
            -
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total} users
          </div>

          <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === 1}
                onClick={() => changePage(pagination.page - 1)}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => changePage(pagination.page + 1)}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>

      </Card>
    </div>
  )
}
