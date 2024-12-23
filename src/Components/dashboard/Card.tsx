'use client'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import cardApi from '@/services/card/card.api';
import { ResponseCardType } from '@/types/card/card.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import Button from "../ui/Button";


interface CardProps {
    token: string;
}

const Card = ({ token }: CardProps) => {
    const [cards, setCards] = useState<ResponseCardType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const accountIdString = Cookies.get('digitalMoneyAccountID');
    const account_id: number = Number(accountIdString);
    const router = useRouter();
    const [showLimitMessage, setShowLimitMessage] = useState(false);

    const handleCreateCard = () => {
        if (cards.length >= 10) {
            setShowLimitMessage(true);
        } else {
            setShowLimitMessage(false);
            router.push('/createCard');
        }
    };

    useEffect(() => {
        const fetchCards = async () => {
            setIsLoading(true);
            try {
                if (account_id) {
                    const data = await cardApi.getCard(account_id, token);
                    setCards(data);
                }
            } catch (err) {
                console.error("Error fetching cards:", err);
                setError("No se pudieron cargar las tarjetas.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchCards();
    }, [account_id, token]);

    const handleDelete = async (cardId: number) => {
        try {
            const response = await cardApi.deleteCard(account_id, cardId, token);
            if (response.ok || response.status === 202) {
                // Filtra la tarjeta eliminada del estado local
                const updatedCards = cards.filter(card => card.id !== cardId);
                setCards(updatedCards);

            } else {
                setError("No se pudo eliminar la tarjeta en el backend.");
            }
        } catch (err) {
            console.error("Error al eliminar la tarjeta:", err);
            setError("No se pudo eliminar la tarjeta.");
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-opacity-75"></div>
        </div>
    );
    if (error) return <div>{error}</div>;

    return (
        <>
            <div className='flex flex-col pt-4 pb-8 px-4 md:py-16 md:px-8 md:mb-12 lg:py-8 my-4 w-full bg-backgroundNavbar rounded-lg'>
                <p className="block md:hidden lg:block font-bold text-white pb-8">Agregá tu tarjeta de débito o crédito</p>
                <div
                    className={`flex items-center justify-between cursor-pointer ${cards.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleCreateCard}
                >
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faPlus} className="text-crearCuentaNavbar w-7 h-7 border-2 border-crearCuentaNavbar rounded-full bg-transparent p-1 mr-4" />
                        <h4 className="text-crearCuentaNavbar font-bold">Nueva tarjeta</h4>
                    </div>
                    <span>
                        <FontAwesomeIcon icon={faArrowRight} className="text-crearCuentaNavbar w-5 h-5" />
                    </span>
                </div>
                {showLimitMessage && (
                    <p className="text-red-600 text-sm">No puedes agregar más de 10 tarjetas.</p>
                )}
            </div>

            <div className="flex flex-col py-4 px-4 md:py-8 md:px-8 mt-6 w-full bg-white text-gray-700 rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 shadow-none md:shadow-md lg:shadow-none hover:shadow-md transition-shadow duration-300">
                <h5 className="mb-4">Tus tarjetas</h5>
                <hr className="hidden md:block lg:hidden border-t-1 border-black mb-4" />
                {cards.length > 0 ? (
                    cards.map((card, index) => (
                        <div key={index}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    {/* Icono de tarjeta */}
                                    <div className="w-4 h-4 md:w-6 md:h-6 bg-crearCuentaNavbar rounded-full mr-2"></div>
                                    <span>Terminada en {card.number_id.toString().slice(-4)}</span>
                                </div>
                                {/* Botón de eliminar */}
                                <Button
                                    onClick={() => handleDelete(card.id)}
                                    className="flex items-center text-backgroundNavbar hover:text-red-700 transition-colors"
                                >
                                    Eliminar
                                </Button>
                            </div>
                            <hr className="border-t-1 border-transparent sm:border-gray-300 mb-4" />
                        </div>
                    ))
                ) : (
                    <div>No tienes tarjetas registradas.</div>
                )}
            </div>
        </>
    )
}

export default Card