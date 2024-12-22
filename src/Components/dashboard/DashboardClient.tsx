'use client';
import { useEffect } from 'react';
import userApi from '@/services/users/users.service';
import Monto from './Monto'
import Link from 'next/link';
import Activity from './Activity';
import { useDispatch } from 'react-redux';
import { setToken, setBalance } from '../../store/dashboardSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


interface DashboardClientProps {
    initialBalance: number;
    token: string;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ initialBalance, token }) => {
    const dispatch = useDispatch();
    const balance = useSelector((state: RootState) => state.dashboard.balance);

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
        <main className="flex-grow min-h-screen bg-[#EEEAEA]">
            <section>
                <div className='flex flex-col py-6 px-4 md:px-6 tablet:py-8 lg:px-8 w-full bg-backgroundNavbar rounded-lg'>
                    <div className="flex justify-end pb-8 tablet:pb-6">
                        <Link href="/card">
                            <h5 className='text-white px-4 underline font-semibold'>Ver tarjetas</h5>
                        </Link>
                        <Link href='/cvu-alias'>
                            <h5 className='text-white underline font-semibold'>Ver CVU</h5>
                        </Link>
                    </div>
                    <div className='px-0 pb-2 md:pb-3 tablet:pb-4 md:px-2 lg:px-4'>
                        <h5 className='font-medium tablet:font-bold text-white'>Dinero disponible</h5>
                    </div>
                    <Monto availableAmount={balance} />
                </div>

                <div className='flex flex-col py-4 w-full tablet:flex-row'>
                    <span className='flex justify-center py-5 sm:py-6 items-center mb-2 w-full bg-crearCuentaNavbar rounded-lg tablet:mr-2 tablet:mb-0  shadow-md'>
                        <Link href="/load-money" className="text-black">
                            <h6>Ingresar dinero</h6>
                        </Link>
                    </span>
                    <span className='flex justify-center py-5 sm:py-6 mt-2 w-full bg-crearCuentaNavbar rounded-lg tablet:ml-2 tablet:mt-0  shadow-md'>
                        <Link href="/pay-services" className="text-black">
                            <h6> Pagar servicios</h6>
                        </Link>
                    </span>
                </div>
            </section>

            <section className="flex justify-center ">
                <Activity />
            </section>
        </main>
    );
};

export default DashboardClient;
