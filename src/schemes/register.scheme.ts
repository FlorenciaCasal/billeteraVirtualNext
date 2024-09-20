import * as yup from "yup";


export const RegisterScheme = yup.object({
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

