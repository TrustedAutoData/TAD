export type Status = "Connected" | "Not Connected" | "Offline" | "Pending";
export type VerificationStatus = "Verified" | "Pending" | "Failed";
export type DealerType = "Service Center" | "Dealership" | "Repair Shop" | "Inspection Center";
export type TransactionStatus = "Confirmed" | "Processing" | "Failed";
export type AccessLevel = "Full" | "Limited" | "ReadOnly";


// Car types
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  owner: string;
  dealerAccess: string[];
  status: Status;
  mileage: number;
  totalKm?: number;
  lastUpdate: string;
  telemetryData: TelemetryData;
  blockchainData: BlockchainData;
  raspberryPi: RaspberryPiData;
}

export interface RaspberryPiData {
  deviceId: string;
  firmwareVersion: string;
  lastPing: string;
  batteryLevel: string;
  signalStrength: string;
}

export interface TelemetryData {
  engineTemp: string;
  batteryVoltage: string;
  fuelLevel: string;
  oilLife: string;
  tirePressure: TirePressure;
  dtcCodes: string[];
}

export interface TirePressure {
  frontLeft: string;
  frontRight: string;
  rearLeft: string;
  rearRight: string;
}

export interface BlockchainData {
  transactions: number;
  lastTransaction: string;
  address: string;
}

export interface BlockchainTransaction {
  id: string;
  timestamp: string;
  type: string;
  signature: string;
  status: TransactionStatus;
}

// Dealer types
export interface Dealer {
  id: string;
  name: string;
  type: DealerType;
  address: string;
  phone: string;
  email: string;
  accessLevel: AccessLevel;
}

// Dashboard types
export interface DashboardStats {
  connectedCars: number;
  activeUsers: number;
  certificatesIssued: number;
  pendingServices: number;
}

// Chart types
export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface ChartData {
  data: ChartDataPoint[];
}

// API types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
