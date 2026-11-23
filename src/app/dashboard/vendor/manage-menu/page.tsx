import { auth } from '@/lib/auth';
import { IPizza } from '@/type';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';
import { Pizza, Trash2, UtensilsCrossed, LocateIcon } from "lucide-react";


const ManageMenuPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pizza/${session?.user.email}`)
    const myitem: IPizza[] = await res.json()

    return (
        <div className="px-4 py-10 sm:px-6 lg:px-10">

            <div className=" max-h-7xl mx-auto">

                {/* Header */}
                <div className="mb-10 text-left">
                    <div className="mb-3 flex items-center justify-start gap-2 text-sm font-bold tracking-[4px] text-red-500">
                        <Pizza size={20} />
                        YOUR PIZZARIA
                    </div>

                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        My Menu <span className="text-red-500">Items</span>
                    </h2>

                    <p className=" mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                        Manage your delicious pizza collection. View, organize
                        and manage all your menu items in one place.
                    </p>
                </div>

                {/* Stats */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Total Menu Items</p>
                        <h3 className="mt-2 text-3xl font-bold text-gray-900">
                            {myitem.length}
                        </h3>
                    </div>

                    <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Categories</p>
                        <h3 className="mt-2 text-3xl font-bold text-gray-900">
                            {new Set(myitem.map(item => item.category)).size}
                        </h3>
                    </div>

                    <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Available Items</p>
                        <h3 className="mt-2 text-3xl font-bold text-green-600">
                            {myitem.filter(item => item.status === "Approved").length}
                        </h3>
                    </div>

                </div>

                {/* Menu Container */}
                <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">

                    {/* Menu Header */}
                    <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:p-6">

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                Your Menu
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                All your pizza menu items
                            </p>
                        </div>

                        <span className="w-fit rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                            {myitem.length} Items
                        </span>
                    </div>

                    {/* Menu Items */}
                    <div className="divide-y divide-gray-100">

                        {myitem.length > 0 ? (
                            myitem.map((pizza) => (
                                <div
                                    key={pizza._id}
                                    className="flex flex-col gap-4 p-4 transition hover:bg-orange-50/40 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                                >

                                    {/* Pizza Info */}
                                    <div className="flex items-center gap-4">

                                        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-20 sm:w-24">
                                            <Image
                                                src={pizza.image}
                                                alt={pizza.title}
                                                fill
                                                sizes="(max-width: 540px) 96px, 128px"
                                                className="object-cover transition duration-300 hover:scale-110"
                                            />
                                        </div>

                                        <div>

                                            <div className='flex items-center gap-3'>
                                                <h3 className="truncate text-xl font-bold text-gray-900 sm:text-lg">
                                                    {pizza.title}
                                                </h3>
                                                <span className="font-bold text-red-500">
                                                    ${pizza.price}
                                                </span>
                                            </div>

                                            <div className="mt-2 flex flex-wrap items-center gap-3">

                                                <span className="inline-block text-base font-semibold text-orange-600">
                                                    {pizza.category}
                                                </span>

                                                <span className="flex items-center gap-1 text-base text-gray-500">
                                                    <LocateIcon size={15} className="fill-amber-400 text-amber-400" />
                                                    {pizza.location}
                                                </span>

                                            </div>
                                        </div>
                                    </div>

                                    {/* Status and Action */}
                                    <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3 sm:border-0 sm:pt-0">

                                        <button className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${pizza.status === "Approved"
                                            ? "bg-green-50 text-green-600"
                                            : "bg-orange-50 text-orange-500"
                                            }`}>
                                            {pizza.status}
                                        </button>

                                        <button
                                            className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-5 py-16 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                                    <UtensilsCrossed size={30} />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900">
                                    No Menu Items Found
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    You haven`t added any pizza items yet.
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageMenuPage;