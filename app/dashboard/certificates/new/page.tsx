import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Check, FileText, Upload } from "lucide-react"
import Link from "next/link"

export default function NewCertificatePage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/admin/certificates">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create Maintenance Certificate</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
            <CardDescription>Enter the maintenance service information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Select>
                <SelectTrigger id="customer">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="robert">Robert Johnson</SelectItem>
                  <SelectItem value="michael">Michael Brown</SelectItem>
                  <SelectItem value="sarah">Sarah Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle">Vehicle</Label>
              <Select>
                <SelectTrigger id="vehicle">
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota Camry (2020) - John Doe</SelectItem>
                  <SelectItem value="honda">Honda Civic (2019) - Jane Smith</SelectItem>
                  <SelectItem value="tesla">Tesla Model 3 (2022) - Robert Johnson</SelectItem>
                  <SelectItem value="ford">Ford F-150 (2021) - Michael Brown</SelectItem>
                  <SelectItem value="bmw">BMW X5 (2020) - Sarah Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-type">Service Type</Label>
              <Select>
                <SelectTrigger id="service-type">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oil">Oil Change & Filter</SelectItem>
                  <SelectItem value="brakes">Brake Service</SelectItem>
                  <SelectItem value="tires">Tire Service</SelectItem>
                  <SelectItem value="battery">Battery Service</SelectItem>
                  <SelectItem value="inspection">Full Inspection</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-date">Service Date</Label>
              <div className="flex gap-2">
                <Input id="service-date" type="date" />
                <Button variant="outline" size="icon">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mileage">Current Mileage (km)</Label>
              <Input id="mileage" type="number" placeholder="Enter current mileage" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="next-service">Next Service Due (km)</Label>
              <Input id="next-service" type="number" placeholder="Enter next service mileage" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Details & Verification</CardTitle>
            <CardDescription>Add detailed information and verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Service Description</Label>
              <Textarea id="description" placeholder="Enter detailed description of the service performed" rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parts">Parts Used</Label>
              <Textarea id="parts" placeholder="List any parts that were replaced or serviced" rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technician">Technician Name</Label>
              <Input id="technician" placeholder="Enter technician name" />
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <Label>Service Photos</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-4 text-center">
                  <div className="flex flex-col items-center justify-center h-32">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Upload before photo</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    Select File
                  </Button>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <div className="flex flex-col items-center justify-center h-32">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Upload after photo</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    Select File
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
              <Button variant="outline" className="gap-1">
                <FileText className="h-4 w-4" /> Preview Certificate
              </Button>
              <Button className="gap-1">
                <Check className="h-4 w-4" /> Create & Verify Certificate
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              By creating this certificate, you confirm that all information is accurate and will be verified on the
              blockchain.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
