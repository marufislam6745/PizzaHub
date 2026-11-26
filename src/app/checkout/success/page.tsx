// import { redirect } from 'next/navigation'
// import { stripe } from '@/lib/stripe'
// import { checkoutVerify } from '@/lib/action/item'



// export default async function CheckoutSuccssspage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
//     const { session_id } = await searchParams

//     if (!session_id)
//         throw new Error('Please provide a valid session_id (`cs_test_...`)')

//     const {
//         status,
//         payment_status,
//         customer_email,
//         metadata,
//         payment_intent,
//     } = await stripe.checkout.sessions.retrieve(session_id, {
//         expand: ['line_items', 'payment_intent']
//     })

//     if (status === 'open') {
//         return redirect('/')
//     }

//     if (status === 'complete' && payment_status === "paid") {
//         console.log({
//             status,
//             payment_status,
//             customer_email,
//             metadata,
//             payment_intent,
//         })

//         const result=await checkoutVerify(session_id)
//         console.log({result})
//         return (
//             <section id="success">
//                 <p>
//                     We appreciate your business! A confirmation email will be sent to{' '}
//                     {customer_email}. If you have any questions, please email{' '}
//                     <a href="mailto:orders@example.com">orders@example.com</a>.
//                 </p>
//             </section>
//         )
//     }
// }


import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { checkoutVerify } from "@/lib/action/item";
import {
    CheckCircle2,
    ShoppingBag,
    Mail,
    ShieldCheck,
    ArrowRight,
    Pizza,
    Sparkles,
} from "lucide-react";

export default async function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const { session_id } = await searchParams;

    if (!session_id) {
        redirect("/");
    }

    const {
        status,
        payment_status,
        customer_email,
        metadata,
        payment_intent,
        amount_total,
        currency,
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"],
    });

    if (status === "open") {
        redirect("/");
    }

    if (status !== "complete" || payment_status !== "paid") {
        redirect("/");
    }

    const result = await checkoutVerify(session_id);

    console.log({
        status,
        payment_status,
        customer_email,
        metadata,
        payment_intent,
        result,
    });

    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency?.toUpperCase() || "USD",
    }).format((amount_total || 0) / 100);

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-12">

            <div className="max-w-2xl w-full">

                {/* Success Card */}

                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">

                    {/* Top Section */}

                    <div className="bg-linear-to-r from-orange-500 to-orange-600 px-6 py-12 text-center text-white relative overflow-hidden">

                        <div className="absolute top-5 left-8 opacity-20">
                            <Sparkles size={35} />
                        </div>

                        <div className="absolute bottom-5 right-8 opacity-20">
                            <Pizza size={55} />
                        </div>

                        <div className="relative z-10">

                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <CheckCircle2
                                    size={55}
                                    className="text-green-500"
                                />
                            </div>

                            <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest">
                                Payment Successful
                            </p>

                            <h1 className="text-3xl sm:text-4xl font-extrabold mt-3">
                                Thank You!
                            </h1>

                            <p className="text-orange-100 mt-3 max-w-md mx-auto text-sm sm:text-base leading-7">
                                Your payment has been completed successfully.
                                Thank you for choosing PizzaHub!
                            </p>

                        </div>
                    </div>

                    {/* Content */}

                    <div className="p-6 sm:p-10">

                        <div className="text-center mb-8">

                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                Your Payment is Confirmed
                            </h2>

                            <p className="text-gray-500 text-sm mt-2">
                                We`ve successfully received your payment.
                            </p>

                        </div>

                        {/* Payment Details */}

                        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 sm:p-6">

                            <div className="flex justify-between items-center pb-5 border-b border-gray-200">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Payment Status
                                    </p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>

                                        <span className="font-bold text-green-600">
                                            Paid Successfully
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                                    <ShieldCheck size={24} />
                                </div>

                            </div>

                            <div className="flex justify-between items-center py-5 border-b border-gray-200">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Amount Paid
                                    </p>

                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                                        {formattedAmount}
                                    </h3>
                                </div>

                                <div className="bg-orange-100 text-orange-500 p-3 rounded-xl">
                                    <ShoppingBag size={24} />
                                </div>

                            </div>

                            <div className="pt-5">

                                <p className="text-sm text-gray-500 mb-2">
                                    Confirmation Email
                                </p>

                                <div className="flex items-center gap-2 text-gray-800 font-medium text-sm break-all">
                                    <Mail size={18} className="text-orange-500 shrink-0" />
                                    {customer_email || "Email not available"}
                                </div>

                            </div>

                        </div>

                        {/* Email Message */}

                        <div className="mt-6 bg-orange-50 border border-orange-100 rounded-xl p-4">

                            <p className="text-sm text-orange-800 leading-6">
                                A confirmation email will be sent to your registered
                                email address. Please keep it for your records.
                            </p>

                        </div>

                        {/* Buttons */}

                        <div className="grid sm:grid-cols-2 gap-4 mt-8">

                            <Link
                                href="/"
                                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-5 rounded-xl transition-all shadow-lg shadow-orange-100"
                            >
                                <Pizza size={19} />
                                Back to Home
                            </Link>

                            <Link
                                href="/dashboard/vendor/add-menu"
                                className="flex items-center justify-center gap-2 border border-gray-200 hover:border-orange-500 hover:text-orange-500 text-gray-700 font-bold py-4 px-5 rounded-xl transition-all"
                            >
                                Add menu 
                                <ArrowRight size={19} />
                            </Link>

                        </div>

                        <p className="text-center text-xs text-gray-400 mt-8">
                            Thank you for being a part of PizzaHub!
                        </p>

                    </div>

                </div>

            </div>

        </main>
    );
}
