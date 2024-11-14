'use client';
import { useEffect, useState } from 'react';
import userApi from '@/services/users/users.service';
import Monto from './Monto';
import Link from 'next/link';
import ActivityPage from '@/app/(main)/activity/page';
import Button from '@/Components/ui/Button';
import { useDispatch } from 'react-redux';
import { setSearchTerm, setToken, setBalance } from '../../store/dashboardSlice'


interface DashboardClientProps {
    initialBalance: number;
    token: string;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ initialBalance, token }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setToken(token));
        dispatch(setBalance(initialBalance));
        const fetchBalance = async () => {
            try {
                const me = await userApi.getMeInternal(token);
                dispatch(setBalance(me.available_amount));
            } catch (error) {
                console.error('Error al obtener el balance:', error);
            }
        };
        fetchBalance();
    }, [token, initialBalance, dispatch]);

    return (
        <main className="flex-grow bg-[#EEEAEA]">
            <section>
                <div className='flex flex-col py-8 px-8 w-full bg-backgroundNavbar rounded-lg'>
                    <div className="flex justify-end">
                        <Link href="/card">
                            <h5 className='text-white px-4 underline font-semibold'>Ver tarjetas</h5>
                        </Link>
                        <Link href='/cvu-alias'>
                            <h5 className='text-white underline font-semibold'>Ver CVU</h5>
                        </Link>
                    </div>
                    <div className='pb-4 px-4'>
                        <h5 className='text-white'>Dinero disponible</h5>
                    </div>
                    <Monto availableAmount={initialBalance} />
                </div>

                <div className='flex py-4 w-full'>
                    <span className='flex justify-center items-center mr-2 w-full bg-crearCuentaNavbar rounded-lg'>
                        <Link href="/load-money" className="text-black">
                            <h6>Cargar dinero</h6>
                        </Link>
                    </span>
                    <span className='flex justify-center py-6 ml-2 w-full bg-crearCuentaNavbar rounded-lg'>
                        <Button><h6>Pagar servicios</h6></Button>
                    </span>
                </div>
            </section>

            <section className="-my-8 -mx-16">
                <ActivityPage />
            </section>
        </main>
    );
};

export default DashboardClient;
