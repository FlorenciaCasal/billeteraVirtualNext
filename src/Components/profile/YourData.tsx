'use client';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons'; // Importar el ícono de tilde
import userApi from '@/services/users/users.service';
import Button from '../ui/Button';

interface YourDataProps {
    token: string;
    user: {
        email: string;
        firstname: string;
        lastname: string;
        dni: number;
        phone: string;
        password: string;
    };
    me: {
        alias: string;
        available_amount: number;
        cvu: string;
        id: number;
        user_id: number;
    };
}

const capitalizeWords = (str: string): string =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

const YourData = ({ user, me, token }: YourDataProps) => {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: user.email,
        nombre: capitalizeWords(user.firstname),
        apellido: capitalizeWords(user.lastname),
        DNI: user.dni,
        teléfono: user.phone,
        contraseña: '********'
    });

    const inputRef = useRef<HTMLInputElement | null>(null); // Crear referencia

    const handleEdit = (field: string) => {
        setEditingField(field);
        // Actualizamos el estado solo si es diferente de "password"
        if (field === 'password') {
            setFormData(prev => ({
                ...prev,
                password: '' // Permitimos que el usuario ingrese la nueva contraseña en blanco
            }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]:
                name === 'nombre' || name === 'apellido'
                    ? capitalizeWords(value) // Capitalizar nombres y apellidos
                    : value,
        }));
    };

    const handleSave = async () => {
        try {
            // Crear dataToUpdate asegurando que dni es un número o excluyéndolo si es null
            const dataToUpdate = {
                ...formData,
                dni: formData.DNI ? parseInt(formData.DNI.toString(), 10) : undefined, // Excluir `dni` si no es un número
                password: formData.contraseña !== '********' ? formData.contraseña : undefined
            };

            await userApi.updateUser(me.user_id, token, dataToUpdate);
            setEditingField(null);
            setFormData(prev => ({ ...prev, password: '********' })); // Reiniciar contraseña a asteriscos
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    useEffect(() => {
        if (editingField && inputRef.current) {
            inputRef.current.focus(); // Enfocar el input automáticamente
        }
    }, [editingField]);

    return (
        <div className='flex flex-col py-4 md:py-8 px-4 md:px-8 w-full bg-white rounded-lg shadow-md'>
            <h4 className="font-bold pb-4">Tus datos</h4>
            {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                    <div className="grid grid-cols-1 md:grid-cols-3 items-start md:items-center pt-0 md:pt2">
                        <div className="col-span-1">
                            <p className="text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                        </div>
                        <div className="col-span-2 flex justify-between items-center">
                            {editingField === key ? (
                                <>
                                    <input
                                        name={key}
                                        value={value}
                                        onChange={handleChange}
                                        className="border px-2 py-1"
                                        ref={inputRef} // Asignar la referencia al input
                                    />
                                    <Button
                                        onClick={handleSave}
                                        className="flex items-center text-green-500"
                                    >
                                        <FontAwesomeIcon icon={faCheck} className="text-gray-500 w-5 h-5" />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <span className="text-gray-500">{value}</span>
                                    <Button
                                        onClick={() => handleEdit(key)}
                                        className="flex items-center text-blue-500"
                                    >
                                        <FontAwesomeIcon icon={faPen} className="text-gray-200 w-5 h-5" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    <hr className="border-t-1 border-gray-200 mb-2 md:mb-4" />
                </div>
            ))}
        </div>
    );
};

export default YourData;

