'use client'
import React, { useEffect, useState } from 'react';
import servicesApi from '@/services/payServices/services.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '@/store/dashboardSlice';
import { RootState } from '@/store/store';
import Image from 'next/image';

type Service = {
  id: number;
  name: string;
  date: string;
};

const logos = [
  { name: "Netflix", src: "/img/logosServices/netflix.svg" },
  { name: "Amazon Prime Video", src: "/img/logosServices/amazon-prime.png" },
  { name: "Funimation", src: "/img/logosServices/Funimation.jpg" },
  { name: "Peacock", src: "/img/logosServices/peacock.jpg" },
  { name: "Paramount+", src: "/img/logosServices/paramount.svg" },
  { name: "Mubi", src: "/img/logosServices/mubi.svg" },
  { name: "Crunchyroll", src: "/img/logosServices/crunchyroll2.webp" },
  { name: "Discovery+", src: "/img/logosServices/discovery+.png" },
  { name: "Hulu", src: "/img/logosServices/hulu.svg" },
  { name: "Apple TV+", src: "/img/logosServices/apple.svg" },
  { name: "Disney+", src: "/img/logosServices/disney.svg" },
  { name: "HBO Max", src: "/img/logosServices/hbo-max.svg" },
];

const PayServicesPage = () => {
  const token = useSelector((state: RootState) => state.dashboard.token);
  const searchTerm = useSelector((state: RootState) => state.dashboard.searchTerm);
  const dispatch = useDispatch();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const handleSearchChange = (newSearchTerm: string) => {
    dispatch(setSearchTerm(newSearchTerm));
  };

  // const filteredServices = services?.services.filter(service =>
  //   service.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const getLogoForService = (serviceName: string) => {
    const logo = logos.find((logo) => logo.name.toLowerCase() === serviceName.toLowerCase());
    return logo ? logo.src : "/img/logosServices/default.svg"; // Imagen por defecto si no hay logo
  };

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const data = searchTerm
          ? await servicesApi.searchServices(searchTerm)
          : await servicesApi.getservices();
        setServices(data as Service[]);

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
      <div className="flex flex-col pb-8 pt-4 px-8 mt-4 w-full bg-white text-gray-700 rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 hover:shadow-md transition-shadow duration-300">
        <h6 className='mb-4'>Más recientes</h6>
        <hr className="border-t-1 border-crearCuentaLogin" />
        {isLoading ? (
          <p className="py-4 text-center">Cargando servicios...</p>
        ) : error ? (
          <p className="py-4 text-center text-red-600">{error}</p>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between px-4 py-2 border-b last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={getLogoForService(service.name)}
                  alt={`${service.name} logo`}
                  width={80} // Ancho en píxeles
                  height={80} // Alto en píxeles
                  className="object-contain h-10" // Estilo adicional para controlar el tamaño si es necesario
                  priority
                />
                <span className="text-gray-700 font-medium pl-4">{service.name}</span>
              </div>
              <button className="text-black text-sm">
                Seleccionar
              </button>
            </div>
          ))
        )}
        <hr className="border-t-1 border-crearCuentaLogin" />
      </div>
    </main>
  );
};

export default PayServicesPage