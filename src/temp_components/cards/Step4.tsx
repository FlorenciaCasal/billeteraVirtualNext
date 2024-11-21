import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { jsPDF } from 'jspdf';
import transactionApi from "@/services/transaction/transaction.api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

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

    const activityTypes: Record<string, string> = {
        Deposit: 'Depósito',
        Transfer: 'Transferencia',
    };

    const activityDescriptions: Record<string, string> = {
        Deposit: 'Depósito de dinero',
        Transfer: 'Transferencia de dinero',
    };

    const handleDownload = async () => {
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
            doc.text(`Monto: $${transaction.amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 10, 50);

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