import type {ChartData} from "@/lib/types/index";

export interface AnalyticsCards {
    totalCars: {
        current: number,
        previous: number,
    },
    connectedCars: {
        current: number,
        previous: number,
    },
    certificatesIssued: {
        current: number,
        previous: number,
    },
    activeUsers: {
        current: number,
        previous: number,
    },
}

export type AnalyticsOverviewChartData = {
    lineChartData: ChartData[],
    carRegistrationsBarData: ChartData[],
    certificateIssuanceBarData: ChartData[],
}

export type CarsAnalyticsChartData = {
    carMakeDistributionBarData: ChartData[];
    connectionStatusLineData: ChartData[];
}

export type CertificatesAnalyticsChartData = {
    lineChartData: ChartData[],
    carRegistrationsBarData: ChartData[]
}

export type AnalyticsChartsData =
    | AnalyticsOverviewChartData
    | CarsAnalyticsChartData
    | CertificatesAnalyticsChartData
    | null;
