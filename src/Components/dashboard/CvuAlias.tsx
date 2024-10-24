import { headers } from "next/headers";
import userApi from "@/services/users/users.service";

const CvuAlias = async () => {
    const token = headers().get('digital-money-token') ?? '';
    const me = await userApi.getMeInternal(token);
    return (
        <>
            <main className="flex-grow bg-[#EEEAEA]">
                <div className='flex flex-col py-8 px-8 w-full bg-backgroundNavbar rounded-lg'>
                    <h4 className="text-crearCuentaNavbar font-bold">CVU</h4>
                    <p className="text-white !text-sm font-normal">{me.cvu}</p>
                    <hr className="border-t-1 border-white my-4" />
                    <h4 className="text-crearCuentaNavbar font-bold">Alias</h4>
                    <p className="text-white !text-sm font-normal">{me.alias}</p>
                </div>
            </main>
        </>
    )
}

export default CvuAlias