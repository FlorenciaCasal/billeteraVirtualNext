import Navbar from "@/Components/layout/Navbar"
import logoGreen from '/public/img/Logo2.png';
import { RegisterLayoutProps } from "@/types/registerLayout.types";

const RegisterLayout = ({ children }: RegisterLayoutProps) => {
    return (
        <>
            <Navbar
                backgroundColor="bg-crearCuentaNavbar"
                logo={logoGreen}
                showLoginButton={true}
                showRegisterButton={false} />
            {children}
        </>

    )
}

export default RegisterLayout