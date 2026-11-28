
import { getTransactions } from "@/lib/action/item";
import {
    CreditCard,
    Users,
    CalendarDays,
    DollarSign,
    Receipt,
} from "lucide-react";

export interface PaymentRecord {
    _id: string;
    sessionId: string;
    status: string;
    payment_status: string;
    customer_email: string;
    userId: string;
    payment_date: string;
    payment_intent: string;
    amount: number;
}



const TransactionsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>).toString();
    const result = await getTransactions(urlSearch);

    const transactions = Array.isArray(result) ? result : result?.data || [];

    const totalTransactions = transactions.length;

    const paidTransactions = transactions.filter(
        (item: PaymentRecord) => item.payment_status === "paid"
    ).length;

    const totalRevenue = transactions.filter((item: PaymentRecord) => item.payment_status === "paid")
        .reduce(
            (total: number, item: PaymentRecord) =>
                total + Number(item.amount || 0),
            0
        );

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                        PizzaHub Admin
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                        Transactions
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        Monitor vendor subscriptions and payment activities.
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-3 text-sm text-gray-600">
                    <Receipt size={18} className="text-orange-500" />
                    All Transactions
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Transactions</p>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2">
                                {totalTransactions}
                            </h2>
                        </div>
                        <div className="bg-orange-100 text-orange-500 p-3 rounded-xl">
                            <CreditCard size={25} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Successful Payments</p>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2">
                                {paidTransactions}
                            </h2>
                        </div>
                        <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                            <Users size={25} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Revenue</p>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2">
                                ${totalRevenue.toFixed(2)}
                            </h2>
                        </div>
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                            <DollarSign size={25} />
                        </div>
                    </div>
                </div>

            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex flex-col gap-5 border border-gray-100 bg-white p-5shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">

                    {/* Heading */}
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                                <span className="text-xl">💳</span>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                                    Payment History
                                </h2>
                                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                    View all vendor subscription transactions.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search Form */}
                    <form
                        action="/dashboard/admin/transactions"
                        method="GET"
                        className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl"
                    >
                        <input
                            type="text"
                            name="search"
                            defaultValue={
                                typeof search.search === "string" ? search.search : ""
                            }
                            placeholder="Search by vendor email transaction..."
                            className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                        />

                        <button
                            type="submit"
                            className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-orange-600 active:scale-95"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {transactions.length === 0 ? (
                    <div className="py-20 text-center">
                        <CreditCard size={45} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-800">
                            No Transactions Found
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                            Vendor payments will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">

                            <thead className="bg-gray-50">
                                <tr className="text-xs uppercase tracking-wider text-gray-500">
                                    <th className="px-6 py-4 font-semibold">Vendor Info</th>
                                    <th className="px-6 py-4 font-semibold">Plan</th>
                                    <th className="px-6 py-4 font-semibold">Amount</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Transaction Date</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {transactions.map((item: PaymentRecord) => (
                                    <tr
                                        key={item._id}
                                        className="hover:bg-orange-50/40 transition"
                                    >

                                        {/* Vendor */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3 min-w-47.5">
                                                <div className="w-11 h-11 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                                                    V
                                                </div>

                                                <div>
                                                    <p className="text-base text-black mt-1">
                                                        {item.customer_email || "No email"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Plan */}
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-xs font-semibold">
                                                <CreditCard size={14} />
                                                Premium
                                            </span>
                                        </td>

                                        {/* Amount */}
                                        <td className="px-6 py-5">
                                            <p className="font-bold text-gray-900">
                                                ${Number(item.amount || 0).toFixed(2)}
                                            </p>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-5">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${item.payment_status === "paid"
                                                    ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                {item.payment_status}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 min-w-32.5">
                                                <CalendarDays size={16} className="text-gray-400" />
                                                {item.payment_date
                                                    ? new Date(item.payment_date).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )
                                                    : "N/A"}
                                            </div>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                )}

            </div>

        </div>
    );
};

export default TransactionsPage;
