import Button from "../ui/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ResponseCardType } from "@/types/card/card.types";
import CardList from "./CardList";
import Swal from 'sweetalert2';

interface Step1Props {
    cards: ResponseCardType[];
    onCreateCard: () => void;
    onSelectCard: (cardId: number) => void;
    onContinue: () => void;
    selectedCardId: number | null;
    showLimitMessage: boolean;
}

const Step1 = ({cards, onCreateCard, onSelectCard, onContinue, selectedCardId, showLimitMessage }: Step1Props) => {
    const handleContinueClick = () => {
        Swal.fire({
            title: 'Por favor selecciona una tarjeta',
            text: 'Debes elegir un método de pago antes de continuar.',
            icon: 'warning',
            confirmButtonText: 'Entendido',
            customClass: {
                confirmButton: 'bg-crearCuentaNavbar text-white px-4 py-2 rounded',
            },
        })
    };

    return (
        <>
            <div className='flex flex-col py-4 px-4 sm:py-6 sm:px-6 tablet:py-8 tablet:px-8 w-full bg-backgroundNavbar rounded-lg'>
                <h4 className="font-bold text-crearCuentaNavbar">Seleccionar tarjeta</h4>
                <CardList
                    cards={cards}
                    selectedCardId={selectedCardId}
                    onSelectCard={onSelectCard}
                />
                <div className="flex items-center justify-between">
                    <div className={`flex items-center cursor-pointer ${cards.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={onCreateCard}
                    >
                        <FontAwesomeIcon icon={faPlus} className="text-crearCuentaNavbar w-7 h-7 border-2 border-crearCuentaNavbar rounded-full bg-transparent p-1 mr-4" />
                        <h4 className="text-crearCuentaNavbar font-bold">Nueva tarjeta</h4>
                    </div>
                    <span className="flex items-center">
                        <Button
                            type="button"
                            className={`hidden lg:block w-64 h-16 !text-sm text-[#000] ${selectedCardId !== null
                                ? 'bg-crearCuentaNavbar border-custom-green hover:bg-hoverButtonGreen'
                                : 'bg-crearCuentaNavbar cursor-not-allowed'
                                }`}
                            onClick={() => {
                                if (selectedCardId !== null) {
                                    onContinue();
                                } else {
                                    handleContinueClick();
                                }
                            }}
                        >
                            Continuar
                        </Button>
                    </span>
                </div>
                {showLimitMessage && (
                    <p className="text-red-600 text-sm">No puedes agregar más de 10 tarjetas.</p>
                )}
                <span className="flex items-center">
                    <Button
                        type="button"
                        className={`hidden sm:block lg:hidden w-full h-16 mb-4 mt-6 !text-sm text-[#000] ${selectedCardId !== null
                            ? 'bg-crearCuentaNavbar border-custom-green hover:bg-hoverButtonGreen'
                            : 'bg-crearCuentaNavbar cursor-not-allowed'
                            }`}
                        onClick={() => {
                            if (selectedCardId !== null) {
                                onContinue();
                            } else {
                                handleContinueClick();
                            }
                        }}
                    >
                        Continuar
                    </Button>
                </span>
            </div>
            <span className="flex justify-end">
                <Button
                    type="button"
                    className={`block sm:hidden w-1/2 h-12 mt-4 shadow-md !text-sm text-[#000] ${selectedCardId !== null
                        ? 'bg-crearCuentaNavbar border-custom-green hover:bg-hoverButtonGreen'
                        : 'bg-crearCuentaNavbar cursor-not-allowed'
                        }`}
                    onClick={() => {
                        if (selectedCardId !== null) {
                            onContinue();
                        } else {
                            handleContinueClick();
                        }
                    }}
                >
                    Continuar
                </Button>
            </span>
        </>
    )
}

export default Step1;