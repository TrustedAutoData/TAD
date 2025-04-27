"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/charts"
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {periodAtom} from "@/lib/store";
import {PeriodSelector} from "@/components/ui/period-selector";
import {fetchAnalyticsData} from "@/actions/analytics/analytics-cards";
import {AnalyticsCards, AnalyticsChartsData} from "@/lib/types/analytics-types";
import {fetchAnalyticsCharts} from "@/actions/analytics/analytics-overview";
import {fetchCarsAnalyticsCharts} from "@/actions/analytics/analytics-cars";
import {fetchCertificatesAnalyticsCharts} from "@/actions/analytics/analytics-certificates";
import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {Button} from "@/components/ui/button";
import {Download} from "lucide-react";

export default function AdminAnalyticsPage() {
  const [period] = useAtom(periodAtom)
  const [cards, setCards] = useState<AnalyticsCards|null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [chartsData, setChartsData] = useState<AnalyticsChartsData>(null)

  const pageRef = useRef(null);
  const handleExport = async () => {
    const doc = new jsPDF();

    if (pageRef.current) {
      const canvas = await html2canvas(pageRef.current, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      doc.addImage(imgData, "PNG", 10, 10, 180, 250);
      doc.save(`analytics-${selectedPeriodLabel}.pdf`);
    }
  };

  useEffect(() => {
    async function loadData() {
      const data = await fetchAnalyticsData(period)
      setCards(data.data)
    }
    loadData()
  }, [period])

  useEffect(() => {
    async function loadData() {
      switch (activeTab) {
        case 'overview': {
          const chartsData = await fetchAnalyticsCharts(period);
          setChartsData(chartsData.data);
          break;
        }
        case 'cars': {
          const chartsData = await fetchCarsAnalyticsCharts(period);
          setChartsData(chartsData.data);
          break;
        }
        case 'certificates': {
          const chartsData = await fetchCertificatesAnalyticsCharts(period);
          setChartsData(chartsData.data);
          break;
        }
        default:
          break;
      }
    }
    loadData();
  }, [period, activeTab]);



  const selectedPeriodLabel = period === '7d' ? 'last 7 days'
      : period === '30d' ? 'last month'
          : period === '1y' ? 'last year'
          : 'previous period';

  function formatChange(current: number, previous: number) {
    if (!previous) return "N/A";
    const change = ((current - previous) / previous) * 100;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}% ${selectedPeriodLabel}`;
  }

  if (!cards||!chartsData)
    return <p>Loading...</p>

  return (
    <div className="flex flex-col gap-6" ref={pageRef}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center gap-2">
          <PeriodSelector/>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cards.totalCars.current}</div>
            <p className="text-xs text-muted-foreground">{formatChange(cards.totalCars.current, cards.totalCars.previous)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Connected Cars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cards.connectedCars.current}</div>
            <p className="text-xs text-muted-foreground">{formatChange(cards.connectedCars.current, cards.connectedCars.previous)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cards.certificatesIssued.current}</div>
            <p className="text-xs text-muted-foreground">{formatChange(cards.certificatesIssued.current, cards.certificatesIssued.previous)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cards.activeUsers.current}</div>
            <p className="text-xs text-muted-foreground">{formatChange(cards.activeUsers.current, cards.activeUsers.previous)}</p>
          </CardContent>
        </Card>
      </div>


      <Tabs defaultValue="overview" className="w-full" onValueChange={(value) => setActiveTab(value)}>
      <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cars">Cars</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Activity</CardTitle>
              <CardDescription>User activity over the {selectedPeriodLabel}</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <LineChart data={chartsData.lineChartData} lines={[{dataKey:"users", color: "#3b82f6"},{dataKey:"cars", color: "#10b981"},{dataKey:"certificates", color: "#f59e0b"}]}/>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Car Registrations</CardTitle>
                <CardDescription>New car registrations</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <BarChart data={chartsData.carRegistrationsBarData}/>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certificate Issuance</CardTitle>
                <CardDescription>Certificates issued</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <BarChart data={chartsData.certificateIssuanceBarData}/>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cars" className="space-y-6 mt-6">
          <Card>
          <CardHeader>
            <CardTitle>Car Distribution by Make</CardTitle>
            <CardDescription>Breakdown of registered cars by manufacturer</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <BarChart data={chartsData.carMakeDistributionBarData}/>
          </CardContent>
        </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connection Status</CardTitle>
              <CardDescription>OBD module connection status over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <LineChart data={chartsData.connectionStatusLineData} lines={[{dataKey:"connected", color: "#10b981"},{dataKey:"disconnected", color: "#f59e0b"}]}/>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Types</CardTitle>
              <CardDescription>Distribution of certificates by service type</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <BarChart data={chartsData.carRegistrationsBarData}/>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certificate Verification</CardTitle>
              <CardDescription>Certificate verification times</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <LineChart data={chartsData.lineChartData} lines={[{dataKey:"verificationTime", color: "#3b82f6"}]}/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
