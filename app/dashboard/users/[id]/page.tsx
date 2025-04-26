"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, Car, ChevronLeft, Download, FileText, Mail, MapPin, Phone, Trophy } from "lucide-react"
import Link from "next/link"
import { UserPointsHistoryChart } from "@/components/users/user-points-history-chart"
import { UserCarActivityChart } from "@/components/users/user-car-activity-chart"
import {use, useEffect} from "react";
import {useUsers} from "@/lib/hooks/user-hooks";

export default function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const {fetchUserDetailed, selectedUser, loading} = useUsers();

  useEffect(() => {
    fetchUserDetailed(id)
  }, [])

  if (loading || !selectedUser)
    return <div>Loading...</div>

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/users">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">User Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Personal information and stats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={`/placeholder-96px-height.png?height=96&width=96&text=JD`} alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                <p className="text-sm text-muted-foreground">Member since {selectedUser.joined}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{selectedUser.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{selectedUser.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{selectedUser.address}</span>
              </div>
            </div>

            <div className="rounded-lg border p-4 bg-muted/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  <span className="font-medium">Reward Points</span>
                </div>
                <span className="font-bold text-lg">{selectedUser.points}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Level</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  Level {selectedUser.level}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Points history and car usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-[300px]">
              <UserPointsHistoryChart />
            </div>
            <div className="h-[300px]">
              <UserCarActivityChart />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cars" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="cars">Cars</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="cars" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Registered Vehicles</CardTitle>
              <CardDescription>Cars associated with this user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedUser.cars.map((car) => (
                  <div key={car.id} className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">
                        {car.year} {car.make} {car.model}
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          car.status === "Connected"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        }
                      >
                        {car.status}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">Last updated: {car.lastUpdate}</div>
                    <div className="mt-3 flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/cars/${car.id}`}>
                          <Car className="mr-1 h-3 w-3" /> View Car
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" /> Export Data
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Car className="mr-2 h-4 w-4" /> Add New Car
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Certificates</CardTitle>
              <CardDescription>Service records for this user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedUser.certificates.map((cert) => (
                  <div key={cert.id} className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{cert.serviceType}</div>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      >
                        Verified
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm">
                      {cert.car} • {cert.serviceDate}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/certificates/${cert.id.toLowerCase()}`}>
                          <FileText className="mr-1 h-3 w-3" /> View Certificate
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" /> Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" /> Create New Certificate
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Rewards & Redemptions</CardTitle>
              <CardDescription>Rewards earned and redeemed by this user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedUser.rewards.map((reward) => (
                  <div key={reward.id} className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{reward.name}</div>
                      <Badge
                        variant="outline"
                        className={
                          reward.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                        }
                      >
                        {reward.status}
                      </Badge>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Redeemed On</div>
                        <div>{reward.redeemed}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Valid Until</div>
                        <div>{reward.expires}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Award className="mr-2 h-4 w-4" /> Manage Rewards
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
