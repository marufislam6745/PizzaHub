import { authFetch } from "../core/server"

export const getPremiumId = async (userId: string) => {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/premium`)
    return res.json()
}