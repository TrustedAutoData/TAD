"use client"

import {useAtom} from "jotai"
import {useCallback} from "react"
import * as api from "./api-client"
import {
    blockchainTransactionsAtom,
    dealersAtom,
    dealersLoadingAtom,
    dealersPaginationAtom,
    selectedDealerAtom,
    selectedDealerIdAtom,
    useMockDataAtom,
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
