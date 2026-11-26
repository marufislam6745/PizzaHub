'use client'
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

interface UserType {
    _id: string,
    premium: boolean
}

const PremiumBtn = ({ user }: { user: UserType }) => {

    const router = useRouter()

    const handlePremium = () => {
        if (user?.premium === true) {
            toast.error("You are already a Premium User!");
            return;
        }

        if (user?.premium === undefined || user?.premium === false) {
            router.push("/checkout");
        }
    };

    return (
        <div>

            <button
                onClick={handlePremium}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg border border-[#e6a696] bg-[#e6a696] px-4 py-3.5 text-xs font-bold text-[#74382e] transition hover:bg-[#f0b7a8]"
            >
                Your`re Premium Plan
                <ArrowRight size={15} />
            </button>
        </div>
    );
};

export default PremiumBtn;