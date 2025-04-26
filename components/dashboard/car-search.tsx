"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Check } from "lucide-react"
import { useCars } from "@/lib/hooks/car-hooks"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function CarSearch() {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedCarId, setSelectedCarId] = useState<string | null>(null)
    const { fetchCars, cars, loading } = useCars()
    const router = useRouter()

    useEffect(() => {
        fetchCars()
    }, [])

    const filteredCars = useMemo(() => {
        if (!search) return cars || []
        return (cars || []).filter((car) =>
            `${car.make} ${car.model}`.toLowerCase().includes(search.toLowerCase())
        )
    }, [search, cars])

    const handleSelectCar = (id: string) => {
        setSelectedCarId(id)
        setOpen(false)
        router.push(`/dashboard/cars/${id}`)
    }

    if (loading || !cars) {
        return <div>Loading...</div>
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] justify-between"
                >
                    {selectedCarId
                        ? cars.find((car) => car.id === selectedCarId)?.make + " " + cars.find((car) => car.id === selectedCarId)?.model
                        : "Find Car..."}
                    <Search className="ml-2 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search make or model..."
                        value={search}
                        onValueChange={(value) => setSearch(value)}
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No car found.</CommandEmpty>
                        <CommandGroup>
                            {filteredCars.map((car) => (
                                <CommandItem
                                    key={car.id}
                                    value={`${car.make} ${car.model}`}
                                    onSelect={() => handleSelectCar(car.id)}
                                >
                                    {car.make} {car.model}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectedCarId === car.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}