"use server"
import {AnalyticsCards} from "@/lib/types/analytics-types";
import type {ApiResponse, ChartData} from "@/lib/types";
import {handleMockResponse} from "@/lib/api";

export async function fetchAnalyticsData(period: "7d" | "30d" | "90d" | "1y" | "all"):Promise<ApiResponse<AnalyticsCards>> {
    let now = new Date()
    let dateFrom: Date | undefined
    let previousDateFrom: Date | undefined
    let previousDateTo: Date | undefined
    let mockData: AnalyticsCards;

    switch (period) {
        case "7d":
            dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            previousDateTo = dateFrom
            previousDateFrom = new Date(previousDateTo.getTime() - 7 * 24 * 60 * 60 * 1000)
            mockData = {
                totalCars: { current: 120, previous: 100 },
                connectedCars: { current: 95, previous: 90 },
                certificatesIssued: { current: 45, previous: 40 },
                activeUsers: { current: 80, previous: 70 },
            };
            break
        case "30d":
            dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            previousDateTo = dateFrom
            previousDateFrom = new Date(previousDateTo.getTime() - 30 * 24 * 60 * 60 * 1000)
            mockData = {
                totalCars: { current: 520, previous: 480 },
                connectedCars: { current: 430, previous: 410 },
                certificatesIssued: { current: 190, previous: 160 },
                activeUsers: { current: 300, previous: 270 },
            };
            break
        case "90d":
            dateFrom = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
            previousDateTo = dateFrom
            previousDateFrom = new Date(previousDateTo.getTime() - 90 * 24 * 60 * 60 * 1000)
            mockData = {
                totalCars: { current: 1500, previous: 1450 },
                connectedCars: { current: 1250, previous: 1200 },
                certificatesIssued: { current: 680, previous: 630 },
                activeUsers: { current: 950, previous: 900 },
            };
            break
        case "1y":
            dateFrom = new Date(now.setFullYear(now.getFullYear() - 1))
            previousDateTo = dateFrom
            previousDateFrom = new Date(previousDateTo.setFullYear(previousDateTo.getFullYear() - 1))
            mockData = {
                totalCars: { current: 6000, previous: 5800 },
                connectedCars: { current: 5000, previous: 4800 },
                certificatesIssued: { current: 2500, previous: 2300 },
                activeUsers: { current: 4000, previous: 3900 },
            };
            break
        case "all":
        default:
            dateFrom = undefined
            previousDateFrom = undefined
            previousDateTo = undefined
            mockData = {
                totalCars: { current: 12000, previous: 11000 },
                connectedCars: { current: 10000, previous: 9500 },
                certificatesIssued: { current: 5200, previous: 5000 },
                activeUsers: { current: 8200, previous: 8000 },
            };
            break
    }

    const currentWhere = dateFrom ? { createdAt: { gte: dateFrom } } : undefined
    const previousWhere = previousDateFrom && previousDateTo
        ? { createdAt: { gte: previousDateFrom, lt: previousDateTo } }
        : undefined

    // const [currentCars, previousCars] = await Promise.all([
    //     db.car.count({ where: currentWhere }),
    //     db.car.count({ where: previousWhere }),
    // ])
    //
    // const [currentConnectedCars, previousConnectedCars] = await Promise.all([
    //     db.car.count({ where: { connected: true, ...(currentWhere || {}) } }),
    //     db.car.count({ where: { connected: true, ...(previousWhere || {}) } }),
    // ])
    //
    // const [currentCertificates, previousCertificates] = await Promise.all([
    //     db.certificate.count({ where: currentWhere }),
    //     db.certificate.count({ where: previousWhere }),
    // ])
    //
    // const [currentActiveUsers, previousActiveUsers] = await Promise.all([
    //     db.user.count({ where: { lastActiveAt: { gte: dateFrom || new Date(0) } } }),
    //     db.user.count({ where: { lastActiveAt: { gte: previousDateFrom || new Date(0), lt: previousDateTo || new Date() } } }),
    // ])

    return handleMockResponse<AnalyticsCards>(mockData)
}
