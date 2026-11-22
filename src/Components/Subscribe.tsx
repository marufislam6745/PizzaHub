// import Image from 'next/image';
// import React from 'react';

// const Subscribe = () => {
//     return (
//         <div>
//             <div>
//                 <Image src={'/pizza.jpg'} alt='pizza' width={400} height={500}></Image>
//             </div>
//             <div>
//                 <h2 className="text-2xl sm:text-3xl font-bold">
//                     Get 20% Off Your First Order!
//                 </h2>
//                 <p className="text-red-100 mt-2 text-sm">
//                     Subscribe to get special offers and exclusive deals.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Subscribe; 



import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-10">
            <div className="relative max-w-6xl mx-auto min-h-70 sm:min-h-75 rounded-3xl overflow-hidden flex items-center justify-center">

                {/* Background Image */}
                <Image
                    src="/pizza.jpg"
                    alt="Delicious food"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1152px"
                    className="object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/55"></div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-2xl px-5 sm:px-8 py-10 text-center">

                    <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                        Get 20% Off Your First Order!
                    </h2>

                    <p className="text-white/90 mt-2 mb-5 text-sm sm:text-base md:text-lg">
                        Subscribe today for special offers and exclusive deals.
                    </p>

                    <form className="flex items-center bg-white rounded-full p-1.5 sm:p-2 shadow-lg">

                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="w-full min-w-0 bg-transparent outline-none border-none px-4 sm:px-5 text-sm text-gray-800 placeholder:text-gray-400"
                        />

                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 px-5 sm:px-7 py-3 rounded-full text-sm font-semibold transition duration-300 shrink-0"
                        >
                            Subscribe
                            <ArrowRight size={17} />
                        </button>

                    </form>

                </div>
            </div>
        </section>
    );
}
