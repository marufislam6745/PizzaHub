// import { auth } from '@/lib/auth';
// import { headers } from 'next/headers';
// import React from 'react';

// const page =async () => {
//     const session=await auth.api.getSession({
//         headers:await headers()
//     })

//     const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myOrder/${session?.user.email}`)
//     const data=await res.json()

//     return (
//         <div>
//             <div></div>
//         </div>
//     );
// };

// export default page; 


import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import {
    ShoppingBag,
    Clock,
    CheckCircle,
    XCircle,
    Package,
    CalendarDays,
    MapPin,
} from 'lucide-react';

interface Order {
    _id?: string,
    status?: string,
    title: string,
    price: string,
    orderedAt:string,
    address:string
}


const CustomerDashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myOrder/${session?.user.email}`);
    const data = await res.json();

    const orders: Order[] = Array.isArray(data) ? data : data.orders || [];

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(
        (order) => order.status?.toLowerCase() === 'pending'
    ).length;
    const acceptedOrders = orders.filter(
        (order) => order.status?.toLowerCase() === 'accepted'
    ).length;
    const rejectedOrders = orders.filter(
        (order) => order.status?.toLowerCase() === 'rejected'
    ).length;

    const stats = [
        {
            title: 'Total Orders',
            value: totalOrders,
            icon: ShoppingBag,
            color: 'text-orange-500',
            bg: 'bg-orange-50',
        },
        {
            title: 'Pending Orders',
            value: pendingOrders,
            icon: Clock,
            color: 'text-yellow-500',
            bg: 'bg-yellow-50',
        },
        {
            title: 'Accepted Orders',
            value: acceptedOrders,
            icon: CheckCircle,
            color: 'text-green-500',
            bg: 'bg-green-50',
        },
        {
            title: 'Rejected Orders',
            value: rejectedOrders,
            icon: XCircle,
            color: 'text-red-500',
            bg: 'bg-red-50',
        },
    ];

    return (
        <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
                        PizzaHub Dashboard
                    </p>
                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                        My DashBoard
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 md:text-base">
                        Track and manage all your pizza orders in one place.
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            {item.title}
                                        </p>
                                        <h2 className="mt-3 text-3xl font-bold text-gray-900">
                                            {item.value}
                                        </h2>
                                    </div>

                                    <div className={`${item.bg} ${item.color} rounded-xl p-3`}>
                                        <Icon size={25} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Orders Table */}
                <div className="mt-10 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="flex flex-col justify-between gap-2 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                Recent Orders
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Your order history and status.
                            </p>
                        </div>

                        <span className="w-fit rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
                            {totalOrders} Orders
                        </span>
                    </div>

                    {orders.length === 0 ? (
                        <div className="px-5 py-16 text-center">
                            <ShoppingBag className="mx-auto mb-4 text-gray-300" size={50} />
                            <h3 className="text-lg font-semibold text-gray-800">
                                No Orders Found
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                You haven`t placed any orders yet.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-187.5 text-left">
                                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                                    <tr>
                                        <th className="px-6 py-4">Order</th>
                                        <th className="px-6 py-4">Pizza</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Location</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {orders.map((order, index: number) => {
                                        const status = order.status?.toLowerCase();

                                        return (
                                            <tr
                                                key={order._id || index}
                                                className="transition hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-5">
                                                    <span className="font-semibold text-gray-800">
                                                        #{order._id?.slice(-6) || index + 1}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-lg bg-orange-50 p-2 text-orange-500">
                                                            <Package size={20} />
                                                        </div>
                                                        <span className="font-medium text-gray-800">
                                                            {order.title || 'Pizza Order'}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5 text-sm text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarDays size={15} />
                                                        {order.orderedAt || 'N/A'}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5 text-sm text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin size={15} />
                                                        {order.address || 'N/A'}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5 font-semibold text-gray-800">
                                                    {order.price || 0}
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${status === 'accept'
                                                        ? 'bg-green-100 text-green-600'
                                                        : status === 'reject'
                                                            ? 'bg-red-50 text-red-600'
                                                            : 'bg-yellow-50 text-yellow-600'
                                                        }`}>
                                                        {order.status || 'Pending'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CustomerDashboardPage;
