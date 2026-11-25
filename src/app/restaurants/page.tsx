import FilterCategory from '@/components/FilterCategory';
import { getActivePizza } from '@/lib/action/item';
import { IPizza } from '@/type';
import { ArrowUpRight, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RestaurantMenuPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>).toString();

    const item: IPizza[] = await getActivePizza(urlSearch)

    return (
        <section className="w-full px-3 py-5 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">

                {/* Full Width Banner Image */}
                <div className="relative h-37 w-full overflow-hidden rounded-2xl sm:h-75 md:h-75 lg:h-86">
                    <Image
                        src="/banner2.jpg"
                        alt="PizzaHub Banner"
                        fill
                        priority
                        sizes="90vw"
                        className="object-cover object-center"
                    />
                </div>


                <div >
                    {/* Search */}
                    <form
                        action="/restaurants"
                        method="GET"
                        className="mb-8 flex gap-3 rounded-xl pt-5"
                    >
                        <input
                            type="text"
                            name="search"
                            defaultValue={typeof search.search === "string" ? search.search : ""}
                            placeholder="Search by pizza, keywords..."
                            className="min-w-0 flex-1 rounded-lg border border-orange-400 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-gray-500"
                        />

                        <button
                            type="submit"
                            className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                            Search pizza
                        </button>
                    </form>
                </div>

                <div>
                    <FilterCategory totalItems={item.length}></FilterCategory>
                </div>

                {/* Pizza Cards */}
                {item.length > 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {item.map((pizza) => (
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
                                        href={`/restaurants/${pizza._id}`}
                                        className="mt-5 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors"
                                    >
                                        View Details
                                        <ArrowUpRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div> :
                    <div className="rounded-xl p-10 text-center">
                        <h3 className="text-2xl font-semibold">
                            No Pizza Found
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Try changing your filters or search keywords.
                        </p>
                    </div>
                }
            </div>
        </section>
    );
};

export default RestaurantMenuPage;