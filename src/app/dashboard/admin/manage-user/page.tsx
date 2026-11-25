
import { getAllUsers } from '@/lib/action/item';
import React from 'react';
import Link from 'next/link';
import {
    Users,
    Search,
    Mail,
    Filter,
} from 'lucide-react';

interface UserType {
    _id: string,
    name: string,
    email: string,
    role: 'admin' | 'customer' | 'vendor'
}

const ManageUserpage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const search = await searchParams;
    const urlSearch = new URLSearchParams(Object.entries(search).flatMap(([key, value]) =>
        value === undefined
            ? []
            : [[key, Array.isArray(value) ? value[0] : value]]
    )
    ).toString();

    const users = await getAllUsers(urlSearch);

    const totalUsers = users.length;

    const currentRole = typeof search.role === 'string'
        ? search.role
        : 'all';

    const searchValue = typeof search.search === 'string'
        ? search.search
        : '';

    const roles = [
        { label: 'All Users', value: 'all' },
        { label: 'Admins', value: 'admin' },
        { label: 'Vendors', value: 'vendor' },
        { label: 'Customers', value: 'customer' },
    ];

    const buildUrl = (role: string) => {
        const params = new URLSearchParams();

        if (searchValue) params.set('search', searchValue);
        if (role !== 'all') params.set('role', role);

        const query = params.toString();
        return query ? `?${query}` : '?';
    };

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">

            <div className=" max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                    <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-orange-600">
                            PLATFORM CONTROL
                        </p>

                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Manage Users<span className="text-orange-500">.</span>
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Manage and monitor everyone in your PizzaHub community.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 self-start rounded-xl border border-orange-100 bg-white px-4 py-3 shadow-sm sm:self-auto">
                        <Users size={19} className="text-orange-500" />
                        <span className="text-sm font-bold text-gray-700">
                            {totalUsers} Total Users
                        </span>
                    </div>

                </div>

                <Users
                    size={180}
                    className="absolute -right-5 -bottom-12 rotate-12 text-white/15"
                />
            </div>

            {/* Statistics */}
            <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-900">
                    User Overview
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    A quick overview of your platform members.
                </p>
            </div>

            {/* Users Section */}
            <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">

                <div className="border-b border-gray-100 p-5 sm:p-6">

                    <div className="mb-5">
                        <h2 className="text-xl font-bold text-gray-900">
                            People of PizzaHub
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            View and manage all registered platform members.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <form className="relative w-full lg:max-w-md">
                            <Search
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="search"
                                name="search"
                                defaultValue={searchValue}
                                placeholder="Search by name or email..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            />

                            {currentRole !== 'all' && (
                                <input
                                    type="hidden"
                                    name="role"
                                    value={currentRole}
                                />
                            )}
                        </form>

                        <div className="flex flex-wrap items-center gap-2">
                            <Filter size={17} className="text-orange-500" />

                            {roles.map((role) => (
                                <Link
                                    key={role.value}
                                    href={buildUrl(role.value)}
                                    className={`rounded-lg px-3 py-2 text-xs font-bold transition sm:text-sm ${currentRole === role.value
                                        ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                                        : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                                        }`}
                                >
                                    {role.label}
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>

                {/* User List */}
                <div className="p-4 sm:p-6">

                    <div className="mb-5 flex items-center justify-between">
                        <h3 className="font-bold text-gray-800">
                            All Members
                        </h3>

                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                            {users.length} Members
                        </span>
                    </div>

                    <div className="space-y-3">

                        {users.length > 0 ? (
                            users.map((user: UserType) => (

                                <div
                                    key={user._id}
                                    className="group flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 transition hover:border-orange-200 hover:bg-orange-50/40 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                                >

                                    {/* User Info */}
                                    <div className="flex min-w-0 items-center gap-3">

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-orange-50 to-red-50 text-lg font-extrabold uppercase text-red-500 shadow-md">
                                            {user.name?.charAt(0) || 'U'}
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="truncate font-bold text-gray-900">
                                                {user.name}
                                            </h3>

                                            <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-gray-500 sm:text-sm">
                                                <Mail size={14} className="shrink-0" />
                                                {user.email}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">

                                        <span className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${user.role === 'admin'
                                            ? 'bg-orange-100 text-orange-700'
                                            : user.role === 'vendor'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-green-100 text-green-700'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-16 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
                                    <Users size={30} className="text-orange-400" />
                                </div>

                                <h3 className="text-lg font-bold text-gray-800">
                                    No Users Found
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Try changing your search or role filter.
                                </p>
                            </div>
                        )}

                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-100 bg-[#fffaf5] px-5 py-4">
                    <p className="text-center text-xs font-medium text-gray-500">
                        PizzaHub Admin Panel · User Management
                    </p>
                </div>

            </div>

        </div>
    );
};

export default ManageUserpage;
