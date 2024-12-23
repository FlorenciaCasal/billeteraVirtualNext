"use client";
import Image from 'next/image';
import Button from '../ui/Button';
import { NavbarType } from '@/types/navbar.types';
import { usePathname } from 'next/navigation';
import NombreUsuario from '../dashboard/NombreUsuario';
import { useState } from 'react';
import MenuLateral from '../dashboard/MenuLateral';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';




const Navbar = ({ backgroundColor, logo, showLoginButton, showRegisterButton, loggedEmailCookie, firstname, lastname, showInitialBurger }: NavbarType & { loggedEmailCookie: string | undefined }) => {
    const pathname = usePathname();
    const isRegister = pathname === '/register';
    const [menuVisible, setMenuVisible] = useState(false);

    const initials = firstname && lastname
        ? `${firstname.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`
        : '';

    const toggleMenu = () => {
        setMenuVisible((prev) => !prev); // Alternar entre visible y no visible
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    return <>
        <div className={`flex items-center justify-between p-4 ${backgroundColor}`}>
            <div className="flex items-center">
                <Image
                    src={logo}
                    alt="Logo"
                    width={90}
                    // height={90}
                    style={{ height: "auto" }}
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
                {/* Mostrar icono de hamburguesa en pantallas pequeñas */}
                {showInitialBurger && (
                <div className="sm:hidden flex items-center space-x-2">
                    <div className="bg-crearCuentaNavbar text-black rounded-lg w-10 h-10 flex items-center justify-center">
                        <h4 className="font-bold">{initials}</h4>
                    </div>
                    <Button className="text-black" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} className='text-crearCuentaNavbar w-7 h-7' />
                    </Button>
                </div>
 )}
                {/* Mostrar nombre en pantallas grandes */}
                {loggedEmailCookie && firstname && lastname && (
                    <div className="hidden sm:block">
                        <NombreUsuario firstname={firstname} lastname={lastname} />
                    </div>
                )}
            </div>
        </div>
        {/* Renderizar el menú lateral si el estado es verdadero */}
        {menuVisible && (
            <div className="fixed inset-0 pt-24 bg-opacity-50 bg-black z-50 flex justify-end"
            onClick={closeMenu} >
                <div
                        className="absolute bg-crearCuentaNavbar p-4 shadow-lg rounded-lg max-h-screen overflow-y-auto"
                        style={{ maxWidth: "300px" }}
                        onClick={(e) => e.stopPropagation()} // Evitar cierre al hacer clic dentro del menú
                    >
                        <MenuLateral closeMenu={closeMenu}/>
                        <Button
                            onClick={toggleMenu}
                            className="absolute top-2 right-2"
                        >
                            <FontAwesomeIcon icon={faCircleXmark} className="text-black w-7 h-7" />
                        </Button>
                    </div>
            </div>
        )}
    </>
}

export default Navbar