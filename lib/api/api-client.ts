import type {
  ApiResponse,
  ApiError,
  Car,
  Certificate,
  User,
  Dealer,
  DashboardStats,
  BlockchainTransaction,
  ChartData,
  PaginatedResponse,
} from "@/lib/types"
import {
  mockCars,
  mockUsers,
  mockCertificates,
  mockDealers,
  mockDashboardStats,
  mockBlockchainTransactions,
  mockCarDataTransmissionChart,
  mockBlockchainTransactionsChart,
  mockCarBlockchainTransactionsChart,
  mockCarOBDDataChart,
  mockUserPointsChart,
  mockUserActivityChart,
  mockUserPointsHistoryChart,
} from "./mock-data"

// Helper function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Helper function to handle API responses with mock data
async function handleMockResponse<T>(data: T): Promise<ApiResponse<T>> {
  // Simulate network delay
  await delay(300)

  return {
    data,
    status: 200,
  }
}

// Cars API
export async function getCars(params?: {
  status?: string
  dealerId?: string
  search?: string
  page?: number
  pageSize?: number
}): Promise<ApiResponse<PaginatedResponse<Car>>> {
  let filteredCars = [...mockCars]

  // Apply filters
  if (params?.status) {
    filteredCars = filteredCars.filter((car) => car.status === params.status)
  }

  if (params?.dealerId) {
    filteredCars = filteredCars.filter((car) => car.dealerAccess.includes(params.dealerId!))
  }

  if (params?.search) {
    const search = params.search.toLowerCase()
    filteredCars = filteredCars.filter(
      (car) =>
        car.make.toLowerCase().includes(search) ||
        car.model.toLowerCase().includes(search) ||
        car.vin.toLowerCase().includes(search) ||
        car.owner.name.toLowerCase().includes(search),
    )
  }

  // Pagination
  const page = params?.page || 1
  const pageSize = params?.pageSize || 10
  const total = filteredCars.length
  const totalPages = Math.ceil(total / pageSize)
  const paginatedCars = filteredCars.slice((page - 1) * pageSize, page * pageSize)

  return handleMockResponse<PaginatedResponse<Car>>({
    data: paginatedCars,
    total,
    page,
    pageSize,
    totalPages,
  })
}

export async function getCar(id: string): Promise<ApiResponse<Car>> {
  const car = mockCars.find((car) => car.id === id)

  if (!car) {
    throw {
      code: "NOT_FOUND",
      message: `Car with ID ${id} not found`,
      status: 404,
    } as ApiError
  }

  return handleMockResponse<Car>(car)
}

export async function createCar(car: Omit<Car, "id">): Promise<ApiResponse<Car>> {
  const newCar = {
    ...car,
    id: `car-${Date.now()}`,
  } as Car

  return handleMockResponse<Car>(newCar)
}

export async function updateCar(id: string, car: Partial<Car>): Promise<ApiResponse<Car>> {
  const existingCarIndex = mockCars.findIndex((c) => c.id === id)

  if (existingCarIndex === -1) {
    throw {
      code: "NOT_FOUND",
      message: `Car with ID ${id} not found`,
      status: 404,
    } as ApiError
  }

  const updatedCar = {
    ...mockCars[existingCarIndex],
    ...car,
  }

  return handleMockResponse<Car>(updatedCar)
}

export async function deleteCar(id: string): Promise<ApiResponse<void>> {
  const existingCarIndex = mockCars.findIndex((c) => c.id === id)

  if (existingCarIndex === -1) {
    throw {
      code: "NOT_FOUND",
      message: `Car with ID ${id} not found`,
      status: 404,
    } as ApiError
  }

  return handleMockResponse<void>(undefined)
}

export async function getCarTelemetry(
  id: string,
  params?: { from?: string; to?: string },
): Promise<ApiResponse<ChartData>> {
  // For mock data, we'll return the same chart data regardless of params
  return handleMockResponse<ChartData>({
    data: mockCarOBDDataChart,
  })
}

export async function getCarBlockchainData(
  id: string,
  limit = 10,
): Promise<ApiResponse<{ transactions: BlockchainTransaction[]; chart: ChartData }>> {
  const transactions = mockBlockchainTransactions.filter((tx) => tx.id.includes(id)).slice(0, limit)

  return handleMockResponse<{ transactions: BlockchainTransaction[]; chart: ChartData }>({
    transactions,
    chart: {
      data: mockCarBlockchainTransactionsChart,
    },
  })
}

// Users API
export async function getUsers(params?: {
  search?: string
  page?: number
  pageSize?: number
}): Promise<ApiResponse<PaginatedResponse<User>>> {
  let filteredUsers = [...mockUsers]

  // Apply search filter
  if (params?.search) {
    const search = params.search.toLowerCase()
    filteredUsers = filteredUsers.filter(
      (user) => user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search),
    )
  }

  // Pagination
  const page = params?.page || 1
  const pageSize = params?.pageSize || 10
  const total = filteredUsers.length
  const totalPages = Math.ceil(total / pageSize)
  const paginatedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize)

  return handleMockResponse<PaginatedResponse<User>>({
    data: paginatedUsers,
    total,
    page,
    pageSize,
    totalPages,
  })
}

export async function getUser(id: string): Promise<ApiResponse<User>> {
  const user = mockUsers.find((user) => user.id === id)

  if (!user) {
    throw {
      code: "NOT_FOUND",
      message: `User with ID ${id} not found`,
      status: 404,
    } as ApiError
  }

  return handleMockResponse<User>(user)
}

export async function createUser(user: Omit<User, "id">): Promise<ApiResponse<User>> {
  const newUser = {
    ...user,
    id: `user-${Date.now()}`,
  } as User

  return handleMockResponse<User>(newUser)
}

export async function updateUser(id: string, user: Partial<User>): Promise<ApiResponse<User>> {
  const existingUserIndex = mockUsers.findIndex((u) => u.id === id)

  if (existingUserIndex === -1) {
    throw {
      code: "NOT_FOUND",
      message: `User with ID ${id} not found`,
      status: 404,
    } as ApiError
  }

  const updatedUser = {
    ...mockUsers[existingUserIndex],
    ...user,
  }

  return handleMockResponse<User>(updatedUser)
}

export async function deleteUser(id: string): Promise<ApiResponse<void>> {
  const existingUserIndex = mockUsers.findIndex((u) => u.id === id)

  if (existingUserIndex === -1) {
    throw {
      code: "NOT_FOUND",
      message: `User with ID ${id} not found`,
      status: 404,
    } as ApiError
  }

  return handleMockResponse<void>(undefined)
}

export async function getUserPointsHistory(id: string): Promise<ApiResponse<ChartData>> {
  return handleMockResponse<ChartData>({
    data: mockUserPointsHistoryChart,
  })
}

// Certificates API
export async function getCertificates(params?: {
  carId?: string
  dealerId?: string
  search?: string
  page?: number
  pageSize?: number
}): Promise<ApiResponse<PaginatedResponse<Certificate>>> {
  let filteredCertificates = [...mockCertificates]

  // Apply filters
  if (params?.carId) {
    filteredCertificates = filteredCertificates.filter((cert) => cert.carId === params.carId)
  }

  if (params?.dealerId) {
    filteredCertificates = filteredCertificates.filter((cert) => cert.dealerId === params.dealerId)
  }

  if (params?.search) {
    const search = params.search.toLowerCase()
    filteredCertificates = filteredCertificates.filter(
      (cert) => cert.id.toLowerCase().includes(search) || cert.service.toLowerCase().includes(search),
    )
  }

  // Pagination
  const page = params?.page || 1
  const pageSize = params?.pageSize || 10
  const total = filteredCertificates.length
  const totalPages = Math.ceil(total / pageSize)
  const paginatedCertificates = filteredCertificates.slice((page - 1) * pageSize, page * pageSize)

  return handleMockResponse<PaginatedResponse<Certificate>>({
    data: paginatedCertificates,
    total,
    page,
    pageSize,
    totalPages,
  })
}

export async function getCertificate(id: string): Promise<ApiResponse<Certificate>> {
  const certificate = mockCertificates.find((cert) => cert.id === id)

  if (!certificate) {
    throw {
      code: "NOT_FOUND",
      message: `Certificate with ID ${id} not found`,
      status: 404,
    } as ApiError
  }

  return handleMockResponse<Certificate>(certificate)
}

export async function createCertificate(certificate: Omit<Certificate, "id">): Promise<ApiResponse<Certificate>> {
  const newCertificate = {
    ...certificate,
    id: `CERT-${Date.now()}`,
    blockchainVerified: true,
    blockchainTx: `${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 10)}`,
  } as Certificate

  return handleMockResponse<Certificate>(newCertificate)
}

export async function updateCertificate(
  id: string,
  certificate: Partial<Certificate>,
): Promise<ApiResponse<Certificate>> {
  const existingCertificateIndex = mockCertificates.findIndex((c) => c.id === id)

  if (existingCertificateIndex === -1) {
    throw {
      code: "NOT_FOUND",
      message: `Certificate with ID ${id} not found`,
      status: 404,
    } as ApiError
  }

  const updatedCertificate = {
    ...mockCertificates[existingCertificateIndex],
    ...certificate,
  }

  return handleMockResponse<Certificate>(updatedCertificate)
}

export async function deleteCertificate(id: string): Promise<ApiResponse<void>> {
  const existingCertificateIndex = mockCertificates.findIndex((c) => c.id === id)

  if (existingCertificateIndex === -1) {
    throw {
      code: "NOT_FOUND",
      message: `Certificate with ID ${id} not found`,
      status: 404,
    } as ApiError
  }

  return handleMockResponse<void>(undefined)
}

// Dealers API
export async function getDealers(params?: {
  search?: string
  page?: number
  pageSize?: number
}): Promise<ApiResponse<PaginatedResponse<Dealer>>> {
  let filteredDealers = [...mockDealers]

  // Apply search filter
  if (params?.search) {
    const search = params.search.toLowerCase()
    filteredDealers = filteredDealers.filter(
      (dealer) => dealer.name.toLowerCase().includes(search) || dealer.type.toLowerCase().includes(search),
    )
  }

  // Pagination
  const page = params?.page || 1
  const pageSize = params?.pageSize || 10
  const total = filteredDealers.length
  const totalPages = Math.ceil(total / pageSize)
  const paginatedDealers = filteredDealers.slice((page - 1) * pageSize, page * pageSize)

  return handleMockResponse<PaginatedResponse<Dealer>>({
    data: paginatedDealers,
    total,
    page,
    pageSize,
    totalPages,
  })
}

export async function getDealer(id: string): Promise<ApiResponse<Dealer>> {
  const dealer = mockDealers.find((dealer) => dealer.id === id)

  if (!dealer) {
    throw {
      code: "NOT_FOUND",
      message: `Dealer with ID ${id} not found`,
      status: 404,
    } as ApiError
  }

  return handleMockResponse<Dealer>(dealer)
}

// Dashboard API
export async function getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
  return handleMockResponse<DashboardStats>(mockDashboardStats)
}

// Chart data API
export async function getCarDistributionChart(): Promise<ApiResponse<ChartData>> {
  return handleMockResponse<ChartData>({
    data: [
      { name: "Toyota", value: 35 },
      { name: "Honda", value: 25 },
      { name: "Ford", value: 15 },
      { name: "Tesla", value: 10 },
      { name: "BMW", value: 8 },
      { name: "Others", value: 7 },
    ],
  })
}

export async function getEngineHealthChart(): Promise<ApiResponse<ChartData>> {
  return handleMockResponse<ChartData>({
    data: [
      { name: "Good", value: 75 },
      { name: "Fair", value: 15 },
      { name: "Poor", value: 10 },
    ],
  })
}

export async function getCarGrowthChart(): Promise<ApiResponse<ChartData>> {
  return handleMockResponse<ChartData>({
    data: mockCarDataTransmissionChart,
  })
}

export async function getUserPointsChart(): Promise<ApiResponse<ChartData>> {
  return handleMockResponse<ChartData>({
    data: mockUserPointsChart,
  })
}

export async function getUserActivityChart(): Promise<ApiResponse<ChartData>> {
  return handleMockResponse<ChartData>({
    data: mockUserActivityChart,
  })
}

export async function getBlockchainTransactionsChart(): Promise<ApiResponse<ChartData>> {
  return handleMockResponse<ChartData>({
    data: mockBlockchainTransactionsChart,
  })
}

export async function getCarDataTransmissionChart(): Promise<ApiResponse<ChartData>> {
  return handleMockResponse<ChartData>({
    data: mockCarDataTransmissionChart,
  })
}
