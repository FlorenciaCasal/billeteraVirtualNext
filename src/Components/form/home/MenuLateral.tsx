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
            <nav className="w-64 h-screen bg-crearCuentaNavbar p-4">
                <ul>
                <li>
                        <Link href="" className="text-black font-bold">
                         Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile" className="text-black">
                         Actividad
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile" className="text-black">
                         Tu perfil
                        </Link>
                    </li>
                    <li>
                        <Link href="/load-money" className="text-black">
                             Cargar dinero
                        </Link>
                    </li>
                    <li>
                        <Link href="/pay-services" className="text-black">
                             Pagar servicios
                        </Link>
                    </li>
                    <li>
                        <Link href="/cards" className="text-black">
                            Tarjetas
                        </Link>
                    </li>
                    <li>
                        <Button
                            onClick={() => logout()}
                            label="Cerrar sesión"
                            className="text-gray-500 !px-0 bg-crearCuentaNavbar hover:bg-hoverButtonGreen">
                        </Button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default MenuLateral






