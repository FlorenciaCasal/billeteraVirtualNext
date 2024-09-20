"use client";

import Image from 'next/image';
import Button from '../ui/Button';
import { NavbarType } from '@/types/navbar.types';
import { usePathname } from 'next/navigation';



const Navbar = ({ backgroundColor, logo, showLoginButton, showRegisterButton }: NavbarType) => {
    const pathname = usePathname();
    const isRegister = pathname === '/register'; 

    return <>
        <div className={`flex items-center justify-between p-4 ${backgroundColor}`}>
            <div className="flex items-center">
                <Image
                    src={logo}
                    alt="Logo"
                    width={90}
                    height={90}
                    placeholder="blur"
                />
            </div>
            <div className="flex space-x-4">

                {showLoginButton && (
                    <Button
                        href="/login"
                        label={isRegister ? "Iniciar sesión" : "Ingresar"}
                        className="text-crearCuentaNavbar bg-backgroundNavbar border border-crearCuentaNavbar hover:bg-hoverButtonBlack">
                                </Button>
                )}
                {showRegisterButton && (
                    <Button
                        href="/register"
                        label="Crear cuenta"
                        className="text-black bg-crearCuentaNavbar hover:bg-hoverButtonGreen">
                    </Button>
                )}
            </div>
        </div>
    </>
}

export default Navbar