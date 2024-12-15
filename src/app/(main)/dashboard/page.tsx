import React from 'react';
import userApi from '@/services/users/users.service';
import { headers } from 'next/headers';
import DashboardClient from '@/Components/dashboard/DashboardClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const DashboardPage = async () => {
    const token = headers().get('digital-money-token') ?? '';
    const me = await userApi.getMeInternal(token);

    return (
        <main className="flex-grow pt-6 pb-12 px-6 sm:py-8 tablet:px-16 bg-[#EEEAEA]">
            <div className="flex items-center mb-6 sm:hidden">
                <FontAwesomeIcon icon={faArrowRight} className="text-gray-700" style={{ transform: 'scaleX(1.4)' }} />
                <p className="pl-2 text-sm font-medium underline text-black">Inicio</p>
            </div>
            <DashboardClient initialBalance={me.available_amount} token={token} />
        </main>
    );
};

export default DashboardPage;
