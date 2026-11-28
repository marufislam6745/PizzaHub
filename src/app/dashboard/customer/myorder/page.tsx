
import MyorderCancel from '@/components/MyorderCancel';
import { auth } from '@/lib/auth';
import { authFetch } from '@/lib/core/server';
import { IOrder } from '@/type';
import { CalendarDays, ShoppingBag } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const MyOrderPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const api = `${process.env.NEXT_PUBLIC_API_URL}/myOrder/${session?.user.email}`
    const res = await authFetch(api)
    const data = await res.json();

    return (
        <div className="min-h-screen px-4 py-10 md:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-bold uppercase tracking-[3px] text-orange-500">
                        MY PIZZA ORDER
                    </p>

                    <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
                        Order Page
                    </h2>

                    <p className="mt-2 text-sm text-gray-500 md:text-base">
                        Track your delicious pizza orders and manage your deliveries.
                    </p>
                </div>

                {/* Order Section */}
                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">

                    <div className="mb-6 flex flex-col justify-between gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                My Order
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                All your recent pizza orders.
                            </p>
                        </div>

                        <div className="flex w-fit items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
                            <ShoppingBag size={17} />
                            {data.length} Orders
                        </div>
                    </div>

                    {/* Order List */}
                    <div className="space-y-4">
                        {data.map((pizza: IOrder) => (
                            <div
                                key={pizza._id}
                                className="rounded-xl border border-gray-100 p-2 transition hover:border-orange-200 hover:shadow-md sm:p-3"
                            >
                                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                                    {/* Pizza Information */}
                                    <div className="flex items-center gap-4">
                                        <div className="h-14 w-18 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-18 sm:w-22">
                                            <Image
                                                src={pizza.image}
                                                alt={pizza.title}
                                                width={100}
                                                height={100}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {pizza.title}
                                            </h3>

                                            <p className=" text-sm font-medium text-orange-500">
                                                {pizza.category}
                                            </p>

                                            <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500 sm:text-sm">
                                                <p className="flex items-center gap-1">
                                                    <CalendarDays size={15} />
                                                    {pizza.deliveryDate}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Status */}
                                    <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4 md:min-w-37.5 md:flex-col md:items-end md:border-0 md:pt-0">

                                        {pizza.status === 'pending' ? (
                                            <div className="flex items-center justify-between gap-3 md:w-auto md:items-end">
                                                <span className="flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold capitalize text-yellow-600">
                                                    Pending
                                                </span>

                                                <MyorderCancel pizza={pizza}></MyorderCancel>
                                            </div>
                                        ) : (
                                            <span className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${pizza.status === 'accept'
                                                ? 'bg-green-100 text-green-600'
                                                : pizza.status === 'reject'
                                                    ? 'bg-red-50 text-red-600'
                                                    : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {pizza.status}
                                            </span>
                                        )}
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {data.length === 0 && (
                        <div className="py-16 text-center">
                            <ShoppingBag
                                size={55}
                                className="mx-auto mb-4 text-gray-300"
                            />
                            <h3 className="text-xl font-bold text-gray-800">
                                No Orders Yet!
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                You haven`t ordered any delicious pizza yet.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default MyOrderPage;