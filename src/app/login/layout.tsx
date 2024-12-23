import Navbar from '@/Components/layout/Navbar'
import logoGreen from '/public/img/Logo2.png';
import { LoginLayoutProps } from '@/types/loginLayout.types';

const LoginLayout = ({ children }: LoginLayoutProps) => {
    return (
    <>
        <Navbar
            backgroundColor="bg-crearCuentaNavbar"
            logo={logoGreen}
            showLoginButton={false}
            showRegisterButton={false}
            loggedEmailCookie = ''
            showInitialBurger={true}
        />
        {children}
    </>
    )
}

export default LoginLayout