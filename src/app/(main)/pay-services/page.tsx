'use client'
import React, { useEffect, useState } from 'react';
import servicesApi from '@/services/payServices/services.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '@/store/dashboardSlice';
import { RootState } from '@/store/store';

type Service = {
  id: number;
  name: string;
  date: string;
};

interface ServicesListProps {
  services: Service[];
}

const PayServicesPage = () => {
  const token = useSelector((state: RootState) => state.dashboard.token);
  const searchTerm = useSelector((state: RootState) => state.dashboard.searchTerm);
  const dispatch = useDispatch();
  const [services, setServices] = useState<ServicesListProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSearchChange = (newSearchTerm: string) => {
    dispatch(setSearchTerm(newSearchTerm));
  };

  const filteredServices = services?.services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ServicesList = ({ services }: ServicesListProps) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {services.map(service => (
        <div key={service.id} className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <p className="text-gray-600">{new Date(service.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const data = searchTerm
          ? await servicesApi.searchServices(searchTerm)
          : await servicesApi.getservices();
          setServices({ services: data as Service[] });

      } catch (err) {
        console.error("Error fetching services:", err);
        setError("No se pudieron cargar los servicios.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [searchTerm]);

  return (
    <main className="flex-grow py-8 px-16 bg-[#EEEAEA]">
      {/* Buscador */}
      <div className="flex">
        <div className="relative w-full">
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
      </div>
      {/* Lista de servicios */}
      {isLoading ? (
        <p className="mt-8 text-center">Cargando servicios...</p>
      ) : error ? (
        <p className="mt-8 text-center text-red-600">{error}</p>
      ) : (
        <ServicesList services={filteredServices || []} />
      )}
    </main>

  );
};

export default PayServicesPage