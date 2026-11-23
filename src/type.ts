export interface IPizza {
    _id: string,
    title: string;
    description: string;
    price: number;
    rating: number;
    image: string;
    category: string,
    size: string,
    restaurantName: string,
    location: string,
    postDate: string,
    status: string,
    name: string,
    email: string,
    vendorId: string
}
export interface IOrder {
    _id: string,
    itemId: string,
    title: string;
    price: number;
    image: string,
    deliveryDate: string;
    address: string;
    orderedAt: string;
    status: string,
    vendorId: string,
    vendoremail: string,
    userId: string,
    useremail: string,
    category: string
}