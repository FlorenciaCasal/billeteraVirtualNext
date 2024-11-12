'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import activityApi from "@/services/activity/activity.api";
import { useEffect, useState } from "react";
import { ResponseActivityType } from '@/types/auth.types';
import Cookies from 'js-cookie';

interface ActivityProps {
    token: string;
    searchTerm: string;
    filterPeriod: string;
    filterType: string;
}

const Activity = ({ token, searchTerm, filterPeriod, filterType }: ActivityProps) => {
    const [activities, setActivities] = useState<ResponseActivityType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;  // Número de actividades por página
    const accountIdString = Cookies.get('digitalMoneyAccountID');
    const account_id: number = Number(accountIdString);

    useEffect(() => {
        if (token) {
            const fetchActivity = async () => {
                setIsLoading(true);
                try {
                    if (account_id) {
                        const data = await activityApi.getActivity(account_id, token);
                        const sortedActivities = data.sort((a, b) =>
                            new Date(b.dated).getTime() - new Date(a.dated).getTime()
                        );
                        setActivities(sortedActivities);
                    }
                } catch (err) {
                    console.error("Error fetching activities:", err);
                    setError("No se pudo cargar la actividad.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchActivity();
        }
    }, [account_id, token]);

    useEffect(() => {
        setCurrentPage(1); // Resetear a la primera página al cambiar búsqueda, período o tipo
    }, [searchTerm, filterPeriod, filterType]);

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
        const searchFilter = activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.amount.toFixed(2).includes(searchTerm);

        return periodFilter() && typeFilter && searchFilter;
    };

    const filteredActivities = activities.filter(applyFilters);

    // Paginación
    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentActivities = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col py-8 px-8 mt-4 w-full bg-white text-gray-700 rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 hover:shadow-md transition-shadow duration-300">
            <h5>Tu actividad</h5>
            <hr className="border-t-1 border-black mb-4" />

            {currentActivities.length > 0 ? (
                currentActivities.map((activity, index) => (
                    <div key={index}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-crearCuentaNavbar rounded-full mr-2"></div>
                                <span>{activity.description}</span>
                            </div>
                            <span className="font-semibold">$ {activity.amount.toFixed(2)}</span>
                        </div>
                        <hr className="border-t-1 border-black mb-4" />
                    </div>
                ))
            ) : (
                <div>No hay actividades registradas.</div>
            )}

            {/* Navegación de paginación */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="flex items-center text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5 mr-2" />
                    Anterior
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguiente
                    <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5 ml-2" />
                </button>
            </div>
        </div>
    );
};

export default Activity;