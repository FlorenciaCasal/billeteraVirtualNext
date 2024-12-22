'use client'
import React, { useEffect, useState } from 'react';
import servicesApi from '@/services/payServices/services.api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Service, ServiceDetails } from '../../../types/typesServices/services.types';
import Step1 from '@/Components/payServices/Step1';
import Step2 from '@/Components/payServices/Step2';
import Step3 from '@/Components/payServices/Step3';
import Step4 from '@/Components/payServices/Step4';
import { TransferRequest } from '@/types/transactions/transactions.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const PayServicesPage = () => {
  const token = useSelector((state: RootState) => state.dashboard.token);
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  const [step, setStep] = useState(1); // Controla los pasos
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [cardNumberId, setCardNumberId] = useState<number | null>(null);
  const [transaction_id, setTransaction_id] = useState<number | null>(null);
  const [account_id, setAccount_id] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'account' | null>(null);
  const [transferData, setTransferData] = useState<TransferRequest | null>(null);
  // Valor esperado de los 11 dígitos
  const EXPECTED_ACCOUNT_SUFFIX = '12345678910';

  const isPaymentButtonDisabled =
    !paymentMethod ||
    (paymentMethod === 'card' && !selectedCardId) ||
    (paymentMethod === 'account' && !selectedService?.invoice_value);
  console.log('Estado botón deshabilitado:', isPaymentButtonDisabled);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const data = await servicesApi.getServices(); // `GET /api/service`
        setServices(data as Service[]);
        setFilteredServices(data as Service[]);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("No se pudieron cargar los servicios.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, [token]);

  useEffect(() => {
    const filtered = searchTerm
      ? services.filter((service) =>
        service.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      : services;
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  const handleSelectService = async (service: Service) => {
    setIsLoading(true);
    try {
      const detailedService = await servicesApi.getServiceById(service.id);
      setSelectedService(detailedService as ServiceDetails);
      setStep(2);
    } catch (err) {
      setError("No se pudieron cargar los detalles del servicio.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCard = (cardId: number) => {
    setSelectedCardId(cardId);
    setPaymentMethod('card');
    console.log("Tarjeta seleccionada:", cardId);
  };

  const handleSelectAccount = () => {
    setPaymentMethod('account'); // Al elegir pagar con cuenta, se establece el método como 'account'
    console.log("Pagar con dinero en cuenta");
  };

  const handleContinue = () => setStep(3);

  const handleConfirm = (transaction_id: number, account_id: number, cardNumberId?: number) => {
    if (
      transaction_id &&
      account_id &&
      ((paymentMethod === 'card' && cardNumberId) || paymentMethod === 'account')
    ) {
      setTransaction_id(transaction_id);
      setAccount_id(account_id);
      setCardNumberId(cardNumberId || null);
      setStep(4);
    } else {
      console.error('Faltan datos para continuar al Step 4');
    }
  };

  const handleTransferData = (data: TransferRequest) => {
    setTransferData(data); // Almacena los datos de la transferencia
  };

  return (
    <main className="flex-grow min-h-screen sm:w-[70vw] menu:w-[calc(100vw-16rem)] py-8 px-4 sm:px-10 sm:py-12 md:px-12 md:py-16 xl:px-20 xl:py-16 bg-[#EEEAEA]">
      {/* Encabezado visible solo en pantallas pequeñas */}
      <div className="flex items-center mb-6 sm:hidden">
        <FontAwesomeIcon icon={faArrowRight} className="text-gray-700" style={{ transform: 'scaleX(1.4)' }} />
        <p className="pl-2 text-sm font-medium underline text-black">Cargar dinero</p>
      </div>
      {step === 1 && (
        <Step1
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
          error={error}
          filteredServices={filteredServices}
          handleSelectService={handleSelectService}
        />
      )}
      {step === 2 && selectedService && (
        <Step2 selectedService={selectedService}
          handleContinue={handleContinue}
          EXPECTED_ACCOUNT_SUFFIX={EXPECTED_ACCOUNT_SUFFIX}
        />
      )}
      {step === 3 && selectedService && (
        <Step3
          token={token}
          selectedService={selectedService}
          onConfirm={handleConfirm}
          onSelectCard={handleSelectCard}
          onSelectAccount={handleSelectAccount}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
          isPaymentButtonDisabled={isPaymentButtonDisabled}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onTransferData={handleTransferData}
        />
      )}
      {step === 4 && selectedService && (
        <Step4
          token={token}
          selectedService={selectedService}
          selectedCardId={selectedCardId}
          cardNumberId={cardNumberId}
          accountId={account_id}
          transactionId={transaction_id}
          transferData={transferData}
          EXPECTED_ACCOUNT_SUFFIX={EXPECTED_ACCOUNT_SUFFIX}
        />
      )}
    </main>
  );
};
export default PayServicesPage