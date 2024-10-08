import Navbar from "@/Components/layout/Navbar"
import logoGreen from '/public/img/Logo2.png';
import { ProfileLayoutProps } from "@/types/profileLayout.types";
import { cookies } from "next/headers";

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
    const loggedEmailCookie = cookies().get('digitalMoneyEmail')?.value;
    return (
        <>
            <Navbar
                backgroundColor="bg-crearCuentaNavbar"
                logo={logoGreen}
                showLoginButton={false}
                showRegisterButton={false} 
                loggedEmailCookie = {loggedEmailCookie} />
            {children}
        </>

    )
}

export default ProfileLayout