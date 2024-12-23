import React, { useState } from 'react';
import { ServiceDetails } from '@/types/typesServices/services.types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Error from './Error';

interface Step2Props {
    selectedService: ServiceDetails;
    handleContinue: () => void;
    EXPECTED_ACCOUNT_SUFFIX: string;
}

const schema = (EXPECTED_ACCOUNT_SUFFIX: string) =>
    yup.object().shape({
        accountNumber: yup
            .string()
            .required('El número de cuenta es obligatorio')
            .matches(/^[0-9]{11}$/, 'Debe tener exactamente 11 dígitos numéricos.')
    });

const Step2: React.FC<Step2Props> = ({ selectedService, handleContinue, EXPECTED_ACCOUNT_SUFFIX }) => {
    const [showError, setShowError] = useState(false);
    const title = 'No encontramos facturas asociadas a este dato';
    const paragraph1 = 'Revisá el dato ingresado. Si es correcto, es posible';
    const paragraph2 = 'que la empresa aún no haya cargado tu factura.'
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm({
        resolver: yupResolver(schema(EXPECTED_ACCOUNT_SUFFIX)),
        mode: 'onChange', // Validación en tiempo real
    });

    const validateBeforeSubmit = () => {
        const accountNumber = getValues('accountNumber');
        if (accountNumber.length !== 11) {
            setError('accountNumber', { message: 'Debe tener exactamente 11 dígitos' });
            return;
        }
        if (!accountNumber.endsWith(EXPECTED_ACCOUNT_SUFFIX)) {
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
            <div className="flex flex-col pt-6 pb-8 px-6 s:px-8 tablet:px-12 tablet:pt-10 tablet:pb-10 lg:px-16 lg:pt-12 lg:pb-12 w-full bg-backgroundNavbar rounded-lg">
                {!showError ? (
                    <>
                        <h4 className="w-3/5 s:w-full text-crearCuentaNavbar tablet:mb-12">
                            Número de cuenta sin el primer 2
                        </h4>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col mt-4 ">
                                <Input
                                    newType="text"
                                    newPlaceholder="Ingresa los últimos 11 dígitos"
                                    fieldName="accountNumber"
                                    register={register}
                                    errors={errors}
                                    className='tablet:h-16 xl:!w-114 xl:text-left !mb-0'
                                />
                            </div>
                            <p className="hidden tablet:block text-xxs mx-6 mb-8 lg:mx-0 text-white ">
                                Son 11 números sin espacios, sin el “2” inicial. Agregá ceros adelante si tenés menos.
                            </p>
                            <div className="flex lg:justify-end">
                                <Button
                                    type="button"
                                    onClick={validateBeforeSubmit}
                                    className="hidden sm:block sm:w-full lg:w-64 lg:mb-4 h-16 text-sm text-[#000] bg-crearCuentaNavbar"
                                >
                                    Continuar
                                </Button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <Error title={title} paragraph1={paragraph1} paragraph2={paragraph2} />
                    </>
                )}
            </div>
            <div className="flex justify-end">
                {!showError && (
                    <Button
                        type="button"
                        onClick={validateBeforeSubmit}
                        className="block sm:hidden w-1/2 h-12 mt-6 shadow-md text-sm text-[#000] bg-crearCuentaNavbar"
                    >
                        Continuar
                    </Button>
                )}
            </div>
            {/* Botón completamente fuera del contenedor principal */}
            {showError && (
                <div className="flex justify-end mt-4 w-full bg-transparent">
                    <Button
                        type="button"
                        onClick={() => setShowError(false)}
                        className="w-1/2 tablet:w-full lg:w-1/2 xl:w-1/4 h-12 tablet:h-16 sm:!text-sm text-[#000] bg-crearCuentaNavbar"
                    >
                        Revisar dato
                    </Button>
                </div>
            )}

        </>
    );
};

export default Step2;