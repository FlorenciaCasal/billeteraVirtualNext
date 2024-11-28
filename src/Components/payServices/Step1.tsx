'use client'
import React from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Service } from '@/types/services/services.types';

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
    const logo = logos.find((logo) => logo.name.toLowerCase() === serviceName.toLowerCase());
    return logo ? logo.src : "/img/logosServices/default.svg";
  };

  return (
    <main >
      {/* Buscador */}
      <div className="flex">
        <div className="relative w-full">
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
      <div className="flex flex-col pb-8 pt-4 px-8 mt-4 w-full bg-white text-gray-700 rounded-lg focus:outline-none focus:border-black placeholder:text-gray-500 hover:shadow-md transition-shadow duration-300">
        <h6 className='mb-4'>Más recientes</h6>
        <hr className="border-t-1 border-crearCuentaLogin" />
        {isLoading ? (
          <p className="py-4 text-center">Cargando servicios...</p>
        ) : error ? (
          <p className="py-4 text-center text-red-600">{error}</p>
        ) : (
          filteredServices.map((service) => (
            <div key={service.id} className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-4">
                <Image
                  src={getLogoForService(service.name)}
                  alt={`${service.name} logo`}
                  width={80}
                  height={80}
                  className="object-contain h-10"
                  priority
                />
                <span className="text-gray-700 font-medium">{service.name}</span>
              </div>
              <button onClick={() => handleSelectService(service)} className="text-black text-sm">
                Seleccionar
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Step1;

