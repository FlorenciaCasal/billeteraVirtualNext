import React, { useState } from "react";
import Button from "@/Components/ui/Button"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData2 } from "@/types/formData/formLoginStep2.types";
import { useRouter } from "next/navigation";
import authApi from "@/services/auth/auth.api";
import { AccessDeniedError } from "@/services/common/http.errors";
import { LoginPasswordScheme } from "@/schemes/login.scheme";


const Step2 = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register, handleSubmit,
    formState: { errors },
  } = useForm<FormData2>({
    resolver: yupResolver(LoginPasswordScheme),
  });

  const onSubmit = async (data: FormData2) => {
    const email = localStorage.getItem("email") || "";
    const password = data.password;
    setServerError(null);
    if (email && password) {
      try {
        const loginReponse = await authApi.login(email, password);
        router.push("/");
        router.refresh();
      } catch (e) {
        if (e instanceof AccessDeniedError) {
          setServerError("Tus credenciales son inválidas")
        } else {
          setServerError("Ha ocurrido un error. Intente más tarde")
        }
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
          />
          <Button
            type="submit"
            className="w-64 h-12 mb-4 text-sm text-custom-green bg-crearCuentaNavbar border border-custom-green hover:bg-hoverButtonGreen"
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


// antes del return:
//   if (email && password) {
//     try {
//       // Aquí hacemos el POST a la API interna de Next.js
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Error desconocido');
//       }

//       const result = await response.json();
//       const { sessionId } = result;

//       localStorage.setItem('token', sessionId); // Almacenar token

//       router.push("/"); // Redirigir al home después de la autenticación exitosa
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error('Error de inicio de sesión:', error.message);
//       } else {
//         console.error('Error desconocido');
//       }
//       // Manejar el error de autenticación aquí
//     }
//   } else {
//     console.error("Falta el email o la contraseña");
//   }
// };