import { requireRole } from '@/lib/core/server';
import React from 'react';

const Customerlayout =async ({children}:{children:React.ReactNode}) => {
    await requireRole("customer")
    return children
};

export default Customerlayout;