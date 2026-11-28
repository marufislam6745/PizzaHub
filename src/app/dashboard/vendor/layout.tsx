import { requireRole } from '@/lib/core/server';
import React from 'react';

const Vendorlayout =async ({children}:{children:React.ReactNode}) => {
    await requireRole("vendor")
    return children
};

export default Vendorlayout;