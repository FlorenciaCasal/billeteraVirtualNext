import Button from "../ui/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ResponseCardType } from "@/types/card/card.types";
import CardList from "./CardList";

interface Step1Props {
    cards: ResponseCardType[];
    onCreateCard: () => void;
    onSelectCard: (cardId: number) => void;
    onContinue: () => void;
    selectedCardId: number | null;
    showLimitMessage: boolean;
}

const Step1 = ({
    cards,
    onCreateCard,
    onSelectCard,
    onContinue,
    selectedCardId,
    showLimitMessage,
}: Step1Props) => (
    <div className='flex flex-col py-8 px-8 w-full bg-backgroundNavbar rounded-lg'>
        <p className="font-bold text-crearCuentaNavbar">Seleccionar tarjeta</p>
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
            <span>
                <Button
                    type="button"
                    className={`w-64 h-12 mb-4 text-sm text-[#000] ${selectedCardId !== null
                        ? 'bg-crearCuentaNavbar border-custom-green hover:bg-hoverButtonGreen'
                        : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    onClick={selectedCardId !== null ? onContinue : undefined}
                    disabled={selectedCardId === null}
                >
                    Continuar
                </Button>
            </span>
        </div>
        {showLimitMessage && (
            <p className="text-red-600 text-sm">No puedes agregar más de 10 tarjetas.</p>
        )}
    </div>
)

export default Step1;