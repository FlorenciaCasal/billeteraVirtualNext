import Button from "../ui/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import depositApi from "@/services/deposit/deposit.api";
import { useState } from "react";
import Cookies from "js-cookie";
import cardApi from "@/services/card/card.api";

interface Step3Props {
    selectedCardId: number | null;
    enteredAmount: number | null;
    onConfirm: (transaction_id: number, account_id: number) => void;
    cvu: string;
    token: string;
}

const Step3 = ({ selectedCardId, enteredAmount, onConfirm, cvu, token }: Step3Props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    if (!selectedCardId || !enteredAmount) {
        return <div>Error: Faltan datos para procesar.</div>;
    }

    const handleDeposit = async () => {
        if (!selectedCardId || !enteredAmount) {
            setError("Por favor, selecciona una tarjeta e ingresa un monto válido.");
            return;
        }
        try {
            setLoading(true);
            setError("");
            const accountIdString = Cookies.get("digitalMoneyAccountID");
            const account_id = Number(accountIdString); // Convierte el ID de la cuenta a número
            const cardDetails = await cardApi.getCardDetails(account_id, selectedCardId, token ?? "");
            const cardNumberId = cardDetails.number_id; // Aquí obtienes el `number_id`

            if (!cardNumberId) {
                throw new Error("No se pudo obtener el número de la tarjeta seleccionada.");
            }
            const depositData = {
                amount: enteredAmount,
                dated: new Date().toISOString(), // Fecha actual en formato ISO
                destination: cvu, // Tu cuenta CVU como destino
                origin: cardNumberId.toString(),
            };
            // Llama al método makeDeposit de la API
            const depositResponse = await depositApi.makeDeposit(
                account_id,
                depositData.amount,
                depositData.dated,
                depositData.destination,
                depositData.origin,
                token ?? ""
            );
            const transaction_id = depositResponse.id;
            console.log("Depósito exitoso");
            onConfirm(transaction_id, account_id);
        } catch (error) {
            console.error("Error al realizar el depósito:", error);
            setError("Ocurrió un error al intentar realizar el depósito. Por favor, inténtalo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col pt-6 pb-8 px-4 sm:py-6 sm:px-6 s:px-8 s:py-8 tablet:pb-8 tablet:pt-12 tablet:px-12 w-full bg-backgroundNavbar rounded-lg">
                <h4 className="text-crearCuentaNavbar mb-6">Revisá que está todo bien</h4>
                <hr className="block sm:hidden border-t-1 border-gray-300 mb-4" />
                <p className="text-white text-sm">Vas a ingresar  <FontAwesomeIcon className="text-crearCuentaNavbar pl-2 w-7 h-7" icon={faPenToSquare} /> </p>
                <h5 className="text-white">${enteredAmount}</h5>
                <p className="text-white text-sm pt-8">Para</p>
                <h4 className="text-white lg:mb-4">Cuenta propia</h4>
                <p className="text-white text-sm pt-2">Brubank</p>
                <p className="text-white lg:mt-1">CVU {cvu}</p>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <div className="flex lg:justify-end">
                    <Button
                        type="button"
                        className={`hidden sm:block sm:w-full lg:w-64 h-16 mt-8 lg:mb-4 lg:mt-0 !text-sm ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-crearCuentaNavbar border-custom-green hover:bg-hoverButtonGreen"
                            }`}
                        onClick={handleDeposit}
                        disabled={loading}
                    >
                        {loading ? "Procesando..." : "Continuar"}
                    </Button>
                </div>
            </div>
            <div className="flex justify-end">
                <Button
                    type="button"
                    className={`block sm:hidden  w-1/2 h-12 mt-6 shadow-md !text-sm ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-crearCuentaNavbar border-custom-green hover:bg-hoverButtonGreen"
                        }`}
                    onClick={handleDeposit}
                    disabled={loading}
                >
                    {loading ? "Procesando..." : "Continuar"}
                </Button>
            </div>
        </>
    );
};
export default Step3;