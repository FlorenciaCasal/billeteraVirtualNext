interface MontoProps {
    availableAmount: number;
}

const Monto = ({ availableAmount }: MontoProps) => {
    return (
        <div className="bg-transparent w-fit px-3 py-1.5 text-white border-2 border-crearCuentaNavbar rounded-full flex items-center justify-center">
            <h2 className='text-mmlg sm:text-2xl'>$ {availableAmount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
        </div>
    );
};

export default Monto;
