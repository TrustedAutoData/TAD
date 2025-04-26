"use server"

import type {ApiResponse, ChartData} from "@/lib/types";
import {handleMockResponse} from "@/lib/api";

export async function getCarDistributionChart(): Promise<ApiResponse<ChartData>> {
    return handleMockResponse<ChartData>({
        data: [
            { name: "Toyota", value: 35 },
            { name: "Honda", value: 25 },
            { name: "Ford", value: 15 },
            { name: "Tesla", value: 10 },
            { name: "BMW", value: 8 },
            { name: "Others", value: 7 },
        ],
    })
}