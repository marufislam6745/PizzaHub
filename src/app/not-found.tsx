'use client'
import React from 'react';
import Link from 'next/link';
import {
    SearchX,
    Home,
    ArrowLeft,
    Compass
} from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">

            {/* Background Decorations */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-100/50 blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-gray-200/60 blur-3xl"></div>

            <div className="relative z-10 w-full max-w-xl text-center">

                {/* Icon */}
                <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-3xl border border-red-100 bg-white shadow-xl shadow-red-100/50 sm:h-32 sm:w-32">
                    <SearchX className="h-14 w-14 text-red-500 sm:h-16 sm:w-16" />

                    <span className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg">
                        <Compass size={19} />
                    </span>
                </div>

                {/* Error Code */}
                <p className="mb-2 text-sm font-bold uppercase tracking-[5px] text-red-500">
                    Page Not Found
                </p>

                <h1 className="mb-3 text-7xl font-black tracking-tighter text-red-600 sm:text-8xl md:text-9xl">
                    404
                </h1>

                {/* Heading */}
                <h2 className="mb-4 text-2xl font-bold text-red-600 sm:text-3xl">
                    Oops! Lost Your Way?
                </h2>

                <p className="mx-auto mb-9 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
                    The page you`re looking for doesn`t exist or may have
                    been moved. Don`t worry, let`s get you back on track.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">

                    <Link
                        href="/"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1 sm:w-auto"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-red-600 sm:w-auto"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>

                </div>

                {/* Footer */}
                <div className="mt-14 border-t border-gray-200 pt-6">
                    <p className="text-xs font-medium tracking-wide text-gray-400 sm:text-sm">
                        ERROR 404 · PAGE NOT FOUND
                    </p>
                </div>

            </div>
        </div>
    );
};

export default NotFoundPage;
