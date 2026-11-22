
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Bike,
    ShieldCheck,
    Headset,
    Star,
} from "lucide-react";

export default function HeroBanner() {
    const features = [
        {
            icon: Bike,
            title: "Fast Delivery",
            description: "Within 30 min",
        },
        {
            icon: ShieldCheck,
            title: "Safe & Secure",
            description: "Payment",
        },
        {
            icon: Headset,
            title: "24/7 Support",
            description: "Always Available",
        },
        {
            icon: Star,
            title: "Top Rated",
            description: "Restaurants",
        },
    ];

    return (
        <section className="w-full px-3 sm:px-5 lg:px-8 pt-5 pb-10">
            <div className="max-w-7xl mx-auto">

                {/* Hero Banner */}
                <div className="relative min-h-107.5 md:min-h-124 rounded-2xl overflow-hidden bg-[#17100d]">

                    {/* Background Image */}
                    <Image
                        src="/banner.jpg"
                        alt="Delicious Pizza"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-black/10"></div>

                    {/* Content */}
                    <div className="relative z-10 flex items-center min-h-107.5 md:min-h-120 px-6 sm:px-10 md:px-12 lg:px-16 py-12">

                        <div className="max-w-xl">

                            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15]">
                                Delicious{" "}
                                <span className="text-red-500">
                                    Pizza,
                                </span>
                                <br />
                                Delivered to Your Door
                            </h1>

                            <p className="text-gray-200 text-sm sm:text-base md:text-lg mt-5 leading-relaxed max-w-md">
                                Discover local pizza shops, browse menus,
                                and order your favorite pizza online.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-7">

                                <Link
                                    href="/restaurants"
                                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition duration-300"
                                >
                                    Order Now
                                    <ArrowRight size={17} />
                                </Link>

                                <Link
                                    href="/restaurants"
                                    className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-full font-semibold text-sm transition duration-300"
                                >
                                    Explore Restaurants
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="relative z-20 mx-3 sm:mx-6 lg:mx-12 -mt-6 bg-white rounded-xl shadow-lg border border-gray-200 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="flex items-center justify-center gap-3 px-3 py-5 sm:px-5 sm:py-6"
                            >
                                <Icon
                                    size={27}
                                    className="text-red-600 shrink-0"
                                />

                                <div>
                                    <h3 className="text-gray-900 text-xs sm:text-sm font-bold">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 text-[10px] sm:text-xs mt-1">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}
