
import userApi from '@/services/users/users.service';
import { headers } from 'next/headers';
import MenuLateral from '@/Components/form/home/MenuLateral';


const HomePage = async () => {
    const token = headers().get('digital-money-token') ?? '';
    const me = await userApi.getMeInternal(token);
    console.log("Token in HomePage:", token);
    return (
        <>
            <div className="flex">
                <MenuLateral />

                {/* Contenido principal */}
                <main className="flex-grow p-8">
                    <p>Ver tarjetas</p>
                    <p>Ver CVU</p>
                   <p>Dinero disponible</p>
                   <span>${me.available_amount}</span>
                </main>
            </div>
        </>
    );
}

export default HomePage;

