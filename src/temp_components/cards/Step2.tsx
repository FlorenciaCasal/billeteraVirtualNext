import Button from "../ui/Button";
import { useState } from "react";
import Input from "../ui/Input";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface Step2Props {
    onContinue: (amount: number) => void;
}

const validationSchema = Yup.object({
    amount: Yup.number()
        .typeError("El monto debe ser un número válido") // Si no es un número
        .positive("El monto debe ser positivo") // Solo valores positivos
        .required("Por favor, ingrese un monto") // Campo obligatorio
});

const Step2 = ({ onContinue }: Step2Props) => {
    const [enteredAmount, setEnteredAmount] = useState<number | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid } // Ahora isValid proviene de formState
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: { amount: 0 },
        mode: 'onChange' // Habilitamos validación en tiempo real
    });

    const onSubmit = (data: { amount: number }) => {
        // Convertimos el valor a número, eliminando cualquier carácter no numérico
        const amount = (data.amount)
        if (!isNaN(amount)) {
            console.log("Monto ingresado:", amount);
            onContinue(amount); // Pasamos el monto como número
        } else {
            console.error("Monto no válido");
        }
    };

    return (
        <div className='flex flex-col py-8 px-8 w-full bg-backgroundNavbar rounded-lg'>
            <p className="text-crearCuentaNavbar text-mmlg font-bold">¿Cuánto querés ingresar a la cuenta?</p>
            {/* Formulario con React Hook Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Campo de monto */}
                <div className="flex flex-col mt-8 w-80">
                    <Input
                        newType="text" // Usamos texto para permitir el filtrado
                        newPlaceholder="$0"
                        register= {register}
                        errors={errors}
                        fieldName="amount"
                    />
                    {errors.amount && <div className="text-red-500 text-sm">{errors.amount.message}</div>}
                </div>
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={!isValid}
                        className={`w-64 h-12 mb-4 text-sm text-[#000] ${isValid ? 'bg-crearCuentaNavbar' : 'bg-[#CECECE]'} 
                            border-custom-green hover:bg-hoverButtonGreen`}
                    // Deshabilita el botón si no es válido
                    >
                        Continuar
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Step2;