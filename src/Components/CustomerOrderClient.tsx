
'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    ShoppingBag,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronDown,
    Loader2,
    Pizza,
} from 'lucide-react';

import { updateOrderStatus } from '@/lib/action/item';

interface Order {
    _id: string;
    title?: string;
    image?: string;
    useremail?: string;
    address?: string;
    deliveryAddress?: string;
    deliveryDate?: string;
    status?: string;
}

interface Props {
    initialOrders: Order[];
}

type OrderActionStatus = 'accept' | 'reject';

const CustomerOrderClient = ({ initialOrders }: Props) => {
    const router = useRouter();

    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [, startTransition] = useTransition();
    const [error, setError] = useState('');

    // Backend Status Update Function
    const handleStatusChange = async (
        id: string,
        nextStatus: OrderActionStatus
    ) => {
        const previousOrders = orders;

        try {
            setLoadingId(id);
            setError('');

            // Optimistic UI update so status changes immediately on selection
            setOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order._id === id
                        ? { ...order, status: nextStatus }
                        : order
                )
            );

            // Update status in backend database
            const result = await updateOrderStatus(id, { status: nextStatus });

            // Check backend response
            if (!result || result.success === false) {
                throw new Error(
                    result?.message || 'Unable to update order status'
                );
            }

            // Sync with returned status/order if backend provides one
            const confirmedStatus: string =
                result?.data?.status ||
                result?.order?.status ||
                result?.status ||
                nextStatus;

            setOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order._id === id
                        ? { ...order, status: confirmedStatus }
                        : order
                )
            );

            // Fetch updated database data from Server Component
            startTransition(() => {
                router.refresh();
            });
        } catch (err) {
            console.error('Order status update:', err);

            // Rollback UI state if backend update fails
            setOrders(previousOrders);

            setError(
                err instanceof Error
                    ? err.message
                    : 'Something went wrong while updating order status!'
            );
        } finally {
            setLoadingId(null);
        }
    };

    // Status Badge Style
    const getStatusStyle = (status?: string) => {
        switch (status?.toLowerCase()) {
            case 'accept':
            case 'accepted':
                return 'bg-green-50 text-green-700 border-green-200';

            case 'reject':
            case 'rejected':
                return 'bg-red-50 text-red-600 border-red-200';

            default:
                return 'bg-amber-50 text-amber-700 border-amber-200';
        }
    };

    // Status Icon
    const getStatusIcon = (status?: string) => {
        switch (status?.toLowerCase()) {
            case 'accept':
            case 'accepted':
                return <CheckCircle2 size={14} />;

            case 'reject':
            case 'rejected':
                return <XCircle size={14} />;

            default:
                return <Clock size={14} />;
        }
    };

    // Date Format
    const formatDate = (date?: string) => {
        if (!date) return 'Not specified';

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return 'Not specified';
        }

        return parsedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const pendingOrders = orders.filter(
        (order) =>
            !order.status ||
            order.status.toLowerCase() === 'pending'
    ).length;

    const acceptedOrders = orders.filter((order) => {
        const s = order.status?.toLowerCase();
        return s === 'accept' || s === 'accepted';
    }).length;

    const rejectedOrders = orders.filter((order) => {
        const s = order.status?.toLowerCase();
        return s === 'reject' || s === 'rejected';
    }).length;

    return (
        <div className="min-h-screen px-4 py-8 md:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div>
                        <p className="mb-2 text-xs font-bold tracking-[3px] text-[#a75c52]">
                            YOUR PIZZERIA
                        </p>

                        <h1 className="font-serif text-3xl font-bold text-[#252525] md:text-4xl">
                            Customer Orders
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Manage your customer orders and delivery requests.
                        </p>
                    </div>

                    {/* Summary */}
                    <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-xl border bg-white p-3 shadow-sm">
                            <ShoppingBag size={19} className="text-[#b65e4f]" />
                            <p className="mt-2 text-xs text-gray-500">Total</p>
                            <h3 className="text-xl font-bold text-gray-800">
                                {orders.length}
                            </h3>
                        </div>

                        <div className="rounded-xl border bg-white p-3 shadow-sm">
                            <Clock size={19} className="text-amber-600" />
                            <p className="mt-2 text-xs text-gray-500">Pending</p>
                            <h3 className="text-xl font-bold text-amber-600">
                                {pendingOrders}
                            </h3>
                        </div>

                        <div className="rounded-xl border bg-white p-3 shadow-sm">
                            <CheckCircle2 size={19} className="text-green-600" />
                            <p className="mt-2 text-xs text-gray-500">Accepted</p>
                            <h3 className="text-xl font-bold text-green-600">
                                {acceptedOrders}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Orders Container */}
                <div className="overflow-hidden rounded-2xl border border-[#eee7dc] bg-white shadow-sm">
                    {/* Section Header */}
                    <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center md:p-6">
                        <div>
                            <h2 className="font-serif text-xl font-bold text-[#292929]">
                                Orders for your shop
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Review and manage your incoming orders.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs font-semibold">
                            <span className="rounded-full bg-amber-50 px-3 py-2 text-amber-700">
                                {pendingOrders} Pending
                            </span>

                            <span className="rounded-full bg-red-50 px-3 py-2 text-red-600">
                                {rejectedOrders} Rejected
                            </span>
                        </div>
                    </div>

                    {/* Order List */}
                    <div className="divide-y divide-gray-100">
                        {orders.length > 0 ? (
                            orders.map((order) => {
                                const normalizedStatus = order.status?.toLowerCase();
                                const isPending =
                                    !normalizedStatus || normalizedStatus === 'pending';
                                const isLoading = loadingId === order._id;

                                return (
                                    <div
                                        key={order._id}
                                        className="p-5 transition hover:bg-[#fdfcf9] md:p-6"
                                    >
                                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                            {/* Order Information */}
                                            <div className="flex min-w-0 items-start gap-4">
                                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f5f1eb]">
                                                    {order.image ? (
                                                        <Image
                                                            src={order.image}
                                                            alt={order.title || 'Pizza'}
                                                            fill
                                                            sizes="80px"
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-[#b65e4f]">
                                                            <Pizza size={32} />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <h3 className="truncate text-base font-bold text-[#292929] md:text-lg">
                                                        {order.title || 'Pizza Item'}
                                                    </h3>

                                                    <div className="mt-2 space-y-2">
                                                        <p className="flex items-center gap-2 text-xs text-gray-500">
                                                            {order.useremail || 'Customer'}
                                                        </p>

                                                        <div className="flex flex-wrap items-center gap-3">
                                                            <p className="flex items-start gap-2 text-xs text-gray-500">
                                                                {order.address || order.deliveryAddress || 'No address'}
                                                            </p>

                                                            <p className="flex items-center gap-2 text-xs text-gray-500">
                                                                Delivery: {formatDate(order.deliveryDate)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status and Dropdown */}
                                            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-bold capitalize ${getStatusStyle(order.status)}`}
                                                >
                                                    {getStatusIcon(order.status)}
                                                    {order.status || 'Pending'}
                                                </span>

                                                {/* Dropdown */}
                                                {isPending && (
                                                    <div className="relative">
                                                        <select
                                                            value=""
                                                            disabled={isLoading}
                                                            onChange={(e) => {
                                                                const value = e.target.value;

                                                                if (
                                                                    value === 'accept' ||
                                                                    value === 'reject'
                                                                ) {
                                                                    handleStatusChange(
                                                                        order._id,
                                                                        value
                                                                    );
                                                                }
                                                            }}
                                                            className="min-w-38 cursor-pointer appearance-none rounded-xl border border-[#e9e5dc] bg-white py-2.5 pl-3 pr-9 text-xs font-bold text-gray-700 outline-none transition hover:border-[#b65e4f] focus:border-[#b65e4f] disabled:opacity-50"
                                                        >
                                                            <option value="" disabled>
                                                                {isLoading
                                                                    ? 'Updating...'
                                                                    : 'Change Status'}
                                                            </option>

                                                            <option value="accept">
                                                                Accept Order
                                                            </option>

                                                            <option value="reject">
                                                                Reject Order
                                                            </option>
                                                        </select>

                                                        {isLoading ? (
                                                            <Loader2
                                                                size={15}
                                                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-[#b65e4f]"
                                                            />
                                                        ) : (
                                                            <ChevronDown
                                                                size={15}
                                                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="px-5 py-20 text-center">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#fff1eb] text-[#b65e4f]">
                                    <Pizza size={38} />
                                </div>

                                <h3 className="font-serif text-2xl font-bold text-[#292929]">
                                    No orders yet
                                </h3>

                                <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                                    Customer orders will appear here when someone places an order at your shop.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle2 size={14} />
                    <p>
                        Order status is saved in the database.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomerOrderClient;