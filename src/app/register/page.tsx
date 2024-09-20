'use client'

import React from "react";
import FormDataRegister from "@/Components/form/register/FormDataRegister"
import { FormRegister } from "@/types/formData/formDataRegister.types";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';


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

  const handleContinue = async (data: FormRegister) => {
    try {
      const response = await fetch('https://digitalmoney.digitalhouse.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        if (response.status === 201) {
          console.log("Cuenta creada con éxito");
          // Llamar a la función para enviar el correo de confirmación
          await sendConfirmationEmail(data);
          MsjExito(() => {
            router.push('/login');
          });
        } else {
          console.log('Solicitud exitosa, pero no es una creación:', response.status);
        }
      } else {
        const errorData = await response.json();
        switch (response.status) {
          case 400:
            // Manejo del error 400
            break;
          case 409:
            console.log("El email ingresado ya se encuentra registrado.");
            break;
          case 500:
            // Manejo del error 500
            break;
          default:
            // Manejo de errores genéricos
            break;
        }
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  };

  return (
    <>
      <section className="bg-[#272727] w-full bg-cover bg-center flex-grow flex justify-center items-center">
        <FormDataRegister onContinue={handleContinue} />
      </section>
    </>
  );
};

export default RegisterPage;



