'use client'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Service } from '@/types/typesServices/services.types';
import Button from '../ui/Button';

interface Step1Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  error: string | null;
  filteredServices: Service[];
  handleSelectService: (service: Service) => void;
}

const Step1: React.FC<Step1Props> = ({
  searchTerm,
  setSearchTerm,
  isLoading,
  error,
  filteredServices,
  handleSelectService,
}) => {
  const getLogoForService = (serviceName: string) => {
    const logos = [
      { name: "Netflix", src: "/img/logosServices/netflix.svg" },
      { name: "Amazon Prime Video", src: "/img/logosServices/prime.svg" },
      { name: "Funimation", src: "/img/logosServices/funimation.svg" },
      { name: "Peacock", src: "/img/logosServices/peacock.svg" },
      { name: "Paramount+", src: "/img/logosServices/paramount.svg" },
      { name: "Mubi", src: "/img/logosServices/mubi.svg" },
      { name: "Crunchyroll", src: "/img/logosServices/crunchyroll.svg" },
      { name: "Discovery+", src: "/img/logosServices/discovery.svg" },
      { name: "Hulu", src: "/img/logosServices/hulu.svg" },
      { name: "Apple TV+", src: "/img/logosServices/appletv.svg" },
      { name: "Disney+", src: "/img/logosServices/disney.svg" },
      { name: "HBO Max", src: "/img/logosServices/hbomax.svg" },
    ];
    const logo = logos.find((logo) => logo.name.toLowerCase() === serviceName.toLowerCase());
    return logo ? logo.src : "/img/logosServices/default.svg";
  };

  return (
    <main >
      {/* Buscador */}
      <div className="flex">
        <div className="relative w-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] rounded-lg border border-blue-300">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
          />
          <input
            type="text"
            placeholder="Buscá entre más de 5.000 empresas"
            className="w-full bg-white pl-12 pr-4 py-4 text-gray-700 rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 hover:shadow-md transition-shadow duration-300"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Lista de servicios */}
      <div className="flex flex-col pb-8 pt-6 px-4 tablet:px-8 xl:px-12 mt-4 w-full bg-white text-gray-700 rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 hover:shadow-md transition-shadow duration-300">
        <h6 className='mb-4'>Más recientes</h6>
        <hr className="border-t-1 border-crearCuentaLogin" />
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-opacity-75"></div>
          </div>
        ) : error ? (
          <p className="py-4 text-center text-red-600">{error}</p>
        ) : (
          filteredServices.map((service, index) => (
            <div key={service.id}>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-4 sm:gap-8 lg:gap-16">
                  <div className="w-20 h-10 flex items-center justify-center">
                    <Image
                      src={getLogoForService(service.name)}
                      alt={`${service.name} logo`}
                      width={80}
                      height={80}
                      className="object-contain h-full"
                      priority
                    />
                  </div>
                  {/* Contenedor del nombre del servicio con tamaño fijo */}
                  <div className="flex-1">
                    <span className="block text-gray-700 font-medium">
                      {service.name}
                    </span>
                  </div>
                </div>
                <Button onClick={() => handleSelectService(service)} className="text-black">
                  <p className='font-bold'>Seleccionar</p>
                </Button>
              </div>
              <hr className="border-t-1 border-crearCuentaLogin" />
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Step1;

