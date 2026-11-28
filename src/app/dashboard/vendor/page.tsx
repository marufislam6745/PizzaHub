
import { customerOrder } from "@/lib/action/item";
import { getPremiumId } from "@/lib/api/premium";
import { auth } from "@/lib/auth";
import { authFetch } from "@/lib/core/server";
import { IPizza } from "@/type";
import {
    Pizza,
    UtensilsCrossed,
    Clock,
    CheckCircle,
    Crown,
    TrendingUp,
    ArrowUpRight
} from "lucide-react";
import { headers } from "next/headers";

interface OrderItem {
    title: string,
    status: 'accept' | 'pending',
    description: string,
    icon: string
}

export default async function VendorDashboard() {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = await getPremiumId(session?.user.id || '')

    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/pizza/${session?.user.email}`);
    const myitem: IPizza[] = await res.json();

    const totalMenuItems = myitem.length;
    const activeMenuItems = myitem.filter(
        (item) => item.status === "active"
    ).length;
    const rejectMenuItems = myitem.filter(
        (item) => item.status === "reject"
    ).length;

    const order = await customerOrder(session?.user.id || '')
    const pendingorderItems = order.filter(
        (item: OrderItem) => item.status === "pending"
    ).length;
    const acceptorderItems = order.filter(
        (item: OrderItem) => item.status === "accept"
    ).length;


    const stats = [
        {
            title: "Total Menu Items",
            value: totalMenuItems,
            description: "All menu items",
            icon: UtensilsCrossed,
            color: "bg-orange-100 text-orange-600",
        },
        {
            title: "Active Menu Items",
            value: activeMenuItems,
            description: "Currently available",
            icon: Pizza,
            color: "bg-green-100 text-green-600",
        },
        {
            title: "Pending Orders",
            value: pendingorderItems,
            description: "Waiting for confirmation",
            icon: Clock,
            color: "bg-yellow-100 text-yellow-600",
        },
        {
            title: "Accepted Orders",
            value: acceptorderItems,
            description: "Successfully accepted",
            icon: CheckCircle,
            color: "bg-blue-100 text-blue-600",
        },
    ];

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">

            <div className="mx-auto max-w-7xl space-y-8">

                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
                            PizzaHub Vendor Panel
                        </p>
                        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                            Dashboard Overview
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Manage your menu, orders and subscription.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                                        <Icon size={24} />
                                    </div>

                                    <ArrowUpRight
                                        size={20}
                                        className="text-gray-300 transition-colors group-hover:text-orange-500"
                                    />
                                </div>

                                <p className="mt-5 text-sm font-medium text-gray-500">
                                    {item.title}
                                </p>

                                <h2 className="mt-1 text-3xl font-bold text-gray-900">
                                    {item.value}
                                </h2>

                                <div className="mt-4 flex items-center justify-between gap-2">
                                    <p className="text-xs text-gray-400">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Subscription Plan */}
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-orange-200 via-red-100 to-orange-300 p-6 text-orange-500 shadow-lg sm:p-8">

                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10"></div>
                    <div className="absolute -bottom-16 right-32 h-40 w-40 rounded-full bg-white/10"></div>

                    {user.premium ?
                        (<div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">

                            <div>
                                <div className="flex items-center gap-2">
                                    <Crown size={23} />
                                    <span className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                                        Current Subscription
                                    </span>
                                </div>

                                <h2 className="mt-3 text-3xl font-bold">
                                    Premium Plan
                                </h2>

                                <p className="mt-2 max-w-md text-sm leading-6 text-orange-500">
                                    Enjoy unlimited menu management, order tracking
                                    and premium vendor features.
                                </p>

                                <div className="mt-5 flex flex-wrap gap-3">
                                    <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-medium">
                                        Unlimited Menu Items
                                    </span>
                                    <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-medium">
                                        Priority Support
                                    </span>
                                </div>
                            </div>

                            <div className="rounded-xl border border-orange-300 bg-white/10 p-5 backdrop-blur-md md:min-w-52">
                                <p className="text-sm text-orange-500">
                                    Subscription Status
                                </p>
                                <h3 className="mt-2 text-2xl font-bold">
                                    Active
                                </h3>
                                <p className="mt-2 text-xs text-orange-500">
                                    Your plan is currently running.
                                </p>
                            </div>

                        </div>) :
                        (<div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">

                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                                        Current Subscription
                                    </span>
                                </div>

                                <h2 className="mt-3 text-3xl font-bold">
                                    Normal User
                                </h2>

                                <p className="mt-2 max-w-md text-sm leading-6 text-orange-500">
                                    You can create and access a standard vendor account at no cost.
                                </p>

                                <div className="mt-5 flex flex-wrap gap-3">
                                    <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-medium">
                                        Only 3 Menu Items
                                    </span>
                                    <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-medium">
                                        Priority not Support
                                    </span>
                                </div>
                            </div>

                            {user.premium &&
                                <div className="rounded-xl border border-orange-300 bg-white/10 p-5 backdrop-blur-md md:min-w-52">
                                    <p className="text-sm text-orange-500">
                                        Subscription Status
                                    </p>
                                    <h3 className="mt-2 text-2xl font-bold">
                                        Active
                                    </h3>
                                    <p className="mt-2 text-xs text-orange-500">
                                        Your plan is currently running.
                                    </p>
                                </div>
                            }

                        </div>)}
                </div>

                {/* Quick Overview */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">
                                Order Summary
                            </h3>
                            <TrendingUp className="text-orange-500" size={22} />
                        </div>

                        <div className="mt-6 space-y-5">
                            <div>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span className="text-gray-500">Pending Orders</span>
                                    <span className="font-bold text-yellow-600">{pendingorderItems}</span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                    <div className="h-full w-[35%] rounded-full bg-yellow-400"></div>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span className="text-gray-500">Accepted Orders</span>
                                    <span className="font-bold text-green-600">{acceptorderItems}</span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                    <div className="h-full w-[80%] rounded-full bg-green-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900">
                            Menu Overview
                        </h3>

                        <div className="mt-6 flex items-center gap-5">
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-10 border-orange-500 bg-orange-50">
                                <span className="text-xl font-bold text-gray-900">
                                    75%
                                </span>
                            </div>

                            <div className="space-y-3 text-sm">
                                <p className="flex items-center gap-2 text-gray-600">
                                    <span className="h-3 w-3 rounded-full bg-orange-500"></span>
                                    Active Items: {activeMenuItems}
                                </p>
                                <p className="flex items-center gap-2 text-gray-600">
                                    <span className="h-3 w-3 rounded-full bg-gray-300"></span>
                                    Inactive Items: {rejectMenuItems }
                                </p>
                                <p className="font-semibold text-gray-900">
                                    Total Items: {totalMenuItems}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
