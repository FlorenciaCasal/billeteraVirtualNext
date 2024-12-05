'use client'
import { useState, useEffect } from 'react';
import servicesApi from '@/services/payServices/services.api';
import Button from '../ui/Button';
import CardList from '../cards/CardList';
import { ResponseCardType } from '@/types/card/card.types';
import { ServiceDetails } from '@/types/typesServices/services.types';
import Cookies from 'js-cookie';
import cardApi from '@/services/card/card.api';
import transactionApi from '@/services/transaction/transaction.api';
import { TransferRequest } from '@/types/transactions/transactions.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setBalance } from '../../store/dashboardSlice';
import userApi from '@/services/users/users.service';
import transferApi from '@/services/transfers/transfer.api';

interface Step3Props {
  onSelectCard: (cardId: number) => void;
  onSelectAccount: () => void;
  selectedService?: ServiceDetails;
  onConfirm: (transaction_id: number, account_id: number, cardNumberId?: number) => void;
  token: string;
  selectedCardId: number | null;
  setSelectedCardId: (cardId: number | null) => void;
  isPaymentButtonDisabled: boolean;
  paymentMethod: 'card' | 'account' | null;
}

const Step3 = ({ token, selectedService, onConfirm, onSelectCard, onSelectAccount, selectedCardId, setSelectedCardId, isPaymentButtonDisabled, paymentMethod }: Step3Props) => {
  const me = userApi.getMeInternal(token);
  const [service, setService] = useState<ServiceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<ResponseCardType[]>([]);
  const accountIdString = Cookies.get('digitalMoneyAccountID');
  const account_id: number = Number(accountIdString);
  const [showLimitMessage, setShowLimitMessage] = useState(false);
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const dispatch = useDispatch();
  const [payWithAccountSelected, setPayWithAccountSelected] = useState(false);

  const handleCreateCard = () => {
    if (cards.length >= 10) {
      setShowLimitMessage(true);
    } else {
      setShowLimitMessage(false);
      router.push('/createCard');
    }
  };

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

  const fetchAccountBalance = async () => {
    try {
      const me = await userApi.getMeInternal(token);
      const newBalance = me.available_amount
      if (newBalance) {
        return newBalance;
      } else {
        throw new Error('No se pudo obtener el balance de la cuenta');
      }
    }
    catch (error) {
      console.error('Error al obtener el balance:', error);
      setError('Error al obtener el balance de la cuenta.');
    }
  };

  const handlePayService = async () => {
    console.log("Intentando pagar...");
    setPaymentStatus('loading');
    if (!selectedService) {
      console.error('No hay servicio seleccionado');
      return;
    }
    const invoiceValue = Number(selectedService.invoice_value);
    if (invoiceValue <= 0) {
      alert('El valor del servicio debe ser mayor a $0 para continuar con el pago.');
      return; // Detener el flujo si el valor es 0 o negativo
    }
    try {
      if (selectedCardId) {
        // Pago con tarjeta
        const cardDetails = await cardApi.getCardDetails(account_id, selectedCardId, token);
        const cardNumberId = cardDetails.number_id;
        const response = await transactionApi.createTransaction(account_id, token, {
          amount: -invoiceValue,
          dated: new Date().toISOString(),
          description: `Pago de servicio: ${selectedService.name}`,
        });
        console.log('Transacción realizada:', response);
        onConfirm(response.id, account_id, cardNumberId);
      } else if (paymentMethod === 'account') {
        onSelectAccount();
        await handlePayWithAccount();
      } else {
        throw new Error('Método de pago no seleccionado');
      }
      setPaymentStatus('success');
    } catch (error) {
      console.error('Error al realizar el pago:', error);
      setPaymentStatus('error');
    }
  };

  // Realizar el pago con saldo en cuenta
  const handlePayWithAccount = async () => {
    if (!selectedService) {
      console.error('No hay servicio seleccionado');
      return;
    }
    try {
      const transferData: TransferRequest = {
        amount: -Number(selectedService.invoice_value),
        dated: new Date().toISOString(),
        destination: `Pago de servicio con saldo en cuenta: ${selectedService.name}`,
        origin: (await me).cvu
      };
      const response = await transferApi.makeTransfer(account_id, token, transferData);
      console.log('Pago con saldo en cuenta realizado:', response);
      // Si la transferencia es exitosa, obtenemos el nuevo balance
      const newBalance = await fetchAccountBalance();
      if (newBalance !== undefined) {
        dispatch(setBalance(newBalance));
        setPaymentStatus('success');
        onConfirm(response.id, account_id);
        console.log("Confirmación enviada:", response.id, account_id);
      }
    } catch (error) {
      console.error('Error al realizar el pago:', error);
      setPaymentStatus('error');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Div superior */}
      <div className="flex flex-col bg-backgroundNavbar rounded-lg py-4 px-8">
        {loading ? (
          <div>Cargando servicio...</div> // Aquí puedes mostrar un loader mientras se cargan los datos
        ) : (
          selectedService && (
            <>
              <div className="flex justify-between pb-6">
                <h4 className="text-crearCuentaNavbar text-mmlg">{selectedService.name}</h4>
                <Button
                  onClick={() => console.log('Ver detalles del pago')}
                  className="text-sm !p-0 text-[#fff] "
                >
                  Ver detalles del pago
                </Button>
              </div>
              <div className="flex justify-between">
                <span className="text-white"><h4 className="text-mmlg">Total a pagar:</h4></span>
                <span className="text-white">
                  <h4 className="text-mmlg">
                    ${Number(selectedService.invoice_value).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h4>
                </span>
              </div>
            </>
          )
        )}
      </div>
      {/* Div inferior - tarjetas */}
      <div>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <CardList
            cards={cards}
            selectedCardId={selectedCardId}
            onSelectCard={onSelectCard}
          />
        )}
        <div className={`flex items-center py-8 px-8 my-6 w-full bg-white text-gray-700 rounded-lg focus:outline-none focus:border-black cursor-pointer ${cards.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleCreateCard}
        >
          <FontAwesomeIcon icon={faPlus} className=" w-7 h-7 border-2 border-gray-700 rounded-full bg-transparent p-1 mr-4" />
          <h4 className=" font-bold">Nueva tarjeta</h4>
        </div>

        <div className="flex items-center py-8 px-8 my-6 w-full bg-white text-gray-700 rounded-lg focus:outline-none focus:border-black cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            checked={payWithAccountSelected}
            onChange={() => {
              setPayWithAccountSelected(!payWithAccountSelected);
              onSelectAccount(); 
            }}
            className="w-6 h-6 border-2 border-gray-700 rounded-full bg-transparent mr-4"
          />
          <h4 className="font-bold">Pagar con saldo en cuenta</h4>
        </div>

        <div className="flex justify-end mt-2">
          <Button
            type="button"
            className={`w-64 h-12 text-sm ${selectedCardId !== null || payWithAccountSelected
              ? 'bg-crearCuentaNavbar border-custom-green hover:bg-hoverButtonGreen'
              : 'bg-gray-300 cursor-not-allowed'
              }`}
            onClick={selectedCardId !== null ? handlePayService : handlePayWithAccount}
            disabled={isPaymentButtonDisabled}          
          >
            Pagar
          </Button>
        </div>
      </div>

    </div>
  );
};
export default Step3;

