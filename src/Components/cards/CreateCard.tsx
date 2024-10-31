'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cardSchema } from '@/schemes/card.scheme';
import { useRouter } from 'next/navigation';
import cardApi from '@/services/card/card.api';
import Input from '../ui/Input';
import Button from '../ui/Button';
import CardPreview from './CardPreview';

interface CreateCardProps {
    token: string;
    account_id: number;
}

const CreateCard: React.FC<CreateCardProps> = ({ token, account_id }) => {
    const router = useRouter();
    const [cardData, setCardData] = useState<any>(null);
    const [cardBrand, setCardBrand] = useState<string | undefined>(undefined);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
    } = useForm({
        resolver: yupResolver(cardSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: any) => {
        if (!isConfirmed) {
            setCardData({ ...data, brand: cardBrand });
            setIsConfirmed(true);
        } else {
            try {
                await cardApi.createCard(account_id, token, {
                    cod: Number(data.cod),
                    expiration_date: data.expiration_date,
                    first_last_name: data.first_last_name,
                    number_id: data.number_id,
                });
                router.push('/card');
            } catch (error) {
                console.error('Error creando la tarjeta:', error);
            }
        }
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number_id = e.target.value;
        const firstFourDigits = number_id.slice(0, 4);
        if (firstFourDigits.startsWith('4')) setCardBrand('Visa');
        else if (firstFourDigits.startsWith('34') || firstFourDigits.startsWith('37')) setCardBrand('Amex');
        else if (firstFourDigits.startsWith('5')) setCardBrand('MasterCard');
        else setCardBrand(undefined);
    };

    return (
        <main className="flex-grow py-8 px-16 bg-[#EEEAEA] flex justify-center items-center">
            <div className="bg-white w-full rounded-lg py-6 px-16 shadow-md">
                <div className="flex justify-center mb-6">
                    <CardPreview
                        number_id={isConfirmed && cardData ? cardData.number_id : "**** **** **** ****"}
                        first_last_name={isConfirmed && cardData ? cardData.first_last_name : ""}
                        expiration_date={isConfirmed && cardData ? cardData.expiration_date : ""}
                        isConfirmed={isConfirmed}
                    />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2 gap-x-12">
                    <div className="col-span-1">
                        <Input
                            newType="number"
                            newPlaceholder="Número de la tarjeta"
                            register={register}
                            errors={errors}
                            fieldName="number_id"
                            className="!border-[#D2ffec] !border-0.25 w-full rounded focus:outline-none focus:border-gray-500 shadow-md"
                            onChange={handleCardNumberChange}
                        />
                    </div>

                    <div className="col-span-1">
                        <Input
                            newType="text"
                            newPlaceholder="Fecha de vencimiento"
                            register={register}
                            errors={errors}
                            fieldName="expiration_date"
                            className="!border-[#D2ffec] !border-0.25 w-full rounded focus:outline-none focus:border-gray-500 shadow-md"
                        />
                    </div>

                    <div className="col-span-1">
                        <Input
                            newType="text"
                            newPlaceholder="Nombre y Apellido"
                            register={register}
                            errors={errors}
                            fieldName="first_last_name"
                            className="!border-[#D2ffec] !border-0.25 w-full rounded focus:outline-none focus:border-gray-500 shadow-md"
                        />
                    </div>

                    <div className="col-span-1">
                        <Input
                            newType="number"
                            newPlaceholder="Código de seguridad"
                            register={register}
                            errors={errors}
                            fieldName="cod"
                            className="!border-[#D2ffec] !border-0.25 w-full rounded focus:outline-none focus:border-gray-500 shadow-md"
                        />
                    </div>

                    <div className="col-span-1"></div>
                    <div className="col-span-1">
                        <Button
                            type="submit"
                            className={`h-12 px-4 rounded w-full ${isConfirmed ? 'bg-crearCuentaNavbar' : 'bg-crearCuentaLogin text-[#000]'}`}
                        >
                            {isConfirmed ? 'Confirmar y Continuar' : 'Continuar'}
                        </Button>
                    </div>

                    <p className={`text-msj italic font-sans text-center text-error col-span-2 ${isSubmitted && Object.keys(errors).length > 0 ? 'block' : 'invisible'}`}>
                        {Object.keys(errors).length > 0 ? "Completa los campos requeridos" : ""}
                    </p>
                </form>
            </div>
        </main>
    );
};

export default CreateCard;

