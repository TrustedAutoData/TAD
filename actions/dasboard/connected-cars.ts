"use server"

import type {ApiResponse, ChartData} from "@/lib/types";
import {handleMockResponse} from "@/lib/api";

export async function getCarGrowth(): Promise<ApiResponse<ChartData>> {
    return handleMockResponse<ChartData>({
        data: [
            { month: "May", cars: 78 },
            { month: "Jun", cars: 82 },
            { month: "Jul", cars: 90 },
            { month: "Aug", cars: 94 },
            { month: "Sep", cars: 98 },
            { month: "Oct", cars: 105 },
            { month: "Nov", cars: 110 },
            { month: "Dec", cars: 115 },
            { month: "Jan", cars: 120 },
            { month: "Feb", cars: 122 },
            { month: "Mar", cars: 125 },
            { month: "Apr", cars: 128 },
        ],
    })
}
