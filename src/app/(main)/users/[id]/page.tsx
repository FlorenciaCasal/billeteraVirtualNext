import UserPageContainerAsync from "@/Components/users/UserPageContainerAsync";
import { headers } from "next/headers";

const UserPage = async ({ params }: { params: { id: string } }) => {
    // Obtener el token desde los headers
    const token = headers().get('digital-money-token') ?? '';
    console.log('id en UserPage:', params.id);
    console.log('Token en UserPage:', token);
    if (!token) {
        console.error("en UserPage, token no encontrado en los headers");
        return <div>Error: No se pudo obtener la información del usuario.</div>;
    }

    // Convertir params.id a número
     const user_id = Number(params.id); // Convierte el ID de cadena a número

    // Verificar si params.id está bien convertido a número
    console.log('user_id en UserPage:', user_id);
    if (isNaN(user_id)) {
        console.error("El ID del usuario no es un número válido.");
        return <div>Error: ID de usuario inválido.</div>;
    }

    // Llamar al componente UserPageContainerAsync con el user_id y el token
    return <UserPageContainerAsync user_id={user_id} token={token} />;
};

export default UserPage;
