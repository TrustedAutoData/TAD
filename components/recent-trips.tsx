import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, MapPin } from "lucide-react"

export function RecentTrips() {
  const trips = [
    {
      id: 1,
      date: "Today, 9:30 AM",
      from: "Home",
      to: "Office",
      distance: "12.5 km",
      duration: "25 min",
      efficiency: "Good",
    },
    {
      id: 2,
      date: "Yesterday, 6:15 PM",
      from: "Office",
      to: "Home",
      distance: "13.2 km",
      duration: "32 min",
      efficiency: "Average",
    },
    {
      id: 3,
      date: "Yesterday, 8:45 AM",
      from: "Home",
      to: "Office",
      distance: "12.5 km",
      duration: "24 min",
      efficiency: "Good",
    },
    {
      id: 4,
      date: "May 1, 3:20 PM",
      from: "Office",
      to: "Shopping Mall",
      distance: "5.7 km",
      duration: "15 min",
      efficiency: "Excellent",
    },
  ]

  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <div key={trip.id} className="flex items-start space-x-4 rounded-md border p-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36&text=${trip.id}`} alt="Trip" />
            <AvatarFallback>{trip.id}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">
                {trip.from} to {trip.to}
              </p>
              <Badge
                variant="outline"
                className={
                  trip.efficiency === "Excellent"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : trip.efficiency === "Good"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                }
              >
                {trip.efficiency === "Excellent" && <CheckCircle className="mr-1 h-3 w-3" />}
                {trip.efficiency}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{trip.date}</p>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <div className="flex items-center mr-4">
                <MapPin className="mr-1 h-3 w-3" />
                {trip.distance}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {trip.duration}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
