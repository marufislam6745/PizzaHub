import React from 'react';
import { MapPin, Star } from "lucide-react";
import Image from 'next/image';
import OrderNow from '@/components/OrderNow';
import { authFetch } from '@/lib/core/server';

interface Props {
    params: Promise<{
        Id: string;
    }>;
}

const DetailsPage = async ({ params }: Props) => {
    const { Id } = await params
    const api = `${process.env.NEXT_PUBLIC_API_URL}/pizzaId/${Id}`
    const res = await authFetch(api)
    const item = await res.json()

    return (
        <div className="py-9">
            <div className="relative w-full max-w-5xl mx-auto rounded-2xl p-5 sm:p-7 shadow-2xl">

                {/* Header */}
                <div className="mb-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white">
                        🍕
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif text-gray-900">
                        Your next favorite
                    </h2>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Product Image */}
                    <div className="h-75 sm:h-105 overflow-hidden rounded-xl">
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={500}
                            height={600}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Product Details */}
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-400">
                            {item.category}
                        </p>

                        <h3 className="mb-3 text-2xl sm:text-3xl font-serif text-gray-900">
                            {item.title}
                        </h3>

                        {/* Rating */}
                        <div className="mb-3 flex items-center gap-2">
                            <Star size={17} className="fill-amber-400 text-amber-400" />
                            <span className="font-semibold text-gray-800">
                                {item.rating}
                            </span>
                        </div>

                        <p className="mb-4 text-sm leading-6 text-gray-500">
                            {item.description}
                        </p>

                        <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
                            <MapPin size={17} className="text-red-500" />
                            {item.location}
                        </div>

                        <hr className="mb-4 border-gray-200" />

                        {/* Price */}
                        <div className="mb-4 flex items-center gap-2">
                            <h3 className="text-2xl font-bold text-gray-900">
                                {item.price}
                            </h3>
                            <span className="text-xs text-gray-400">
                                Made fresh to order
                            </span>
                        </div>

                        {/* Order Form */}
                        <OrderNow item={item}></OrderNow>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;