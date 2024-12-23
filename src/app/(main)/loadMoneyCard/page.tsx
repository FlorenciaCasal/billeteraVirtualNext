import LoadMoneyCard from '@/Components/cards/LoadMoneyCard';
import { headers } from 'next/headers';
import userApi from '@/services/users/users.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const LoadMoneyCardPage = async () => {
    const token = headers().get('digital-money-token') ?? '';
    const me = await userApi.getMeInternal(token);
    return (
        <>
            <main className="flex flex-col flex-grow sm:w-[70vw] menu:w-[calc(100vw-16rem)] py-8 px-4 sm-px-8 md:px-12 md:py-16 xl:px-20 xl:pt-16 xl:pb-4 bg-[#EEEAEA]">
                {/* Encabezado visible solo en pantallas pequeñas */}
                <div className="flex items-center mb-6 sm:hidden">
                    <FontAwesomeIcon icon={faArrowRight} className="text-gray-700" style={{ transform: 'scaleX(1.4)' }} />
                    <p className="pl-2 text-sm font-medium underline text-black">Cargar dinero</p>
                </div>
                <LoadMoneyCard token={token} me={me} />
            </main>
        </>
    )
}

export default LoadMoneyCardPage

