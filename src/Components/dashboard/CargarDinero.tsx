'use client'
import React from 'react'
import Button from '@/Components/ui/Button'
import { useState } from 'react';
import depositApi from '@/services/deposit/deposit.api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import userApi from '@/services/users/users.service';
import { useDispatch } from 'react-redux';
// import { incrementAmount } from '@/store/amountSlice';


interface CargarDineroProps {
    token: string;
}

const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString(); // Esto incluye tanto la fecha como la hora en formato ISO
};

const CargarDinero: React.FC<CargarDineroProps> = ({ token }) => {
    const [amount, setAmount] = useState<number | string>(0);
    const [dated, setDated] = useState<string>(getCurrentDateTime());
    const [destination, setDestination] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');
    const [depositError, setDepositError] = useState<string | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    // const account = useSelector((state: RootState) => state.account);
    const accountIdString = Cookies.get('digitalMoneyAccountID');
    const account_id: number = Number(accountIdString);
    const router = useRouter();

    const dispatch = useDispatch();
    console.log("token en cargarDinero:", token)

    // Obtener el saldo actualizado después del depósito
    const fetchUpdatedBalance = async () => {
        try {
            const me = await userApi.getMeInternal(token);
            setBalance(me.available_amount);
            console.log("Saldo actualizado:", me.available_amount);
            // Aquí podrías también actualizar el estado del balance en algún lugar global si lo manejas
        } catch (error) {
            console.error("Error obteniendo saldo actualizado:", error);
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setAmount(inputValue === '' ? '' : Number(inputValue));
    };

    const handleDeposit = async () => {
        setDepositError(null);
        const numericAmount = Number(amount);

        try {
            if (isNaN(numericAmount) || numericAmount <= 0) {
                setDepositError("El monto debe ser mayor que 0");
                return;
            }

            if (!destination || !origin) {
                setDepositError("El destino y el origen no pueden estar vacíos.");
                return;
            }

            if (account_id) {
                const response = await depositApi.makeDeposit(account_id, numericAmount, dated, destination, origin, token);
                console.log("Depósito exitoso:", response);
                alert("Depósito realizado con éxito.");

                // // Dispatch la acción para incrementar el saldo
                // dispatch(incrementAmount(numericAmount));

                // Fetch el saldo actualizado después de un depósito exitoso
                await fetchUpdatedBalance();
                router.push('/dashboard');

            } else {
                setDepositError("No se encontró una cuenta válida.");
            }
        } catch (error) {
            console.error("Error realizando depósito:", error);
            setDepositError("Error realizando el depósito. Inténtalo de nuevo más tarde.");
        }
    };

    return (
        <>
            <div className="flex flex-col items-center">
                {/* Campo de entrada para el monto */}
                <input
                    type="number"
                    placeholder="Monto a depositar"
                    value={amount}
                    onChange={handleAmountChange}
                    min="0"
                    className="mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="datetime-local"
                    value={dated.slice(0, 19)} // Mostrar solo la parte de fecha y hora sin 'Z'
                    onChange={(e) => setDated(new Date(e.target.value).toISOString())} // Convertir la nueva fecha a ISO
                    className="mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Destino"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Origen"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="mb-2 p-2 border border-gray-300 rounded"
                />
                {depositError && <p className="text-red-500">{depositError}</p>}
                <Button onClick={handleDeposit} className='align-center text-xs text-bold'>
                    Cargar dinero
                </Button>
            </div>
        </>
    )
}

export default CargarDinero