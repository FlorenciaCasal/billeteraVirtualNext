import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
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
    mode: "onChange",
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
          <h4 className="text-[#FFF] mb-4">Crear cuenta</h4>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:grid md:grid-cols-2 md:gap-y-4 md:gap-x-8 xl:gap-x-12 items-center justify-center">

            <Input newType="text" newPlaceholder="Nombre" register={register} errors={errors} fieldName="firstname" autoFocus  className="!w-72" />
            <Input newType="text" newPlaceholder="Apellido" register={register} errors={errors} fieldName="lastname"  className="!w-72 " />
            <Input newType="number" newPlaceholder="DNI" register={register} errors={errors} fieldName="dni"  className="!w-72 " />
            <Input newType="text" newPlaceholder="Correo electrónico" register={register} errors={errors} fieldName="email"  className="!w-72 " />
            <div className="col-span-2 mt-[-5px] mb-2 md:mb-0 md:mt-[-20px] w-72 md:w-full text-center">
              <p className="text-xxs xl:text-xs text-[#fff] text-left md:text-center">Usa entre 6 y 20 carácteres (debe contener al menos 1 carácter especial, una mayúscula y un número)</p>
            </div>
            <Input newType="password" newPlaceholder="Contraseña" register={register} errors={errors} fieldName="password"  className="!w-72" />
            <Input newType="password" newPlaceholder="Confirmar contraseña" register={register} errors={errors} fieldName="confirmPassword"  className="!w-72" />
            <Input newType="text" newPlaceholder="Teléfono" register={register} errors={errors} fieldName="phone"  className="!w-72" />

            <span className="mt-4 md:mt-0 flex flex-col h-22 self-center md:self-start w-72">
              <Button
                type="submit"
                className="w-full h-12 mb-1 !text-sm text-[#000] bg-crearCuentaNavbar border border-custom-green hover:bg-hoverButtonGreen"
                onClick={handleSubmit(onSubmit)}
              >
                Crear cuenta
              </Button>
              <p className={`text-msj italic font-sans text-center text-error ${isSubmitted && Object.keys(errors).length > 0 ? 'block' : 'invisible'}`}>
                {Object.keys(errors).length > 0 ? "Completa los campos requeridos" : ""}
              </p>
            </span>

          </form>
        </section>
      )}
    </>
  )
}

export default FormDataRegister
