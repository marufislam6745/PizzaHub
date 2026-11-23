
"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, LockKeyhole, Eye, EyeOff, BadgeCheck } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";



export default function SignupPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("customer");
    const router=useRouter()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const userdata = Object.fromEntries(formData.entries()) as { name: string, email: string, password: string, role: string }
        //console.log(userdata)
        const { data, error } = await authClient.signUp.email({
            ...userdata,
            callbackURL: "/"
        })
        if (data) {
            console.log('Account create successfully')
            router.push('/')
        }
        if (error) {
            console.log(error.message || 'Something error!')
        }


        // Password validation
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setError("At least one uppercase letter (A-Z) is required.");
            return;
        }

        if (!/[a-z]/.test(password)) {
            setError("At least one lowercase letter (a-z) is required.");
            return;
        }

        // All conditions passed
        setError("");

    };

    return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md bg-red-50 rounded-2xl p-6 sm:p-8 shadow-2xl">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Your Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Join PizzaHub and enjoy delicious pizzas
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>

                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            />
                        </div>
                    </div>

                    {/* Role*/}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Your Role
                        </label>

                        <div className="relative">
                            <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                required
                            >
                                <option value="customer">Customer</option>
                                <option value="vendor">Vendor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <div className="relative">
                            <LockKeyhole
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                required
                                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>

                        {error && (
                            <p className="text-red-600 text-sm mt-2">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition duration-300"
                    >
                        Create Account
                    </button>

                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Google */}
                <button
                    type="button"
                    className="flex items-center justify-center gap-3 w-full border border-gray-300 hover:bg-gray-50 py-3 rounded-xl font-medium text-gray-700 transition"
                >
                    <FcGoogle size={24} />    Continue with Google
                </button>

                {/* Sign In */}
                <p className="text-center text-sm text-gray-600 mt-7">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-red-600 font-semibold hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
}
