'use client'

interface MontoProps {
    me: {
        alias: string;
        available_amount: number;
        cvu: string;
        id: number;
        user_id: number;
    }
}
const Monto = ({ me }: MontoProps) => {
    return (
        <>
            <div className="bg-transparent w-fit px-3 py-1.5 text-white border-2 border-crearCuentaNavbar rounded-full flex items-center justify-center">
                <h2 className='text-2xl'>$ {me.available_amount.toFixed(2)}</h2>
            </div>
        </>
    )
}

export default Monto