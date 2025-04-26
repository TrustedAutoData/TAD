"use server"

export async function getDashboardCards() {

    return {
        connectedCars: {
            currentTotal: 128,
            changeSinceLastMonth: 12,
        },
        activeUsers: {
            currentTotal: 96,
            changeSinceLastMonth: 8,
        },
        certificatesIssued: {
            currentTotal: 342,
            changeSinceLastMonth: 28,
        },
        pendingServices: {
            currentTotal: 15,
            dueNextWeek: 5,
        },
    }
}
