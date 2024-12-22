import Navbar from '@/Components/layout/Navbar';
import logo1 from '/public/img/Logo1.png';
import { ProfileLayoutProps } from "@/types/profileLayout.types";
import { cookies } from "next/headers";
import userApi from '@/services/users/users.service';
import { headers } from 'next/headers';
import MenuLateral from '@/Components/dashboard/MenuLateral';

const ProfileLayout = async ({ children }: ProfileLayoutProps) => {
    const token = headers().get('digital-money-token') ?? '';
    const me = await userApi.getMeInternal(token);
    const user = await userApi.getUserData(me.user_id, token);
    const loggedEmailCookie = cookies().get('digitalMoneyEmail')?.value;
    return (
        <>
            <Navbar
                backgroundColor="bg-backgroundNavbar"
                logo={logo1}
                showLoginButton={false}
                showRegisterButton={false}
                loggedEmailCookie={loggedEmailCookie}
                firstname={user.firstname}
                lastname={user.lastname}
                showInitialBurger={true}
            />
            <div className="flex w-full bg-cover bg-center flex-grow overflow-hidden">
                {/* MenuLateral solo se renderiza en pantallas medianas-grandes */}
                <div className="hidden sm:block">
                    <MenuLateral />
                </div>
                <div className="w-full">
                    {children}
                </div>
            </div>
        </>

    )
}

export default ProfileLayout