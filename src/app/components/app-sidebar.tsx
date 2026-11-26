
'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { authClient } from "@/lib/auth-client"

import {
    LayoutDashboard,
    Search,
    BriefcaseBusiness,
    Settings,
    PlusCircle,
    Users,
    Building2,
    BarChart3,
    UserCog,
} from "lucide-react"
import Link from "next/link"

// Define roles
type UserRole = "customer" | "vendor" | "admin"

// Define menu item type
type MenuItem = {
    name: string
    url: string
    icon: React.ElementType
}

// Menu items based on roles
const menuItemByRole: Record<UserRole, MenuItem[]> = {

    // Customer Dashboard
    customer: [
        {
            name: "Overview",
            url: "/dashboard/customer",
            icon: LayoutDashboard,
        },
        {
            name: "My Orders",
            url: "/dashboard/customer/myorder",
            icon: Search,
        },
        {
            name: "Profile Setting",
            url: "/dashboard/#",
            icon: Settings,
        },
    ],

    // Vendor Dashboard
    vendor: [
        {
            name: "Overview",
            url: "/dashboard/vendor",
            icon: LayoutDashboard,
        },
        {
            name: "My Menu Item",
            url: "/dashboard/vendor/manage-menu",
            icon: BriefcaseBusiness,

        },
        {
            name: "Add Menu Item",
            url: "/dashboard/vendor/add-menu",
            icon: PlusCircle,
        },
        {
            name: "Customer Orders",
            url: "/dashboard/vendor/customerOrder",
            icon: Users,
        },
        {
            name: "Subscription",
            url: "/dashboard/vendor/subscription",
            icon: Building2,
        },
        {
            name: "Profile Settings",
            url: "/dashboard/#",
            icon: Settings,
        },
    ],

    // Admin Dashboard
    admin: [
        {
            name: "Overview",
            url: "/dashboard/admin",
            icon: LayoutDashboard,
        },
        {
            name: "Manage Users",
            url: "/dashboard/admin/manage-user",
            icon: UserCog,
        },
        {
            name: "Manage Menu Items",
            url: "/dashboard/admin/manage-menu",
            icon: BriefcaseBusiness,
        },
        {
            name: "Transactions",
            url: "/dashboard/admin/transactions",
            icon: BarChart3,
        },
    ],
}

export function DashboardSidebar() {

    const { data: session } = authClient.useSession()

    // Get user role
    const userRole = (session?.user as { role?: string })?.role

    // Validate role
    const role: UserRole =
        userRole === "admin" ||
            userRole === "vendor" ||
            userRole === "customer"
            ? userRole
            : "customer"

    // Get menu items
    const menuItems = menuItemByRole[role]

    return (
        <Sidebar className="bg-[#171717] text-white border-r border-white/10">

            <SidebarHeader className="bg-[#171717] text-white">
                <h2 className="text-xl font-bold pt-18 px-3">
                    PIZZA <span className="text-red-600">HUB</span>
                </h2>
            </SidebarHeader>

            <SidebarContent className="bg-[#171717] text-white">
                <SidebarGroup>

                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.name}>

                                <SidebarMenuButton
                                    render={<Link href={item.url} />}
                                >
                                    <item.icon />
                                    <span className="text-lg">{item.name}</span>
                                </SidebarMenuButton>

                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>

                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}