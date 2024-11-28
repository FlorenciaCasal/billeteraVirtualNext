import React, { useState } from 'react';
import { ServiceDetails } from '@/types/services/services.types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';


interface Step2Props {
    selectedService: ServiceDetails;
    handleContinue: () => void;
}

// Valor esperado de los 11 dígitos
const EXPECTED_ACCOUNT_SUFFIX = '12345678910';

const schema = yup.object().shape({
    accountNumber: yup
        .string()
        .required('El número de cuenta es obligatorio')
        .length(11, 'El número debe tener exactamente 11 dígitos'),
});

const Step2: React.FC<Step2Props> = ({ selectedService, handleContinue }) => {
    const [showError, setShowError] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange', // Validación en tiempo real
    });

    const validateBeforeSubmit = () => {
        const accountNumber = getValues('accountNumber');
        if (accountNumber.length !== 11) {
            setError('accountNumber', { message: 'Debe tener exactamente 11 dígitos' });
            return;
        }
        if (!new RegExp(`^${EXPECTED_ACCOUNT_SUFFIX}$`).test(accountNumber)) {
            setShowError(true);
        } else {
            handleSubmit(onSubmit)();
        }
    };

    const onSubmit = (data: { accountNumber: string }) => {
        console.log("Número de cuenta ingresado:", data.accountNumber);
        handleContinue();
    };

    return (
        <>
            <div className="flex flex-col py-8 px-8 w-full bg-backgroundNavbar rounded-lg">
                {!showError ? (
                    <>
                        <h4 className="text-mmlg text-crearCuentaNavbar">
                            Número de cuenta sin el primer 2
                        </h4>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col mt-8 w-80">
                                <Input
                                    newType="text"
                                    newPlaceholder="Ingresa los últimos 11 dígitos"
                                    fieldName="accountNumber"
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                            <p className="text-xxs text-white pt-2">
                                Son 11 números sin espacios, sin el “2” inicial. Agregá ceros adelante si tenés menos.
                            </p>
                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    onClick={validateBeforeSubmit}
                                    className="w-64 h-12 mb-4 text-sm text-[#000] bg-crearCuentaNavbar"
                                >
                                    Continuar
                                </Button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <div className=" flex flex-col text-center w-full bg-backgroundNavbar rounded-lg">
                            <div className="relative w-full pb-16">
                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className="text-error w-16 h-16 absolute top left-1/2 transform -translate-x-1/2"
                                />
                            </div>
                            <h4 className="text-white text-mmlg mt-8">
                                No encontramos facturas asociadas a este dato
                            </h4>
                            <p className="text-sm text-crearCuentaLogin mt-4 leading-tight">
                                Revisá el dato ingresado. Si es correcto, es posible <br /> que la empresa aún no haya cargado tu factura.
                            </p>
                        </div>
                    </>
                )}
            </div>
            {/* Botón completamente fuera del contenedor principal */}
            {showError && (
                <div className="flex justify-end mt-4 w-full bg-transparent">
                    <Button
                        type="button"
                        onClick={() => setShowError(false)}
                        className="w-64 h-12 text-sm text-[#000] bg-crearCuentaNavbar"
                    >
                        Revisar dato
                    </Button>
                </div>
            )}

        </>
    );
};

export default Step2;