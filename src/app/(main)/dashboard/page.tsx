import React from 'react';
import userApi from '@/services/users/users.service';
import { headers } from 'next/headers';
import DashboardClient from '@/Components/dashboard/DashboardClient';

const DashboardPage = async () => {
    const token = headers().get('digital-money-token') ?? '';
    const me = await userApi.getMeInternal(token);

    return (
        <main className="flex-grow min-h-screen py-8 px-16 bg-[#EEEAEA]">
            <DashboardClient initialBalance={me.available_amount} token={token} />
        </main>
    );
};

export default DashboardPage;
