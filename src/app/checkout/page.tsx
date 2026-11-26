
import Link from "next/link";
import {
    Crown,
    CheckCircle2,
    ShieldCheck,
    Lock,
    CreditCard,
    ArrowLeft,
    Sparkles,
    Zap,
} from "lucide-react";


export default async function BrandSubscriptionPage({ searchParams }: { searchParams: Promise<{ canceled?: string }> }) {

    const { canceled } = await searchParams

    if (canceled) {
        console.log(
            'Order canceled -- continue to shop around and check out when you\'re ready.'
        )
    }


    const features = [
        "Premium Brand Dashboard Access",
        "Unlimited Menu Item Management",
        "Manage Customer Orders",
        "Brand Profile Customization",
        "Premium Brand Visibility",
        "Priority Customer Support",
    ];

    return (
        <main className="min-h-screen bg-[#f8f9fc] px-4 py-10 md:py-16">

            <div className="max-w-6xl mx-auto">

                {/* Back Button */}

                <Link
                    href="/dashboard/vendor/subscription"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition mb-10"
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>

                {/* Header */}

                <div className="text-center max-w-2xl mx-auto mb-12">

                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-5">
                        <Sparkles size={16} />
                        Exclusive Brand Membership
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        Grow Your Brand With{" "}
                        <span className="text-orange-500">
                            PizzaHub
                        </span>
                    </h1>

                    <p className="text-gray-500 mt-4 leading-7">
                        Unlock premium features, manage your pizza business,
                        and reach more customers with PizzaHub Brand Membership.
                    </p>

                </div>

                {/* Subscription Content */}

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">

                    {/* Left Side */}

                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm">

                        <div className="flex items-center gap-4 mb-8">

                            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">
                                <Crown size={34} />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Brand Premium
                                </h2>

                                <p className="text-gray-500 text-sm mt-1">
                                    Everything your brand needs
                                </p>
                            </div>

                        </div>

                        {/* Price */}

                        <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-7 text-white mb-8">

                            <p className="text-orange-100 font-medium text-sm">
                                Premium Subscription
                            </p>

                            <div className="flex items-end gap-2 mt-3">
                                <h2 className="text-6xl font-extrabold">
                                    $29
                                </h2>

                                <span className="text-orange-100 mb-2">
                                    USD
                                </span>
                            </div>

                            <p className="text-orange-100 text-sm mt-3">
                                Brand membership access
                            </p>

                            <div className="flex items-center gap-2 mt-6 text-sm">
                                <CheckCircle2 size={18} />
                                Premium Brand Account
                            </div>

                        </div>

                        {/* Features */}

                        <h3 className="text-lg font-bold text-gray-900 mb-5">
                            Premium Features
                        </h3>

                        <div className="space-y-5">

                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2
                                        size={20}
                                        className="text-green-500 shrink-0"
                                    />

                                    <span className="text-gray-600 text-sm">
                                        {feature}
                                    </span>
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Right Side Payment */}

                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm flex flex-col">

                        <div className="mb-8">

                            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center mb-5">
                                <CreditCard size={28} />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900">
                                Subscription Payment
                            </h2>

                            <p className="text-gray-500 text-sm mt-2">
                                Complete your brand membership payment.
                            </p>

                        </div>

                        {/* Payment Summary */}

                        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 mb-7">

                            <div className="flex justify-between items-center mb-5">

                                <div>
                                    <p className="font-bold text-gray-900">
                                        Brand Premium
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Premium Membership
                                    </p>
                                </div>

                                <span className="font-bold text-gray-900">
                                    $29.00
                                </span>

                            </div>

                            <div className="border-t border-gray-200 pt-5 flex justify-between items-center">

                                <span className="font-semibold text-gray-700">
                                    Total Amount
                                </span>

                                <span className="text-3xl font-extrabold text-orange-500">
                                    $29.00
                                </span>

                            </div>

                        </div>

                        {/* Security */}

                        <div className="space-y-5 mb-8">

                            <div className="flex items-center gap-3">
                                <ShieldCheck
                                    size={21}
                                    className="text-green-500"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        Secure Payment
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Your payment will be processed securely.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Lock
                                    size={21}
                                    className="text-green-500"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        Protected Information
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Your payment details stay protected.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Zap
                                    size={21}
                                    className="text-orange-500"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        Premium Access
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Get access after successful payment.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Pay Button */}

                        <div className="mt-auto">

                            <form action="/api/checkout_sessions" method="POST">
                                <section>
                                    <button type="submit"
                                        role="link"
                                        className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-orange-100"
                                    >
                                        <Lock size={19} />

                                        Subscribe Now - $29
                                    </button>
                                </section>
                            </form>

                            <p className="text-center text-xs text-gray-400 mt-4">
                                Secure checkout powered by Stripe (Coming Soon)
                            </p>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="text-center mt-12">

                    <p className="text-sm text-gray-400">
                        © 2026 PizzaHub. All rights reserved.
                    </p>

                </div>

            </div>

        </main>
    );
}
