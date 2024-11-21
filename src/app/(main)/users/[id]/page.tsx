import UserPageContainerAsync from "@/components/users/UserPageContainerAsync";
import { headers } from "next/headers";

const UserPage = async ({ params }: { params: { id: string } }) => {
    // Obtener el token desde los headers
    const token = headers().get('digital-money-token') ?? '';
    if (!token) {
        console.error("en UserPage, token no encontrado en los headers");
        return <div>Error: No se pudo obtener la información del usuario.</div>;
    }
    const user_id = Number(params.id);
    if (isNaN(user_id)) {
        console.error("El ID del usuario no es un número válido.");
        return <div>Error: ID de usuario inválido.</div>;
    }
    return <UserPageContainerAsync user_id={user_id} token={token} />;
};

export default UserPage;
