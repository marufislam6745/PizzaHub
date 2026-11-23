import { IPizza } from "@/type"


export const createMenu = async (data:IPizza) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addmenu`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    return res.json()
}

//get all item 
export const getAllPizza = async (query: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pizza?${query}`)
    return res.json()
}