// Hook for cars data
import {useAtom} from "jotai/index";
import {carsAtom, carsLoadingAtom, carsPaginationAtom, selectedCarAtom, selectedCarIdAtom} from "@/lib/store";
import {useCallback} from "react";
import * as api from "@/lib/api/api-client";
import { getCarDataAtom, registerCarKmAtom } from "../store/car-actions";

export function useCars() {
    const [cars, setCars] = useAtom(carsAtom)
    const [loading, setLoading] = useAtom(carsLoadingAtom)
    const [selectedCarId, setSelectedCarId] = useAtom(selectedCarIdAtom)
    const [selectedCar] = useAtom(selectedCarAtom)
    const [pagination, setPagination] = useAtom(carsPaginationAtom)
    const [, registerCarKm] = useAtom(registerCarKmAtom)
    const [, getCarData] = useAtom(getCarDataAtom)

    const fetchCars = useCallback(
        async (params?: { status?: string; dealerId?: string; search?: string; page?: number }) => {
          setLoading(true)
          try {
            const response = await api.getCars({
              ...params,
              page: params?.page ?? pagination.page,
              pageSize: pagination.pageSize,
            })
            setCars(response.data.data)
            // Only update pagination if necessary to avoid triggering re-renders
            setPagination((prev) => {
              const newPagination = {
                ...prev,
                total: response.data.total,
                totalPages: response.data.totalPages,
                page: response.data.page,
              }
              // Avoid unnecessary updates
              if (
                prev.total === newPagination.total &&
                prev.totalPages === newPagination.totalPages &&
                prev.page === newPagination.page
              ) {
                return prev
              }
              return newPagination
            })
          } catch (error) {
            console.error("Error fetching cars:", error)
          } finally {
            setLoading(false)
          }
        },
        [setCars, setLoading, pagination.page, pagination.pageSize, setPagination]
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
            setPagination((prev) => ({...prev, page}))
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
        registerCarKm,
        getCarData,
    }
}