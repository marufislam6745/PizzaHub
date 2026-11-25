import AdminmanageMenu from '@/components/AdminmanageMenu';
import React from 'react';

const ManageMenuItempage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pizza`)
    const data = await res.json()

    const orders = Array.isArray(data) ? data : [];

    return (
        <AdminmanageMenu initialOrders={orders} />
    );
};

export default ManageMenuItempage;