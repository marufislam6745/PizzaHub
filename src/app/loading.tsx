
import React from 'react';
import { LoaderCircle, Sparkles } from 'lucide-react';

const loading = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 px-4 py-10">

            <div className="w-full max-w-md text-center">

                {/* Loading Icon */}
                <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
                    <div className="absolute inset-0 animate-ping rounded-full bg-red-100 opacity-50"></div>

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-red-600 shadow-xl shadow-gray-900/20">
                        <LoaderCircle className="h-10 w-10 animate-spin text-white" />
                    </div>

                    <Sparkles className="absolute -right-2 -top-1 h-6 w-6 animate-pulse text-red-500" />
                </div>

                {/* Loading Text */}
                <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    Loading<span className="animate-pulse text-red-500">...</span>
                </h2>

                <p className="mb-8 text-sm text-gray-500 sm:text-base">
                    Please wait while we prepare everything for you.
                </p>

                {/* Progress Bar */}
                <div className="mx-auto mb-4 h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-red-500"></div>
                </div>

                <p className="text-xs font-medium uppercase tracking-[3px] text-gray-400">
                    Please wait
                </p>

                {/* Skeleton Loading */}
                <div className="mt-12 space-y-4">
                    <div className="h-3 w-3/4 animate-pulse rounded-full bg-gray-200 mx-auto"></div>
                    <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-200 mx-auto"></div>
                </div>

            </div>
        </div>
    );
};

export default loading;
