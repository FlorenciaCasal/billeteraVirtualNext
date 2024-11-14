'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import transactionApi from '@/services/transaction/transaction.api';
import { ResponseActivityType } from '@/types/auth.types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import Button from '@/Components/ui/Button';
import { useRouter } from "next/navigation";
import jsPDF from 'jspdf';


const ActivityDetail = () => {
    const [activity, setActivity] = useState<ResponseActivityType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.dashboard.token);
    const searchParams = useSearchParams();
    const accountId = searchParams.get('account_id');
    const transactionId = searchParams.get('id');
    const router = useRouter();

    const activityDescriptions: Record<string, string> = {
        Deposit: 'Depósito de dinero',
        Transfer: 'Transferencia de dinero',
    };

    const activityMessages: Record<string, string> = {
        Deposit: 'Le depositaste al CVU',
        Transfer: 'Le transferiste al CVU',
    };

    const types: Record<string, string> = {
        Deposit: 'Depósito',
        Transfer: 'Transferencia',
    };


    useEffect(() => {
        const handleFetchActivityDetail = async () => {
            if (transactionId && accountId && token) {
                setIsLoading(true);
                try {
                    // Llamada a la API con los tres parámetros
                    const data = await transactionApi.getTransactionDetails(Number(accountId), Number(transactionId), token);
                    setActivity(data);
                } catch (err) {
                    setError("No se pudo cargar los detalles de la actividad.");
                } finally {
                    setIsLoading(false);
                }
            } else {
                setError("Faltan parámetros para cargar la actividad.");
            }
        };

        handleFetchActivityDetail();
    }, [transactionId, accountId, token]);

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
    if (!activity) return <div>Actividad no encontrada</div>;

    const activityDescription = activityDescriptions[activity.type] || 'Actividad desconocida';
    const activityMessage = activityMessages[activity.type] || 'Dirigido a';
    const activityType = types[activity.type] || 'Actividad desconocida';

    const handleDownload = () => {
        if (!activity) return;

        try {
            const formattedDate = new Date(activity.dated).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });
            const formattedTime = new Date(activity.dated).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });

            const doc = new jsPDF();

            doc.setFontSize(16);
            doc.text('Comprobante de Actividad', 10, 10);
            doc.setFontSize(12);
            doc.text(`ID Actividad: ${activity.id}`, 10, 20);
            doc.text(`Fecha: ${formattedDate}`, 10, 30);
            doc.text(`Hora: ${formattedTime}`, 10, 40);
            doc.text(`Monto: $${Math.abs(activity.amount).toFixed(2)}`, 10, 50);
            doc.text(`CVU Origen: ${activity.origin}`, 10, 60);
            doc.text(`CVU Destino: ${activity.destination}`, 10, 70);
            doc.text(`Descripción: ${activityDescription}`, 10, 80);
            doc.text(`Tipo: ${activityType}`, 10, 90);

            const pdfBlob = doc.output('blob');
            const link = document.createElement('a');
            link.href = URL.createObjectURL(pdfBlob);
            link.download = `Comprobante_Actividad_${activity.id}.pdf`;
            link.click();
        } catch (error) {
            console.error(error);
            alert('Hubo un error al generar el comprobante.');
        }
    };

    return (
        <main className="flex-grow min-h-screen py-8 px-16 bg-[#EEEAEA]">
            <div className="bg-black py-6 px-16 rounded-lg w-full">
                <div className='flex justify-between align-center'>
                    <div className="flex items-center text-crearCuentaNavbar rounded-t-lg">
                        <span className='mr-2'><FontAwesomeIcon className="w-8 h-8" icon={faCircleCheck} /></span>
                        <h4>Aprobada</h4>
                    </div>
                    <div className='flex items-center'>
                        <h5 className="text-white">{new Date(activity.dated).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })} a las {new Date(activity.dated).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })} </h5>
                    </div>
                </div>
                <hr className="border-t-1 border-crearCuentaLogin mb-4" />
                <div className="flex flex-col">
                    <div className='pt-2'>
                        <h5 className="text-white">{activityDescription}</h5>
                    </div>
                    <div>
                        <h4 className="text-crearCuentaNavbar">${Math.abs(activity.amount).toFixed(2)}</h4>
                    </div>
                    <div className='pt-2'>
                        <p className="text-sm text-white">{activityMessage}</p>
                    </div>
                    <div>
                        <h4 className="text-crearCuentaNavbar">{activity.destination}</h4>
                    </div>
                    <div className='pt-2'>
                        <p className="text-sm text-white">Número de operación</p>
                    </div>
                    <div>
                        <p className="text-sm text-crearCuentaNavbar">{activity.id}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <Button
                    type="button"
                    className="w-64 h-12 mr-4 bg-[#CECECE] hover:bg-hoverButtonGreen"
                    onClick={() => router.push('/dashboard')}
                >
                    Ir al inicio
                </Button>
                <Button
                    type="button"
                    className="w-64 h-12 bg-crearCuentaNavbar hover:bg-hoverButtonGreen"
                    onClick={handleDownload}
                >
                    Descargar comprobante
                </Button>
            </div>
        </main>
    );
};

export default ActivityDetail;