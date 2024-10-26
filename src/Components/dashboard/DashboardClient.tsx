'use client';
import { useEffect, useState } from 'react';
import userApi from '@/services/users/users.service';
import Monto from './Monto';
import Link from 'next/link';
import Activity from './Activity';
import Button from '@/Components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface DashboardClientProps {
    initialBalance: number;
    token: string;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ initialBalance, token }) => {
    const [balance, setBalance] = useState<number>(initialBalance);
    const [searchTerm, setSearchTerm] = useState<string>('');


    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const me = await userApi.getMeInternal(token);
                setBalance(me.available_amount);
            } catch (error) {
                console.error('Error al obtener el balance:', error);
            }
        };
        fetchBalance();
    }, [token]);

    // // Función para manejar la búsqueda
    // const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter' && searchTerm.trim()) {
    //         router.push(`/mi-actividad?search=${encodeURIComponent(searchTerm)}`);
    //     }
    // };

    return (
        <main className="flex-grow py-8 px-16 bg-[#EEEAEA]">
            <div className='flex flex-col py-8 px-8 w-full bg-backgroundNavbar rounded-lg'>
                <div className="flex justify-end">
                    <h5 className='text-white px-4 underline font-semibold'>Ver tarjetas</h5>
                    <Link href='/cvu-alias'>
                        <h5 className='text-white underline font-semibold'>Ver CVU</h5>
                    </Link>
                </div>
                <div className='pb-4 px-4'>
                    <h5 className='text-white'>Dinero disponible</h5>
                </div>
                <Monto availableAmount={balance} />
            </div>

            <div className='flex py-4 w-full'>
                <span className='flex justify-center py-6 mr-2 w-full bg-crearCuentaNavbar rounded-lg'>
                    <Link href="/depositar">Cargar Dinero</Link>
                </span>
                <span className='flex justify-center py-6 ml-2 w-full bg-crearCuentaNavbar rounded-lg'>
                    <Button>Pagar servicios</Button>
                </span>
            </div>

            <div className="relative w-full">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                />
                <input
                    type="text"
                    placeholder="Buscar en tu actividad"
                    className="w-full bg-white pl-12 pr-4 py-4 text-gray-700  rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 hover:shadow-md transition-shadow duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>

            <Activity token={token} searchTerm={searchTerm} />
        </main>
    );
};

export default DashboardClient;
