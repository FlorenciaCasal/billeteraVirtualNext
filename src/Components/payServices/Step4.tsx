'use client';
import React from 'react';
import Button from '../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/navigation';
import { ServiceDetails } from '@/types/typesServices/services.types';
import { jsPDF } from 'jspdf';
import transactionApi from "@/services/transaction/transaction.api";
import { TransferRequest } from '@/types/transactions/transactions.types';
import userApi from '@/services/users/users.service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Step4Props {
    token: string;
    selectedService?: ServiceDetails;
    selectedCardId: number | null;
    cardNumberId?: number | null;
    accountId: number | null;
    transactionId: number | null;
    transferData: TransferRequest | null;
    EXPECTED_ACCOUNT_SUFFIX: string;
}

const Step4: React.FC<Step4Props> = ({ token, selectedService, selectedCardId, accountId, transactionId, transferData, EXPECTED_ACCOUNT_SUFFIX }) => {
    const router = useRouter();
    const currentDate = new Date();
    const [userId, setUserId] = useState<number | null>(null);
    const cardNumberId = useSelector((state: RootState) => state.payment.cardNumberId);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const me = await userApi.getMeInternal(token);
                const user_id = me.user_id
                setUserId(user_id);
                console.log('user_id', me.user_id);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [token]);

    const activityTypes: Record<string, string> = {
        Deposit: 'Depósito',
        Transfer: 'Transferencia',
        Transaction: 'Transacción',
    };

    const activityDescriptions: Record<string, string> = {
        Deposit: 'Depósito de dinero',
        Transfer: 'Transferencia de dinero',
        Transaction: 'Transacción',
    };

    const getCardBrand = (number_id?: number) => {
        if (!number_id) return { brand: '' };
        const firstFourDigits = number_id.toString().slice(0, 4);
        if (/^4/.test(firstFourDigits)) {
            return {
                brand: 'Visa',
            };
        } else if (/^5[1-5]/.test(firstFourDigits)) {
            return {
                brand: 'MasterCard',
            };
        } else if (/^3[47]/.test(firstFourDigits)) {
            return {
                brand: 'Amex',
            };
        } else {
            return { brand: '' };
        }
    };

    const { brand } = cardNumberId ? getCardBrand(cardNumberId) : { brand: '' };

    const handleDownload = async () => {
        const upperCaseFirstLetter = (name: string) => {
            return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        };
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
                const activityDescription = activityDescriptions[transaction.type];

                let userDetails: { firstname?: string; lastname?: string } = {};
                if (userId) {
                    // Solo intenta obtener los datos del usuario si user_id está definido
                    userDetails = await userApi.getUserData(userId, token);
                }

                const firstNameMin = userDetails.firstname || 'N/A';
                const lastNameMin = userDetails.lastname || 'N/A';
                const firstName = upperCaseFirstLetter(firstNameMin)
                const lastName = upperCaseFirstLetter(lastNameMin)

                const doc = new jsPDF();
                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();

                const contentMargin = 20;
                const contentX = contentMargin - 10;
                const contentY = 70;

                // Sección superior: Fondo verde
                doc.setFillColor(193, 253, 53); // Verde
                doc.rect(0, 0, pageWidth, 30, 'F');
                doc.setTextColor(255, 255, 255); // Texto blanco
                doc.setFontSize(20);
                doc.setFont('helvetica', 'bold');

                // Cálculo para centrar "DIGITAL MONEY HOUSE"
                const digitalText = 'DIGITAL';
                const moneyHouseText = 'MONEY HOUSE';
                const gap = 5; // Espacio entre palabras

                const digitalWidth = doc.getTextWidth(digitalText);
                const moneyHouseWidth = doc.getTextWidth(moneyHouseText);
                const totalWidth = digitalWidth + gap + moneyHouseWidth;
                const startX = (pageWidth - totalWidth) / 2; // Posición inicial para centrar

                // Calcular la posición vertical para centrar
                const greenBoxHeight = 30;
                const textHeight = 10; // Altura aproximada del texto
                const centerY = greenBoxHeight / 2 + textHeight / 2; // Centrado en el fondo verde

                // Dibuja "DIGITAL"
                doc.setTextColor(0, 0, 0); // Negro
                doc.text(digitalText, startX, centerY, { align: 'left' });

                // Fondo negro para "MONEY HOUSE"
                const moneyHouseX = startX + digitalWidth + gap;
                // const textHeight = 10; // Altura del fondo negro
                const moneyHouseY = centerY;
                doc.setFillColor(0, 0, 0); // Negro
                doc.roundedRect(moneyHouseX - 3, moneyHouseY - textHeight / 2 - 2.5, moneyHouseWidth + 6, textHeight, 2, 2, 'F');

                // Dibuja "MONEY HOUSE" en blanco sobre el fondo negro
                doc.setTextColor(255, 255, 255); // Blanco
                doc.text(moneyHouseText, moneyHouseX, moneyHouseY, { align: 'left' });

                // Sección negra: Fondo negro debajo del verde
                doc.setFillColor(0, 0, 0); // Negro
                doc.rect(0, 30, pageWidth, 40, 'F');
                doc.setTextColor(193, 253, 53);
                doc.setFontSize(16);
                doc.text(`Comprobante de ${activityType}`, 10, 45, { align: 'left' });
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(12);
                doc.text(`${formattedDate} a las ${formattedTime}`, 10, 55, { align: 'left' });

                doc.setFillColor(0, 0, 0)
                doc.rect(0, 70, pageWidth, pageHeight, 'F')

                // Contenido dentro del recuadro blanco
                doc.setFillColor(255, 255, 255);
                doc.roundedRect(10, 65, pageWidth - 20, pageHeight - 75, 5, 5, 'F');

                doc.setFontSize(14);
                let yCursor = contentY + 15;
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(128, 128, 128);
                doc.text(`${activityType}`, contentX + 10, yCursor - 5);
                yCursor += 8;

                // Monto en negrita
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(`$${Math.abs(transaction.amount).toLocaleString('es-ES', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`, contentX + 10, yCursor - 5);
                yCursor;
                doc.setLineWidth(0.1);
                doc.setFillColor(128, 128, 128);
                doc.line(contentX + 10, yCursor, 20 + pageWidth * 0.8, yCursor); // Línea horizontal
                yCursor += 10;

                // De:
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(128, 128, 128);
                doc.text('De:', contentX + 20, yCursor);
                doc.setFillColor(0, 0, 0);
                doc.circle(contentX + 15, yCursor - 2, 1, 'F');
                yCursor += 5;

                // Nombre y apellido en negrita
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(`${firstName} ${lastName}`, contentX + 20, yCursor + 1);
                yCursor += 7;

                // Origen
                doc.setFont('helvetica', 'normal');
                if (transaction.type === 'Transfer') {
                    doc.setTextColor(128, 128, 128); // Gris
                    doc.text('CVU:', contentX + 20, yCursor);
                    doc.setTextColor(0, 0, 0); // Negro
                    doc.text(` ${transaction.origin}`, contentX + 20 + doc.getTextWidth('CVU:'), yCursor);
                } 
                // else if (transaction.type === 'Deposit') {
                //     doc.setTextColor(128, 128, 128); // Gris
                //     doc.text('Número de tarjeta:', contentX + 20, yCursor);
                //     doc.setTextColor(0, 0, 0); // Negro
                //     doc.text(` ${transaction.origin}`, contentX + 20 + doc.getTextWidth('Número de tarjeta:'), yCursor);
                // }
                else if (transaction.type === 'Transaction') {
                    doc.setTextColor(128, 128, 128); // Gris
                    doc.text('Número de tarjeta:', contentX + 20, yCursor);
                    doc.setTextColor(0, 0, 0); // Negro
                    doc.text(` ${cardNumberId}`, contentX + 20 + doc.getTextWidth('Número de tarjeta:'), yCursor);
                }
                yCursor += 20;

                // Para:
                doc.setTextColor(128, 128, 128);
                doc.text('Para:', contentX + 20, yCursor);
                doc.setFillColor(0, 0, 0);
                doc.circle(contentX + 15, yCursor - 2, 1, 'F');
                yCursor += 6;

                // Descripción o destino en negrita
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(transaction.type === 'Transaction' ? transaction.description : transaction.destination, contentX + 20, yCursor);
                yCursor += 7;

                if (transaction.type === 'Transaction' || 'Transfer') {
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(128, 128, 128); // Gris
                    doc.text('Número de cuenta:', contentX + 20, yCursor);
                    doc.setTextColor(0, 0, 0); // Negro
                    doc.text(` ${EXPECTED_ACCOUNT_SUFFIX}`, contentX + 20 + doc.getTextWidth('Número de cuenta:'), yCursor);
                } 
                yCursor += 5;
    

                doc.setLineWidth(0.1);
                doc.setFillColor(128, 128, 128);
                doc.line(contentX + 10, yCursor, 20 + pageWidth * 0.8, yCursor); // Línea horizontal
                yCursor += 5;

                doc.setFont('helvetica', 'normal');
                // Texto "Motivo :" en gris
                doc.setTextColor(128, 128, 128); // RGB para gris
                doc.text('Motivo :', contentX + 20, yCursor + 2);
                // Texto "Varios" en negro
                doc.setTextColor(0, 0, 0); // RGB para negro
                doc.text(' Varios', contentX + 20 + doc.getTextWidth('Motivo :'), yCursor + 2);
                yCursor += 6;

                doc.setLineWidth(0.1);
                doc.setFillColor(128, 128, 128);
                doc.line(contentX + 10, yCursor, 20 + pageWidth * 0.8, yCursor); // Línea horizontal
                yCursor += 10;

                doc.setFont('helvetica', 'normal');
                doc.setTextColor(128, 128, 128);
                doc.text(`Codigo de ${activityType}`, contentX + 20, yCursor);
                yCursor += 7;
                doc.setTextColor(0, 0, 0);
                doc.text(`${transaction.id}`, contentX + 20, yCursor);
                yCursor;

                // Descargar PDF
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

    if (selectedService) {
        return (
            <div className="flex flex-col w-full">
                <div className="bg-crearCuentaNavbar text-center py-6 rounded-t-lg">
                    <FontAwesomeIcon className="w-10 h-10 md:w-14 md:h-14" icon={faCircleCheck} />
                    <h6 className="text-black">Ya realizaste tu pago</h6>
                </div>
                <div className="bg-backgroundNavbar py-6 px-4 tablet:py-8 tablet:px-16 mt-4 rounded-lg">
                    <p className="text-white text-xxs md:text-xs lg:text-sm pb-1">
                        {currentDate.toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })} a las {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <h4 className="text-crearCuentaNavbar">
                        ${Math.abs(Number(selectedService.invoice_value)).toLocaleString('es-ES', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </h4>
                    <p className="text-white mt-4 pb-1">Para:</p>
                    <h4 className="text-crearCuentaNavbar">{selectedService.name}</h4>

                    {transferData ? (
                        <>
                            <h5 className="text-white mt-4 pb-1">CVU</h5>
                            <h5 className="text-white">{transferData.origin}</h5>
                        </>
                    ) : (
                        <>
                            <p className="text-white mt-4 pb-1">Tarjeta</p>
                            <p className="text-white">
                                {/* {brand} {cardNumberId?.toString().replace(/\d{12}(\d{4})/, '************$1')} */}
                                <span className="inline-block align-middle">{brand}</span>
                                <span className="inline-block align-middle">
                                    {cardNumberId?.toString().replace(/\d{12}(\d{4})/, '************$1')}
                                </span>
                            </p>
                        </>
                    )}
                </div>
                <div className="flex flex-col md:flex-row justify-end mt-4">
                    <Button
                        type="button"
                        className="w-full md:w-1/2 xl:w-1/4 md:h-16 h-12 md:mr-4 !text-sm shadow-md bg-[#CECECE] hover:bg-hoverButtonGreen md:order-none order-last"
                        onClick={() => router.push('/dashboard')}
                    >
                        Ir al inicio
                    </Button>
                    <Button
                        type="button"
                        className="w-full md:w-1/2 xl:w-1/4 md:h-16 mb-4 h-12 !text-sm shadow-md bg-crearCuentaNavbar hover:bg-hoverButtonGreen md:order-none order-first"
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
