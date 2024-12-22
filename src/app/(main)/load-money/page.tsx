import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


const LoadMoneyPage = () => {
    return (
        <main className="flex-grow min-h-screen sm:w-[70vw] menu:w-[calc(100vw-16rem)] py-8 px-6 sm-px-8 md:px-12 md:py-16 xl:px-20 xl:py-16 bg-[#EEEAEA]">
            {/* Encabezado visible solo en pantallas pequeñas */}
            <div className="flex items-center mb-6 sm:hidden">
                <FontAwesomeIcon icon={faArrowRight} className="text-gray-700" style={{ transform: 'scaleX(1.4)' }} />
                <p className="pl-2 text-sm font-medium underline text-black">Cargar dinero</p>
            </div>
            <div className='flex flex-col py-12 px-8 xl:py-16 xl:px-12 mb-8 w-full bg-backgroundNavbar rounded-lg'>
                <Link href='/cvu-alias' className={`flex items-center justify-between`}>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="text-crearCuentaNavbar w-7 h-7 border-2 border-crearCuentaNavbar rounded-full bg-transparent p-1 mr-4" />
                        <h4 className="text-crearCuentaNavbar font-bold">
                <span className="block s:inline">Transferencia </span>
                <span className="block s:inline">bancaria</span>
            </h4>
                    </div>
                    <span>
                        <FontAwesomeIcon icon={faArrowRight} className="text-crearCuentaNavbar w-5 h-5" />
                    </span>
                </Link>
            </div>
            <div className='flex flex-col py-12 px-8 xl:py-16 xl:px-12 w-full bg-backgroundNavbar rounded-lg'>
                <Link href='/loadMoneyCard' className={`flex items-center justify-between`}>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faCreditCard} className="text-crearCuentaNavbar w-8 h-8 bg-transparent p-1 mr-4" />
                        <h4 className="text-crearCuentaNavbar font-bold">
                <span className="block s:inline">Seleccionar </span>
                <span className="block s:inline">tarjeta</span>
            </h4>
                    </div>
                    <span>
                        <FontAwesomeIcon icon={faArrowRight} className="text-crearCuentaNavbar w-5 h-5" />
                    </span>
                </Link>
            </div>
        </main>
    )
}

export default LoadMoneyPage