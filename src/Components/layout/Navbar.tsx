"use client";

import Image from 'next/image';
import Button from '../ui/Button';
import { NavbarType } from '@/types/navbar.types';


const Navbar = ({ backgroundColor, logo, showLoginButton, showRegisterButton }: NavbarType) => {

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
                        className="text-custom-green bg-backgroundNavbar border border-custom-green hover:bg-gray-500">
                        Ingresar
                    </Button>
                )}
                {showRegisterButton && (
                    <Button
                        href="/register"
                        className="text-black bg-custom-green hover:bg-custom-hover-green">
                        Crear cuenta
                    </Button>
                )}
            </div>
        </div>
    </>
}

export default Navbar