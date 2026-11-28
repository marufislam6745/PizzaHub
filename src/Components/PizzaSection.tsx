import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MapPin, Star, ArrowUpRight } from "lucide-react";
import { IPizza } from '@/type';


const PizzaSection = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pizzaSection`)
    const data:IPizza[] = await res.json()

    return (
        <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                    <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
                        Explore Nearby
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                        Really good things are <br className="hidden sm:block" />
                        happening near you
                    </h2>
                    <p className="text-gray-500 mt-3">
                        Discover delicious pizzas from restaurants near you.
                    </p>
                </div>

                <Link
                    href="/restaurants"
                    className="text-orange-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                    See all items <ArrowUpRight size={18} />
                </Link>
            </div>

            {/* Pizza Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((pizza) => (
                    <div
                        key={pizza._id}
                        className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="relative h-56 overflow-hidden">
                            <Image
                                src={pizza.image}
                                alt={pizza.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            <span className="absolute top-4 left-4 bg-white text-orange-500 text-xs font-semibold px-3 py-2 rounded-full shadow-sm">
                                {pizza.category}
                            </span>

                            <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-bold text-gray-800">
                                    {pizza.rating}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                                    {pizza.title}
                                </h3>

                                <span className="text-xl font-bold text-orange-500 whitespace-nowrap">
                                    {pizza.price}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                                <div className="min-w-0">
                                    <h4 className="font-semibold text-gray-800 truncate">
                                        {pizza.restaurantName}
                                    </h4>

                                    <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                                        <MapPin size={14} className="text-orange-500 shrink-0" />
                                        <span className="truncate">{pizza.location}</span>
                                    </p>
                                </div>

                                <span className="text-xs font-medium bg-orange-50 text-orange-600 px-3 py-2 rounded-lg whitespace-nowrap">
                                    {pizza.size}
                                </span>
                            </div>

                            {/* Button */}
                            <Link
                                href={`/#`}
                                className="mt-5 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors"
                            >
                                View Details
                                <ArrowUpRight size={18} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PizzaSection;