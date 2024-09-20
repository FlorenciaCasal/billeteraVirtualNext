import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/Components/ui/Button";
import { FormData1 } from "@/types/formData/formLoginStep1.types";

interface Step1Props {
  onContinue: () => void;
}

const schema = yup.object({
  email: yup
    .string()
    .required("El correo electrónico es obligatorio")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Ingresa un correo electrónico válido"
    ),
});

const Step1: React.FC<Step1Props> = ({ onContinue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData1>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData1) => {
    localStorage.setItem("email", data.email || ""); // Guardar el email en sessionStorage
    onContinue(); // Proceder al siguiente paso
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <p className="text-[#FFF] font-bold mb-4">¡Hola! Ingresá tu e-mail</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center">
          <input
            className={`w-64 h-12 mb-4 px-4 text-black border border-gray-500 rounded-lg focus:outline-none ${errors.email ? "border-red-500" : ""}`}
            type="email"
            placeholder="Correo electrónico"
            {...register("email")}
          />
          <Button
            type="submit"
            className="w-64 h-12 mb-4 text-sm text-custom-green bg-crearCuentaNavbar border-custom-green hover:bg-hoverButtonGreen"
           >
            Continuar
          </Button>
          <Button
            href="/register"
            className="w-64 h-12 mb-4 text-sm text-custom-green bg-crearCuentaLogin border-custom-green hover:bg-hoverButtonBlack">
            Crear cuenta
          </Button>
          {errors.email && (
            <p className="text-error text-[15px] mb-4">{errors.email.message}</p> // Mensaje de error
          )}
        </form>
      </section>
    </>
  )
}

export default Step1