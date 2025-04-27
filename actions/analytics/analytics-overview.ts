"use server"

import type {ApiResponse, ChartData} from "@/lib/types";
import {handleMockResponse} from "@/lib/api";
import {AnalyticsOverviewChartData} from "@/lib/types/analytics-types";

export async function fetchAnalyticsCharts(period: "7d" | "30d" | "90d" | "1y" | "all"): Promise<ApiResponse<AnalyticsOverviewChartData>> {
    let now = new Date();
    let mockData: AnalyticsOverviewChartData;

    function generateLineChartData(days: number): any[] {
        const data: any[] = [];
        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(now.getDate() - (days - i));
            data.push({
                date: date.toISOString().split('T')[0],
                users: Math.floor(Math.random() * 1000) + 300,
                cars: Math.floor(Math.random() * 800) + 200,
                certificates: Math.floor(Math.random() * 500) + 100,
            });
        }
        return data;
    }

    function generateBarChartData(count: number): ChartData[] {
        const data: ChartData[] = [];
        for (let i = 0; i < count; i++) {
            data.push({
                name: `Item ${i + 1}`,
                value: Math.floor(Math.random() * 100) + 20,
            });
        }
        return data;
    }

    switch (period) {
        case "7d":
            mockData = {
                lineChartData: generateLineChartData(7),
                carRegistrationsBarData: generateBarChartData(5),
                certificateIssuanceBarData: generateBarChartData(5),
            };
            break;
        case "30d":
            mockData = {
                lineChartData: generateLineChartData(30),
                carRegistrationsBarData: generateBarChartData(10),
                certificateIssuanceBarData: generateBarChartData(10),
            };
            break;
        case "90d":
            mockData = {
                lineChartData: generateLineChartData(90),
                carRegistrationsBarData: generateBarChartData(15),
                certificateIssuanceBarData: generateBarChartData(15),
            };
            break;
        case "1y":
            mockData = {
                lineChartData: generateLineChartData(12), // Monthly
                carRegistrationsBarData: generateBarChartData(12),
                certificateIssuanceBarData: generateBarChartData(12),
            };
            break;
        case "all":
        default:
            mockData = {
                lineChartData: generateLineChartData(24), // 2 years monthly
                carRegistrationsBarData: generateBarChartData(20),
                certificateIssuanceBarData: generateBarChartData(20),
            };
            break;
    }

    return handleMockResponse(mockData);
}