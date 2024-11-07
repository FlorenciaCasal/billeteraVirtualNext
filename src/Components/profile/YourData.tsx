'use client';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons'; // Importar el ícono de tilde
import userApi from '@/services/users/users.service';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { profileScheme } from '@/schemes/profile.scheme';


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
        if (field !== 'dni') { // Evitar que `dni` entre en modo de edición
            setEditingField(field);
            if (field === 'password') {
                setFormData(prev => ({
                    ...prev,
                    password: ''
                }));
            }
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
        if (!editingField) return;
        try {
            await profileScheme.validateAt(editingField!, { [editingField!]: formData[editingField as keyof typeof formData] });
            // Crear dataToUpdate asegurando que dni es un número o excluyéndolo si es null
            const dataToUpdate = {
                ...formData,
                dni: undefined, // Excluir `dni`
                password: formData.password !== '********' ? formData.password : undefined
            };
            await userApi.updateUser(me.user_id, token, dataToUpdate);

            setEditingField(null);
            setFormData(prev => ({ ...prev, password: '********' })); // Reiniciar contraseña a asteriscos

            Swal.fire({
                title: 'Actualización exitosa',
                text: `${editingField} ha sido actualizado correctamente.`,
                icon: 'success',
                confirmButtonText: 'OK',
                color: '#fff',
                background: '#000',
                backdrop: 'rgba(0, 0, 0, 0.8)',
                customClass: {
                    confirmButton: 'bg-crearCuentaNavbar text-black',
                    title: 'text-[#fff] text-4xl font-semibold',
                    popup: 'swal-popup',
                }
            });

        } catch (error) {
            console.error("Error updating user:", error);
            if (error instanceof yup.ValidationError) {
                Swal.fire({
                    title: 'Error de validación',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
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
                            {key === 'dni' ? (
                                <span className="text-gray-500">{formData.dni}</span>
                            ) : editingField === key ? (
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

