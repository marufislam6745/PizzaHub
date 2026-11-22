
import Link from "next/link";
import { Mail, LockKeyhole } from "lucide-react";
import { FcGoogle } from "react-icons/fc";



export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-red-50">

            <div className="w-full max-w-md border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Sign in to your PizzaHub account
                    </p>
                </div>

                {/* Sign In Form */}
                <form className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                            />
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition duration-300"
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Google Login */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl font-medium text-gray-700 transition"
                >
                    <FcGoogle size={24} />
                    Continue with Google
                </button>

                {/* Sign Up */}
                <p className="text-center text-sm text-gray-600 mt-7">
                    Don`t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-red-600 font-semibold hover:text-red-700"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}
