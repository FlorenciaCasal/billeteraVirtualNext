import * as yup from "yup";

export const LoginFinalScheme = yup.object({
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
        .required('La contraseña es obligatoria')
});
