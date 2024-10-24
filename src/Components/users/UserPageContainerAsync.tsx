import userApi from "@/services/users/users.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CvuAlias from "../dashboard/CvuAlias";


type UserPageContainerProps = {
    user_id: number;
    token: string
}


const UserPageContainerAsync = async ({ user_id, token }: UserPageContainerProps) => {
    const userPromise = userApi.getUserData(user_id, token || '');
    const [user] =
        await Promise.all([userPromise,
        ])

    console.log("user.password", user.password);


    return (
        <>
            <main className="flex-grow py-8 px-16 bg-[#EEEAEA]">
                {/* Tus datos */}
                <div className='flex flex-col py-8 px-8 w-full bg-white rounded-lg'>
                    <div>
                        <h4 className="font-bold ">Tus datos</h4>
                    </div>
                    <div className="grid grid-cols-3 items-center pt-2">
                        <div className="col-span-1">
                            <p className="text-sm">Email</p>
                        </div>
                        <div className="col-span-2 flex justify-between items-center">
                            <span className="text-gray-500">{user.email}</span>
                            <button className="flex items-center text-blue-500">
                                <FontAwesomeIcon icon={faPen} className="text-gray-500 w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <hr className="border-t-1 border-black mb-4" />

                    <div className="grid grid-cols-3 items-center pt-2">
                        <div className="col-span-1">
                            <p className="text-sm">Nombre y apellido</p>
                        </div>
                        <div className="col-span-2 flex justify-between items-center">
                            <span className="text-gray-500">{user.firstname} {user.lastname}</span>
                            <button className="flex items-center text-blue-500">
                                <FontAwesomeIcon icon={faPen} className="text-gray-500 w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <hr className="border-t-1 border-black mb-4" />

                    <div className="grid grid-cols-3 items-center pt-2">
                        <div className="col-span-1">
                            <p className="text-sm">DNI</p>
                        </div>
                        <div className="col-span-2 flex justify-between items-center">
                            <span className="text-gray-500">{user.dni}</span>
                            <button className="flex items-center text-blue-500">
                                <FontAwesomeIcon icon={faPen} className="text-gray-500 w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <hr className="border-t-1 border-black mb-4" />

                    <div className="grid grid-cols-3 items-center pt-2">
                        <div className="col-span-1">
                            <p className="text-sm">Teléfono</p>
                        </div>
                        <div className="col-span-2 flex justify-between items-center">
                            <span className="text-gray-500">{user.phone}</span>
                            <button className="flex items-center text-blue-500">
                                <FontAwesomeIcon icon={faPen} className="text-gray-500 w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <hr className="border-t-1 border-black mb-4" />

                    <div className="grid grid-cols-3 items-center pt-2">
                        <div className="col-span-1">
                            <p className="text-sm">Contraseña</p>
                        </div>
                        <div className="col-span-2 flex justify-between items-center">
                            <span className="text-gray-500">********</span>
                            <button className="flex items-center text-blue-500">
                                <FontAwesomeIcon icon={faPen} className="text-gray-500 w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <hr className="border-t-1 border-black " />
                </div>

                {/* Gestiona... */}
                <div className='flex justify-between py-8 px-8 my-4 w-full bg-crearCuentaNavbar rounded-lg'>
                    <h4 className="font-bold ">Gestioná los medios de pago</h4>
                    <span>
                        <FontAwesomeIcon icon={faArrowRight}
                            className="text-gray-500 w-5 h-5" />
                    </span>
                </div>
                <CvuAlias />
            </main>
        </>
    )
}

export default UserPageContainerAsync;