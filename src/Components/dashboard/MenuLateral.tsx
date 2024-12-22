'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/Components/ui/Button';
import authApi from '@/services/auth/auth.api';


const MenuLateral = ({ closeMenu }: { closeMenu?: () => void }) => {
    const router = useRouter();
    const logout = async () => {
        await authApi.logout();
        router.push("/");
        router.refresh();
        if (closeMenu) {
            closeMenu();
        }
    }

    return (
        <>
            {/* Menú lateral: visible en pantallas grandes, controlado por el menú hamburguesa en pantallas pequeñas */}
            {/* <nav className="w-64 bg-crearCuentaNavbar min-h-full text-md py-12 px-8 "> */}
            <nav className="w-[50vw] sm:w-[30vw] menu:w-64 bg-crearCuentaNavbar min-h-full text-md py-12 px-8 ">
                <ul>
                    <li className="pb-3">
                        <Link href="/dashboard" className=" text-black font-bold" onClick={closeMenu ? closeMenu : undefined}>
                            Inicio
                        </Link>
                    </li>
                    <li className="pb-3">
                        <Link href="/activity" className="pb-6 text-black" onClick={closeMenu ? closeMenu : undefined}>
                            Actividad
                        </Link>
                    </li>
                    <li className="pb-3">
                        <Link href="/profile" className="pb-6 text-black" onClick={closeMenu ? closeMenu : undefined}>
                            Tu perfil
                        </Link>
                    </li>
                    <li className="pb-3">
                        <Link href="/load-money" className="pb-6 text-black" onClick={closeMenu ? closeMenu : undefined}>
                            Ingresar dinero
                        </Link>
                    </li>
                    <li className="pb-3">
                        <Link href="/pay-services" className="!pb-6 text-black" onClick={closeMenu ? closeMenu : undefined}>
                            Pagar servicios
                        </Link>
                    </li>
                    <li className="pb-3">
                        <Link href="/card" className="!pb-6 text-black" onClick={closeMenu ? closeMenu : undefined}>
                            Tarjetas
                        </Link>
                    </li>
                    <li >
                        <Button
                            onClick={() => logout()}
                            label="Cerrar sesión"
                            className="text-gray-500 !px-0 !text-md bg-crearCuentaNavbar hover:bg-hoverButtonGreen">
                        </Button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default MenuLateral






