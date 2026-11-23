
"use client";

import React from "react";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

interface FilterCategoryProps {
    totalItems: number;
}

const categories = [
    "Cheese",
    "Meat Lover",
    "Classic",
    "Vegetarian",
    "Spicy",
    "Special"
]
        


const FilterCategory = ({ totalItems }: FilterCategoryProps) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectedCategory = searchParams.get("category") || "All";

    const updateFilter = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (category === "All") {
            params.delete("category");
        } else {
            params.set("category", category);
        }

        const queryString = params.toString();

        router.push(
            queryString ? `${pathname}?${queryString}` : pathname,
            { scroll: false }
        );
    };

    return (
        <div className="mb-7 w-full space-y-5">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    Category Filter
                </h3>

                <p className="text-sm text-gray-500">
                    Total Items:{" "}
                    <span className="font-semibold text-orange-500">
                        {totalItems}
                    </span>
                </p>
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap items-center gap-3">

                {/* All Category */}
                <button
                    type="button"
                    onClick={() => updateFilter("All")}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${selectedCategory === "All"
                        ? "bg-orange-100 text-red-600"
                        : "bg-gray-100 text-gray-800 hover:bg-orange-50 hover:text-orange-600"
                        }`}
                >
                    All
                </button>

                {/* Other Categories */}
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => updateFilter(category)}
                        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${selectedCategory === category
                            ? "bg-orange-100 text-orange-600"
                            : "bg-gray-100 text-gray-800 hover:bg-orange-50 hover:text-orange-600"
                            }`}
                    >
                        {category}
                    </button>
                ))}

            </div>
        </div>
    );
};

export default FilterCategory;
