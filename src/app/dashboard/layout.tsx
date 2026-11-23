import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/app-sidebar"


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar></DashboardSidebar>
            <main className='flex-1'>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
};

export default DashboardLayout;