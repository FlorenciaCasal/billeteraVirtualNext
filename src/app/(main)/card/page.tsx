import Card from '@/Components/dashboard/Card';
import { headers } from 'next/headers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Cardspage = () => {
    const token = headers().get('digital-money-token') ?? '';
    return (
        <>
            <main className="flex-grow min-h-full pt-4 pb-6 px-4 sm:py-8 sm:px-6 md:px-8 lg:px-16 sm:w-[70vw] menu:w-[calc(100vw-16rem)] bg-[#EEEAEA]">
                {/* Encabezado visible solo en pantallas pequeñas */}
                <div className="flex items-center mb-6 sm:hidden">
                    <FontAwesomeIcon icon={faArrowRight} className="text-gray-700" style={{ transform: 'scaleX(1.4)' }} />
                    <p className="pl-2 text-sm font-medium underline text-black">Tarjetas</p>
                </div>
                <Card token={token} />
            </main>
        </>
    )
}

export default Cardspage