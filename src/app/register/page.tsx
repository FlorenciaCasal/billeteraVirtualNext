'use client'

import React from "react";
import FormDataRegister from "@/Components/form/register/FormDataRegister"
import { FormRegister } from "@/types/formData/formDataRegister.types";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import { useState } from "react";
import { ConflictError } from "@/services/common/http.errors";
import authApi from "@/services/auth/auth.api";


const MsjExito = (onRedirect: () => void) => {
  Swal.fire({
    title: 'Registro Exitoso',
    text: ' Hemos enviado un correo para confirmar tu registro. Por favor, revisa tu bandeja de entrada.',
    icon: 'success',
    confirmButtonText: 'Continuar',
    color: '#fff',
    customClass: {
      confirmButton: 'bg-crearCuentaNavbar !pr-[100px] !pl-[100px] text-black',
      title: 'text-[#fff] text-4xl font-semibold leading-[90px]',
      popup: 'swal-popup',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      onRedirect(); // Redirige después de confirmar
    }
  });
};

const upperCaseFirstLetter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

// Función para enviar correo de confirmación
const sendConfirmationEmail = async (formData: FormRegister) => {
  try {
    const templateParams = {
      from_name: "Digital Money",
      to_email: formData.email,
      to_name: upperCaseFirstLetter(formData.firstname),
      reply_to: "info@digitalmoney.com",
      subject: "Confirmación de Registro",
    };

    const response = await emailjs.send(
      'service_gmail',
      'template_6wyw4si',
      templateParams,
      'vZsyj-irN-FDuKYXo'
    );

    if (response.status === 200) {
      console.log('Correo enviado con éxito');
    } else {
      console.log('Error al enviar el correo:', response);
    }
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

const RegisterPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleContinue = async (data: FormRegister) => {
    setServerError(null);

    try {
      const registerResponse = await authApi.register(data.firstname, data.lastname, data.dni, data.email, data.password, data.confirmPassword, data.phone);
      console.log(JSON.stringify(registerResponse));
      router.push("/");
      router.refresh();
    } catch (e) {
      if (e instanceof ConflictError) {
        setServerError("Ya existe una cuante con ese email")
      } else {
        setServerError("Ha ocurrido un error. Intente más tarde")
      }
    }
  };

  return (
    <>
      <section className="bg-[#272727] w-full bg-cover bg-center flex-grow flex justify-center items-center">
        <FormDataRegister onContinue={handleContinue} />
        {serverError && (
          <p className="text-error text-[15px] mb-4">
            {serverError}
          </p>
        )}
      </section>
    </>
  );
};

export default RegisterPage;



