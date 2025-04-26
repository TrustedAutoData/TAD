"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"
import { useEffect } from "react"
import Link from "next/link";
import { jsPDF } from "jspdf";
import {useCertificates} from "@/lib/hooks/certificate-hooks";
import {getCertificateById} from "@/actions/certificates/certificates";


export function MaintenanceCertificates() {
  const {fetchRecentCertificates, certificatesCards, loading} = useCertificates();

  useEffect(() => {
    fetchRecentCertificates()
  }, [])

  if (loading || !certificatesCards)
    return <div>Loading...</div>

  const handleDownload = async (id: string) => {
    const certificate = await getCertificateById(id);
    if (!certificate) {
      alert("Certificate not found");
      return;
    }

    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");

    doc.setFontSize(16);
    doc.text(`Certificate: ${certificate.id}`, 10, 10);

    doc.setFontSize(12);
    doc.text(`Customer: ${certificate.dealerId}`, 10, 20);
    doc.text(`Vehicle: ${certificate.carId}`, 10, 30);

    doc.text(`Service Type: ${certificate.serviceType}`, 10, 40);
    doc.text(`Service Date: ${new Date(certificate.serviceDate).toLocaleDateString()}`, 10, 50);

    doc.text(`Mileage: ${certificate.mileage} miles`, 10, 60);
    doc.text(`Next Service: ${certificate.nextService} miles`, 10, 70);

    doc.text(`Description: ${certificate.description}`, 10, 80);
    doc.text(`Parts: ${certificate.parts}`, 10, 90);

    doc.text(`Technician: ${certificate.technician}`, 10, 100);

    doc.save(`certificate-${certificate.id}.pdf`);
  }

  return (
      <div className="space-y-4">
        {certificatesCards.map((cert) => (
            <div key={cert.id} className="flex items-center space-x-4 rounded-md border p-3">
              <Avatar className="h-9 w-9">
                <AvatarImage
                    src={`/placeholder.svg?height=36&width=36&text=${cert.car}`}
                    alt={cert.car}
                />
                <AvatarFallback>{cert.car.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{cert.car}</p>
                  <Badge
                      variant="outline"
                  >
                    {cert.serviceType}
                  </Badge>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs text-muted-foreground">
                   {new Date(cert.serviceDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleDownload(cert.id)}
                    >
                      <Download className="h-3 w-3"/>
                    </Button>
                    <Link href={`/dashboard/certificates/${cert.id}`}>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ExternalLink className="h-3 w-3"/>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
  )
}
