import Link from "next/link";

type NombreUsuarioProps = {
    firstname: string;
    lastname: string;
};

const capitalizeWords = (name: string) => {
    return name
        .split(' ')             // Dividimos el string por los espacios
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalizamos la primera letra de cada palabra
        .join(' ');              // Volvemos a unir el string
};

const NombreUsuario = ({ firstname, lastname }: NombreUsuarioProps) => {
    const initials = `${firstname.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`;

    return (
        <div className="flex items-center space-x-2">
            {/* Cuadrado redondeado con las iniciales */}
            <div className="bg-crearCuentaNavbar text-black rounded-lg w-10 h-10 flex items-center justify-center">
                <h4 className="font-bold">{initials}</h4>
            </div>

            {/* Texto de saludo */}

            <h5 className="text-white"> Hola, </h5>  <Link href='/dashboard'><h5 className="text-white">{capitalizeWords(firstname)} {capitalizeWords(lastname)}</h5>
            </Link>
        </div>
    );
};

export default NombreUsuario;