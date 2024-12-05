'use client';
import React from 'react';
import Button from '../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/navigation';
import { ServiceDetails } from '@/types/typesServices/services.types';
import { jsPDF } from 'jspdf';
import transactionApi from "@/services/transaction/transaction.api";

interface Step4Props {
    token: string;
    selectedService?: ServiceDetails;
    selectedCardId: number | null;
    cardNumberId: number | null;
    accountId: number | null;
    transactionId: number | null;
}

const Step4: React.FC<Step4Props> = ({ token, selectedService, selectedCardId, cardNumberId, accountId, transactionId }) => {
    const router = useRouter();
    const currentDate = new Date();

    const activityTypes: Record<string, string> = {
        Deposit: 'Depósito',
        Transfer: 'Transferencia',
    };

    const activityDescriptions: Record<string, string> = {
        Deposit: 'Depósito de dinero',
        Transfer: 'Transferencia de dinero',

    };

    const handleDownload = async () => {
        if (accountId && transactionId)
            try {
                // Obtener los detalles de la transacción
                const transaction = await transactionApi.getTransactionDetails(accountId, transactionId, token);
                // Formatear fecha y hora
                const formattedDate = new Date(transaction.dated).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });
                const formattedTime = new Date(transaction.dated).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                const activityType = activityTypes[transaction.type] || 'Actividad desconocida';
                const activityDescription = activityDescriptions[transaction.type]

                // Crear el PDF
                const doc = new jsPDF();
                // Agregar contenido
                doc.setFontSize(16);
                doc.text('Comprobante de Transacción', 10, 10);
                doc.setFontSize(12);
                doc.text(`ID Transacción: ${transaction.id}`, 10, 20);
                doc.text(`Fecha: ${formattedDate}`, 10, 30);
                doc.text(`Hora: ${formattedTime}`, 10, 40);
                doc.text(`Monto: $${Math.abs(transaction.amount).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 10, 50);
                doc.text(`Tarjeta origen: ${transaction.origin}`, 10, 60);
                doc.text(`CVU Destino: ${transaction.destination}`, 10, 70);
                doc.text(`Descripción: ${activityDescription}`, 10, 80);
                doc.text(`Tipo: ${activityType}`, 10, 90);

                // Usar output para obtener un blob y forzar la descarga manualmente
                const pdfBlob = doc.output('blob');
                const link = document.createElement('a');
                link.href = URL.createObjectURL(pdfBlob);
                link.download = `Comprobante_Transaccion_${transaction.id}.pdf`;
                link.click();
            } catch (error) {
                console.error(error);
                alert('Hubo un error al generar el comprobante.');
            }
    };

    if (selectedService && selectedCardId) {
        console.log(selectedCardId)
        console.log(cardNumberId)
        return (
            <div className="flex flex-col w-full">
                <div className="bg-crearCuentaNavbar text-center py-8 rounded-t-lg">
                    <FontAwesomeIcon className="w-14 h-14" icon={faCircleCheck} />
                    <p className="font-bold text-black text-mmlg">Ya realizaste tu pago</p>
                </div>
                <div className="bg-backgroundNavbar py-8 px-16 mt-4 rounded-lg">
                    <p className="text-white text-sm pb-2">
                        {currentDate.toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })} - {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <h4 className="text-crearCuentaNavbar">
                        ${Math.abs(Number(selectedService.invoice_value)).toLocaleString('es-ES', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </h4>
                    <p className="text-white mt-4">Para:</p>
                    <p className="text-crearCuentaNavbar">{selectedService.name}</p>
                    <p className="text-white">Tarjeta</p>
                    <p className="text-white">  {cardNumberId?.toString().replace(/\d{12}(\d{4})/, '************$1')}</p>
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
            </div>
        );
    };
};

export default Step4;
