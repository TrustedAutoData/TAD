import type { Car, Certificate, User, Dealer, DashboardStats, BlockchainTransaction } from "@/lib/types"

// Mock data for cars
export const mockCars: Car[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    vin: "1HGCM82633A123456",
    licensePlate: "ABC-1234",
    owner: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
    status: "Connected",
    mileage: 78432,
    lastUpdate: "Today, 9:30 AM",
    blockchainData: {
      transactions: 42,
      lastTransaction: "10 minutes ago",
      address: "8ZJ7UG3cZDem5ENjQRQxA3dA9FtUDxjVFJJqFvQEiLQN",
    },
    raspberryPi: {
      deviceId: "RPi-OBD-1234",
      firmwareVersion: "v2.3.1",
      lastPing: "2 minutes ago",
      batteryLevel: "98%",
      signalStrength: "Good",
    },
    dealerAccess: ["1", "2"], // Dealer IDs
    obdData: {
      engineTemp: "90°C",
      batteryVoltage: "12.7V",
      fuelLevel: "65%",
      oilLife: "75%",
      tirePressure: {
        frontLeft: "32 PSI",
        frontRight: "33 PSI",
        rearLeft: "32 PSI",
        rearRight: "32 PSI",
      },
      dtcCodes: [],
    },
  },
  {
    id: "2",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    vin: "5YJ3E1EA8LF123456",
    licensePlate: "XYZ-5678",
    owner: {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
    },
    status: "Not Connected",
    mileage: 15689,
    lastUpdate: "Yesterday, 2:15 PM",
    blockchainData: {
      transactions: 0,
      lastTransaction: "N/A",
      address: "5YJ3E1EA8LF123456SOLANA",
    },
    raspberryPi: {
      deviceId: "RPi-OBD-5678",
      firmwareVersion: "v2.3.1",
      lastPing: "Never",
      batteryLevel: "N/A",
      signalStrength: "Poor",
    },
    dealerAccess: ["3"], // Dealer IDs
    obdData: {
      engineTemp: "N/A",
      batteryVoltage: "N/A",
      fuelLevel: "N/A",
      oilLife: "N/A",
      tirePressure: {
        frontLeft: "N/A",
        frontRight: "N/A",
        rearLeft: "N/A",
        rearRight: "N/A",
      },
      dtcCodes: [],
    },
  },
  {
    id: "3",
    make: "Honda",
    model: "Civic",
    year: 2021,
    vin: "2HGFC2F52MH123456",
    licensePlate: "DEF-9012",
    owner: {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone: "+1 (555) 456-7890",
    },
    status: "Connected",
    mileage: 45678,
    lastUpdate: "April 15, 2025",
    blockchainData: {
      transactions: 28,
      lastTransaction: "2 hours ago",
      address: "2HGFC2F52MH123456SOLANA",
    },
    raspberryPi: {
      deviceId: "RPi-OBD-9012",
      firmwareVersion: "v2.3.0",
      lastPing: "15 minutes ago",
      batteryLevel: "85%",
      signalStrength: "Good",
    },
    dealerAccess: ["1", "4"], // Dealer IDs
    obdData: {
      engineTemp: "88°C",
      batteryVoltage: "12.5V",
      fuelLevel: "45%",
      oilLife: "60%",
      tirePressure: {
        frontLeft: "31 PSI",
        frontRight: "31 PSI",
        rearLeft: "30 PSI",
        rearRight: "30 PSI",
      },
      dtcCodes: [],
    },
  },
]

// Mock data for users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    joined: "January 15, 2025",
    points: 1250,
    level: 5,
    cars: ["1"], // Car IDs
    certificates: ["CERT-1234", "CERT-1233"], // Certificate IDs
    rewards: [
      {
        id: "1",
        name: "10% Off Oil Change",
        status: "Active",
        redeemed: "April 10, 2025",
        expires: "July 10, 2025",
      },
      {
        id: "2",
        name: "Free Car Wash",
        status: "Used",
        redeemed: "March 15, 2025",
        expires: "May 15, 2025",
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Park Ave, New York, NY 10022",
    joined: "February 3, 2025",
    points: 850,
    level: 3,
    cars: ["2"], // Car IDs
    certificates: [], // Certificate IDs
    rewards: [
      {
        id: "3",
        name: "5% Off Tire Rotation",
        status: "Active",
        redeemed: "March 20, 2025",
        expires: "June 20, 2025",
      },
    ],
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Broadway, New York, NY 10003",
    joined: "December 10, 2024",
    points: 2150,
    level: 8,
    cars: ["3"], // Car IDs
    certificates: ["CERT-1232", "CERT-1231", "CERT-1230"], // Certificate IDs
    rewards: [
      {
        id: "4",
        name: "15% Off Full Service",
        status: "Active",
        redeemed: "April 5, 2025",
        expires: "July 5, 2025",
      },
      {
        id: "5",
        name: "Free Oil Change",
        status: "Active",
        redeemed: "March 25, 2025",
        expires: "June 25, 2025",
      },
    ],
  },
]

// Mock data for certificates
export const mockCertificates: Certificate[] = [
  {
    id: "CERT-1234",
    carId: "1",
    service: "Oil Change & Filter",
    date: "March 15, 2025",
    mileage: 75230,
    nextService: 80230,
    technician: "Mike Wilson",
    description: "Changed oil and filter. Used synthetic oil 5W-30.",
    parts: ["Oil Filter", "Synthetic Oil 5W-30"],
    blockchainVerified: true,
    blockchainTx: "4Qozk7d...8mPvbf",
    dealerId: "1",
    dealerName: "AutoCare Service Center",
  },
  {
    id: "CERT-1233",
    carId: "1",
    service: "Brake Inspection",
    date: "February 2, 2025",
    mileage: 72105,
    technician: "Sarah Johnson",
    description: "Inspected brake pads and rotors. Brake pads at 70% life.",
    blockchainVerified: true,
    blockchainTx: "3xRTp2...9nQwer",
    dealerId: "1",
    dealerName: "AutoCare Service Center",
  },
  {
    id: "CERT-1232",
    carId: "3",
    service: "Tire Rotation",
    date: "January 10, 2025",
    mileage: 42500,
    nextService: 47500,
    technician: "David Brown",
    description: "Rotated tires and checked pressure. All tires in good condition.",
    blockchainVerified: true,
    blockchainTx: "7zKjL5...2pRtyu",
    dealerId: "4",
    dealerName: "QuickTire Shop",
  },
]

// Mock data for dealers
export const mockDealers: Dealer[] = [
  {
    id: "1",
    name: "AutoCare Service Center",
    type: "Service Center",
    address: "123 Service Rd, New York, NY 10001",
    phone: "+1 (555) 111-2222",
    email: "service@autocare.com",
    accessLevel: "Full",
    cars: ["1", "3"], // Car IDs they have access to
  },
  {
    id: "2",
    name: "Toyota Dealership",
    type: "Dealership",
    address: "456 Dealer Ave, New York, NY 10002",
    phone: "+1 (555) 333-4444",
    email: "service@toyotadealer.com",
    accessLevel: "Full",
    cars: ["1"], // Car IDs they have access to
  },
  {
    id: "3",
    name: "Tesla Service",
    type: "Dealership",
    address: "789 Electric Blvd, New York, NY 10003",
    phone: "+1 (555) 555-6666",
    email: "service@teslaservice.com",
    accessLevel: "Full",
    cars: ["2"], // Car IDs they have access to
  },
  {
    id: "4",
    name: "QuickTire Shop",
    type: "Service Center",
    address: "101 Tire St, New York, NY 10004",
    phone: "+1 (555) 777-8888",
    email: "service@quicktire.com",
    accessLevel: "Limited",
    cars: ["3"], // Car IDs they have access to
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
