import { IOrderPreview } from "@/components/OrderNow"
import { IPizza } from "@/type"
import { authFetch, protectedMutation } from "../core/server"


export const createMenu = async (data: IPizza) => {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/addmenu`
    const res = await protectedMutation(api, "POST", data)
    return res.json()
}

//get vendor add pizza count
export const getVendorPizzaCount = async (query: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addmenu/count?${query}`)
    return res.json()
}

//get all item 
export const getAllPizza = async (query: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pizza?${query}`)
    return res.json()
}
//get all active item 
export const getActivePizza = async (query: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activepizza?${query}`)
    return res.json()
}

//Delete menu item by vendor
export const deleteMenu = async (id: string) => {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/pizza/${id}`
    const res = await protectedMutation(api, "DELETE")
    return res.json()
}

export const adminDeleteMenu = async (id: string) => {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/pizza/${id}`
    const res = await protectedMutation(api, "DELETE")
    return res.json()
}

//order item
export const orderItem = async (data: IOrderPreview) => {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/order`
    const res = await protectedMutation(api, "POST", data)
    return res.json()
}

//my order delete
export const cancelOrder = async (id: string) => {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/myOrder/${id}`
    const res = await protectedMutation(api, "DELETE")
    return res.json()
}

//vendor with customer order 
export const customerOrder = async (id: string) => {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/vendorOrder/${id}`
    const res = await authFetch(api)
    return res.json()
}

export const updateOrderStatus = async (id: string, data: { status: string }) => {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/vendorOrder/${id}`
    const res = await protectedMutation(api, "PATCH", data)

    return res.json()
}

//update menu status
export const updateMenuStatus = async (id: string, data: { status: string }) => {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/pizza/${id}`
    const res = await protectedMutation(api, "PATCH", data)
    return res.json()
}

//get all users
export const getAllUsers = async (query: string) => {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/users?${query}`)
    return res.json()
}

//payments action
export const checkoutVerify = async (sessionId: string) => {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/payments/checkout-verify`
    const res = await protectedMutation(api, "POST", { sessionId })
    return res.json()

}

//Transactions details
export const getTransactions = async (query: string) => {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/transactions?${query}`
    const res = await authFetch(api)
    return res.json()
}