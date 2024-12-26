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
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useMemo } from 'react';
import Error from './Error';
import Swal from 'sweetalert2';
import { setCardNumberId } from '@/store/paymentSlice';

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
  setPaymentMethod: (method: 'card' | 'account' | null) => void;
  onTransferData: (data: TransferRequest) => void;
}

const Step3 = ({ token, selectedService, onConfirm, onSelectCard, onSelectAccount, selectedCardId, setSelectedCardId, isPaymentButtonDisabled, paymentMethod, setPaymentMethod, onTransferData }: Step3Props) => {
  const me = useMemo(() => userApi.getMeInternal(token), [token]);
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
  const balance = useSelector((state: RootState) => state.dashboard.balance);
  const title = 'Hubo un problema con tu pago';
  const paragraph1 = 'Puede deberse a fondos insuficientes.';
  const paragraph2 = 'Comunicate con la entidad emisora de la tarjeta';



  const handleRetry = () => {
    // Resetea el estado del error y vuelve al flujo principal
    setPaymentStatus('idle');
    setError(null);
  };

  const renderError = () => {
    if (paymentStatus === 'error') {
      return (
        <Error title={title} paragraph1={paragraph1} paragraph2={paragraph2} >
        </Error>
      )
    }
    return null;
  };

  const handleCardSelection = (cardId: number) => {
    if (paymentMethod === 'account') {
      setPaymentMethod(null);
    }
    if (selectedCardId === cardId) {
      setSelectedCardId(null);
    } else {
      setSelectedCardId(cardId);
      onSelectCard(cardId);
    }
  };

  const handleAccountSelection = () => {
    if (selectedCardId !== null) {
      setSelectedCardId(null);
    }
    setPaymentMethod('card');
    onSelectAccount();
  };

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

  const handlePayService = async () => {
    console.log("Intentando pagar...");
    setPaymentStatus('loading');
    if (!selectedService) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay servicio seleccionado para pagar.',
      });
      return;
    }
    const invoiceValue = Number(selectedService.invoice_value);
    if (invoiceValue <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Monto inválido',
        text: 'El valor del servicio debe ser mayor a $0 para continuar con el pago.',
      });
      return; // Detener el flujo si el valor es 0 o negativo
    }
    try {
      if (selectedCardId) {
        // Pago con tarjeta
        const cardDetails = await cardApi.getCardDetails(account_id, selectedCardId, token);
        const cardNumberId = cardDetails.number_id;
        dispatch(setCardNumberId(cardNumberId || null));
        const response = await transactionApi.createTransaction(account_id, token, {
          amount: -invoiceValue,
          dated: new Date().toISOString(),
          description: selectedService.name,
        });
        console.log('Transacción realizada:', response);
        setPaymentStatus('success');
        onConfirm(response.id, account_id, cardNumberId);
      } else if (paymentMethod === 'account') {
        await handlePayWithAccount();
        onSelectAccount();
      }
    } catch (error) {
      console.error('Error al realizar el pago:', error);
      setPaymentStatus('error');
    }
  };

  // Realizar el pago con saldo en cuenta
  const handlePayWithAccount = async () => {
    if (!selectedService) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay servicio seleccionado para pagar.',
      });
      return;
    }
    const invoiceValue = Number(selectedService.invoice_value);
    if (invoiceValue <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Monto inválido',
        text: 'El valor del servicio debe ser mayor a $0 para continuar con el pago.',
      });
      return;
    }
    if (invoiceValue > balance) {
      setPaymentStatus('error');
      return; // Detener el flujo si el saldo no es suficiente
    }
    try {
      const transferData: TransferRequest = {
        amount: -Number(selectedService.invoice_value),
        dated: new Date().toISOString(),
        destination: selectedService.name,
        origin: (await me).cvu
      };
      onTransferData(transferData);
      const response = await transferApi.makeTransfer(account_id, token, transferData);
      console.log('Pago con saldo en cuenta realizado:', response);
      const newBalance = balance;
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
  console.log("onTransferData", onTransferData)

  return (
    <>
      <div className="flex flex-col w-full">
        {renderError() || (
          <>
            {/* Div superior */}
            <div className="flex flex-col bg-backgroundNavbar rounded-lg py-6 px-6 md:px-10 xl:px-16">
              {/* {renderError()} */}
              {loading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-crearCuentaNavbar border-opacity-75"></div>
                </div>
              ) : (
                selectedService && (
                  <>
                    <div className="flex flex-col md:flex-row items-stretch justify-between pb-6">
                      <Button
                        onClick={() => console.log('Ver detalles del pago')}
                        className="block md:hidden ml-auto !text-sm items-start !p-0 text-[#fff] "
                      >
                        Ver detalles del pago
                      </Button>
                      <h4 className="text-crearCuentaNavbar sm:mt-0">{selectedService.name}</h4>
                      <Button
                        onClick={() => console.log('Ver detalles del pago')}
                        className="hidden md:block !text-sm items-start !p-0 text-[#fff] "
                      >
                        Ver detalles del pago
                      </Button>
                    </div>
                    <hr className="border-t-1 sm:border-t-1/2 border-solid border-white mb-4 w-full" />
                    <div className="flex justify-between">
                      <span className="text-white"><h5>Total a pagar:</h5></span>
                      <span className="text-white">
                        <h5>
                          ${Number(selectedService.invoice_value).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h5>
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
                  onSelectCard={handleCardSelection}
                />
              )}
              <div className={`flex items-center justify-between py-6 px-6 my-4 w-full bg-white text-gray-700 rounded-lg focus:outline-none focus:border-black cursor-pointer ${cards.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleCreateCard}
              >
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faPlus} className=" w-6 h-6 border-2 border-gray-700 rounded-full bg-transparent p-1 mr-4" />
                  <h5 className=" font-bold">Nueva tarjeta</h5>
                </div>
                <span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-gray-700 w-5 h-5" />
                </span>
              </div>
              <div className="flex items-center justify-between py-4 px-6 my-6 w-full bg-white text-gray-700 rounded-lg focus:outline-none focus:border-black cursor-pointer"
                onClick={handleAccountSelection}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-crearCuentaNavbar rounded-full mr-2"></div>
                  <span><h5 className="mr-2">Pagar con saldo en cuenta</h5></span>
                  {/* <p className='text-sm mr-2'>(Disponible ${balance.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</p> */}
                </div>
                <div
                  className={`w-4 h-4 border-2 rounded-full cursor-pointer 
      ${paymentMethod === 'account' ? 'bg-[#000] border-2 border-crearCuentaNavbar ring-1 ring-black' : 'border-gray-400'}`}
                ></div>
                {/* Input radio oculto */}
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'account'}
                  onChange={handleAccountSelection}
                  className="hidden" // Ocultamos el input
                  disabled={selectedCardId !== null}
                />
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <Button
                type="button"
                className={`w-1/2 md:w-64 h-12 tablet:h-16 !font-bold shadow-md !text-sm ${selectedCardId !== null || paymentMethod === 'account'
                  ? 'bg-crearCuentaNavbar border-custom-green hover:bg-hoverButtonGreen'
                  : 'bg-crearCuentaNavbar cursor-not-allowed'
                  }`}
                onClick={selectedCardId !== null ? handlePayService : handlePayWithAccount}
                disabled={!selectedCardId && paymentMethod !== 'account'}
              >
                Pagar
              </Button>

            </div>
          </>
        )}
      </div>

      {renderError() && (
        <div className="flex justify-end mt-4 w-full bg-transparent">
          <Button
            type="button"
            onClick={handleRetry}
            className="w-64 h-12 text-sm text-[#000] bg-crearCuentaNavbar"
          >
            Volver
          </Button>
        </div>
      )}
    </>
  );
};
export default Step3;

