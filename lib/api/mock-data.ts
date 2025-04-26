import type { Car, Dealer, DashboardStats, BlockchainTransaction } from "@/lib/types"
import {Reward, User, UserActivityChartItem, UserPointsChartItem} from "@/lib/types/user-types";
import {Certificate} from "@/lib/types/certificate-types";

// Mock data for users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Springfield, IL",
    joined: "2024-01-15",
    points: 2500,
    level: 3,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Metropolis, NY",
    joined: "2023-11-05",
    points: 4300,
    level: 4,
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine Rd, Gotham, NJ",
    joined: "2022-08-20",
    points: 1200,
    level: 2,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 321-6548",
    address: "321 Cedar St, Star City, CA",
    joined: "2024-03-10",
    points: 800,
    level: 1,
  },
];

export const mockRewards: Reward[] = [
  {
    id: "1",
    userId: mockUsers[0].id, // referencing user 1
    name: "Discount Coupon",
    status: "Active",
    redeemed: "2024-04-15",
    expires: "2024-05-15",
  },
  {
    id: "2",
    userId: mockUsers[1].id, // referencing user 2
    name: "Gift Card",
    status: "Used",
    redeemed: "2024-04-01",
    expires: "2024-05-01",
  },
  {
    id: "3",
    userId: mockUsers[2].id, // referencing user 3
    name: "Free Shipping",
    status: "Expired",
    redeemed: "2023-12-10",
    expires: "2024-01-10",
  },
  {
    id: "4",
    userId: mockUsers[3].id, // referencing user 4
    name: "Exclusive Offer",
    status: "Active",
    redeemed: "2024-04-20",
    expires: "2024-05-20",
  },
];

export const mockUserPointsData: UserPointsChartItem[] = [
  { name: "Level 1", users: 15 },
  { name: "Level 2", users: 22 },
  { name: "Level 3", users: 18 },
  { name: "Level 4", users: 15 },
  { name: "Level 5", users: 12 },
  { name: "Level 6", users: 8 },
  { name: "Level 7", users: 4 },
  { name: "Level 8+", users: 2 },
]

export const mockUserActivityData: UserActivityChartItem[] = [
  { month: "Jan", active: 65, new: 12 },
  { month: "Feb", active: 68, new: 10 },
  { month: "Mar", active: 75, new: 15 },
  { month: "Apr", active: 82, new: 8 },
  { month: "May", active: 85, new: 5 },
  { month: "Jun", active: 90, new: 7 },
  { month: "Jul", active: 92, new: 4 },
  { month: "Aug", active: 88, new: 3 },
  { month: "Sep", active: 91, new: 6 },
  { month: "Oct", active: 95, new: 9 },
  { month: "Nov", active: 96, new: 2 },
  { month: "Dec", active: 96, new: 0 },
]

// Mock data for dealers
export const mockDealers: Dealer[] = [
  {
    id: "1",
    name: "Prime Auto Service",
    type: "Service Center",
    address: "100 Service Rd, Springfield, IL",
    phone: "+1 (555) 111-2222",
    email: "contact@primeautoservice.com",
    accessLevel: "Full",
  },
  {
    id: "2",
    name: "Superior Dealership",
    type: "Dealership",
    address: "200 Dealer Blvd, Metropolis, NY",
    phone: "+1 (555) 333-4444",
    email: "sales@superiordealership.com",
    accessLevel: "Limited",
  },
  {
    id: "3",
    name: "QuickFix Repair Shop",
    type: "Repair Shop",
    address: "300 FixIt Ln, Gotham, NJ",
    phone: "+1 (555) 555-6666",
    email: "service@quickfixshop.com",
    accessLevel: "Full",
  },
  {
    id: "4",
    name: "InspectPro Center",
    type: "Inspection Center",
    address: "400 Inspect Way, Star City, CA",
    phone: "+1 (555) 777-8888",
    email: "info@inspectpro.com",
    accessLevel: "ReadOnly",
  },
];

export const mockCars: Car[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    vin: "1HGCM82633A123456",
    licensePlate: "ABC-1234",
    owner: mockUsers[0].id,
    dealerAccess: [mockDealers[0].id, mockDealers[2].id],
    status: "Connected",
    mileage: 45000,
    lastUpdate: "2025-04-25T12:30:00Z",
    telemetryData: {
      engineTemp: "90°C",
      batteryVoltage: "12.6V",
      fuelLevel: "65%",
      oilLife: "80%",
      tirePressure: {
        frontLeft: "32 psi",
        frontRight: "31 psi",
        rearLeft: "33 psi",
        rearRight: "32 psi",
      },
      dtcCodes: [],
    },
    blockchainData: {
      transactions: 5,
      lastTransaction: "2025-04-20T10:00:00Z",
      address: "0xabc123def456...",
    },
    raspberryPi: {
      deviceId: "RPi-001",
      firmwareVersion: "v1.2.3",
      lastPing: "2025-04-25T12:00:00Z",
      batteryLevel: "80%",
      signalStrength: "Strong",
    },
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic",
    year: 2018,
    vin: "2HGFB2F59CH123456",
    licensePlate: "XYZ-5678",
    owner: mockUsers[1].id,
    dealerAccess: [mockDealers[1].id],
    status: "Pending",
    mileage: 72000,
    lastUpdate: "2025-04-22T08:15:00Z",
    telemetryData: {
      engineTemp: "88°C",
      batteryVoltage: "12.3V",
      fuelLevel: "40%",
      oilLife: "50%",
      tirePressure: {
        frontLeft: "30 psi",
        frontRight: "30 psi",
        rearLeft: "31 psi",
        rearRight: "31 psi",
      },
      dtcCodes: ["P0420"],
    },
    blockchainData: {
      transactions: 3,
      lastTransaction: "2025-04-21T09:30:00Z",
      address: "0xdef789ghi012...",
    },
    raspberryPi: {
      deviceId: "RPi-002",
      firmwareVersion: "v1.1.0",
      lastPing: "2025-04-22T08:00:00Z",
      batteryLevel: "65%",
      signalStrength: "Moderate",
    },
  },
  {
    id: "3",
    make: "Ford",
    model: "Escape",
    year: 2021,
    vin: "1FMCU9J96MUA12345",
    licensePlate: "LMN-3456",
    owner: mockUsers[2].id,
    dealerAccess: [mockDealers[0].id, mockDealers[3].id],
    status: "Offline",
    mileage: 28000,
    lastUpdate: "2025-04-24T18:00:00Z",
    telemetryData: {
      engineTemp: "85°C",
      batteryVoltage: "12.5V",
      fuelLevel: "75%",
      oilLife: "90%",
      tirePressure: {
        frontLeft: "34 psi",
        frontRight: "34 psi",
        rearLeft: "36 psi",
        rearRight: "35 psi",
      },
      dtcCodes: [],
    },
    blockchainData: {
      transactions: 7,
      lastTransaction: "2025-04-23T14:45:00Z",
      address: "0xghi456jkl789...",
    },
    raspberryPi: {
      deviceId: "RPi-003",
      firmwareVersion: "v1.3.1",
      lastPing: "2025-04-24T17:30:00Z",
      batteryLevel: "90%",
      signalStrength: "Strong",
    },
  },
  {
    id: "4",
    make: "Chevrolet",
    model: "Malibu",
    year: 2019,
    vin: "1G1ZD5ST5JF123456",
    licensePlate: "QRS-7890",
    owner: mockUsers[3].id,
    dealerAccess: [mockDealers[2].id],
    status: "Not Connected",
    mileage: 60000,
    lastUpdate: "2025-04-23T14:00:00Z",
    telemetryData: {
      engineTemp: "92°C",
      batteryVoltage: "12.1V",
      fuelLevel: "20%",
      oilLife: "30%",
      tirePressure: {
        frontLeft: "29 psi",
        frontRight: "30 psi",
        rearLeft: "28 psi",
        rearRight: "29 psi",
      },
      dtcCodes: ["P0300", "P0171"],
    },
    blockchainData: {
      transactions: 2,
      lastTransaction: "2025-04-22T11:20:00Z",
      address: "0xjkl012mno345...",
    },
    raspberryPi: {
      deviceId: "RPi-004",
      firmwareVersion: "v1.0.5",
      lastPing: "2025-04-23T13:30:00Z",
      batteryLevel: "50%",
      signalStrength: "Weak",
    },
  },
];

// Mock data for certificates
export const mockCertificates: Certificate[] = [
  {
    id: "CERT-1234",
    carId: mockCars[0].id,
    serviceType: "Oil Change & Filter",
    serviceDate: "March 15, 2025",
    mileage: 75230,
    nextService: 80230,
    technician: "Mike Wilson",
    description: "Changed oil and filter. Used synthetic oil 5W-30.",
    parts: ["Oil Filter", "Synthetic Oil 5W-30"],
    blockchainVerified: true,
    blockchainTx: "4Qozk7d...8mPvbf",
    dealerId: "1",
  },
  {
    id: "CERT-1233",
    carId: mockCars[1].id,
    serviceType: "Brake Inspection",
    serviceDate: "February 2, 2025",
    mileage: 72105,
    technician: "Sarah Johnson",
    description: "Inspected brake pads and rotors. Brake pads at 70% life.",
    blockchainVerified: true,
    blockchainTx: "3xRTp2...9nQwer",
    dealerId: "1"
  },
  {
    id: "CERT-1232",
    carId: mockCars[2].id,
    serviceType: "Tire Rotation",
    serviceDate: "January 10, 2025",
    mileage: 42500,
    nextService: 47500,
    technician: "David Brown",
    description: "Rotated tires and checked pressure. All tires in good condition.",
    blockchainVerified: true,
    blockchainTx: "7zKjL5...2pRtyu",
    dealerId: "4",
  },
]

// Mock data for dashboard stats
export const mockDashboardStats: DashboardStats = {
  connectedCars: 128,
  activeUsers: 96,
  certificatesIssued: 342,
  pendingServices: 15,
}

// Mock data for blockchain transactions
export const mockBlockchainTransactions: BlockchainTransaction[] = [
  {
    id: "tx1-1", // Car ID embedded in transaction ID
    timestamp: "Today, 9:25 AM",
    type: "OBD Data",
    signature: "4Qozk7d...8mPvbf",
    status: "Confirmed",
  },
  {
    id: "tx1-2",
    timestamp: "Today, 9:10 AM",
    type: "Mileage Update",
    signature: "3xRTp2...9nQwer",
    status: "Confirmed",
  },
  {
    id: "tx1-3",
    timestamp: "Today, 8:55 AM",
    type: "Engine Status",
    signature: "7zKjL5...2pRtyu",
    status: "Confirmed",
  },
  {
    id: "tx1-4",
    timestamp: "Today, 8:40 AM",
    type: "OBD Data",
    signature: "9qAzWs...3eDcvb",
    status: "Confirmed",
  },
  {
    id: "tx1-5",
    timestamp: "Today, 8:25 AM",
    type: "Fuel Level",
    signature: "2xCvBn...7mLkjh",
    status: "Confirmed",
  },
  {
    id: "tx3-1",
    timestamp: "Today, 7:15 AM",
    type: "OBD Data",
    signature: "8pOiUy...1qAzWs",
    status: "Confirmed",
  },
  {
    id: "tx3-2",
    timestamp: "Today, 7:00 AM",
    type: "Mileage Update",
    signature: "5tReWq...6yHnMj",
    status: "Confirmed",
  },
]

// Mock chart data
export const mockCarDataTransmissionChart = [
  { time: "00:00", packets: 120 },
  { time: "02:00", packets: 132 },
  { time: "04:00", packets: 101 },
  { time: "06:00", packets: 134 },
  { time: "08:00", packets: 190 },
  { time: "10:00", packets: 230 },
  { time: "12:00", packets: 220 },
  { time: "14:00", packets: 180 },
  { time: "16:00", packets: 165 },
  { time: "18:00", packets: 190 },
  { time: "20:00", packets: 170 },
  { time: "22:00", packets: 150 },
]

export const mockBlockchainTransactionsChart = [
  { day: "Mon", transactions: 145 },
  { day: "Tue", transactions: 132 },
  { day: "Wed", transactions: 164 },
  { day: "Thu", transactions: 156 },
  { day: "Fri", transactions: 179 },
  { day: "Sat", transactions: 146 },
  { day: "Sun", transactions: 120 },
]

export const mockCarBlockchainTransactionsChart = [
  { date: "Apr 15", transactions: 12 },
  { date: "Apr 16", transactions: 15 },
  { date: "Apr 17", transactions: 13 },
  { date: "Apr 18", transactions: 18 },
  { date: "Apr 19", transactions: 16 },
  { date: "Apr 20", transactions: 14 },
  { date: "Apr 21", transactions: 19 },
  { date: "Apr 22", transactions: 21 },
  { date: "Apr 23", transactions: 18 },
  { date: "Apr 24", transactions: 23 },
  { date: "Apr 25", transactions: 20 },
  { date: "Today", transactions: 42 },
]

export const mockCarOBDDataChart = [
  { time: "9:00", engineTemp: 85, rpm: 800, speed: 0 },
  { time: "9:05", engineTemp: 87, rpm: 1200, speed: 25 },
  { time: "9:10", engineTemp: 89, rpm: 1500, speed: 45 },
  { time: "9:15", engineTemp: 90, rpm: 2000, speed: 65 },
  { time: "9:20", engineTemp: 90, rpm: 1800, speed: 55 },
  { time: "9:25", engineTemp: 90, rpm: 1600, speed: 50 },
  { time: "9:30", engineTemp: 90, rpm: 800, speed: 0 },
]

export const mockCarHealthChart = [
  { date: "Apr 1", health: 95 },
  { date: "Apr 5", health: 94 },
  { date: "Apr 10", health: 96 },
  { date: "Apr 15", health: 95 },
  { date: "Apr 20", health: 93 },
  { date: "Apr 25", health: 92 },
  { date: "Apr 30", health: 90 },
  { date: "May 5", health: 91 },
  { date: "May 10", health: 93 },
  { date: "May 15", health: 92 },
  { date: "May 20", health: 94 },
]

export const mockUserPointsChart = [
  { name: "Level 1", users: 15 },
  { name: "Level 2", users: 22 },
  { name: "Level 3", users: 18 },
  { name: "Level 4", users: 15 },
  { name: "Level 5", users: 12 },
  { name: "Level 6", users: 8 },
  { name: "Level 7", users: 4 },
  { name: "Level 8+", users: 2 },
]

export const mockUserActivityChart = [
  { month: "Jan", active: 65, new: 12 },
  { month: "Feb", active: 68, new: 10 },
  { month: "Mar", active: 75, new: 15 },
  { month: "Apr", active: 82, new: 8 },
  { month: "May", active: 85, new: 5 },
  { month: "Jun", active: 90, new: 7 },
  { month: "Jul", active: 92, new: 4 },
  { month: "Aug", active: 88, new: 3 },
  { month: "Sep", active: 91, new: 6 },
  { month: "Oct", active: 95, new: 9 },
  { month: "Nov", active: 96, new: 2 },
  { month: "Dec", active: 96, new: 0 },
]

export const mockUserPointsHistoryChart = [
  { date: "Jan", points: 250 },
  { date: "Feb", points: 450 },
  { date: "Mar", points: 650 },
  { date: "Apr", points: 800 },
  { date: "May", points: 950 },
  { date: "Jun", points: 1050 },
  { date: "Jul", points: 1150 },
  { date: "Aug", points: 1200 },
  { date: "Sep", points: 1250 },
]

export const mockUserCarActivityChart = [
  { week: "Week 1", miles: 120 },
  { week: "Week 2", miles: 145 },
  { week: "Week 3", miles: 105 },
  { week: "Week 4", miles: 130 },
  { week: "Week 5", miles: 160 },
  { week: "Week 6", miles: 125 },
  { week: "Week 7", miles: 140 },
  { week: "Week 8", miles: 110 },
]
