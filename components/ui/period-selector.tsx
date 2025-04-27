"use client"

import { useAtom } from "jotai"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {periodAtom} from "@/lib/store";

export function PeriodSelector() {
    const [period, setPeriod] = useAtom(periodAtom)

    return (
        <Select value={period} onValueChange={(value) => setPeriod(value as any)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
            </SelectContent>
        </Select>
    )
}
