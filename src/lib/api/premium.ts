
export const getPremiumId = async (userId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/premium`)
    return res.json()
}