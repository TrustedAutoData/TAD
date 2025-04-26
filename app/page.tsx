import Link from "next/link"
import { Button } from "@/components/ui/button"
import {Shield, Car, BarChart3, Award, ArrowRight, ArrowRightCircle, MoveRight, Check} from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Trusted Auto Data</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium">
              How It Works
            </Link>
          </nav>
          <Link href="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 px-4 md:px-6 flex flex-col items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold sm:text-5xl">
              Trusted Auto Data for Your Vehicle
            </h1>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Track your car's health, maintenance history, and earn rewards for good driving habits.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/auth">
              <Button size="lg" className="gap-1">
                Get Started <ArrowRight className="h-4 w-4"/>
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </section>
        <section id="features" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to keep your vehicle in top condition
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Car className="h-8 w-8 text-primary"/>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Real-Time Telemetry</h3>
                  <p className="text-muted-foreground">
                    Monitor your car's health, mileage, and engine status in real-time.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-8 w-8 text-primary"/>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Maintenance History</h3>
                  <p className="text-muted-foreground">
                    Track all repairs and services with blockchain-verified certificates.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary"/>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Rewards Program</h3>
                  <p className="text-muted-foreground">
                    Earn XP points for good driving habits and redeem for real-world discounts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started in three simple steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Connect Your Vehicle</h3>
                  <p className="text-muted-foreground">
                    Install our OBD device or connect your smart car directly to our platform.
                  </p>
                </div>
                <MoveRight size={32} className="hidden lg:block absolute -right-6 top-8 text-primary"/>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Monitor Performance</h3>
                  <p className="text-muted-foreground">
                    Track real-time data and receive insights about your vehicle's health.
                  </p>
                </div>
                <MoveRight size={32} className="hidden lg:block absolute -right-6 top-8 text-primary"/>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Earn Rewards</h3>
                  <p className="text-muted-foreground">
                    Get points for good driving habits and redeem them for exclusive benefits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary"/>
            <span className="font-semibold">Trusted Auto Data</span>
          </div>
          <div className="md:ml-auto flex items-center gap-4">
            <p className="text-xs text-muted-foreground">© 2025 Trusted Auto Data. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
