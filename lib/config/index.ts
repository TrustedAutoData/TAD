// Configuration for the application

// API configuration
export const API_CONFIG = {
  // Base URL for the API
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.trustedautodata.com",

  // API version
  version: "v1",

  // API endpoints
  endpoints: {
    cars: "/cars",
    users: "/users",
    certificates: "/certificates",
    dealers: "/dealers",
    dashboard: "/dashboard",
    blockchain: "/blockchain",
  },

  // Default request timeout in milliseconds
  timeout: 10000,

  // Whether to use mock data instead of real API
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true",
}

// Blockchain configuration
export const BLOCKCHAIN_CONFIG = {
  // Solana network
  network: process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet",

  // Solana RPC endpoint
  rpcEndpoint: process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || "https://api.devnet.solana.com",

  // Solana explorer URL
  explorerUrl: process.env.NEXT_PUBLIC_SOLANA_EXPLORER_URL || "https://explorer.solana.com",

  // Program ID for the Trusted Auto Data smart contract
  programId: process.env.NEXT_PUBLIC_PROGRAM_ID || "8ZJ7UG3cZDem5ENjQRQxA3dA9FtUDxjVFJJqFvQEiLQN",
}

// Raspberry Pi configuration
export const RASPBERRY_PI_CONFIG = {
  // Firmware update endpoint
  firmwareUpdateUrl: process.env.NEXT_PUBLIC_FIRMWARE_UPDATE_URL || "https://firmware.trustedautodata.com",

  // Data transmission interval in seconds
  dataTransmissionInterval: 300, // 5 minutes

  // Minimum battery level for normal operation
  minBatteryLevel: 20, // percentage
}

// Feature flags
export const FEATURE_FLAGS = {
  enableBlockchainVerification: true,
  enableRealTimeData: true,
  enableUserRewards: true,
  enableDealerPortal: true,
  enableFirmwareUpdates: false,
}
