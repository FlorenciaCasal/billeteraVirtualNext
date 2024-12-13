import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { jsPDF } from 'jspdf';
import transactionApi from "@/services/transaction/transaction.api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from "react";
import userApi from '@/services/users/users.service';

interface Step4Props {
    enteredAmount: number;
    transactionId: number;
    accountId: number;
    token: string;
    cvu: string;
}

const Step4 = ({ enteredAmount, cvu, transactionId, accountId, token }: Step4Props) => {
    const router = useRouter();
    const currentDate = new Date();
    const [userId, setUserId] = useState<number | null>(null);

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
    };

    const activityDescriptions: Record<string, string> = {
        Deposit: 'Depósito de dinero',
        Transfer: 'Transferencia de dinero',

    };

    const handleDownload = async () => {
        const upperCaseFirstLetter = (name: string) => {
            return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        };
        if (accountId && transactionId)
            try {
                // Obtener los detalles de la transacción
                const transaction = await transactionApi.getTransactionDetails(Number(accountId), Number(transactionId), token);
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
                if (transaction.type === 'Deposit') {
                    doc.setTextColor(128, 128, 128); // Gris
                    doc.text('Número de tarjeta:', contentX + 20, yCursor);
                    doc.setTextColor(0, 0, 0); // Negro
                    doc.text(` ${transaction.origin}`, contentX + 20 + doc.getTextWidth('Número de tarjeta:'), yCursor);
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
                doc.text(`${firstName} ${lastName}`, contentX + 20, yCursor);
                yCursor += 7;

                if (transaction.type === 'Deposit') {
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(128, 128, 128); // Gris
                    doc.text('CVU:', contentX + 20, yCursor);

                    doc.setTextColor(0, 0, 0); // Negro
                    doc.text(` ${transaction.destination}`, contentX + 20 + doc.getTextWidth('CVU:'), yCursor);
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



    return (
        <div className="flex flex-col w-full">
            <div className="bg-crearCuentaNavbar text-center py-8 rounded-t-lg">
                <FontAwesomeIcon className="w-14 h-14" icon={faCircleCheck} />
                <p className="font-bold text-black text-mmlg">Ya cargamos el dinero en tu cuenta</p>
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
                    ${enteredAmount}
                </h4>
                <p className="text-white mt-4">Para:</p>
                <p className="text-crearCuentaNavbar">Cuenta propia</p>
                <p className="text-white">Brubank</p>
                <p className="text-white">CVU {cvu}</p>
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

export default Step4;