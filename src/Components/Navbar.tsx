"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuPortal,
//     DropdownMenuSeparator,
//     DropdownMenuShortcut,
//     DropdownMenuSub,
//     DropdownMenuSubContent,
//     DropdownMenuSubTrigger,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname()

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

                    {/* <DropdownMenu>
                        <DropdownMenuTrigger render={<Button>
                            <Avatar>
                                <AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
                                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                            </Avatar>
                        </Button>} />
                        <DropdownMenuContent className="w-full bg-[#080808] text-white" align="start">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className='font-bold text-white text-base'>{session?.user.name}</DropdownMenuLabel>
                                <DropdownMenuLabel>{session?.user.email}</DropdownMenuLabel>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={handleLogout} className='text-white'>
                                    Log out
                                    <DropdownMenuShortcut className='text-white'>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                    {/* Desktop Login */}
                    <div className="hidden md:block">
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition duration-300 shadow-sm"
                        >
                            <LogIn size={18} />
                            Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
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
