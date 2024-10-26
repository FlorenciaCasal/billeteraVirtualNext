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
}

const Activity = ({ token, searchTerm }: ActivityProps) => {
    const [activities, setActivities] = useState<ResponseActivityType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;  // Número de actividades por página

    const accountIdString = Cookies.get('digitalMoneyAccountID');
    const account_id: number = Number(accountIdString);

    console.log("account_id en Activity.tsx:", account_id);
    console.log("accountIdString en Activity.tsx:", accountIdString);

    useEffect(() => {
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
    }, [account_id, token]);

    // Restablecer a la primera página al cambiar el término de búsqueda
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Filtrar actividades según el término de búsqueda en descripción o monto
    const filteredActivities = activities.filter(activity => {
        const amountAsString = activity.amount.toFixed(2); // Convertimos el monto a string con dos decimales
        return (
            activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            amountAsString.includes(searchTerm) // Filtramos por coincidencia parcial en el monto
        );
    });

    // Calcular el total de páginas basado en las actividades filtradas
    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

    // Calcular el índice del primer y último ítem en función de la página actual y el total de ítems por página
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Obtener las actividades de la página actual basadas en las actividades filtradas
    const currentActivities = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);


    // Manejadores de cambio de página
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
    )
}

export default Activity;
