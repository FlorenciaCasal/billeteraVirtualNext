import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from '@/Components/ui/Button';
import { FormRegister } from '@/types/formData/formDataRegister.types';
import Input from '@/Components/ui/Input';
import { RegisterScheme } from '@/schemes/register.scheme';


interface FormDataRegisterProps {
  onContinue: (data: FormRegister) => void;
}


const FormDataRegister: React.FC<FormDataRegisterProps> = ({ onContinue }) => {

  const [isFormVisible, setIsFormVisible] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted }
  } = useForm<FormRegister>({
    resolver: yupResolver(RegisterScheme),
    mode: "onBlur",
  });

  const onSubmit = (data: FormRegister) => {
    console.log('Datos del formulario:', data);
    // Mostrar mensaje de éxito
    setIsFormVisible(false);
    console.log("Formulario oculto:", !isFormVisible);
    onContinue(data);
  };



  return (
    <>
      {isFormVisible && (
        <section className="flex flex-col items-center justify-center">
          <p className="text-[#FFF] font-bold mb-4">Crear cuenta</p>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 items-center justify-center">

            <Input newType="text" newPlaceholder="Nombre" register={register} errors={errors} fieldName="firstname" />
            <Input newType="text" newPlaceholder="Apellido" register={register} errors={errors} fieldName="lastname" />
            <Input newType="number" newPlaceholder="DNI" register={register} errors={errors} fieldName="dni" />
            <Input newType="text" newPlaceholder="Correo electrónico" register={register} errors={errors} fieldName="email" />
            <div className="col-span-2 mt-[-20px] text-center">
              <p className="text-msj text-[#fff]">Usa entre 6 y 20 carácteres (debe contener al menos al menos 1 carácter especial, una mayúscula y un número</p>
            </div>
            <Input newType="password" newPlaceholder="Contraseña" register={register} errors={errors} fieldName="password" />
            <Input newType="password" newPlaceholder="Confirmar contraseña" register={register} errors={errors} fieldName="confirmPassword" />
            <Input newType="text" newPlaceholder="Teléfono" register={register} errors={errors} fieldName="phone" />

            <span className="flex flex-col h-22">
              <Button
                type="submit"
                className="w-full h-12 mb-1 !text-sm text-custom-green bg-crearCuentaNavbar border border-custom-green hover:bg-hoverButtonGreen"
                onClick={handleSubmit(onSubmit)}
              >
                Crear cuenta
              </Button>
              <p className={`text-msj italic font-sans text-center text-error ${isSubmitted && Object.keys(errors).length > 0 ? 'block' : 'invisible'}`}>
                {"Completa los campos requeridos" || 'Placeholder'}
              </p>
            </span>

          </form>
        </section>
      )}
    </>
  )
}

export default FormDataRegister
