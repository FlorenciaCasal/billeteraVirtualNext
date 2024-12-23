import CvuAlias from "@/Components/dashboard/CvuAlias"
import userApi from "@/services/users/users.service";
import { headers } from "next/headers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CVUPage = async () => {
    const token = headers().get('digital-money-token') ?? '';
    // Obtener los datos del usuario
    const me = await userApi.getMeInternal(token);
   
    return (
        <>
        <main className="flex-grow sm:w-[70vw] menu:w-[calc(100vw-16rem)] py-8 px-6 sm-px-8 md:px-12 md:py-16 lg:px-16 xl:px-20 xl:py-16 bg-[#EEEAEA]">        
        {/* Encabezado visible solo en pantallas pequeñas */}
                    <div className="flex items-center mb-6 sm:hidden">
                        <FontAwesomeIcon icon={faArrowRight} className="text-gray-700" style={{ transform: 'scaleX(1.4)' }} />
                        <p className="pl-2 text-sm font-medium underline text-black">Cargar dinero</p>
                    </div>
        <CvuAlias me={me} />
        </main>
        </>
    )
}

export default CVUPage