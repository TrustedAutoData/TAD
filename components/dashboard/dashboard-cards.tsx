"use client"

import React from 'react';
import { useEffect, useState } from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Car, FileText, Users, Wrench} from "lucide-react";
import {getDashboardCards} from "@/actions/dasboard/dashboard-cards";

interface DashboardSummary {
    connectedCars: {
        currentTotal: number
        changeSinceLastMonth: number
    },
    activeUsers: {
        currentTotal: number
        changeSinceLastMonth: number
    },
    certificatesIssued: {
        currentTotal: number
        changeSinceLastMonth: number
    },
    pendingServices: {
        currentTotal: number
        dueNextWeek: number
    }
}

const DashboardCards = () => {
    const [summary, setSummary] = useState<DashboardSummary | null>(null)

    useEffect(() => {
        const loadData = async () => {
            const data = await getDashboardCards()
            setSummary(data)
        }
        loadData()
    }, [])

    if (!summary) return null

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Connected Cars</CardTitle>
                    <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{summary.connectedCars.currentTotal}</div>
                    <p className="text-xs text-muted-foreground">
                        +{summary.connectedCars.changeSinceLastMonth} from last month
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{summary.activeUsers.currentTotal}</div>
                    <p className="text-xs text-muted-foreground">
                        +{summary.activeUsers.changeSinceLastMonth} from last month
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{summary.certificatesIssued.currentTotal}</div>
                    <p className="text-xs text-muted-foreground">
                        +{summary.certificatesIssued.changeSinceLastMonth} from last month
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Pending Services</CardTitle>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{summary.pendingServices.currentTotal}</div>
                    <p className="text-xs text-muted-foreground">
                        {summary.pendingServices.dueNextWeek} due in the next week
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardCards;