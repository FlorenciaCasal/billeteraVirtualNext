'use client';
import Activity from '@/Components/dashboard/Activity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '@/store/dashboardSlice';
import { RootState } from '@/store/store';

const ActivityPage = () => {
    const token = useSelector((state: RootState) => state.dashboard.token);
    const searchTerm = useSelector((state: RootState) => state.dashboard.searchTerm);
    
    const dispatch = useDispatch();

    const handleSearchChange = (newSearchTerm: string) => {
        // Actualizar searchTerm en Redux
        dispatch(setSearchTerm(newSearchTerm));
    };

    useEffect(() => {
        return () => {
            // Limpiar el estado del buscador al desmontar el componente
            dispatch(setSearchTerm(''));
        };
    }, [dispatch]);
    
    return (
        <main className="flex-grow py-8 px-16 bg-[#EEEAEA]">
            <div className="relative w-full">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                />
                <input
                    type="text"
                    placeholder="Buscar en tu actividad"
                    className="w-full bg-white pl-12 pr-4 py-4 text-gray-700  rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 hover:shadow-md transition-shadow duration-300"
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
            </div>

            <Activity token={token} searchTerm={searchTerm} />
        </main>
    )
}

export default ActivityPage