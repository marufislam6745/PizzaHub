import { IOrderPreview } from "@/components/OrderNow"
import { IPizza } from "@/type"


export const createMenu = async (data: IPizza) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addmenu`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

//get all item 
export const getAllPizza = async (query: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pizza?${query}`)
    return res.json()
}

//Delete menu item by vendor
export const deleteMenu = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pizza/${id}`, {
        method: "DELETE"
    })
    return res.json()
}

//order item
export const orderItem = async (data: IOrderPreview) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return res.json()
}
//my order delete
export const cancelOrder = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myOrder/${id}`, {
        method: "DELETE"
    })
    return res.json()
}