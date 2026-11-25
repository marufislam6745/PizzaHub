
import { customerOrder } from '@/lib/action/item';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import CustomerOrderClient from '@/components/CustomerOrderClient';

const CustomerOrderpage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const result = await customerOrder(session?.user.id || '');
    const orders = Array.isArray(result) ? result : [];

    return (
        <CustomerOrderClient initialOrders={orders} />
    );
};

export default CustomerOrderpage;
