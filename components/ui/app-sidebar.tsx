"use client"
import React from 'react';
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator
} from "@/components/ui/sidebar";
import {BarChart3, Bell, Car, FileText, Home, LogOut, Settings, Shield, Users} from "lucide-react";
import Link from "next/link";
import {ModeToggle} from "@/components/mode-toggle";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {logout} from "@/actions/auth";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const router = useRouter()

    const adminMenuItems = [
        { title: "Admin Dashboard", icon: Home, href: "/dashboard" },
        { title: "Connected Cars", icon: Car, href: "/dashboard/cars" },
        { title: "Maintenance Certs", icon: FileText, href: "/dashboard/certificates" },
        { title: "Users & Points", icon: Users, href: "/dashboard/users" },
        { title: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
    ]
    const handleLogout = async () => {
        await logout()
        router.push("/auth")
    }
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader className="border-b">
                <div className="flex items-center gap-2 px-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <div className="font-semibold text-xl">Trusted Auto Data</div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {adminMenuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator />
                <SidebarGroup>
                    <SidebarGroupLabel>Account</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Settings">
                                    <Link href="/dashboard/settings">
                                        <Settings className="h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Notifications">
                                    <Link href="/dashboard/notifications">
                                        <Bell className="h-4 w-4" />
                                        <span>Notifications</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-medium">Admin User</div>
                        <div className="text-xs text-muted-foreground">admin@trustedauto.com</div>
                    </div>
                    <div className="flex items-center">
                        <ModeToggle/>
                        <Button variant="ghost" size="icon" onClick={handleLogout}>
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;