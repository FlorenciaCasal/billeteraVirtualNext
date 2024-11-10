import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


const LoadMoneyPage = () => {
    return (
        <main className="flex-grow py-12 px-16 bg-[#EEEAEA]">
            <div className='flex flex-col py-12 px-8 mb-6 w-full bg-backgroundNavbar rounded-lg'>
                <Link href='/cvu-alias' className={`flex items-center justify-between`}>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="text-crearCuentaNavbar w-7 h-7 border-2 border-crearCuentaNavbar rounded-full bg-transparent p-1 mr-4" />
                        <h4 className="text-crearCuentaNavbar font-bold">Transferencia bancaria</h4>
                    </div>
                    <span>
                        <FontAwesomeIcon icon={faArrowRight} className="text-crearCuentaNavbar w-5 h-5" />
                    </span>
                </Link>
            </div>
            <div className='flex flex-col py-12 px-8 w-full bg-backgroundNavbar rounded-lg'>
                <Link href='/loadMoneyCard' className={`flex items-center justify-between`}>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faCreditCard} className="text-crearCuentaNavbar w-8 h-8 bg-transparent p-1 mr-4" />
                        <h4 className="text-crearCuentaNavbar font-bold">Seleccionar tarjeta</h4>
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