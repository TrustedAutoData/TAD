import { atom } from "jotai"
import { api } from "../utils"
import { carsAtom } from "@/lib/store"

export interface RegisterCarKmDto {
  vin: string
  km: number
}

export interface GetCarDataDto {
  vin: string
}

export const registerCarKmAtom = atom(
  null,
  async (get, set, { vin, km, options }: { vin: string; km: number; options?: { onSuccess?: () => void; onError?: (error: any) => void } }) => {
    try {
      const response = await api.post("/cars/register-km", { vin, km })
      if (response.status === 201) {
        options?.onSuccess?.()
        return response.data.transaction
      } else {
        throw new Error("Failed to register car kilometers")
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Error registering car kilometers"
      options?.onError?.(error)
      throw new Error(message)
    }
  }
)

export const getCarDataAtom = atom(
  null,
  async (get, set, { vin, options }: { vin: string; options?: { onSuccess?: (data: any) => void; onError?: (error: any) => void } }) => {
    try {
      const response = await api.post("/cars/get-data", { vin })
      if (response.status === 201) {
        const carData = response.data.carData
        // Update carsAtom with the new totalKm
        set(carsAtom, (prev) =>
          prev.map((car) =>
            car.vin === vin ? { ...car, totalKm: parseInt(carData.totalKm, 10) } : car
          )
        )
        options?.onSuccess?.(carData)
        return carData
      } else {
        throw new Error("Failed to fetch car data")
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Error fetching car data"
      options?.onError?.(error)
      throw new Error(message)
    }
  }
)