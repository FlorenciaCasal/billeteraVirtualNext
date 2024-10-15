import React, { useState } from "react";
import Button from "@/Components/ui/Button"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData2 } from "@/types/formData/formLoginStep2.types";
import { useRouter } from "next/navigation";
import { AccessDeniedError } from "@/services/common/http.errors";
import { LoginPasswordScheme } from "@/schemes/login.scheme";
import { loginUser } from "@/store/authSlice";
import { RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";


const Step2 = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);
  const {
    register, handleSubmit,
    formState: { errors },
    trigger, // Añadido para validación en tiempo real
  } = useForm<FormData2>({
    resolver: yupResolver(LoginPasswordScheme),
    mode: "onChange", // Activar validación en tiempo real
  });

  const onSubmit = async (data: FormData2) => {
    const email = user.email || "";
    const password = data.password;
    setServerError(null);
    if (email && password) {
      try {
        await dispatch(loginUser({ email, password })).unwrap();
        router.push("/home");
        router.refresh();
      } catch (e: any) {
        console.log("error step2", e); // Verifica cuál es el error real
        setServerError(e);  // Aquí e será el mensaje devuelto desde authSlice
      }
    }
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <p className="text-[#FFF] font-bold mb-4">Ingresá tu contraseña</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center">
          <input
            className={`w-64 h-12 mb-4 px-4 text-black border border-gray-500 rounded focus:outline-none ${errors.password ? "border-red-500" : ""
              }`}
            type="password"
            placeholder="Contraseña"
            {...register("password")}
            autoFocus
            onChange={(e) => {
              register("password").onChange(e); // Ejecutar el onChange de RHF
              trigger("password"); // Disparar validación en tiempo real
            }}
          />
          {errors.password && (
            <p className="text-error text-[15px] mb-4">{errors.password.message}</p> // Mensaje de error
          )}
          <Button
            type="submit"
            className="w-64 h-12 mb-4 text-sm text-[#000] bg-crearCuentaNavbar border border-custom-green hover:bg-hoverButtonGreen"
          >
            Continuar
          </Button>
          {serverError && (
            <p className="text-error text-[15px] mb-4">
              {serverError}
            </p>
          )}
        </form>
      </section>
    </>
  )
}

export default Step2
