'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { ResponseCardType } from "@/types/card/card.types";
import Cookies from 'js-cookie';
import cardApi from '@/services/card/card.api';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

interface loadMoneyCardPageProps {
    token: string;
    me: {
        alias: string;
        available_amount: number;
        cvu: string;
        id: number;
        user_id: number;
    }
}

const LoadMoneyCard = ({ token, me }: loadMoneyCardPageProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [cards, setCards] = useState<ResponseCardType[]>([]);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const accountIdString = Cookies.get('digitalMoneyAccountID');
    const account_id: number = Number(accountIdString);
    const [showLimitMessage, setShowLimitMessage] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const [enteredAmount, setEnteredAmount] = useState<number | null>(null);
    const [transactionId, setTransactionId] = useState<number | null>(null);
    const [currentAccountId, setCurrentAccountId] = useState<number | null>(null);

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

    const handleCreateCard = () => {
        if (cards.length >= 10) {
            setShowLimitMessage(true);
        } else {
            setShowLimitMessage(false);
            router.push('/createCard');
        }
    };

    const handleSelectCard = (cardId: number) => {
        setSelectedCardId(cardId);
        console.log("Tarjeta seleccionada:", cardId);
    };

    const handleContinue = (amount: number) => {
        console.log("Monto ingresado:", amount);
        setEnteredAmount(amount); // Guardamos el monto ingresado
        setCurrentStep(3); // Avanzamos al paso 3
    };

    const handleConfirm = (transactionId: number, accountId: number) => {
        setTransactionId(transactionId); // Guardamos el transactionId
        setCurrentAccountId(accountId); // Guardamos el accountId
        setCurrentStep(4); // Avanzamos al paso 4
    };

    const handleRestart = () => {
        setCurrentStep(1); // Reinicia los pasos al inicio
        setSelectedCardId(null); // Limpia la selección de tarjeta
        setEnteredAmount(null); // Limpia el monto ingresado
    };

    if (isLoading) return <div>Cargando tarjetas...</div>;
    if (error) return <div>{error}</div>;


    return (
        currentStep === 1 ? (
            <Step1
                cards={cards}
                onCreateCard={handleCreateCard}
                onSelectCard={handleSelectCard}
                onContinue={() => setCurrentStep(2)}
                selectedCardId={selectedCardId}
                showLimitMessage={showLimitMessage}
            />
        ) : currentStep === 2 ? (
            <Step2 onContinue={handleContinue} />
        ) : currentStep === 3 ? (
            <Step3
                selectedCardId={selectedCardId}
                enteredAmount={enteredAmount}
                onConfirm={handleConfirm}
                token={token}
                cvu={me.cvu}
            />
        ) : (
            <Step4
                enteredAmount={enteredAmount ?? 0}
                cvu={me.cvu}
                token={token}
                transactionId={transactionId ?? 0}
                accountId={currentAccountId ?? 0}

            />
        )
    );
}
export default LoadMoneyCard