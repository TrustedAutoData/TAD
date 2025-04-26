"use client"

import { useEffect, useState, useMemo } from "react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {ChartDataPoint} from "@/lib/types";

interface ConnectedCarsChartProps {
    data: ChartDataPoint[];
}

export function ConnectedCarsChart({ data }: ConnectedCarsChartProps) {
    if (!data.length) return <div></div>;

    const dynamicConfig = useMemo(() => {
        return {
            cars: {
                label: "Connected Cars",
                color: "hsl(var(--chart-1))",
            },
        };
    }, []);

    return (
        <ChartContainer config={dynamicConfig} className="h-[300px]">
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 20,
                }}
            >
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Bar dataKey="cars" fill="var(--color-cars)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartContainer>
    )
}