"use server"

import {mockCertificates} from "@/lib/api/mock-data";

import {Certificate} from "@/lib/types/certificate-types";

export async function getCertificateById(id: string): Promise<Certificate | null> {
    const certificate = mockCertificates.find(cert => cert.id === id);
    return certificate ? certificate : null;
}
