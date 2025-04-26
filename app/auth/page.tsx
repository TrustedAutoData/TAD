"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield } from "lucide-react"
import { useState } from "react"
import {LoginForm} from "@/components/forms/login-form";
import {RegisterForm} from "@/components/forms/register-form";

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState("login")

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="flex items-center gap-2">
                        <Shield className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold">Trusted Auto Data</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Track your car's health, maintenance history, and earn rewards
                    </p>
                </div>

                <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Sign In</TabsTrigger>
                        <TabsTrigger value="register">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login"><LoginForm /></TabsContent>
                    <TabsContent value="register"><RegisterForm onSuccess={() => setActiveTab("login")} /></TabsContent>
                </Tabs>
            </div>
        </div>
    )
}