// Hook for dashboard data
import {useAtom} from "jotai/index";
import {
    blockchainTransactionsChartAtom,
    carDataTransmissionChartAtom,
    carDistributionChartAtom,
    carGrowthChartAtom,
    dashboardLoadingAtom,
    dashboardStatsAtom,
    engineHealthChartAtom,
    userActivityChartAtom,
    userCarActivityChartAtom,
    userPointsChartAtom,
    userPointsHistoryChartAtom
} from "@/lib/store";
import {useCallback} from "react";
import * as api from "@/lib/api/api-client";
import {
    getUserActivityData,
    getUserCarActivityData,
    getUserPointsData,
    getUserPointsHistoryData,
} from "@/actions/users/get-user-stats";
import {getCarDistributionChart, getCarGrowthChart, getEngineHealthChart} from "@/lib/api/api-client";
import {getCarGrowth} from "@/actions/dasboard/connected-cars";

export function useDashboard() {
    const [stats, setStats] = useAtom(dashboardStatsAtom)
    const [loading, setLoading] = useAtom(dashboardLoadingAtom)
    const [carDistributionChart, setCarDistributionChart] = useAtom(carDistributionChartAtom)
    const [engineHealthChart, setEngineHealthChart] = useAtom(engineHealthChartAtom)
    const [carGrowthChart, setCarGrowthChart] = useAtom(carGrowthChartAtom)
    const [userPointsChart, setUserPointsChart] = useAtom(userPointsChartAtom)
    const [userActivityChart, setUserActivityChart] = useAtom(userActivityChartAtom)
    const [userPointsHistoryChart, setUserPointsHistoryChart] = useAtom(userPointsHistoryChartAtom)
    const [userCarActivityChart, setUserCarActivityChart] = useAtom(userCarActivityChartAtom)
    const [blockchainTransactionsChart, setBlockchainTransactionsChart] = useAtom(blockchainTransactionsChartAtom)
    const [carDataTransmissionChart, setCarDataTransmissionChart] = useAtom(carDataTransmissionChartAtom)

    const fetchDashboardStats = useCallback(async () => {
        setLoading(true)
        try {
            const response = await api.getDashboardStats()
            setStats(response.data)
        } catch (error) {
            console.error("Error fetching dashboard stats:", error)
        } finally {
            setLoading(false)
        }
    }, [setStats, setLoading])

    const fetchUserActivity = useCallback(async () => {
        setLoading(true)
        try {
            const userActivity = await getUserActivityData();
            setUserActivityChart(userActivity.data)
        } catch (error) {
            console.error("Error fetching chart data:", error)
        } finally {
            setLoading(false)
        }
    }, [
        setLoading,
        setUserActivityChart
    ])

    const fetchUserPoints = useCallback(async () => {
        setLoading(true)
        try {
            const userPoints = await getUserPointsData();
            setUserPointsChart(userPoints.data)
        } catch (error) {
            console.error("Error fetching chart data:", error)
        } finally {
            setLoading(false)
        }
    }, [
        setLoading,
        setUserActivityChart
    ])

    const fetchUserCarActivity = useCallback(async () => {
        setLoading(true)
        try {
            const userActivity = await getUserCarActivityData();
            setUserCarActivityChart(userActivity.data)
        } catch (error) {
            console.error("Error fetching chart data:", error)
        } finally {
            setLoading(false)
        }
    }, [
        setLoading,
        setUserActivityChart
    ])

    const fetchUserPointsHistory = useCallback(async () => {
        setLoading(true)
        try {
            const userPoints = await getUserPointsHistoryData();
            setUserPointsHistoryChart(userPoints.data)
        } catch (error) {
            console.error("Error fetching chart data:", error)
        } finally {
            setLoading(false)
        }
    }, [
        setLoading,
        setUserActivityChart
    ])

    const fetchDashboard = useCallback(async () => {
        setLoading(true)
        try {
            const [
                carDistribution,
                engineHealth,
                carGrowth,
            ] = await Promise.all([
                getCarDistributionChart(),
                getEngineHealthChart(),
                getCarGrowth(),
            ])

            setCarDistributionChart(carDistribution.data)
            setEngineHealthChart(engineHealth.data)
            setCarGrowthChart(carGrowth.data)
        } catch (error) {
            console.error("Error fetching chart data:", error)
        } finally {
            setLoading(false)
        }
    }, [
        setLoading,
        setCarDistributionChart,
        setEngineHealthChart,
        setCarGrowthChart
    ])

    const fetchAllChartData = useCallback(async () => {
        setLoading(true)
        try {
            const [
                carDistribution,
                engineHealth,
                carGrowth,
                blockchainTransactions,
                carDataTransmission,
            ] = await Promise.all([
                api.getCarDistributionChart(),
                api.getEngineHealthChart(),
                api.getCarGrowthChart(),
                api.getBlockchainTransactionsChart(),
                api.getCarDataTransmissionChart(),
            ])

            setCarDistributionChart(carDistribution.data)
            setEngineHealthChart(engineHealth.data)
            setCarGrowthChart(carGrowth.data)
            setBlockchainTransactionsChart(blockchainTransactions.data)
            setCarDataTransmissionChart(carDataTransmission.data)
        } catch (error) {
            console.error("Error fetching chart data:", error)
        } finally {
            setLoading(false)
        }
    }, [
        setLoading,
        setCarDistributionChart,
        setEngineHealthChart,
        setCarGrowthChart,
        setUserPointsChart,
        setUserActivityChart,
        setBlockchainTransactionsChart,
        setCarDataTransmissionChart,
    ])

    return {
        stats,
        loading,
        carDistributionChart,
        engineHealthChart,
        carGrowthChart,
        userPointsChart,
        userActivityChart,
        blockchainTransactionsChart,
        carDataTransmissionChart,
        fetchDashboardStats,
        fetchAllChartData,
        fetchUserActivity,
        fetchUserPoints,
        userPointsHistoryChart,
        userCarActivityChart,
        fetchUserCarActivity,
        fetchUserPointsHistory,
        fetchDashboard
    }
}