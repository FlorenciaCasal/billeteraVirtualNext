
type NombreUsuarioProps = {
    firstname: string;
    lastname: string;
};

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const NombreUsuario = ({ firstname, lastname }: NombreUsuarioProps) => {
    const initials = `${firstname.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`;

    return (
        <div className="flex items-center space-x-2">
            {/* Cuadrado redondeado con las iniciales */}
            <div className="bg-crearCuentaNavbar text-black rounded-lg w-10 h-10 flex items-center justify-center">
                <span className="font-bold">{initials}</span>
            </div>

            {/* Texto de saludo */}
            <p className="text-white">Hola, {capitalize(firstname)} {capitalize(lastname)}</p>
        </div>
    );
};

export default NombreUsuario;