'use client'
import { useState, useEffect } from 'react';
import servicesApi from '@/services/payServices/services.api';
import Button from '../ui/Button';
import CardList from '../cards/CardList';
import { ResponseCardType } from '@/types/card/card.types';
import { ServiceDetails } from '@/types/services/services.types';
import Cookies from 'js-cookie';
import cardApi from '@/services/card/card.api';


interface Step3Props {
  onSelectCard?: (cardId: number) => void;
  selectedService?: ServiceDetails;
  onContinue?: () => void;
  token: string;
}

const Step3 = ({
  token,
  selectedService,
  onContinue,
}: Step3Props) => {
  const [service, setService] = useState<ServiceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<ResponseCardType[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const accountIdString = Cookies.get('digitalMoneyAccountID');
  const account_id: number = Number(accountIdString);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (selectedService) {
        setLoading(true);
        try {
          const serviceResponse = await servicesApi.getServiceById(selectedService.id);
          setService(serviceResponse);
        } catch (error) {
          console.error('Error fetching service data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchServiceData();
  }, [selectedService]);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        if (account_id) {
          const data = await cardApi.getCard(account_id, token);
          setCards(data);
        }
      } catch (err) {
        console.error("Error fetching cards:", err);
        setError("No se pudieron cargar las tarjetas.");
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [account_id, token]);

  const handleSelectCard = (cardId: number) => {
    setSelectedCardId(cardId);
    console.log("Tarjeta seleccionada:", cardId);
  };

  return (
    <div className="flex flex-col w-full p-8">
      {/* Div superior */}
      <div className="flex flex-col bg-backgroundNavbar rounded-lg p-6">
        {loading ? (
          <div>Cargando servicio...</div> // Aquí puedes mostrar un loader mientras se cargan los datos
        ) : (
          selectedService && (
            <>
              <div className="flex justify-between">
                <h4 className="text-white">{selectedService.name}</h4>
                <Button
                  onClick={() => console.log('Ver detalles del pago')}
                  className="text-sm text-[#000] bg-crearCuentaNavbar"
                >
                  Ver detalles del pago
                </Button>
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-white">Total a pagar:</span>
                <span className="text-white">${selectedService.invoice_value}</span>
              </div>
            </>
          )
        )}
      </div>

      {/* Div inferior - tarjetas */}
      <div className="mt-8">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <CardList
            cards={cards} // Ya no es necesario el `?? []` porque cards siempre es un array
            selectedCardId={selectedCardId}
            onSelectCard={handleSelectCard} // Asegúrate de que esta función se pase correctamente
          />
        )}
        <div className="flex justify-end mt-4">
          <Button
            type="button"
            className={`w-64 h-12 text-sm ${selectedCardId !== null
              ? 'bg-crearCuentaNavbar border-custom-green hover:bg-hoverButtonGreen'
              : 'bg-gray-300 cursor-not-allowed'
              }`}
            onClick={selectedCardId !== null ? onContinue : undefined}
            disabled={selectedCardId === null}
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Step3;

