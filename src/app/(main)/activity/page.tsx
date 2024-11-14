
'use client';
import Activity from '@/Components/dashboard/Activity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '@/store/dashboardSlice';
import { RootState } from '@/store/store';
import Button from '@/Components/ui/Button';
import Filters from '@/Components/dashboard/Filters';

const ActivityPage = () => {
    const token = useSelector((state: RootState) => state.dashboard.token);
    const searchTerm = useSelector((state: RootState) => state.dashboard.searchTerm);

    const [filterPeriod, setFilterPeriod] = useState('');
    const [filterType, setFilterType] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filterAmountRange, setFilterAmountRange] = useState('');

    const dispatch = useDispatch();

    const handleSearchChange = (newSearchTerm: string) => {
        dispatch(setSearchTerm(newSearchTerm));
    };

    const resetFilters = () => {
        setFilterPeriod('');
        setFilterType('');
        setFilterAmountRange('');
    };

    const handleApplyFilters = () => {
        setShowFilters(false);
    };


    useEffect(() => {
        return () => {
            dispatch(setSearchTerm(''));
        };
    }, [dispatch]);

    return (
        <main className="flex-grow min-h-screen py-8 px-16 bg-[#EEEAEA]">
            {/* Buscador */}
            <div className="flex">
                <div className="relative w-full mr-4">
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
                    className="flex items-center gap-2 bg-crearCuentaNavbar text-black py-4 px-4 rounded-lg"
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
                    showFilters={showFilters}
                    toggleFilters={() => setShowFilters(!showFilters)}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    resetFilters={resetFilters}
                    handleApplyFilters={handleApplyFilters}
                    filterAmountRange={filterAmountRange}
                    handleFilterAmountRangeChange={setFilterAmountRange}
                />
            )}

            <Activity
                token={token}
                searchTerm={searchTerm}
                filterPeriod={filterPeriod}
                filterType={filterType}
                filterAmountRange={filterAmountRange}
            />
        </main>
    );
};

export default ActivityPage;