"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client";
import { MdLogout } from "react-icons/md";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname()
    const router = useRouter()

    const { data: session } = authClient.useSession()
    const handleLogout = async () => {
        await authClient.signOut()
        router.push('/')
    }

    return (
        <nav className="sticky top-0 z-50 w-full bg-red-50 shadow-lg border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-3">

                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center shrink-0">
                        <Image
                            src="/pizzaHubLogo.png"
                            alt="PizzaHub Logo"
                            width={100}
                            height={65}
                            priority
                            className="w-28 sm:w-32 h-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        <Link
                            href="/"
                            className={`${pathName === "/" ? 'text-red-600 font-bold border-b-2 border-red-600' : 'text-gray-700 font-bold hover:text-red-600 transition'}`}
                        >
                            Home
                        </Link>

                        <Link
                            href="/restaurants"
                            className={`${pathName === "/restaurants" ? 'text-red-600 font-bold border-b-2 border-red-600' : 'text-gray-700 font-bold hover:text-red-600 transition'}`}
                        >
                            Restaurant Menu
                        </Link>
                    </div>
                    {
                        session?.user ?

                            <DropdownMenu>
                                <DropdownMenuTrigger render={
                                    <Button variant="ghost" className="rounded-full p-1">
                                        <Avatar>
                                            <AvatarFallback>
                                                {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                                            </AvatarFallback>
                                            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                                        </Avatar>
                                    </Button>
                                } />

                                <DropdownMenuContent className="w-64 bg-white text-black" align="end">

                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel className="font-bold text-base">
                                            {session?.user?.name}
                                        </DropdownMenuLabel>

                                        <DropdownMenuLabel className="text-gray-500 font-normal text-xs">
                                            {session?.user?.email}
                                        </DropdownMenuLabel>

                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuGroup>

                                        <Link href={`/dashboard/${(session?.user as { role?: string })?.role}`}>
                                            <DropdownMenuLabel className="font-bold text-base">
                                                Dashboard
                                            </DropdownMenuLabel>
                                        </Link>

                                        <DropdownMenuLabel className="font-bold text-base">
                                            Profile Setting
                                        </DropdownMenuLabel>

                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuGroup>
                                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer text-base flex items-center">
                                           <MdLogout /> Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            :
                            <div className="hidden md:block">
                                <Link
                                    href="/login"
                                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition duration-300 shadow-sm"
                                >
                                    <LogIn size={18} />
                                    Login
                                </Link>
                            </div>
                    }

                    {/* Mobile Menu Button*/}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-800 hover:text-red-600 transition"
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? (
                            <X size={28} />
                        ) : (
                            <Menu size={28} />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden border-t border-gray-100 py-5">
                        <div className="flex flex-col gap-5">

                            <Link
                                href="/"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-700 font-bold hover:text-red-600 transition"
                            >
                                Home
                            </Link>

                            <Link
                                href="/restaurants"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-700 font-bold hover:text-red-600 transition"
                            >
                                Restaurant Menu
                            </Link>

                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-semibold transition"
                            >
                                <LogIn size={18} />
                                Login
                            </Link>

                        </div>
                    </div>
                )}

            </div>
        </nav >
    );
}
