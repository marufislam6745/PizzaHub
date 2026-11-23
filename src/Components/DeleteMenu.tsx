'use client'
import { deleteMenu } from '@/lib/action/item';
import { IPizza } from '@/type';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';



const DeleteMenu = ({ pizza }: { pizza: IPizza }) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()

    const handleDelete = async () => {
        const result = await deleteMenu(pizza._id)

        if (result.deletedCount > 0) {
            router.refresh()
        }
        if (result) {
            toast.success('Delete your menu item')
        } else {
            toast.error(result.message || 'Something error!')
        }
    }

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
            >
                <Trash2 size={16} />
                Delete
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

                    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">

                        {/* Header */}
                        <div className="relative flex flex-col items-center bg-linear-to-br from-red-500 to-orange-500 px-6 py-8 text-center">

                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 ring-4 ring-white/20">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-9 w-9 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3m0 4h.01M10.3 3.9L2.7 17.2A2 2 0 004.4 20h15.2a2 2 0 001.7-2.8L13.7 3.9a2 2 0 00-3.4 0z"
                                    />
                                </svg>
                            </div>

                            <h2 className="mt-4 text-2xl font-bold text-white">
                                Delete Item?
                            </h2>
                        </div>

                        {/* Content */}
                        <div className="px-6 py-7 text-center">

                            <p className="text-base font-medium text-gray-800">
                                Are you sure you want to delete this item?
                            </p>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                This action cannot be undone. Your order will be
                                permanently removed from your order history.
                            </p>

                            {/* Buttons */}
                            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">

                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-gray-300 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="rounded-xl bg-linear-to-r from-red-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-red-600 hover:to-orange-600 hover:shadow-xl active:scale-95"
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteMenu;