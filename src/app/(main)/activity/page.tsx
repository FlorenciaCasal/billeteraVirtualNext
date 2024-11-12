'use client';

import Activity from '@/Components/dashboard/Activity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronDown, faSliders } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '@/store/dashboardSlice';
import { RootState } from '@/store/store';
import Button from '@/Components/ui/Button';

interface FiltersProps {
    filterPeriod: string;
    handleFilterPeriodChange: (period: string) => void;
    filterType: string;
    handleFilterTypeChange: (type: string) => void;
    showFilters: boolean;
    toggleFilters: () => void;
    searchTerm: string;
    handleSearchChange: (newSearchTerm: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
    filterPeriod,
    handleFilterPeriodChange,
    filterType,
    handleFilterTypeChange,
}) => {
    const [isPeriodOpen, setIsPeriodOpen] = useState(true);
    const [isTypeOpen, setIsTypeOpen] = useState(true);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Filtro de Período */}
            <div className="mb-4">
                <div
                    className="flex justify-between items-center cursor-pointer mb-2"
                    onClick={() => setIsPeriodOpen(!isPeriodOpen)}
                >
                    <h5 className="font-bold text-gray-700">Período</h5>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`transition-transform ${isPeriodOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                    />
                </div>
                {isPeriodOpen && (
                    <div className="flex flex-col gap-2">
                        {[
                            { value: '', label: 'Todos los períodos' },
                            { value: 'today', label: 'Hoy' },
                            { value: 'yesterday', label: 'Ayer' },
                            { value: 'lastWeek', label: 'Última semana' },
                            { value: 'last15Days', label: 'Últimos 15 días' },
                            { value: 'lastMonth', label: 'Último mes' },
                            { value: 'last3Months', label: 'Últimos 3 meses' },
                        ].map((option) => (
                            <div key={option.value} className="flex items-center justify-between cursor-pointer">
                                <label className="flex items-center cursor-pointer w-full">
                                    <span className="text-gray-600">{option.label}</span>
                                </label>
                                <div
                                    className={`w-4 h-4 border-2 rounded-full cursor-pointer 
            ${filterPeriod === option.value ? 'bg-[#000] border-crearCuentaNavbar ring-1 ring-black' : 'border-gray-400'}`}
                                    onClick={() => handleFilterPeriodChange(option.value)}
                                ></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Filtro de Tipo */}
            <div>
                <div
                    className="flex justify-between items-center cursor-pointer mb-2"
                    onClick={() => setIsTypeOpen(!isTypeOpen)}
                >
                    <h5 className="font-bold text-gray-700">Tipo</h5>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`transition-transform ${isTypeOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                    />
                </div>
                {isTypeOpen && (
                    <div className="flex flex-col gap-2">
                        {[
                            { value: '', label: 'Todos los tipos' },
                            { value: 'income', label: 'Ingresos' },
                            { value: 'expense', label: 'Egresos' },
                        ].map((option) => (
                            <div key={option.value} className="flex items-center justify-between cursor-pointer">
                                <label className="flex items-center cursor-pointer w-full">
                                    <span className="text-gray-600">{option.label}</span>
                                </label>
                                <div
                                    className={`w-4 h-4 border-2 rounded-full cursor-pointer 
            ${filterType === option.value ? 'bg-[#000] border-crearCuentaNavbar ring-1 ring-black' : 'border-gray-400'}`}
                                    onClick={() => handleFilterTypeChange(option.value)}
                                ></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ActivityPage = () => {
    const token = useSelector((state: RootState) => state.dashboard.token);
    const searchTerm = useSelector((state: RootState) => state.dashboard.searchTerm);

    const [filterPeriod, setFilterPeriod] = useState('');
    const [filterType, setFilterType] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const dispatch = useDispatch();

    const handleSearchChange = (newSearchTerm: string) => {
        dispatch(setSearchTerm(newSearchTerm));
    };

    useEffect(() => {
        return () => {
            dispatch(setSearchTerm(''));
        };
    }, [dispatch]);

    return (
        <main className="flex-grow py-8 px-16 bg-[#EEEAEA]">
            {/* Buscador */}
            <div className="flex">
                <div className="relative w-full mb-4 mr-4">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                    />
                    <input
                        type="text"
                        placeholder="Buscar en tu actividad"
                        className="w-full bg-white pl-12 pr-4 py-4 text-gray-700 rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 hover:shadow-md transition-shadow duration-300"
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>

                {/* Botón Filtrar */}
                <Button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 bg-crearCuentaNavbar text-black py-4 px-4 mb-4 rounded-lg"
                >
                    <h5 className="pr-6">Filtrar</h5>
                    <FontAwesomeIcon icon={faSliders} />
                </Button>
            </div>

            {/* Filtros */}
            {showFilters && (
                <Filters
                    filterPeriod={filterPeriod}
                    handleFilterPeriodChange={setFilterPeriod}
                    filterType={filterType}
                    handleFilterTypeChange={setFilterType}
                    showFilters={showFilters} // Añadir esta prop
                    toggleFilters={() => setShowFilters(!showFilters)} // Añadir esta prop
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                />
            )}

            <Activity
                token={token}
                searchTerm={searchTerm}
                filterPeriod={filterPeriod}
                filterType={filterType}
            />
        </main>
    );
};

export default ActivityPage;