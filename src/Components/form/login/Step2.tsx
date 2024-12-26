import React from "react";
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


const Step2 = () => {
  // const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  // const authState = useSelector((state: RootState) => state.auth);
  const authError = useSelector((state: RootState) => state.auth.error);

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
    // setServerError(null);

    // *** Leer la cookie del account_id ***
    const account_id = Cookies.get('digitalMoneyAccountID');
    console.log(`Account ID from cookie: ${account_id}`);

    if (email && password) {
      try {
        await dispatch(loginUser({ email, password })).unwrap();
        console.log(`Email used in API call: ${email}`);

        const accountIdResponse = await fetch(`/api/getAccountId?email=${email}`);
        const accountIdData = await accountIdResponse.json();

        if (accountIdData && accountIdData.account_id) {
          // Guardar la cookie con el account_id obtenido
          Cookies.set('digitalMoneyAccountID', accountIdData.account_id, {
            httpOnly: false,
            secure: true,
          //  domain: process.env.NEXT_PUBLIC_API_URL,
            path: '/',
          });
        } else {
          console.error('Account ID not found for this user.');
        }

        router.push("/dashboard");
        router.refresh();
      } catch (e) {
        console.log("error step2", e);
      }
    }
  };


  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <h4 className="text-[#FFF] mb-4">Ingresá tu contraseña</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center">
          <input
            className={`w-64 h-12 mb-4 px-4 text-black border border-gray-500 rounded-lg focus:outline-none ${errors.password ? "border-red-500" : ""
              }`}
            type="password"
            placeholder="Contraseña"
            {...register("password")}
            autoFocus
            onChange={(e) => {
              register("password").onChange(e); 
              trigger("password");
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
          {authError && (
            <p className="text-error text-[15px] mb-4">
              {authError}
            </p>
          )}
        </form>
      </section>
    </>
  )
}

export default Step2
