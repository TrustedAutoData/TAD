"use server"
import {type ApiError, ApiResponse, Car, PaginatedResponse} from "@/lib/types";
import {mockCars, mockCertificates, mockRewards, mockUsers} from "@/lib/api/mock-data";
import {handleMockResponse} from "@/lib/api";
import {Reward, User, UserDetailed, UserTableRow} from "@/lib/types/user-types";
import {CarsCard} from "@/lib/types/car-types";
import {Certificate, CertificatesCard} from "@/lib/types/certificate-types";

export async function getTableUsers(params?: {
    search?: string
    page?: number
    pageSize?: number
}): Promise<ApiResponse<PaginatedResponse<UserTableRow>>>
{
    let filteredUsers = [...mockUsers]

    if (params?.search) {
        const search = params.search.toLowerCase()
        filteredUsers = filteredUsers.filter(
            (user) => user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search),
        )
    }

    const usersWithCarCount = filteredUsers.map((user) => {
        const carCount = mockCars.filter((car) => car.owner === user.id).length

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            cars: carCount,
            points: user.points,
            level: user.level,
            joined: user.joined,
        }
    })

    // Pagination
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const total = usersWithCarCount.length
    const totalPages = Math.ceil(total / pageSize)
    const paginatedUsers = usersWithCarCount.slice((page - 1) * pageSize, page * pageSize)

    return handleMockResponse<PaginatedResponse<UserTableRow>>({
        data: paginatedUsers,
        total,
        page,
        pageSize,
        totalPages,
    })
}

export async function getUser(id: string): Promise<ApiResponse<User>> {
    const user = mockUsers.find((user) => user.id === id)

    if (!user) {
        throw {
            code: "NOT_FOUND",
            message: `User with ID ${id} not found`,
            status: 404,
        } as ApiError
    }

    return handleMockResponse<User>(user)
}

export async function getUserDetailed(id: string): Promise<ApiResponse<UserDetailed>> {
    const user = mockUsers.find((user) => user.id === id)

    if (!user) {
        throw {
            code: "NOT_FOUND",
            message: `User with ID ${id} not found`,
            status: 404,
        } as ApiError
    }

    const cars: CarsCard[] = mockCars
        .filter((car) => car.owner === id)
        .map((car) => ({
            id: car.id,
            make: car.make,
            model: car.model,
            year: car.year,
            licensePlate: car.licensePlate,
            status: car.status,
            lastUpdate: car.lastUpdate
        }));

    const rewards: Reward[] = mockRewards
        .filter((reward) => reward.userId === id);

    const certificates: CertificatesCard[] = cars.length > 0
        ? mockCertificates
            .filter((certificate) =>
                cars.some((car) => certificate.carId === car.id)
            )
            .map((certificate) => {
                const matchedCar = cars.find((car) => car.id === certificate.carId);
                return {
                    id: certificate.id,
                    car: matchedCar ? `${matchedCar.make} ${matchedCar.model}` : "Unknown Car",
                    serviceType: certificate.serviceType,
                    serviceDate: certificate.serviceDate,
                };
            })
        : [];

    return handleMockResponse<UserDetailed>({
        ...user,
        rewards,
        cars,
        certificates,
    });
}