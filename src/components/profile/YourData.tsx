'use client';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons'; // Importar el ícono de tilde
import userApi from '@/services/users/users.service';

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

const YourData = ({ user, me, token }: YourDataProps) => {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        dni: user.dni,
        phone: user.phone,
        password: '********'
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
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            // Crear dataToUpdate asegurando que dni es un número o excluyéndolo si es null
            const dataToUpdate = {
                ...formData,
                dni: formData.dni ? parseInt(formData.dni.toString(), 10) : undefined, // Excluir `dni` si no es un número
                password: formData.password !== '********' ? formData.password : undefined
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
        <div className='flex flex-col py-8 px-8 w-full bg-white rounded-lg'>
            <h4 className="font-bold">Tus datos</h4>
            {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                    <div className="grid grid-cols-3 items-center pt-2">
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
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center text-green-500"
                                    >
                                        <FontAwesomeIcon icon={faCheck} className="text-gray-500 w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="text-gray-500">{value}</span>
                                    <button
                                        onClick={() => handleEdit(key)}
                                        className="flex items-center text-blue-500"
                                    >
                                        <FontAwesomeIcon icon={faPen} className="text-gray-500 w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <hr className="border-t-1 border-black mb-4" />
                </div>
            ))}
        </div>
    );
};

export default YourData;

