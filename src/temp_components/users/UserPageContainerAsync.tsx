import userApi from "@/services/users/users.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CvuAlias from "../dashboard/CvuAlias";
import Link from "next/link";
import YourData from "../profile/YourData";


type UserPageContainerProps = {
    user_id: number;
    token: string
}

const UserPageContainerAsync = async ({ user_id, token }: UserPageContainerProps) => {
    const me = await userApi.getMeInternal(token);
    const userPromise = userApi.getUserData(user_id, token || '');
    const [user] = await Promise.all([userPromise]);
    console.log("user.password", user.password);



    return (
        <>
            <main className="flex-grow py-8 px-16 bg-[#EEEAEA]">
                {/* Tus datos */}
                <YourData user= {user} me= {me} token= {token}/>

                {/* Gestiona... */}
                <Link href="/managePayments">
                    <div className='flex justify-between py-8 px-8 my-4 w-full bg-crearCuentaNavbar rounded-lg'>

                        <h4 className="font-bold ">Gestioná los medios de pago</h4>
                        <span>
                            <FontAwesomeIcon icon={faArrowRight}
                                className="text-gray-500 w-5 h-5" />
                        </span>
                    </div>
                </Link>
                <CvuAlias me={me} />
            </main>
        </>
    )
}

export default UserPageContainerAsync;