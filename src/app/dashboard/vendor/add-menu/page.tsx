'use client'
import { createMenu, getVendorPizzaCount } from "@/lib/action/item";
import { getPremiumId } from "@/lib/api/premium";
import { authClient } from "@/lib/auth-client";
import { IPizza } from "@/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddMenuItemPage() {
    const router = useRouter()
    const { data: session } = authClient.useSession()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const item = Object.fromEntries(formData)

        const premiumResult = await getPremiumId(session?.user.id || '')
        //console.log(premiumResult)

        const countresult = await getVendorPizzaCount(`applicantId=${session?.user.id}`)
        if (!premiumResult.premium && countresult.count >= 3) {
            router.push('/checkout')
            return
        }
        else {
            const itemdata = {
                name: session?.user.name,
                email: session?.user.email,
                vendorId: session?.user.id,
                ...item,
                status: "pending"
            }

            const result = await createMenu(itemdata as IPizza)

            if (result) {
                toast.success('Post a New item successfully')
                router.push('/dashboard/vendor/manage-menu')
            } else {
                toast.error(result.message || 'Something error!')
            }
        }

    }

    return (
        <div className="min-h-screen bg-red-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="text-sm font-bold uppercase tracking-[3px] text-red-600"
                    >
                        YOUR PIZZERIA
                    </Link>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Add New Menu Item
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Create a delicious new item and add it to your PizzaHub menu.
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

                    <div className="mb-8 border-b border-gray-100 pb-5">
                        <h2 className="text-xl font-bold text-gray-900">
                            Add Something Details
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Fill in the information below to publish your new menu item.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Title */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Pizza Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Margherita Pizza"
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />
                        </div>


                        {/* Image */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Image URL *
                            </label>
                            <input
                                type="url"
                                name="image"
                                placeholder="https://example.com/pizza.jpg"
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500"
                            />
                        </div>

                        {/* Price and Rating */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Price *
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="$12.99"
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Rating
                                </label>
                                <input
                                    type="number"
                                    name="rating"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    placeholder="4.5"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500"
                                />
                            </div>

                            {/* Post Date */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Post Date *
                                </label>
                                <input
                                    type="date"
                                    name="postDate"
                                    defaultValue={new Date().toISOString().split("T")[0]}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500"
                                />
                            </div>
                        </div>

                        {/* Category and Size */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    required
                                    defaultValue=""
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500"
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option value="Classic">Classic</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Cheese">Cheese</option>
                                    <option value="Spicy">Spicy</option>
                                    <option value="Special">Special</option>
                                    <option value="Meat Lover">Meat Lover</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Pizza Size *
                                </label>
                                <select
                                    name="size"
                                    required
                                    defaultValue=""
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500"
                                >
                                    <option value="" disabled>Select Size</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </div>
                        </div>

                        {/* Restaurant and Location */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Restaurant Name *
                                </label>
                                <input
                                    type="text"
                                    name="restaurantName"
                                    placeholder="Italian Pizza House"
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="New York, USA"
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                rows={4}
                                placeholder="Describe your delicious pizza..."
                                required
                                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                            <button
                                type="reset"
                                className="rounded-xl border border-gray-300 px-7 py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
                            >
                                Reset Form
                            </button>

                            <button
                                type="submit"
                                className="rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white shadow-md shadow-orange-100 transition hover:bg-orange-600"
                            >
                                + Add Menu Item
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
