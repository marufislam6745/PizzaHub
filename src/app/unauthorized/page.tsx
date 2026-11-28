// import React from 'react';

// const UnauthorizedPage = () => {
//     return (
//         <div>
//             You are unauthorized
//         </div>
//     );
// };

// export default UnauthorizedPage; 
'use client'
import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Lock, ArrowLeft, Home } from 'lucide-react';

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-lg text-center">

                {/* Icon */}
                <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-red-100 sm:h-32 sm:w-32">
                    <div className="absolute inset-3 rounded-full border border-red-200"></div>
                    <ShieldAlert className="h-14 w-14 text-red-500 sm:h-16 sm:w-16" />
                    <span className="absolute -right-1 -top-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-gray-900 text-white">
                        <Lock size={16} />
                    </span>
                </div>

                {/* Content */}
                <p className="mb-3 text-sm font-bold uppercase tracking-[4px] text-red-500">
                    Access Denied
                </p>

                <h1 className="mb-4 text-6xl font-extrabold tracking-tight text-red-600 sm:text-7xl md:text-8xl">
                    403
                </h1>

                <h2 className="mb-3 text-2xl font-bold text-red-600 sm:text-3xl">
                    You are unauthorized!
                </h2>

                <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
                    Sorry, you dont have permission to access this page.
                    Please contact the administrator if you believe this is a mistake.
                </p>

                {/* Buttons */}
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-red-600 hover:bg-gray-50"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-12 border-t border-gray-200 pt-6">
                    <p className="text-xs text-gray-400 sm:text-sm">
                        Error Code: 403 · Forbidden Access
                    </p>
                </div>

            </div>
        </div>
    );
};

export default UnauthorizedPage;
