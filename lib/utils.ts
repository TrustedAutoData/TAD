import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL || "/api",
    withCredentials: true,
});
