import { ResponseCardType } from "@/types/card/card.types";

interface CardListProps {
    cards: ResponseCardType[];
    selectedCardId: number | null;
    onSelectCard: (cardId: number) => void;
}

const CardList = ({ cards, selectedCardId, onSelectCard }: CardListProps) => (
    <div className="flex flex-col py-8 px-8 my-6 w-full bg-white text-gray-700 rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 hover:shadow-md transition-shadow duration-300">
        <h5 className="mb-4">Tus tarjetas</h5>
        {cards.length > 0 ? (
            cards.map((card, index) => (
                <div key={index}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="w-5 h-5 bg-crearCuentaNavbar rounded-full mr-2"></div>
                            <span>Terminada en {card.number_id.toString().slice(-4)}</span>
                        </div>
                        {/* Círculo clickeable para seleccionar tarjeta */}
                        <div
                            className={`w-4 h-4 border-2 rounded-full mr-2 cursor-pointer ${selectedCardId === card.id ? 'bg-[#000] border-2 border-crearCuentaNavbar ring-1 ring-black' : 'border-gray-400'}`}
                            onClick={() => onSelectCard(card.id)}
                        ></div>
                    </div>
                    <hr className="border-t-1 border-black mb-4" />
                </div>
            ))
        ) : (
            <div>No tienes tarjetas registradas.</div>
        )}
    </div>
);

export default CardList;