'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";


interface CvuAliasProps {
    me: {
        alias: string;
        available_amount: number;
        cvu: string;
        id: number;
        user_id: number;
    }
}

const CvuAlias: React.FC<CvuAliasProps> = ({ me }) => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        Swal.fire({
            icon: 'success',
            title: '¡Copiado al portapapeles!',
            showConfirmButton: false,
            timer: 2000,
            position: 'top',
            toast: true,
        });
    };

    return (
        <>
            <main className="flex-grow bg-[#EEEAEA]">
                <div className='flex flex-col py-4 md:py-8 px-4 md:px-8 w-full bg-backgroundNavbar rounded-lg'>
                    <p className="font-bold text-white pb-8">Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta</p>

                    <h4 className="text-crearCuentaNavbar font-bold">CVU</h4>
                    <div className="flex justify-between items-center sm:mb-8 xl:mb-12">
                        <p className="text-white font-normal">{me.cvu}</p>
                        <FontAwesomeIcon
                            icon={faCopy}
                            className="text-crearCuentaNavbar cursor-pointer w-5 h-5"
                            onClick={() => copyToClipboard(me.cvu)}
                        />
                    </div>

                    <hr className="block sm:hidden border-t-1 border-white my-4" />

                    <h4 className="text-crearCuentaNavbar font-bold">Alias</h4>
                    <div className="flex justify-between items-center">
                        <p className="text-white font-normal">{me.alias}</p>
                        <FontAwesomeIcon
                            icon={faCopy}
                            className="text-crearCuentaNavbar cursor-pointer w-5 h-5"
                            onClick={() => copyToClipboard(me.alias)}
                        />
                    </div>

                </div>
            </main>
        </>
    )
}

export default CvuAlias