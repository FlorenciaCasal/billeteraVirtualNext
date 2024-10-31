'use client'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import cardApi from '@/services/card/card.api';
import { ResponseCardType } from '@/types/card/card.types';


interface CardProps {
    token: string;
}

const Card = ({ token }: CardProps) => {
    const [cards, setCards] = useState<ResponseCardType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const accountIdString = Cookies.get('digitalMoneyAccountID');
    const account_id: number = Number(accountIdString);

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

    const handleDelete = (cardId: number) => {
        // Aquí implementarías la lógica para eliminar la tarjeta.
        // Por ahora, solo mostraremos en consola el cardId
        console.log(`Eliminando tarjeta con ID: ${cardId}`);
    };

    if (isLoading) return <div>Cargando tarjetas...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col py-8 px-8 mt-6 w-full bg-white text-gray-700 rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 hover:shadow-md transition-shadow duration-300">
            <h5>Tus tarjetas</h5>
            <hr className="border-t-1 border-black mb-4" />

            {cards.length > 0 ? (
                cards.map((card, index) => (
                    <div key={index}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                {/* Icono de tarjeta */}
                                <div className="w-4 h-4 bg-crearCuentaNavbar rounded-full mr-2"></div>
                                <span>Terminada en {card.number_id.toString().slice(-4)}</span>
                            </div>
                            {/* Botón de eliminar */}
                            <button
                                onClick={() => handleDelete(card.id)}
                                className="flex items-center text-backgroundNavbar hover:text-red-700 transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                        <hr className="border-t-1 border-black mb-4" />
                    </div>
                ))
            ) : (
                <div>No tienes tarjetas registradas.</div>
            )}
        </div>
    )
}

export default Card