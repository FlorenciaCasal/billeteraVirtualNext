import React, { useState, useEffect } from "react";
import Button from "@/Components/ui/Button"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData2 } from "@/types/formData/formLoginStep2.types";
import { useRouter } from "next/navigation";
import { LoginPasswordScheme } from "@/schemes/login.scheme";
import { loginUser } from "@/store/authSlice";
import { RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { AccessDeniedError } from "@/services/common/http.errors";


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

  // Cuando el estado de error en Redux cambia, actualiza el estado del componente
  useEffect(() => {
    if (authState.error) {
      setServerError(authState.error); // Si hay un error en el estado global, se muestra
    }
  }, [authState.error]);

  const onSubmit = async (data: FormData2) => {
    const email = user.email || "";
    const password = data.password;
    setServerError(null);

    // *** Leer la cookie del account_id ***
    const account_id = Cookies.get('digitalMoneyAccountID');
    console.log(`Account ID from cookie: ${account_id}`);


    try {
      await dispatch(loginUser({ email, password })).unwrap();
      console.log(`Email used in API call: ${email}`);

      // Después del login exitoso, obtener el account_id
      const accountIdResponse = await fetch(`/api/getAccountId?email=${email}`);
      const accountIdData = await accountIdResponse.json();

      if (accountIdData && accountIdData.account_id) {
        // Guardar la cookie con el account_id obtenido
        Cookies.set('digitalMoneyAccountID', accountIdData.account_id, {
          httpOnly: false,
          secure: true,
          domain: 'localhost',
          path: '/',
        });
      } else {
        console.error('Account ID not found for this user.');
      }

      router.push("/dashboard");
      router.refresh();
    } catch (e: any) {
      if (e.response && e.response.status === 401) {
        // Intentar extraer el mensaje del backend
        const errorData = await e.response.json();
        setServerError(errorData.message || "Correo electrónico o contraseña incorrectos");
      } else {
        setServerError("Ha ocurrido un error inesperado.");
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
          {authState.error && (
          <p className="text-error text-[15px] mb-4">
            {authState.error} {/* Muestra el error desde el estado global de Redux */}
          </p>
        )}
        </form>
      </section>
    </>
  )
}

export default Step2
