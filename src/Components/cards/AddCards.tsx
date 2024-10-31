'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const AddCards = () => {
    const router = useRouter();

    const handleCreateCard = () => {
        router.push('/createCard'); // Redirige a la ruta de creación de tarjeta
    };

    return (
        <div className='flex flex-col py-8 px-8 w-full bg-backgroundNavbar rounded-lg'>
            <p className="font-bold text-white pb-8">Agregá tu tarjeta de débito o crédito</p>
            <div className="flex items-center justify-between cursor-pointer" onClick={handleCreateCard}>
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faPlus} className="text-crearCuentaNavbar w-7 h-7 border-2 border-crearCuentaNavbar rounded-full bg-transparent p-1 mr-4" />
                    <h4 className="text-crearCuentaNavbar font-bold">Nueva tarjeta</h4>
                </div>
                <span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-crearCuentaNavbar w-5 h-5" />
                </span>
            </div>
        </div>
    )
}

export default AddCards