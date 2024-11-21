import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../ui/Button";
import { FormData1 } from "@/types/formData/formLoginStep1.types";
import { LoginEmailScheme } from "@/schemes/login.scheme";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";

interface Step1Props {
  onContinue: () => void;
}

const Step1: React.FC<Step1Props> = ({ onContinue }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger, // Añadido para validación en tiempo real
  } = useForm<FormData1>({
    resolver: yupResolver(LoginEmailScheme),
    mode: "onChange", // Activar validación en tiempo real
  });

  const onSubmit = (data: FormData1) => {
    dispatch(setUser({ email: data.email, user_id: null }));
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
            autoFocus
            onChange={(e) => {
              register("email").onChange(e); // Ejecutar el onChange de RHF
              trigger("email"); // Disparar validación en tiempo real
            }}
          />
          {errors.email && (
            <p className="text-error text-[15px] mb-4">{errors.email.message}</p> // Mensaje de error
          )}
          <Button
            type="submit"
            className="w-64 h-12 mb-4 text-sm text-[#000] bg-crearCuentaNavbar border-custom-green hover:bg-hoverButtonGreen"
          >
            Continuar
          </Button>
          <Button
            href="/register"
            className="w-64 h-12 mb-4 text-sm text-[#000] bg-crearCuentaLogin border-custom-green hover:bg-hoverButtonBlack">
            Crear cuenta
          </Button>

        </form>
      </section>
    </>
  )
}

export default Step1