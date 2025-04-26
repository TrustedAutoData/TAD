"use server"

import type {ApiResponse, ChartData} from "@/lib/types";
import {handleMockResponse} from "@/lib/api";

export async function getEngineHealthChart(): Promise<ApiResponse<ChartData>> {
    return handleMockResponse<ChartData>({
        data: [
            { name: "Good", value: 75 },
            { name: "Fair", value: 15 },
            { name: "Poor", value: 10 },
        ],
    })
}