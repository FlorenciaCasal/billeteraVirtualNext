'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Button from '@/Components/ui/Button';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface FiltersProps {
    filterPeriod: string;
    handleFilterPeriodChange: (period: string) => void;
    filterType: string;
    handleFilterTypeChange: (type: string) => void;
    showFilters: boolean;
    toggleFilters: () => void;
    searchTerm: string;
    handleSearchChange: (newSearchTerm: string) => void;
    resetFilters: () => void;
    handleApplyFilters: () => void;
    filterAmountRange: string;
    handleFilterAmountRangeChange: (amount: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
    filterPeriod,
    handleFilterPeriodChange,
    filterType,
    handleFilterTypeChange,
    resetFilters,
    handleApplyFilters,
    showFilters,
    filterAmountRange,
    handleFilterAmountRangeChange,

}) => {
    const [isPeriodOpen, setIsPeriodOpen] = useState(false);
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isAmountOpen, setIsAmountOpen] = useState(false);

    return (
        <div className={`bg-white p-4 rounded-lg shadow-md absolute top-20 right-4 w-80 z-50 transition-transform duration-300 ${showFilters ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            {/* Borrar Filtros */}
            <button
                onClick={resetFilters}
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-sm font-bold transition"
            >
                Borrar filtros
            </button>
            {/* Filtro de Período */}
            <div className="mb-4">
                <div
                    className="flex items-center cursor-pointer mb-2"
                    onClick={() => setIsPeriodOpen(!isPeriodOpen)}
                >
                    <h5 className="font-bold text-gray-700 pr-2">Período</h5>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`transition-transform ${isPeriodOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                    />
                </div>
                <hr className="border-t-1 border-black mb-4" />
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
                    className="flex items-center cursor-pointer mb-2"
                    onClick={() => setIsTypeOpen(!isTypeOpen)}
                >
                    <h5 className="font-bold text-gray-700 pr-2">Tipo de operación</h5>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`transition-transform ${isTypeOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                    />
                </div>
                <hr className="border-t-1 border-black mb-4" />
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

            {/* Filtro de Rango de Monto */}
            <div>
                <div
                    className="flex items-center cursor-pointer mb-2"
                    onClick={() => setIsAmountOpen(!isAmountOpen)}
                >
                    <h5 className="font-bold text-gray-700 pr-2">Rango de monto</h5>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`transition-transform ${isAmountOpen ? 'rotate-180' : 'rotate-0'}`}
                    />
                </div>
                <hr className="border-t-1 border-black mb-4" />
                {isAmountOpen && (
                    <div className="flex flex-col gap-2">
                        {[
                            { value: '', label: 'Todos los montos' },
                            { value: '0-1000', label: '$0 a $1.000' },
                            { value: '1000-5000', label: '$1.000 a $5.000' },
                            { value: '5000-20000', label: '$5.000 a $20.000' },
                            { value: '20000-100000', label: '$20.000 a $100.000' },
                            { value: '100000+', label: 'Más de $100.000' },
                        ].map((option) => (
                            <div key={option.value} className="flex items-center justify-between cursor-pointer">
                                <label className="flex items-center cursor-pointer w-full">
                                    <span className="text-gray-600">{option.label}</span>
                                </label>
                                <div
                                    className={`w-4 h-4 border-2 rounded-full cursor-pointer
                ${filterAmountRange === option.value ? 'bg-[#000] border-crearCuentaNavbar ring-1 ring-black' : 'border-gray-400'}`}
                                    onClick={() => handleFilterAmountRangeChange(option.value)}
                                ></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Botón Aplicar */}
            <Button
                onClick={handleApplyFilters}
                className="w-full mt-6 py-4 bg-crearCuentaNavbar text-black font-bold text-center rounded-lg"
            >
                Aplicar
            </Button>
        </div>
    );
};

export default Filters