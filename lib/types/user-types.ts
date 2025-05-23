import {CarsCard} from "@/lib/types/car-types";
import {CertificatesCard} from "@/lib/types/certificate-types";

export type RewardStatus = "Active" | "Used" | "Expired";

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    joined?: string;
    points?: number;
    level?: number;
}

export interface UserDetailed extends User{
    rewards: Reward[];
    cars: CarsCard[];
    certificates: CertificatesCard[];
}

export interface UserTableRow {
    id: string
    name: string
    email: string
    cars: number
    points: number
    level: number
    joined: string
}

export interface Reward {
    id: string;
    userId: string;
    name: string;
    status: RewardStatus;
    redeemed: string;
    expires: string;
}

export interface UserPointsChartItem {
    name: string
    users: number
}

export interface UserActivityChartItem {
    month: string
    active: number
    new: number
}