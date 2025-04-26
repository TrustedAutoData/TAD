import {Status} from "@/lib/types/index";

export interface CarsCard {
    id: string;
    make: string;
    model: string;
    year: number;
    status: Status;
    lastUpdate: string;
}