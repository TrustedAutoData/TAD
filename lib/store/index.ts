import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import type { Car, Certificate, User, Dealer, DashboardStats, BlockchainTransaction, ChartData } from "@/lib/types"

// Configuration atom
export const useMockDataAtom = atomWithStorage("useMockData", false)

// Loading states
export const carsLoadingAtom = atom(false)
export const usersLoadingAtom = atom(false)
export const certificatesLoadingAtom = atom(false)
export const dealersLoadingAtom = atom(false)
export const dashboardLoadingAtom = atom(false)

// Data atoms
export const carsAtom = atom<Car[]>([])
export const usersAtom = atom<User[]>([])
export const certificatesAtom = atom<Certificate[]>([])
export const dealersAtom = atom<Dealer[]>([])
export const dashboardStatsAtom = atom<DashboardStats | null>(null)

// Selected item atoms
export const selectedCarIdAtom = atom<string | null>(null)
export const selectedUserIdAtom = atom<string | null>(null)
export const selectedCertificateIdAtom = atom<string | null>(null)
export const selectedDealerIdAtom = atom<string | null>(null)

// Derived atoms
export const selectedCarAtom = atom((get) => {
  const cars = get(carsAtom)
  const selectedCarId = get(selectedCarIdAtom)
  return selectedCarId ? cars.find((car) => car.id === selectedCarId) || null : null
})

export const selectedUserAtom = atom((get) => {
  const users = get(usersAtom)
  const selectedUserId = get(selectedUserIdAtom)
  return selectedUserId ? users.find((user) => user.id === selectedUserId) || null : null
})

export const selectedCertificateAtom = atom((get) => {
  const certificates = get(certificatesAtom)
  const selectedCertificateId = get(selectedCertificateIdAtom)
  return selectedCertificateId ? certificates.find((cert) => cert.id === selectedCertificateId) || null : null
})

export const selectedDealerAtom = atom((get) => {
  const dealers = get(dealersAtom)
  const selectedDealerId = get(selectedDealerIdAtom)
  return selectedDealerId ? dealers.find((dealer) => dealer.id === selectedDealerId) || null : null
})

// Filter atoms
export const carFilterAtom = atom("")
export const userFilterAtom = atom("")
export const certificateFilterAtom = atom("")
export const dealerFilterAtom = atom("")

// Filtered data atoms
export const filteredCarsAtom = atom((get) => {
  const cars = get(carsAtom)
  const filter = get(carFilterAtom).toLowerCase()

  if (!filter) return cars

  return cars.filter(
    (car) =>
      car.make.toLowerCase().includes(filter) ||
      car.model.toLowerCase().includes(filter) ||
      car.vin.toLowerCase().includes(filter) ||
      car.owner.name.toLowerCase().includes(filter),
  )
})

export const filteredUsersAtom = atom((get) => {
  const users = get(usersAtom)
  const filter = get(userFilterAtom).toLowerCase()

  if (!filter) return users

  return users.filter((user) => user.name.toLowerCase().includes(filter) || user.email.toLowerCase().includes(filter))
})

export const filteredCertificatesAtom = atom((get) => {
  const certificates = get(certificatesAtom)
  const filter = get(certificateFilterAtom).toLowerCase()

  if (!filter) return certificates

  return certificates.filter(
    (cert) => cert.id.toLowerCase().includes(filter) || cert.service.toLowerCase().includes(filter),
  )
})

export const filteredDealersAtom = atom((get) => {
  const dealers = get(dealersAtom)
  const filter = get(dealerFilterAtom).toLowerCase()

  if (!filter) return dealers

  return dealers.filter(
    (dealer) => dealer.name.toLowerCase().includes(filter) || dealer.type.toLowerCase().includes(filter),
  )
})

// Pagination atoms
export const carsPaginationAtom = atom({
  page: 1,
  pageSize: 10,
  totalPages: 1,
  total: 0,
})

export const usersPaginationAtom = atom({
  page: 1,
  pageSize: 10,
  totalPages: 1,
  total: 0,
})

export const certificatesPaginationAtom = atom({
  page: 1,
  pageSize: 10,
  totalPages: 1,
  total: 0,
})

export const dealersPaginationAtom = atom({
  page: 1,
  pageSize: 10,
  totalPages: 1,
  total: 0,
})

// Chart data atoms
export const carDistributionChartAtom = atom<ChartData | null>(null)
export const engineHealthChartAtom = atom<ChartData | null>(null)
export const carGrowthChartAtom = atom<ChartData | null>(null)
export const userPointsChartAtom = atom<ChartData | null>(null)
export const userActivityChartAtom = atom<ChartData | null>(null)
export const blockchainTransactionsChartAtom = atom<ChartData | null>(null)
export const carDataTransmissionChartAtom = atom<ChartData | null>(null)

// Blockchain transactions atom
export const blockchainTransactionsAtom = atom<BlockchainTransaction[]>([])

// Car blockchain transactions atom
export const carBlockchainTransactionsAtom = atom((get) => {
  const transactions = get(blockchainTransactionsAtom)
  const selectedCar = get(selectedCarAtom)

  if (!selectedCar) return []

  return transactions.filter((tx) => tx.id.includes(selectedCar.id))
})
