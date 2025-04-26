export interface CertificatesCard {
    id: string;
    car: string;
    serviceType: string;
    serviceDate: string;
}

export interface Certificate {
    id: string;
    carId: string;
    dealerId: string;
    serviceType: string;
    serviceDate: string;
    mileage: number;
    nextService?: number;
    description: string;
    parts?: string[];
    technician: string;
    blockchainVerified: boolean;
    blockchainTx?: string;
}