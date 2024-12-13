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
            .test('match-suffix', 'Los últimos dígitos no coinciden', (value) => value?.endsWith(EXPECTED_ACCOUNT_SUFFIX)),
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
                            <div className="flex flex-col mt-8 w-80 ">
                                <Input
                                    newType="text"
                                    newPlaceholder="Ingresa los últimos 11 dígitos"
                                    fieldName="accountNumber"
                                    register={register}
                                    errors={errors}
                                    className='!mb-0'
                                />
                            </div>
                            <p className="text-xxs text-white ">
                                Son 11 números sin espacios, sin el “2” inicial. Agregá ceros adelante si tenés menos.
                            </p>
                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    onClick={validateBeforeSubmit}
                                    className="w-64 h-12 text-sm text-[#000] bg-crearCuentaNavbar"
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