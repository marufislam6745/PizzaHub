'use client'
import { orderItem } from '@/lib/action/item';
import { authClient } from '@/lib/auth-client';
import { IPizza } from '@/type';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';


export interface IOrderPreview {
    itemId: string,
    title: string;
    price: number;
    image:string,
    deliveryDate: string;
    address: string;
    orderedAt: string;
    status: string,
    vendorId: string,
    vendoremail: string,
    userId: string,
    useremail: string,
    category:string
}

const OrderNow = ({ item }: { item: IPizza }) => {
    const router = useRouter()
    const [orderPreview, setOrderPreview] = useState<IOrderPreview | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const orderdata = Object.fromEntries(formData.entries())
        //console.log(orderdata)

        const orderedAt = new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });

        setOrderPreview({
            itemId: item._id,
            title: item.title,
            image:item.image,
            price: item.price,
            category:item.category,
            deliveryDate: String(orderdata.deliveryDate || ''),
            address: String(orderdata.address || ''),
            orderedAt,
            vendorId: item.vendorId,
            vendoremail: item.email,
            status: "pending",
            userId: session?.user.id || '',
            useremail: session?.user.email || '',
        });

        setIsConfirmed(false);
        setIsModalOpen(true);
    }

    const { data: session } = authClient.useSession()

    const handleConfirmOrder = async () => {
        if (!orderPreview) return;

        if (!session?.user) {
            router.push(`/login?redirectTo=/restaurants/${item._id}`)
        }
        else if ((session?.user as { role?: string })?.role === "customer") {
            const res = await orderItem(orderPreview)
            
            if (res) {
                toast.success('Order successfully')
                setIsConfirmed(true);
                router.push('/dashboard/customer/myorder')
            }
        }
        else {
            toast.error('user is not a Customer')
        }
        // এখানে প্রয়োজনে API কল বা স্টেট আপডেট যুক্ত করতে পারেন
        // console.log('Order Confirmed:', orderPreview);
        
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsConfirmed(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-3">

                {/* Delivery Date */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Delivery date
                    </label>

                    <input
                        type="date"
                        name="deliveryDate"
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    />
                </div>

                {/* Delivery Address */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Delivery address
                    </label>

                    <input
                        type="text"
                        name="address"
                        placeholder="Street, apartment, city"
                        required
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    />
                </div>

                {/* Special Instructions */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Special instructions
                    </label>

                    <textarea
                        name="instructions"
                        placeholder="Extra crispy, please..."
                        className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-4 font-semibold text-white transition hover:bg-red-600"
                >
                    Place order - {item.price}
                    <ArrowRight size={18} />
                </button>

                <p className="text-center text-xs text-gray-400">
                    Payment is simulated for this demo. No charge will be made.
                </p>

            </form>

            {/* Popup Modal */}


            {isModalOpen && orderPreview && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5">

                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

                        {/* Top Header */}
                        <div className="bg-linear-to-r from-red-600 to-orange-500 px-6 py-6 text-white">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wider">
                                    PIZZAHUB
                                </span>

                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="rounded-full bg-white/20 p-2 transition hover:bg-white/30"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">
                                    {isConfirmed ? "🎉" : "🍕"}
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold sm:text-2xl">
                                        {isConfirmed ? "Order Confirmed!" : "Order Summary"}
                                    </h3>
                                    <p className="mt-1 text-sm text-white/80">
                                        {isConfirmed
                                            ? "Your delicious pizza is on its way!"
                                            : "Review your order details"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5 p-5 sm:p-6">

                            {!isConfirmed ? (
                                <>
                                    {/* Order Details */}
                                    <div className="rounded-xl border border-gray-100 bg-red-50 p-4">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h4 className="font-bold text-gray-900">
                                                Order Details
                                            </h4>
                                            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                                                Pending
                                            </span>
                                        </div>

                                        <div className="space-y-4 text-sm">

                                            <div className="flex justify-between gap-3">
                                                <span className="text-gray-500">Pizza Name</span>
                                                <span className="text-right font-semibold text-gray-900">
                                                    {orderPreview.title}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-3">
                                                <span className="text-gray-500">Price</span>
                                                <span className="font-bold text-red-600">
                                                    {orderPreview.price}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-3">
                                                <span className="text-gray-500">Delivery Date</span>
                                                <span className="text-right font-medium text-gray-800">
                                                    {orderPreview.deliveryDate}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-3">
                                                <span className="text-gray-500">Delivery Address</span>
                                                <span className="max-w-[60%] text-right font-medium text-gray-800">
                                                    {orderPreview.address}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-3 border-t border-dashed border-gray-300 pt-4">
                                                <span className="text-gray-500">Ordered At</span>
                                                <span className="text-right text-xs font-medium text-gray-700">
                                                    {orderPreview.orderedAt}
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="flex items-center justify-between rounded-xl bg-red-50 p-4">
                                        <span className="font-semibold text-gray-700">
                                            Total Amount
                                        </span>
                                        <span className="text-2xl font-extrabold text-red-600">
                                            {orderPreview.price}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col-reverse gap-3 sm:flex-row">
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="w-full rounded-xl border border-gray-200 py-3 font-semibold text-gray-600 transition hover:bg-gray-100 sm:w-1/2"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleConfirmOrder}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-red-600 to-orange-500 py-3 font-bold text-white shadow-lg shadow-red-200 transition hover:scale-[1.02] hover:shadow-red-300 sm:w-1/2"
                                        >
                                            Confirm Order
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                /* Success State */
                                <div className="py-3 text-center">

                                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                                        <CheckCircle2
                                            size={45}
                                            className="text-green-500"
                                        />
                                    </div>

                                    <h3 className="mb-2 text-2xl font-extrabold text-gray-900">
                                        Thank You!
                                    </h3>

                                    <p className="mb-5 text-base leading-6 text-gray-500">
                                        Your{" "}
                                        <span className="font-bold text-gray-900">
                                            {orderPreview.title}
                                        </span>{" "}
                                        Order Successfully
                                    </p>

                                    <div className="mb-5 rounded-xl border border-green-100 bg-green-50 p-4">
                                        <p className="text-sm text-green-700">
                                            Order Status
                                        </p>
                                        <p className="mt-1 text-lg font-bold text-green-600">
                                            Confirmed
                                        </p>
                                        <p className="mt-2 text-2xl font-extrabold text-gray-900">
                                            {orderPreview.price}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="w-full rounded-xl bg-red-500 py-3 font-bold text-white transition hover:bg-red-700"
                                    >
                                        Done
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-100 px-5 py-3 text-center">
                            <p className="text-xs text-gray-400">
                                Thank you for choosing PizzaHub ❤️
                            </p>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderNow;