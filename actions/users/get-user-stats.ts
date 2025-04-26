"use server"
import { handleMockResponse } from "@/lib/api"
import {ApiResponse, type ChartData} from "@/lib/types"
import {UserActivityChartItem, UserPointsChartItem} from "@/lib/types/user-types";
import {mockUserActivityData, mockUserPointsData} from "@/lib/api/mock-data";

export async function getUserPointsData(): Promise<ApiResponse<UserPointsChartItem[]>> {
    return handleMockResponse<UserPointsChartItem[]>(mockUserPointsData)
}

export async function getUserActivityData(): Promise<ApiResponse<UserActivityChartItem[]>> {
    return handleMockResponse<UserActivityChartItem[]>(mockUserActivityData)
}

export async function getUserCarActivityData(): Promise<ApiResponse<ChartData>> {
    return handleMockResponse<ChartData>({
        data: [
            { week: "Week 1", miles: 120 },
            { week: "Week 2", miles: 145 },
            { week: "Week 3", miles: 105 },
            { week: "Week 4", miles: 130 },
            { week: "Week 5", miles: 160 },
            { week: "Week 6", miles: 125 },
            { week: "Week 7", miles: 140 },
            { week: "Week 8", miles: 110 },
        ],
    })
}

export async function getUserPointsHistoryData(): Promise<ApiResponse<ChartData>> {
    return handleMockResponse<ChartData>({
        data: [
            { date: "Jan", points: 250 },
            { date: "Feb", points: 450 },
            { date: "Mar", points: 650 },
            { date: "Apr", points: 800 },
            { date: "May", points: 950 },
            { date: "Jun", points: 1050 },
            { date: "Jul", points: 1150 },
            { date: "Aug", points: 1200 },
            { date: "Sep", points: 1250 },
        ],
    })
}