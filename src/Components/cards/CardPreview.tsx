import React from 'react';
import Image from 'next/image';

interface CardPreviewProps {
    number_id?: number;
    first_last_name?: string;
    expiration_date?: string;
    isConfirmed?: boolean;
}

const getCardBrand = (number_id?: number) => {
    if (!number_id) return { brand: '', color: 'bg-[#EEEAEA]', logo: null, size: { width: 40, height: 30 } };

    const firstFourDigits = number_id.toString().slice(0, 4);

    if (/^4/.test(firstFourDigits)) {
        return {
            brand: 'Visa',
            color: 'bg-[#1A1F71]',
            logo: '/img/visa.svg',
            size: { width: 40, height: 30 } // Tamaño para Visa
        };
    } else if (/^5[1-5]/.test(firstFourDigits)) {
        return {
            brand: 'MasterCard',
            color: 'bg-[#EB001B]',
            logo: '/img/master.png',
            size: { width: 50, height: 40 } // Tamaño para MasterCard
        };
    } else if (/^3[47]/.test(firstFourDigits)) {
        return {
            brand: 'Amex',
            color: 'bg-[#007BC1]',
            logo: '/img/amex.jpg',
            size: { width: 40, height: 30 } // Tamaño para Amex
        };
    } else {
        return { brand: '', color: 'bg-[#EEEAEA]', logo: null, size: { width: 40, height: 30 } };
    }
};

const formatCardNumber = (number_id?: number, isConfirmed?: boolean) => {
    if (isConfirmed && number_id) {
        const numberStr = number_id.toString().padStart(16, '0');
        return numberStr.replace(/(.{4})/g, '$1 ').trim(); // Formato con espacios
    }
    return '**** **** **** ****'; // Mostrar asteriscos si no está confirmado
};

const CardPreview: React.FC<CardPreviewProps> = ({
    number_id = 0,
    first_last_name = 'Nombre del titular',
    expiration_date = 'MM/AA',
    isConfirmed = false,
}) => {
    const { brand, color, logo, size } = getCardBrand(number_id);
    const displayNumber = formatCardNumber(number_id, isConfirmed);
    const displayName = isConfirmed ? first_last_name : 'Nombre del titular';  // Muestra el nombre del titular solo si está confirmado
    const displayExpiration = isConfirmed ? expiration_date : 'MM/AA'; // Muestra la fecha solo si está confirmada

    return (
        <div className={`relative w-80 h-48 rounded-lg py-4 px-6 shadow-lg ${color}`}>
            <div className="flex justify-end items-center pb-10">
                {isConfirmed ? (
                    <div className="bg-gray-300 w-12 h-8 flex items-center justify-center rounded">
                        {logo && (
                            <Image
                                src={logo}
                                alt={brand}
                                width={size.width}  // Usa el tamaño especificado
                                height={size.height} // Usa el tamaño especificado
                            />
                        )}
                    </div>
                ) : (
                    <div className="bg-gray-300 w-12 h-8 rounded"></div> // Rectángulo gris cuando no está confirmado
                )}
            </div>
            <div className={`flex justify-between my-4 text-lg tracking-[0.1em] ${isConfirmed ? 'text-white' : 'text-black/50'}`}>
                {displayNumber.split(' ').map((group, index) => (
                    <span key={index}>{group}</span>
                ))}
            </div>
            <div className={`flex justify-between text-xs ${isConfirmed ? 'text-white' : 'text-black/50'}`}>
                <span className="uppercase">{displayName}</span> {/* Nombre del titular */}
                <span>{displayExpiration}</span> {/* Fecha de vencimiento */}
            </div>
        </div>
    );
};

export default CardPreview;