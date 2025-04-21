// Common types
export type Status = "Connected" | "Not Connected" | "Offline" | "Pending"
export type VerificationStatus = "Verified" | "Pending" | "Failed"
export type DealerType = "Service Center" | "Dealership" | "Repair Shop" | "Inspection Center"

// User types
export interface User {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  joined: string
  points: number
  level: number
  cars: string[] // Car IDs
  certificates: string[] // Certificate IDs
  rewards: Reward[]
}

export interface Reward {
  id: string
  name: string
  status: "Active" | "Used" | "Expired"
  redeemed: string
  expires: string
}

// Car types
export interface Car {
  id: string
  make: string
  model: string
  year: number
  vin: string
  licensePlate: string
  owner: {
    id: string
    name: string
    email: string
    phone: string
  }
  status: Status
  mileage: number
  lastUpdate: string
  telemetryData: TelemetryData
  blockchainData: BlockchainData
  dealerAccess: string[] // Dealer IDs
}

export interface TelemetryData {
  engineTemp: string
  batteryVoltage: string
  fuelLevel: string
  oilLife: string
  tirePressure: {
    frontLeft: string
    frontRight: string
    rearLeft: string
    rearRight: string
  }
  dtcCodes: string[]
}

export interface BlockchainData {
  transactions: number
  lastTransaction: string
  address: string
}

export interface BlockchainTransaction {
  id: string
  timestamp: string
  type: string
  signature: string
  status: "Confirmed" | "Processing" | "Failed"
}

// Certificate types
export interface Certificate {
  id: string
  carId: string
  service: string
  date: string
  mileage: number
  nextService?: number
  technician: string
  description: string
  parts?: string[]
  blockchainVerified: boolean
  blockchainTx?: string
  dealerId: string
  dealerName: string
}

// Dealer types
export interface Dealer {
  id: string
  name: string
  type: DealerType
  address: string
  phone: string
  email: string
  accessLevel: "Full" | "Limited" | "ReadOnly"
  cars: string[] // Car IDs they have access to
}

// Dashboard types
export interface DashboardStats {
  connectedCars: number
  activeUsers: number
  certificatesIssued: number
  pendingServices: number
}

// Chart data types
export interface ChartDataPoint {
  [key: string]: string | number
}

export interface ChartData {
  data: ChartDataPoint[]
}

// API response types
export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface ApiError {
  code: string
  message: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
