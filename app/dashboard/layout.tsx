import type React from "react"
import {
    SidebarInset,
    SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar"
import AppSidebar from "@/components/ui/app-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
            <main>
                <div className="ml-2 mt-2">
                    <SidebarTrigger/>
                </div>
                <div className="flex flex-col gap-6 px-6 py-2">
                    {children}
                </div>
            </main>
        </SidebarInset>
    </SidebarProvider>
  )
}
