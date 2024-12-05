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
import userApi from '@/services/users/users.service';


const PayServicesPage = () => {
  const token = useSelector((state: RootState) => state.dashboard.token);
  const me = userApi.getMeInternal(token);
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



  return (
    <main className="flex-grow py-8 px-16 bg-[#EEEAEA]">
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
        />
      )}
    </main>
  );
};
export default PayServicesPage