import CvuAlias from "@/components/dashboard/CvuAlias"
import userApi from "@/services/users/users.service";
import { headers } from "next/headers";

const CVUPage = async () => {
    const token = headers().get('digital-money-token') ?? '';
    // Obtener los datos del usuario
    const me = await userApi.getMeInternal(token);
   
    return (
        <>
        <main className="flex-grow py-8 px-16 bg-[#EEEAEA]">        
        <CvuAlias me={me} />
        </main>
        </>
    )
}

export default CVUPage