import React from 'react';
import {
    Users,
    Store,
    UserRound,
    Pizza,
    Clock,
    Wallet,
    TrendingUp,
    ShoppingBag
} from 'lucide-react';

interface OrderItem {
    title: string,
    role: 'vendor' | 'customer',
    status: 'pending'
    icon: string
}

const AdminDashboardpage = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    const users = await res.json()

    const menu = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pizza`)
    const item = await menu.json()

    // User Statistics
    const totalUsers = users.length;

    const totalVendors = users.filter(
        (user: OrderItem) => user.role === "vendor"
    ).length;
    const totalCustomers = users.filter(
        (user: OrderItem) => user.role === "customer"
    ).length;

    // Menu Statistics
    const totalMenu = item.length;

    const pendingMenu = item.filter(
        (pizza: OrderItem) => pizza.status?.toLowerCase() === "pending"
    ).length;

    const totalTransactions = 125;

    const stats = [
        {
            title: "Total Registered Users",
            value: totalUsers,
            icon: Users,
            color: "bg-blue-100 text-blue-600"
        },
        {
            title: "Total Vendors",
            value: totalVendors,
            icon: Store,
            color: "bg-purple-100 text-purple-600"
        },
        {
            title: "Total Customers",
            value: totalCustomers,
            icon: UserRound,
            color: "bg-green-100 text-green-600"
        },
        {
            title: "Total Menu Items",
            value: totalMenu,
            icon: Pizza,
            color: "bg-orange-100 text-orange-600"
        },
        {
            title: "Pending Menu Items",
            value: pendingMenu,
            icon: Clock,
            color: "bg-red-100 text-red-600"
        },
        {
            title: "Total Transactions",
            value: totalTransactions,
            icon: Wallet,
            color: "bg-yellow-100 text-yellow-700"
        }
    ];

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-bold uppercase tracking-[3px] text-orange-600">
                        PizzaHub Administration
                    </p>

                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Admin Dashboard
                        <span className="text-orange-500">.</span>
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Manage your pizza business from one place.
                    </p>
                </div>

                {/* Welcome Banner */}
                <div className="relative mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-orange-50 via-orange-100 to-red-100 p-6 text-orange-500 shadow-xl sm:p-9">

                    <div className="relative z-10 max-w-xl">
                        <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase">
                            Welcome Admin
                        </span>

                        <h2 className="mt-5 text-2xl font-extrabold sm:text-3xl">
                            Delicious Business,
                            <br />
                            Powerful Management!
                        </h2>

                        <p className="mt-3 text-sm text-orange-500">
                            Monitor your users, vendors, menu items and business activities with PizzaHub.
                        </p>
                    </div>

                    <Pizza
                        size={190}
                        className="absolute -right-5 -bottom-10 rotate-12 text-white/15"
                    />
                </div>

                {/* Statistics */}
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Business Overview
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Your business statistics at a glance.
                        </p>
                    </div>

                    <TrendingUp className="text-orange-500" size={25} />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {stats.map((card, index) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={index}
                                className="group rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl"
                            >
                                <div className="flex items-center justify-between">

                                    <div className={`rounded-2xl p-3 ${card.color}`}>
                                        <Icon size={25} />
                                    </div>

                                    <ShoppingBag
                                        size={20}
                                        className="text-gray-200 transition group-hover:text-orange-400"
                                    />
                                </div>

                                <p className="mt-5 text-sm font-medium text-gray-500">
                                    {card.title}
                                </p>

                                <h3 className="mt-2 text-3xl font-extrabold text-gray-900">
                                    {card.value.toLocaleString()}
                                </h3>

                                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-orange-50">
                                    <div className="h-full w-2/3 rounded-full bg-linear-to-r from-orange-400 to-red-500" />
                                </div>

                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
};

export default AdminDashboardpage;