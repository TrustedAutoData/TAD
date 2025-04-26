
import {useAtom} from "jotai/index";
import {
    certificatesAtom, certificatesCardsAtom,
    certificatesLoadingAtom,
    certificatesPaginationAtom,
    selectedCertificateAtom,
    selectedCertificateIdAtom
} from "@/lib/store";
import {useCallback} from "react";
import * as api from "@/lib/api/api-client";
import {getRecentCertificates} from "@/actions/certificates/recent-certificates";

export function useCertificates() {
    const [certificates, setCertificates] = useAtom(certificatesAtom)
    const [certificatesCards, setCertificatesCards] = useAtom(certificatesCardsAtom)
    const [loading, setLoading] = useAtom(certificatesLoadingAtom)
    const [selectedCertificateId, setSelectedCertificateId] = useAtom(selectedCertificateIdAtom)
    const [selectedCertificate] = useAtom(selectedCertificateAtom)
    const [pagination, setPagination] = useAtom(certificatesPaginationAtom)

    const fetchCertificates = useCallback(
        async (params?: { carId?: string; dealerId?: string; search?: string }) => {
            setLoading(true)
            try {
                const response = await api.getCertificates({
                    ...params,
                    page: pagination.page,
                    pageSize: pagination.pageSize,
                })
                setCertificates(response.data.data)
                setPagination({
                    ...pagination,
                    total: response.data.total,
                    totalPages: response.data.totalPages,
                })
            } catch (error) {
                console.error("Error fetching certificates:", error)
            } finally {
                setLoading(false)
            }
        },
        [setCertificates, setLoading, pagination, setPagination],
    )

    const fetchCertificate = useCallback(
        async (id: string) => {
            setLoading(true)
            try {
                const response = await api.getCertificate(id)
                setCertificates((prev) => {
                    const index = prev.findIndex((cert) => cert.id === id)
                    if (index >= 0) {
                        return [...prev.slice(0, index), response.data, ...prev.slice(index + 1)]
                    }
                    return [...prev, response.data]
                })
                setSelectedCertificateId(id)
            } catch (error) {
                console.error(`Error fetching certificate ${id}:`, error)
            } finally {
                setLoading(false)
            }
        },
        [setCertificates, setLoading, setSelectedCertificateId],
    )

    const fetchRecentCertificates = useCallback(
        async () => {
            setLoading(true)
            try {
                const recentCertificates = await getRecentCertificates()
                setCertificatesCards(recentCertificates.data)
            } catch (error) {
                console.error("Error fetching recent certificates:", error)
            } finally {
                setLoading(false)
            }
        },
        [setCertificates, setLoading],
    )

    const createCertificate = useCallback(
        async (certificate: Omit<any, "id">) => {
            setLoading(true)
            try {
                const response = await api.createCertificate(certificate)
                setCertificates((prev) => [...prev, response.data])
                return response.data
            } catch (error) {
                console.error("Error creating certificate:", error)
                throw error
            } finally {
                setLoading(false)
            }
        },
        [setCertificates, setLoading],
    )

    const updateCertificate = useCallback(
        async (id: string, certificate: Partial<any>) => {
            setLoading(true)
            try {
                const response = await api.updateCertificate(id, certificate)
                setCertificates((prev) => {
                    const index = prev.findIndex((c) => c.id === id)
                    if (index >= 0) {
                        return [...prev.slice(0, index), response.data, ...prev.slice(index + 1)]
                    }
                    return prev
                })
                return response.data
            } catch (error) {
                console.error(`Error updating certificate ${id}:`, error)
                throw error
            } finally {
                setLoading(false)
            }
        },
        [setCertificates, setLoading],
    )

    const deleteCertificate = useCallback(
        async (id: string) => {
            setLoading(true)
            try {
                await api.deleteCertificate(id)
                setCertificates((prev) => prev.filter((cert) => cert.id !== id))
                if (selectedCertificateId === id) {
                    setSelectedCertificateId(null)
                }
            } catch (error) {
                console.error(`Error deleting certificate ${id}:`, error)
                throw error
            } finally {
                setLoading(false)
            }
        },
        [setCertificates, setLoading, selectedCertificateId, setSelectedCertificateId],
    )

    const changePage = useCallback(
        (page: number) => {
            setPagination((prev) => ({...prev, page}))
            fetchCertificates()
        },
        [setPagination, fetchCertificates],
    )

    return {
        certificates,
        loading,
        selectedCertificateId,
        selectedCertificate,
        pagination,
        setSelectedCertificateId,
        fetchCertificates,
        fetchCertificate,
        createCertificate,
        updateCertificate,
        deleteCertificate,
        changePage,
        fetchRecentCertificates,
        certificatesCards
    }
}