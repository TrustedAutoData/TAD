"use client"

import { useAtom } from "jotai"
import { useCallback } from "react"
import * as api from "./api-client"
import {
  useMockDataAtom,
  carsAtom,
  usersAtom,
  certificatesAtom,
  dealersAtom,
  dashboardStatsAtom,
  blockchainTransactionsAtom,
  carsLoadingAtom,
  usersLoadingAtom,
  certificatesLoadingAtom,
  dealersLoadingAtom,
  dashboardLoadingAtom,
  selectedCarIdAtom,
  selectedUserIdAtom,
  selectedCertificateIdAtom,
  selectedDealerIdAtom,
  selectedCarAtom,
  selectedUserAtom,
  selectedCertificateAtom,
  selectedDealerAtom,
  carsPaginationAtom,
  usersPaginationAtom,
  certificatesPaginationAtom,
  dealersPaginationAtom,
  carDistributionChartAtom,
  engineHealthChartAtom,
  carGrowthChartAtom,
  userPointsChartAtom,
  userActivityChartAtom,
  blockchainTransactionsChartAtom,
  carDataTransmissionChartAtom,
} from "@/lib/store"

// Hook for API configuration
export function useApiConfig() {
  const [useMockData, setUseMockData] = useAtom(useMockDataAtom)

  return {
    useMockData: true, // Always use mock data
    setUseMockData: () => {}, // No-op function
    toggleMockData: () => {}, // No-op function
  }
}

// Hook for cars data
export function useCars() {
  const [cars, setCars] = useAtom(carsAtom)
  const [loading, setLoading] = useAtom(carsLoadingAtom)
  const [selectedCarId, setSelectedCarId] = useAtom(selectedCarIdAtom)
  const [selectedCar] = useAtom(selectedCarAtom)
  const [pagination, setPagination] = useAtom(carsPaginationAtom)

  const fetchCars = useCallback(
    async (params?: { status?: string; dealerId?: string; search?: string }) => {
      setLoading(true)
      try {
        const response = await api.getCars({
          ...params,
          page: pagination.page,
          pageSize: pagination.pageSize,
        })
        setCars(response.data.data)
        setPagination({
          ...pagination,
          total: response.data.total,
          totalPages: response.data.totalPages,
        })
      } catch (error) {
        console.error("Error fetching cars:", error)
      } finally {
        setLoading(false)
      }
    },
    [setCars, setLoading, pagination, setPagination],
  )

  const fetchCar = useCallback(
    async (id: string) => {
      setLoading(true)
      try {
        const response = await api.getCar(id)
        setCars((prev) => {
          const index = prev.findIndex((car) => car.id === id)
          if (index >= 0) {
            return [...prev.slice(0, index), response.data, ...prev.slice(index + 1)]
          }
          return [...prev, response.data]
        })
        setSelectedCarId(id)
      } catch (error) {
        console.error(`Error fetching car ${id}:`, error)
      } finally {
        setLoading(false)
      }
    },
    [setCars, setLoading, setSelectedCarId],
  )

  const createCar = useCallback(
    async (car: Omit<any, "id">) => {
      setLoading(true)
      try {
        const response = await api.createCar(car)
        setCars((prev) => [...prev, response.data])
        return response.data
      } catch (error) {
        console.error("Error creating car:", error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setCars, setLoading],
  )

  const updateCar = useCallback(
    async (id: string, car: Partial<any>) => {
      setLoading(true)
      try {
        const response = await api.updateCar(id, car)
        setCars((prev) => {
          const index = prev.findIndex((c) => c.id === id)
          if (index >= 0) {
            return [...prev.slice(0, index), response.data, ...prev.slice(index + 1)]
          }
          return prev
        })
        return response.data
      } catch (error) {
        console.error(`Error updating car ${id}:`, error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setCars, setLoading],
  )

  const deleteCar = useCallback(
    async (id: string) => {
      setLoading(true)
      try {
        await api.deleteCar(id)
        setCars((prev) => prev.filter((car) => car.id !== id))
        if (selectedCarId === id) {
          setSelectedCarId(null)
        }
      } catch (error) {
        console.error(`Error deleting car ${id}:`, error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setCars, setLoading, selectedCarId, setSelectedCarId],
  )

  const changePage = useCallback(
    (page: number) => {
      setPagination((prev) => ({ ...prev, page }))
      fetchCars()
    },
    [setPagination, fetchCars],
  )

  return {
    cars,
    loading,
    selectedCarId,
    selectedCar,
    pagination,
    setSelectedCarId,
    fetchCars,
    fetchCar,
    createCar,
    updateCar,
    deleteCar,
    changePage,
  }
}

// Hook for users data
export function useUsers() {
  const [users, setUsers] = useAtom(usersAtom)
  const [loading, setLoading] = useAtom(usersLoadingAtom)
  const [selectedUserId, setSelectedUserId] = useAtom(selectedUserIdAtom)
  const [selectedUser] = useAtom(selectedUserAtom)
  const [pagination, setPagination] = useAtom(usersPaginationAtom)

  const fetchUsers = useCallback(
    async (params?: { search?: string }) => {
      setLoading(true)
      try {
        const response = await api.getUsers({
          ...params,
          page: pagination.page,
          pageSize: pagination.pageSize,
        })
        setUsers(response.data.data)
        setPagination({
          ...pagination,
          total: response.data.total,
          totalPages: response.data.totalPages,
        })
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    },
    [setUsers, setLoading, pagination, setPagination],
  )

  const fetchUser = useCallback(
    async (id: string) => {
      setLoading(true)
      try {
        const response = await api.getUser(id)
        setUsers((prev) => {
          const index = prev.findIndex((user) => user.id === id)
          if (index >= 0) {
            return [...prev.slice(0, index), response.data, ...prev.slice(index + 1)]
          }
          return [...prev, response.data]
        })
        setSelectedUserId(id)
      } catch (error) {
        console.error(`Error fetching user ${id}:`, error)
      } finally {
        setLoading(false)
      }
    },
    [setUsers, setLoading, setSelectedUserId],
  )

  const createUser = useCallback(
    async (user: Omit<any, "id">) => {
      setLoading(true)
      try {
        const response = await api.createUser(user)
        setUsers((prev) => [...prev, response.data])
        return response.data
      } catch (error) {
        console.error("Error creating user:", error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setUsers, setLoading],
  )

  const updateUser = useCallback(
    async (id: string, user: Partial<any>) => {
      setLoading(true)
      try {
        const response = await api.updateUser(id, user)
        setUsers((prev) => {
          const index = prev.findIndex((u) => u.id === id)
          if (index >= 0) {
            return [...prev.slice(0, index), response.data, ...prev.slice(index + 1)]
          }
          return prev
        })
        return response.data
      } catch (error) {
        console.error(`Error updating user ${id}:`, error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setUsers, setLoading],
  )

  const deleteUser = useCallback(
    async (id: string) => {
      setLoading(true)
      try {
        await api.deleteUser(id)
        setUsers((prev) => prev.filter((user) => user.id !== id))
        if (selectedUserId === id) {
          setSelectedUserId(null)
        }
      } catch (error) {
        console.error(`Error deleting user ${id}:`, error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setUsers, setLoading, selectedUserId, setSelectedUserId],
  )

  const changePage = useCallback(
    (page: number) => {
      setPagination((prev) => ({ ...prev, page }))
      fetchUsers()
    },
    [setPagination, fetchUsers],
  )

  return {
    users,
    loading,
    selectedUserId,
    selectedUser,
    pagination,
    setSelectedUserId,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    changePage,
  }
}

// Hook for certificates data
export function useCertificates() {
  const [certificates, setCertificates] = useAtom(certificatesAtom)
  const [loading, setLoading] = useAtom(certificatesLoadingAtom)
  const [selectedCertificateId, setSelectedCertificateId] = useAtom(selectedCertificateIdAtom)
  const [selectedCertificate] = useAtom(selectedCertificateAtom)
  const [pagination, setPagination] = useAtom(certificatesPaginationAtom)

  const fetchCertificates = useCallback(
    async (params?: { carId?: string; dealerId?: string; search?: string }) => {
      setLoading(true)
      try {
        const response = await api.getCertificates({
          ...params,
          page: pagination.page,
          pageSize: pagination.pageSize,
        })
        setCertificates(response.data.data)
        setPagination({
          ...pagination,
          total: response.data.total,
          totalPages: response.data.totalPages,
        })
      } catch (error) {
        console.error("Error fetching certificates:", error)
      } finally {
        setLoading(false)
      }
    },
    [setCertificates, setLoading, pagination, setPagination],
  )

  const fetchCertificate = useCallback(
    async (id: string) => {
      setLoading(true)
      try {
        const response = await api.getCertificate(id)
        setCertificates((prev) => {
          const index = prev.findIndex((cert) => cert.id === id)
          if (index >= 0) {
            return [...prev.slice(0, index), response.data, ...prev.slice(index + 1)]
          }
          return [...prev, response.data]
        })
        setSelectedCertificateId(id)
      } catch (error) {
        console.error(`Error fetching certificate ${id}:`, error)
      } finally {
        setLoading(false)
      }
    },
    [setCertificates, setLoading, setSelectedCertificateId],
  )

  const createCertificate = useCallback(
    async (certificate: Omit<any, "id">) => {
      setLoading(true)
      try {
        const response = await api.createCertificate(certificate)
        setCertificates((prev) => [...prev, response.data])
        return response.data
      } catch (error) {
        console.error("Error creating certificate:", error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setCertificates, setLoading],
  )

  const updateCertificate = useCallback(
    async (id: string, certificate: Partial<any>) => {
      setLoading(true)
      try {
        const response = await api.updateCertificate(id, certificate)
        setCertificates((prev) => {
          const index = prev.findIndex((c) => c.id === id)
          if (index >= 0) {
            return [...prev.slice(0, index), response.data, ...prev.slice(index + 1)]
          }
          return prev
        })
        return response.data
      } catch (error) {
        console.error(`Error updating certificate ${id}:`, error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setCertificates, setLoading],
  )

  const deleteCertificate = useCallback(
    async (id: string) => {
      setLoading(true)
      try {
        await api.deleteCertificate(id)
        setCertificates((prev) => prev.filter((cert) => cert.id !== id))
        if (selectedCertificateId === id) {
          setSelectedCertificateId(null)
        }
      } catch (error) {
        console.error(`Error deleting certificate ${id}:`, error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setCertificates, setLoading, selectedCertificateId, setSelectedCertificateId],
  )

  const changePage = useCallback(
    (page: number) => {
      setPagination((prev) => ({ ...prev, page }))
      fetchCertificates()
    },
    [setPagination, fetchCertificates],
  )

  return {
    certificates,
    loading,
    selectedCertificateId,
    selectedCertificate,
    pagination,
    setSelectedCertificateId,
    fetchCertificates,
    fetchCertificate,
    createCertificate,
    updateCertificate,
    deleteCertificate,
    changePage,
  }
}

// Hook for dealers data
export function useDealers() {
  const [dealers, setDealers] = useAtom(dealersAtom)
  const [loading, setLoading] = useAtom(dealersLoadingAtom)
  const [selectedDealerId, setSelectedDealerId] = useAtom(selectedDealerIdAtom)
  const [selectedDealer] = useAtom(selectedDealerAtom)
  const [pagination, setPagination] = useAtom(dealersPaginationAtom)

  const fetchDealers = useCallback(
    async (params?: { search?: string }) => {
      setLoading(true)
      try {
        const response = await api.getDealers({
          ...params,
          page: pagination.page,
          pageSize: pagination.pageSize,
        })
        setDealers(response.data.data)
        setPagination({
          ...pagination,
          total: response.data.total,
          totalPages: response.data.totalPages,
        })
      } catch (error) {
        console.error("Error fetching dealers:", error)
      } finally {
        setLoading(false)
      }
    },
    [setDealers, setLoading, pagination, setPagination],
  )

  const fetchDealer = useCallback(
    async (id: string) => {
      setLoading(true)
      try {
        const response = await api.getDealer(id)
        setDealers((prev) => {
          const index = prev.findIndex((dealer) => dealer.id === id)
          if (index >= 0) {
            return [...prev.slice(0, index), response.data, ...prev.slice(index + 1)]
          }
          return [...prev, response.data]
        })
        setSelectedDealerId(id)
      } catch (error) {
        console.error(`Error fetching dealer ${id}:`, error)
      } finally {
        setLoading(false)
      }
    },
    [setDealers, setLoading, setSelectedDealerId],
  )

  const changePage = useCallback(
    (page: number) => {
      setPagination((prev) => ({ ...prev, page }))
      fetchDealers()
    },
    [setPagination, fetchDealers],
  )

  return {
    dealers,
    loading,
    selectedDealerId,
    selectedDealer,
    pagination,
    setSelectedDealerId,
    fetchDealers,
    fetchDealer,
    changePage,
  }
}

// Hook for dashboard data
export function useDashboard() {
  const [stats, setStats] = useAtom(dashboardStatsAtom)
  const [loading, setLoading] = useAtom(dashboardLoadingAtom)
  const [carDistributionChart, setCarDistributionChart] = useAtom(carDistributionChartAtom)
  const [engineHealthChart, setEngineHealthChart] = useAtom(engineHealthChartAtom)
  const [carGrowthChart, setCarGrowthChart] = useAtom(carGrowthChartAtom)
  const [userPointsChart, setUserPointsChart] = useAtom(userPointsChartAtom)
  const [userActivityChart, setUserActivityChart] = useAtom(userActivityChartAtom)
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

  const fetchAllChartData = useCallback(async () => {
    setLoading(true)
    try {
      const [
        carDistribution,
        engineHealth,
        carGrowth,
        userPoints,
        userActivity,
        blockchainTransactions,
        carDataTransmission,
      ] = await Promise.all([
        api.getCarDistributionChart(),
        api.getEngineHealthChart(),
        api.getCarGrowthChart(),
        api.getUserPointsChart(),
        api.getUserActivityChart(),
        api.getBlockchainTransactionsChart(),
        api.getCarDataTransmissionChart(),
      ])

      setCarDistributionChart(carDistribution.data)
      setEngineHealthChart(engineHealth.data)
      setCarGrowthChart(carGrowth.data)
      setUserPointsChart(userPoints.data)
      setUserActivityChart(userActivity.data)
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
  }
}

// Hook for car telemetry data
export function useCarTelemetry(carId: string) {
  const fetchTelemetryData = useCallback(
    async (params?: { from?: string; to?: string }) => {
      try {
        const response = await api.getCarTelemetry(carId, params)
        return response.data
      } catch (error) {
        console.error(`Error fetching telemetry data for car ${carId}:`, error)
        return null
      }
    },
    [carId],
  )

  return {
    fetchTelemetryData,
  }
}

// Hook for car blockchain data
export function useCarBlockchain(carId: string) {
  const [transactions, setTransactions] = useAtom(blockchainTransactionsAtom)

  const fetchBlockchainData = useCallback(
    async (limit = 10) => {
      try {
        const response = await api.getCarBlockchainData(carId, limit)
        setTransactions(response.data.transactions)
        return response.data
      } catch (error) {
        console.error(`Error fetching blockchain data for car ${carId}:`, error)
        return null
      }
    },
    [carId, setTransactions],
  )

  return {
    transactions,
    fetchBlockchainData,
  }
}

// Hook for user points history
export function useUserPointsHistory(userId: string) {
  const fetchPointsHistory = useCallback(async () => {
    try {
      const response = await api.getUserPointsHistory(userId)
      return response.data
    } catch (error) {
      console.error(`Error fetching points history for user ${userId}:`, error)
      return null
    }
  }, [userId])

  return {
    fetchPointsHistory,
  }
}
