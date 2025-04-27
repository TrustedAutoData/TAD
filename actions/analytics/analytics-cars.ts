"use server"
import {ApiResponse, handleMockResponse} from "@/lib/api";
import {CarsAnalyticsChartData} from "@/lib/types/analytics-types";
import {ChartData} from "@/lib/types";

export async function fetchCarsAnalyticsCharts(period: "7d" | "30d" | "90d" | "1y" | "all"): Promise<ApiResponse<CarsAnalyticsChartData>> {
    const now = new Date();

    function generateCarMakeDistributionData(count: number): ChartData[] {
        const makes = ["Toyota", "Honda", "Ford", "BMW", "Audi", "Chevrolet", "Tesla", "Nissan", "Volkswagen", "Hyundai"];
        const data: ChartData[] = [];
        for (let i = 0; i < count; i++) {
            data.push({
                name: makes[i % makes.length],
                value: Math.floor(Math.random() * 200) + 50,
            });
        }
        return data;
    }

    function generateConnectionStatusData(days: number):  any[] {
        const data: any[] = [];
        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(now.getDate() - (days - i));
            data.push({
                date: date.toISOString().split('T')[0],
                connected: Math.floor(Math.random() * 800) + 100,
                disconnected: Math.floor(Math.random() * 300),
            });
        }
        return data;
    }

    let mockData: CarsAnalyticsChartData;

    switch (period) {
        case "7d":
            mockData = {
                carMakeDistributionBarData: generateCarMakeDistributionData(5),
                connectionStatusLineData: generateConnectionStatusData(7),
            };
            break;
        case "30d":
            mockData = {
                carMakeDistributionBarData: generateCarMakeDistributionData(10),
                connectionStatusLineData: generateConnectionStatusData(30),
            };
            break;
        case "90d":
            mockData = {
                carMakeDistributionBarData: generateCarMakeDistributionData(15),
                connectionStatusLineData: generateConnectionStatusData(90),
            };
            break;
        case "1y":
            mockData = {
                carMakeDistributionBarData: generateCarMakeDistributionData(12), // Monthly
                connectionStatusLineData: generateConnectionStatusData(12),
            };
            break;
        case "all":
        default:
            mockData = {
                carMakeDistributionBarData: generateCarMakeDistributionData(20),
                connectionStatusLineData: generateConnectionStatusData(24),
            };
            break;
    }

    return handleMockResponse(mockData);
}