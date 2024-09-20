import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from '@/Components/ui/Button';
import { FormRegister } from '@/types/formData/formDataRegister.types';
import Input from '@/Components/ui/Input';


interface FormDataRegisterProps {
  onContinue: (data: FormRegister) => void;
}

const schema = yup.object({
  firstname: yup
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es obligatorio'),
  dni: yup
    .number()
    .typeError('El DNI debe ser un número')
    .integer('El DNI debe ser un número entero')
    .positive('El DNI debe ser un número positivo')
    .required('El DNI es obligatorio')
    .test(
      'len',
      'El DNI debe tener exactamente 8 dígitos',
      (value) => {
        if (value === undefined || value === null) return false; // Asegúrate de que el valor no sea `undefined` o `null`
        return value.toString().length === 8; // Devuelve `true` o `false` basado en la longitud del valor convertido a cadena
      }
    ),
  lastname: yup
    .string()
    .min(3, 'El apellido debe tener al menos 3 caracteres')
    .required('El apellido es obligatorio'),
  email: yup
    .string()
    .required("El correo electrónico es obligatorio")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Ingresa un correo electrónico válido"
    ),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(20, 'La contraseña no debe exceder los 20 caracteres')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
      'La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial')
    .required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('La confirmación de contraseña es obligatoria'),
  phone: yup
    .string()
    .matches(/^\d{8,15}$/, 'El teléfono debe tener entre 8 y 15 dígitos')
    .required('El teléfono es obligatorio'),
});

const FormDataRegister: React.FC<FormDataRegisterProps> = ({ onContinue }) => {

  const [isFormVisible, setIsFormVisible] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted }
  } = useForm<FormRegister>({
    resolver: yupResolver(schema),
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
