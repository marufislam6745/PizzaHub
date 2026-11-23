
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Phone,
    Mail,
    Clock
} from "lucide-react";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaYoutube } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";


export default function Footer() {
    return (
        <footer className="bg-[#171717] text-white">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-flex items-center mb-5">
                            <Image
                                src="/pizzaHubLogo.png"
                                alt="PizzaHub Logo"
                                width={170}
                                height={75}
                                className="w-40 h-auto object-contain"
                            />
                        </Link>

                        <p className="text-gray-400 text-sm leading-7 max-w-xs">
                            Delicious pizza, fresh ingredients and fast delivery.
                            Your favorite food is just a few clicks away.
                        </p>

                        <div className="flex items-center gap-3 mt-6">
                            <p className="w-10 h-10 rounded-full bg-[#292929] flex items-center justify-center hover:bg-red-600 transition"><FaFacebookSquare /></p>
                            <p className="w-10 h-10 rounded-full bg-[#292929] flex items-center justify-center hover:bg-red-600 transition"><GrInstagram /></p>
                            <p className="w-10 h-10 rounded-full bg-[#292929] flex items-center justify-center hover:bg-red-600 transition"><FaXTwitter /></p>
                            <p className="w-10 h-10 rounded-full bg-[#292929] flex items-center justify-center hover:bg-red-600 transition"><FaYoutube /></p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">
                            Quick Links
                        </h3>

                        <ul className="space-y-4 text-sm text-gray-400">
                            <li>
                                <Link href="/" className="hover:text-red-500 transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/restaurants" className="hover:text-red-500 transition">
                                    Restaurants
                                </Link>
                            </li>
                            <li>
                                <Link href="/menu" className="hover:text-red-500 transition">
                                    Our Menu
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-red-500 transition">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-red-500 transition">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">
                            Customer Support
                        </h3>

                        <ul className="space-y-4 text-sm text-gray-400">
                            <li>
                                <Link href="/faq" className="hover:text-red-500 transition">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" className="hover:text-red-500 transition">
                                    Track Your Order
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-red-500 transition">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-red-500 transition">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="hover:text-red-500 transition">
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">
                            Contact Us
                        </h3>

                        <ul className="space-y-5 text-sm text-gray-400">
                            <li className="flex gap-3 items-start">
                                <MapPin size={19} className="text-red-500 shrink-0" />
                                <span>
                                    Comilla, Bangladesh
                                </span>
                            </li>

                            <li className="flex gap-3 items-center">
                                <Phone size={18} className="text-red-500 shrink-0" />
                                <span>+880 1XXXXXXXXX</span>
                            </li>

                            <li className="flex gap-3 items-center">
                                <Mail size={18} className="text-red-500 shrink-0" />
                                <span>support@pizzahub.com</span>
                            </li>

                            <li className="flex gap-3 items-center">
                                <Clock size={18} className="text-red-500 shrink-0" />
                                <span>Open 24/7</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-12 pt-7 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <p className="text-sm text-gray-500">
                        © 2026 PizzaHub. All rights reserved.
                    </p>

                    <div className="flex gap-5 text-sm text-gray-500">
                        <Link href="/privacy" className="hover:text-red-500 transition">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-red-500 transition">
                            Terms
                        </Link>
                        <Link href="/contact" className="hover:text-red-500 transition">
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
