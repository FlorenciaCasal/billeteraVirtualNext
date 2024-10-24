'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import activityApi from "@/services/activity/activity.api";
import { useEffect, useState } from "react";
import { ResponseActivityType } from '@/types/auth.types';
import Cookies from 'js-cookie';


interface ActivityProps {
    token: string;
}

const Activity = ({ token }: ActivityProps) => {
    const [activities, setActivities] = useState<ResponseActivityType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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
                    setActivities(data);
                    console.log("Actividades:", data);
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

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>; 

    return (
        <>
            <div className="flex flex-col py-8 px-8 mt-4 w-full bg-white text-gray-700  rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 hover:shadow-md transition-shadow duration-300">
                <h5>Tu actividad</h5>
                <hr className="border-t-1 border-black mb-4" />

                {activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <div key={index}>
                            <div className="flex items-center justify-between mb-4">
                                {/* Icono y descripción */}
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-crearCuentaNavbar rounded-full mr-2"></div> {/* Círculo verde */}
                                    <span>{activity.description}</span>

                                </div>
                                {/* Monto */}
                                <span className="font-semibold">$ {activity.amount.toFixed(2)}</span>
                            </div>

                            {/* Línea negra */}
                            <hr className="border-t-1 border-black mb-4" />

                        </div>
                    ))
                ) : (
                    <div>No hay actividades registradas.</div> 
                )}

                <div className="flex items-center justify-between mb-4">
                    <span><h5>Ver toda tu actividad</h5></span>
                    <span>
                        <FontAwesomeIcon icon={faArrowRight}
                            className="text-gray-500 w-5 h-5" />
                    </span>
                </div>
            </div>
        </>
    )
}

export default Activity