import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Gift, ChevronRight, Clock, Check, Car, Wrench } from "lucide-react"
import Link from "next/link"

export default function RewardsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Rewards Program"
        description="Earn points for good driving habits and redeem for rewards"
        actions={
          <Button asChild>
            <Link href="/dashboard/rewards/history">
              <Clock className="mr-2 h-4 w-4" /> Points History
            </Link>
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Your Rewards Status</CardTitle>
          <CardDescription>Current level and progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">1,250 Points</h3>
                <p className="text-muted-foreground">Level 5 Member</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                Level 5
              </Badge>
              <span className="text-sm text-muted-foreground">750 points until Level 6</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level 5</span>
              <span>Level 6</span>
            </div>
            <Progress value={62} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">1,250 / 2,000 points</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>10% Off Oil Change</CardTitle>
            <CardDescription>Valid at any AutoCare Service Center</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <Check className="mr-1 h-3 w-3" /> Available
              </Badge>
              <p className="font-medium">500 points</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Gift className="mr-2 h-4 w-4" /> Redeem Reward
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Free Car Wash</CardTitle>
            <CardDescription>Valid at participating locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <Check className="mr-1 h-3 w-3" /> Available
              </Badge>
              <p className="font-medium">300 points</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Gift className="mr-2 h-4 w-4" /> Redeem Reward
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>$25 Service Credit</CardTitle>
            <CardDescription>Valid for any maintenance service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Badge
                variant="outline"
                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
              >
                <Clock className="mr-1 h-3 w-3" /> Locked
              </Badge>
              <p className="font-medium">1,000 points</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>
              <Gift className="mr-2 h-4 w-4" /> Redeem Reward
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How to Earn More Points</CardTitle>
          <CardDescription>Ways to increase your rewards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Car className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Regular Driving</h4>
                <p className="text-sm text-muted-foreground">Earn 5 points per trip</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Learn More <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Maintenance Compliance</h4>
                <p className="text-sm text-muted-foreground">Earn 50 points per service</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Learn More <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Safe Driving</h4>
                <p className="text-sm text-muted-foreground">Earn up to 100 points per month</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Learn More <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
