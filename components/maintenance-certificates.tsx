import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, ExternalLink } from "lucide-react"

export function MaintenanceCertificates() {
  const certificates = [
    {
      id: "CERT-1234",
      car: "Toyota Camry",
      owner: "John Doe",
      service: "Oil Change & Filter",
      date: "May 2, 2025",
      verified: true,
    },
    {
      id: "CERT-1233",
      car: "Honda Civic",
      owner: "Jane Smith",
      service: "Brake Replacement",
      date: "May 1, 2025",
      verified: true,
    },
    {
      id: "CERT-1232",
      car: "Tesla Model 3",
      owner: "Robert Johnson",
      service: "Battery Check",
      date: "Apr 29, 2025",
      verified: true,
    },
    {
      id: "CERT-1231",
      car: "Ford F-150",
      owner: "Michael Brown",
      service: "Tire Rotation",
      date: "Apr 28, 2025",
      verified: false,
    },
  ]

  return (
    <div className="space-y-4">
      {certificates.map((cert) => (
        <div key={cert.id} className="flex items-start space-x-4 rounded-md border p-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36&text=${cert.car[0]}`} alt={cert.car} />
            <AvatarFallback>{cert.car[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">{cert.car}</p>
              <Badge
                variant="outline"
                className={
                  cert.verified
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                }
              >
                {cert.verified && <CheckCircle className="mr-1 h-3 w-3" />}
                {cert.verified ? "Verified" : "Pending"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{cert.service}</p>
            <div className="flex items-center justify-between pt-1">
              <div className="text-xs text-muted-foreground">
                {cert.owner} • {cert.date}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Download className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
