"use server"
export async function logout() {
    return new Promise((resolve) => {
        console.log("Logging out...")
        setTimeout(() => {
            console.log("Logged out successfully!")
            resolve("done")
        }, 1000)
    })
}
