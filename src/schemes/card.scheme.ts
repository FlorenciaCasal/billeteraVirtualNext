import * as yup from "yup";

export const cardSchema = yup.object({
    number_id: yup
    .number()
    .typeError("Debe ser un número")
    .required("Número de tarjeta es requerido")
    .test('exact-length', 'El número de tarjeta debe tener exactamente 16 dígitos', (val) => val?.toString().length === 16),
    expiration_date: yup
        .string()
        .required("Fecha de vencimiento es requerida")
        .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, "Formato debe ser MM/AAAA"),
    cod: yup
        .number()
        .typeError("Código de seguridad debe ser un número")
        .required("Código de seguridad es requerido"),
    first_last_name: yup.string().required("Nombre y apellido son requeridos"),
});