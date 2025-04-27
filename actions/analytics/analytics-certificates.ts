"use server"
import {ApiResponse, handleMockResponse} from "@/lib/api";
import {CertificatesAnalyticsChartData} from "@/lib/types/analytics-types";
import {ChartData} from "@/lib/types";

export async function fetchCertificatesAnalyticsCharts(period: "7d" | "30d" | "90d" | "1y" | "all"): Promise<ApiResponse<CertificatesAnalyticsChartData>> {
    const now = new Date();

    function generateCertificateTypeDistributionData(count: number): ChartData[] {
        const types = ["SSL", "Code Signing", "Email", "Document", "Client Authentication"];
        const data: ChartData[] = [];
        for (let i = 0; i < count; i++) {
            data.push({
                name: types[i % types.length],
                value: Math.floor(Math.random() * 200) + 50,
            });
        }
        return data;
    }

    function generateVerificationTimesData(days: number): any[] {
        const data: any[] = [];
        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(now.getDate() - (days - i));
            data.push({
                date: date.toISOString().split('T')[0],
                verificationTime: Math.floor(Math.random() * 100) + 20, // Random verification times between 20 and 120 minutes
            });
        }
        return data;
    }

    let mockData: CertificatesAnalyticsChartData;

    switch (period) {
        case "7d":
            mockData = {
                carRegistrationsBarData: generateCertificateTypeDistributionData(5),
                lineChartData: generateVerificationTimesData(7)
            };
            break;
        case "30d":
            mockData = {
                carRegistrationsBarData: generateCertificateTypeDistributionData(10),
                lineChartData: generateVerificationTimesData(30)
            };
            break;
        case "90d":
            mockData = {
                carRegistrationsBarData: generateCertificateTypeDistributionData(15),
                lineChartData: generateVerificationTimesData(90)
            };
            break;
        case "1y":
            mockData = {
                carRegistrationsBarData: generateCertificateTypeDistributionData(12), // Monthly
                lineChartData: generateVerificationTimesData(12)
            };
            break;
        case "all":
        default:
            mockData = {
                carRegistrationsBarData: generateCertificateTypeDistributionData(20),
                lineChartData: generateVerificationTimesData(24)
            };
            break;
    }

    return handleMockResponse(mockData);
}