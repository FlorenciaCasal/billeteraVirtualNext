'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import activityApi from "@/services/activity/activity.api";
import { useEffect, useState } from "react";
import { ResponseActivityType } from '@/types/auth.types';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '@/store/dashboardSlice';
import { RootState } from '@/store/store';
import Button from '../ui/Button';
import Filters from '@/Components/dashboard/Filters';
import { usePathname } from 'next/navigation';

// interface ActivityProps {
//     isDashboard?: boolean;
// }

// const Activity = ({ isDashboard = false }: ActivityProps) => {
const Activity = () => {
    const [activities, setActivities] = useState<ResponseActivityType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;  // Número de actividades por página
    const accountIdString = Cookies.get('digitalMoneyAccountID');
    const account_id: number = Number(accountIdString);
    const router = useRouter();
    const token = useSelector((state: RootState) => state.dashboard.token);
    const searchTerm = useSelector((state: RootState) => state.dashboard.searchTerm);
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const pathname = usePathname();

    const [filterPeriod, setFilterPeriod] = useState('');
    const [filterType, setFilterType] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filterAmountRange, setFilterAmountRange] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (pathname === '/dashboard') {
            setIsDashboard(true);
        } else {
            setIsDashboard(false);
        }
    }, [pathname]);

    const handleSearchChange = (newSearchTerm: string) => {
        dispatch(setSearchTerm(newSearchTerm));
    };

    const resetFilters = () => {
        setFilterPeriod('');
        setFilterType('');
        setFilterAmountRange('');
    };

    const handleApplyFilters = () => {
        setShowFilters(false);
    };


    useEffect(() => {
        return () => {
            dispatch(setSearchTerm(''));
        };
    }, [dispatch]);

    const descriptionMap: Record<string, string> = {
        Deposit: 'Ingresaste dinero',
        Transaction: 'Pagaste',
        Transfer: 'Pagaste',
    };

    useEffect(() => {
        if (token && account_id) {
            const fetchActivity = async () => {
                setIsLoading(true);
                try {
                    const data = await activityApi.getActivity(account_id, token);
                    const sortedActivities = data.sort((a, b) =>
                        new Date(b.dated).getTime() - new Date(a.dated).getTime()
                    );
                    setActivities(sortedActivities);
                    setIsLoading(false);
                    setError(null);
                } catch (err) {
                    console.error("Error fetching activities:", err);
                    setError("No se pudo cargar la actividad.");
                    setIsLoading(false);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchActivity();
        }
    }, [account_id, token]);

    useEffect(() => {
        setCurrentPage(1); // Resetear a la primera página al cambiar búsqueda, período o tipo
    }, [searchTerm, filterPeriod, filterType, filterAmountRange]);

    // Lógica de filtrado combinada
    const applyFilters = (activity: ResponseActivityType) => {
        const activityDate = new Date(activity.dated);
        const today = new Date();
        // Filtrar por período
        const periodFilter = () => {
            if (!filterPeriod) return true;
            switch (filterPeriod) {
                case 'today': return activityDate.toDateString() === today.toDateString();
                case 'yesterday':
                    const yesterday = new Date(today);
                    yesterday.setDate(today.getDate() - 1);
                    return activityDate.toDateString() === yesterday.toDateString();
                case 'lastWeek':
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7);
                    return activityDate >= lastWeek && activityDate <= today;
                case 'last15Days':
                    const last15Days = new Date(today);
                    last15Days.setDate(today.getDate() - 15);
                    return activityDate >= last15Days && activityDate <= today;
                case 'lastMonth':
                    const lastMonth = new Date(today);
                    lastMonth.setMonth(today.getMonth() - 1);
                    return activityDate >= lastMonth && activityDate <= today;
                case 'last3Months':
                    const last3Months = new Date(today);
                    last3Months.setMonth(today.getMonth() - 3);
                    return activityDate >= last3Months && activityDate <= today;
                default: return true;
            }
        };
        // Filtrar por tipo de operación
        const typeFilter = filterType
            ? (filterType === 'income' ? activity.amount > 0 : activity.amount < 0)
            : true;
        // Filtrar por búsqueda
        const searchFilter = activity.description.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
            activity.amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', '').replace(',', '.').startsWith(searchTerm.replace(',', '.'));
        // Filtro por rango de montos
        const amountFilter = () => {
            if (!filterAmountRange) return true;
            const amount = Math.abs(activity.amount); // Asegura que el monto sea positivo
            const [min, max] = filterAmountRange.includes('+')
                ? [parseInt(filterAmountRange), Infinity]
                : filterAmountRange.split('-').map(Number);

            return amount >= min && amount <= max;
        };

        return periodFilter() && typeFilter && searchFilter && amountFilter();

    };

    const filteredActivities = isDashboard
        ? activities.slice(0, 10).filter(applyFilters) // Limita las actividades y aplica filtros
        : activities.filter(applyFilters);

    // Paginación
    const totalPages = Math.ceil((isDashboard ? filteredActivities.length : activities.length) / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentActivities = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const handleActivityClick = (activityId: number) => {
        if (activityId && account_id) {
            router.push(`/activityDetail?id=${activityId}&account_id=${account_id}`);
        }
    }

    // Limitar a 10 actividades recientes si se usa en el Dashboard
    const displayedActivities = isDashboard
        ? filteredActivities
        : currentActivities;

    return (
        <>
            <main className="flex flex-col flex-grow ">
                {!isDashboard && (
                    <div className="flex items-center mb-6 sm:hidden">
                        <FontAwesomeIcon icon={faArrowRight} className="text-gray-700" style={{ transform: 'scaleX(1.4)' }} />
                        <p className="pl-2 text-sm font-medium underline text-black">Tu actividad</p>
                    </div>
                )}
                {/* Buscador y mensajes de estado*/}

                <div className="flex justify-center">
                    <div className="relative w-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] rounded-lg border border-blue-300 sm:border-none">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                        />
                        <input
                            type="text"
                            placeholder="Buscar en tu actividad"
                            className="w-full bg-white pl-12 pr-4 py-6 sm:py-4 text-gray-700 rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 hover:shadow-md transition-shadow duration-300"
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </div>
                    {/* Botón Filtrar */}
                    {!isDashboard && (
                        <Button
                            onClick={() => setShowFilters(!showFilters)}
                            className="hidden sm:flex items-center gap-2 bg-crearCuentaNavbar text-black py-4 px-4 ml-4 rounded-lg shadow-md"
                        >
                            <h5 className="pr-6">Filtrar</h5>
                            <FontAwesomeIcon icon={faSliders} />
                        </Button>
                    )}
                </div>
                <div className="flex items-center flex-col">
                    {isLoading ? <div className="flex justify-center items-center h-48">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-crearCuentaNavbar border-opacity-75"></div>
                    </div> : error ? <div>{error}</div> : null}
                </div>

                {/* Filtros */}
                {showFilters && (
                    <Filters
                        filterPeriod={filterPeriod}
                        handleFilterPeriodChange={setFilterPeriod}
                        filterType={filterType}
                        handleFilterTypeChange={setFilterType}
                        showFilters={showFilters}
                        toggleFilters={() => setShowFilters(!showFilters)}
                        searchTerm={searchTerm}
                        handleSearchChange={handleSearchChange}
                        resetFilters={resetFilters}
                        handleApplyFilters={handleApplyFilters}
                        filterAmountRange={filterAmountRange}
                        handleFilterAmountRangeChange={setFilterAmountRange}
                    />
                )}


                <div className="flex flex-col pt-6 pb-8 px-4 sm:py-8 sm:px-8 tablet:py-12 mt-4 w-full bg-white text-gray-700 rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 hover:shadow-md transition-shadow duration-300">

                    {/* Contenedor para "Tu actividad" y el botón "Filtrar" en pantallas pequeñas */}
                    <div className="flex items-center justify-between mb-8 sm:mb-2 tablet:mb-4">
                        <h5>Tu actividad</h5>

                        {!isDashboard && (
                            <Button
                                onClick={() => setShowFilters(!showFilters)}
                                className="sm:hidden flex items-center gap-2 bg-transparent underline text-black py-4 pl-4 ml-4 rounded-lg"
                            >
                                <h5 className="pr-6">Filtrar</h5>
                                <FontAwesomeIcon icon={faSliders} />
                            </Button>
                        )}
                    </div>
                    <div className="hidden sm:block">
                        <hr className="border-t-1 border-black mb-4" />
                    </div>

                    <div className="flex flex-col flex-grow">
                        {/* Mostrar las actividades paginadas */}
                        {displayedActivities.length > 0 ? (
                            displayedActivities.map((activity, index) => {
                                // Mapeamos la descripción, usando el mapa si es necesario
                                const translatedDescription = descriptionMap[activity.type] || activity.description;

                                return (
                                    <div key={index}>
                                        <div
                                            className="flex items-center justify-between mb-4 cursor-pointer"
                                            onClick={() => handleActivityClick(activity.id)}  // Volvemos a agregar el clic
                                        >
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 bg-crearCuentaNavbar rounded-full mr-2"></div>
                                                <span>
                                                    {translatedDescription}
                                                    {activity.type === 'Deposit'
                                                        ? ''
                                                        : activity.type === 'Transfer'
                                                            ? ` ${activity.destination || ''}`
                                                            : ` ${activity.description || ''}`}
                                                </span>
                                            </div>
                                            <span className="font-semibold">
                                                ${activity.amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <hr className="border-t-0.5 sm:border-t-1 border-gray-300 sm:border-black mb-4" />
                                    </div>
                                );
                            })
                        ) : searchTerm ? (
                            <div className="text-error">No se encontró ninguna actividad que corresponda al valor ingresado.</div>
                        ) : (
                            <div className="text-gray-500">No hay actividades registradas.</div>
                        )}

                    </div>

                    {!isDashboard && (
                        <div className="flex justify-center mt-8">
                            {/* Contenedor con scroll horizontal */}
                            <div className="flex items-center overflow-x-scroll no-scrollbar space-x-2">
                                {/* Números de página */}
                                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageClick(pageNumber)}
                                        className={`px-4 py-2 text-gray-700 rounded-lg 
                        ${currentPage === pageNumber ? 'bg-gray-400 text-white font-bold' : 'hover:bg-gray-100'}`}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {isDashboard && (
                        <Link href="/activity">
                            <div className='flex justify-between w-full pt-4 sm:pt-0'>
                                <h5 className="font-bold ">Ver todas tus actividades</h5>
                                <span>
                                    <FontAwesomeIcon icon={faArrowRight}
                                        className="text-gray-500 w-5 h-5" />
                                </span>
                            </div>
                        </Link>
                    )}
                </div>
            </main>
        </>
    );
};

export default Activity;