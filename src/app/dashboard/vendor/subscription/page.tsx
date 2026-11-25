
'use client';

import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const SubscriptionPage = () => {

    const [selectedPlan, setSelectedPlan] = useState('');

    const handleFreePlan = () => {
        setSelectedPlan('free');
        console.log('Selected Plan: Free');
    };

    const handlePremiumPlan = () => {
        setSelectedPlan('premium');
        console.log('Selected Plan: Premium');
    };

    return (
        <div className="min-h-screen bg-[#faf8f2] px-4 py-8 md:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div>
                    <p className="text-xs font-bold tracking-[2px] text-[#a85a50]">
                        YOUR PIZZERIA
                    </p>

                    <h1 className="mt-2 font-serif text-3xl text-[#292722]">
                        Subscription
                    </h1>

                    <p className="mt-2 text-xs text-gray-500">
                        Here`s what`s happening at your shop today.
                    </p>
                </div>

                {/* Title */}
                <div className="mx-auto mb-7 mt-10 max-w-2xl text-center">

                    <p className="text-xs font-bold tracking-[2px] text-[#a84c40]">
                        PLANS THAT RISE WITH YOU
                    </p>

                    <h2 className="mt-3 font-serif text-3xl text-[#292722] sm:text-5xl">
                        Make room for <span className="italic text-[#ac5145]">more.</span>
                    </h2>

                    <p className="mt-3 text-xs text-gray-500 sm:text-sm">
                        Choose a plan that fits your shop. Demo checkout—no payment is collected.
                    </p>

                </div>

                {/* Pricing Cards */}
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">

                    {/* FREE PLAN */}
                    <div className="flex flex-col rounded-xl border border-[#e4dfd5] bg-white p-6 sm:p-8">

                        <p className="text-xs font-bold tracking-[2px] text-[#a85a50]">
                            THE STARTER
                        </p>

                        <h3 className="mt-3 font-serif text-4xl text-[#292722]">
                            Free
                        </h3>

                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="font-serif text-4xl">$0</span>
                            <span className="text-xs text-gray-500">/ forever</span>
                        </div>

                        <p className="mt-1 text-xs text-gray-500">
                            For the neighborhood shop getting started.
                        </p>

                        {/* Features */}
                        <div className="mt-7 flex-1 space-y-5">

                            {[
                                'Up to 3 active menu items',
                                'Vendor dashboard',
                                'Order management'
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Check size={15} className="text-gray-500" />
                                    <span className="text-xs text-gray-600">
                                        {item}
                                    </span>
                                </div>
                            ))}

                        </div>

                        {/* Free Button */}
                        <Link href={'/dashboard/vendor/add-menu'}>
                            <button
                                onClick={handleFreePlan}
                                className={`mt-7 w-full rounded-lg border px-4 py-3.5 text-xs font-bold transition ${selectedPlan === 'free'
                                    ? 'border-[#a94335] bg-[#a94335] text-white'
                                    : 'border-[#d9d5ce] bg-white text-gray-800 hover:bg-gray-50'
                                    }`}
                            >
                                {selectedPlan === 'free' ? "Selected Free Plan ✓" : "Select Free Plan"}
                            </button>
                        </Link>

                    </div>


                    {/* PREMIUM PLAN */}
                    <div className="relative flex flex-col rounded-xl border border-[#a94335] bg-[#ad4436] p-6 text-white sm:p-8">

                        {/* Popular Badge */}
                        <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-[#f6c5ae] px-3 py-2 text-[9px] font-bold text-[#773c2e]">
                            <Sparkles size={12} />
                            MOST POPULAR
                        </div>

                        <p className="text-xs font-bold tracking-[2px] text-[#f2c3b4]">
                            THE FULL OVEN
                        </p>

                        <h3 className="mt-3 font-serif text-4xl">
                            Premium
                        </h3>

                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="font-serif text-4xl">$19</span>
                            <span className="text-xs text-[#f3c9bc]">/ month</span>
                        </div>

                        <p className="mt-1 text-xs text-[#f2d2c9]">
                            For the shop ready to serve a little more.
                        </p>

                        {/* Features */}
                        <div className="mt-7 flex-1 space-y-5">

                            {[
                                'Unlimited active menu items',
                                'Premium vendor badge',
                                'Featured menu placement',
                                'Everything in Free'
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Check size={15} className="text-[#f6c5ae]" />
                                    <span className="text-xs text-[#f8e6e0]">
                                        {item}
                                    </span>
                                </div>
                            ))}

                        </div>

                        {/* Premium Button */}
                        <Link href={'#'}>
                            <button
                                onClick={handlePremiumPlan}
                                className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg border border-[#e6a696] bg-[#e6a696] px-4 py-3.5 text-xs font-bold text-[#74382e] transition hover:bg-[#f0b7a8]"
                            >
                                {selectedPlan === 'premium'
                                    ? 'Selected Premium Plan'
                                    : 'Your`re Premium Plan'
                                }

                                <ArrowRight size={15} />
                            </button>
                        </Link>

                        <p className="mt-3 text-center text-[10px] text-[#f2d0c6]">
                            Demo only. No actual payment is processed.
                        </p>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default SubscriptionPage;
