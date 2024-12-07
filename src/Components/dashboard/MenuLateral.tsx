'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/Components/ui/Button';
import authApi from '@/services/auth/auth.api';


const MenuLateral = () => {
    const router = useRouter();
    const logout = async () => {
        await authApi.logout();
        router.push("/");
        router.refresh();
    }

    return (
        <>
            {/* Menú lateral */}
            <nav className="w-64 bg-crearCuentaNavbar text-md py-12 px-8">
                <ul>
                    <li className="pb-3">
                        <Link href="/dashboard" className=" text-black font-bold">
                            Inicio
                        </Link>
                    </li>
                    <li className="pb-3">
                        <Link href="/activity" className="pb-6 text-black">
                            Actividad
                        </Link>
                    </li>
                    <li className="pb-3">
                        <Link href="/profile" className="pb-6 text-black">
                            Tu perfil
                        </Link>
                    </li>
                    <li className="pb-3">
                        <Link href="/load-money" className="pb-6 text-black">
                            Cargar dinero
                        </Link>
                    </li>
                    <li className="pb-3">
                        <Link href="/pay-services" className="!pb-6 text-black">
                            Pagar servicios
                        </Link>
                    </li>
                    <li className="pb-3">
                        <Link href="/card" className="!pb-6 text-black">
                            Tarjetas
                        </Link>
                    </li>
                    <li className="pb-3">
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






