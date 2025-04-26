"use server"

import {mockCars, mockCertificates} from "@/lib/api/mock-data";
import {CertificatesCard} from "@/lib/types/certificate-types";
import {ApiResponse} from "@/lib/types";
import {handleMockResponse} from "@/lib/api";

export async function getRecentCertificates(): Promise<ApiResponse<CertificatesCard[]>> {

    const certs = mockCars.length > 0
        ? mockCertificates
            .filter((certificate) =>
                mockCars.some((car) => certificate.carId === car.id)
            )
            .map((certificate) => {
                const matchedCar = mockCars.find((car) => car.id === certificate.carId);
                return {
                    id: certificate.id,
                    car: matchedCar ? `${matchedCar.make} ${matchedCar.model}` : "Unknown Car",
                    serviceType: certificate.serviceType,
                    serviceDate: certificate.serviceDate,
                };
            })
        : []

    return handleMockResponse<CertificatesCard[]>(certs)
}