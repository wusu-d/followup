'use client';
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useCallback, useState } from 'react';

import logger from '@/lib/logger';
import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';

import { useAppDispatch, useAppSelector } from '@/store';

import PayLaterIcon from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/pay/_components/PayLaterIcon';
import PaymentConfirmed from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/pay/_components/PaymentConfirmed';
import {
  useConfirmAppointmentMutation,
  useCreateCheckoutSessionMutation,
} from '@/rtk-query/appointments';
import {
  BOOK_APPOINTMENT_PAYMENT_SUMMARY,
  BOOK_APPOINTMENT_SERVICE_TYPE,
  BOOK_APPOINTMENT_SLICE_REDUCER_NAME,
} from '@/slices/book-appointment.slice';
import { updateSpecialistState } from '@/slices/specialists.slice';
import { formatToCurrency } from '@/utils/forrmatCurrency';

const PaymentSummary = () => {
  const dispatch = useAppDispatch();
  const [selectedCard, setSelectedCard] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isPaymentShown, setIsPaymentShown] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const {
    [BOOK_APPOINTMENT_SERVICE_TYPE]: serviceType,
    [BOOK_APPOINTMENT_PAYMENT_SUMMARY]: paymentSummary,
  } = useAppSelector((state) => state[BOOK_APPOINTMENT_SLICE_REDUCER_NAME]);

  const [confirmAppointment, { isLoading: isConfirmAppointmentLoading }] =
    useConfirmAppointmentMutation();

  const [createCheckoutSession, { isLoading: isCreateCheckoutSessionLoading }] =
    useCreateCheckoutSessionMutation();

  // const {
  //   paymentMethods,
  //   publicKey,
  //   clientKey: clientSecret,
  // } = useAppSelector((state) => state[PAYMENT_METHODS_SLICE_REDUCER_NAME]);

  // Add state for clientSecret
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Add state for stripePromise
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  // Remove the useEffect and move logic to a callback
  const initializeCheckout = useCallback(async () => {
    try {
      const response = await createCheckoutSession(
        `${paymentSummary?.appointment_id}`
      ).unwrap();
      const stripePromise = loadStripe(response.public_key, {
        stripeAccount: response.connect_account_id,
      });
      setStripePromise(stripePromise);
      setClientSecret(response.client_secret);
      setSessionId(response.client_secret.split('_secret')[0]);
      setIsPaymentShown(true); // Show payment form after initialization
    } catch (error) {
      logger(error);
    }
  }, [createCheckoutSession, paymentSummary?.appointment_id]);

  const handlePaymentClicked = async () => {
    if (selectedCard === 111) {
      handlePaymentComplete();
    } else {
      setIsStripeLoading(true);
      await initializeCheckout();
    }
  };

  const handlePaymentComplete = async () => {
    const appointmentId = paymentSummary ? paymentSummary.appointment_id : 0;
    const data =
      selectedCard === 111
        ? { pay_later: true }
        : {
            pay_later: false,
            stripe_session_id: sessionId,
          };
    try {
      await confirmAppointment({
        appointmentId,
        data,
      }).unwrap();
      setIsDialogOpen(true);
    } catch (error) {
      logger(error);
    } finally {
      setIsStripeLoading(false); // Reset loading state
    }
  };

  // Update options to use the clientSecret from state
  const options = {
    clientSecret,
    onComplete: handlePaymentComplete,
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    dispatch(updateSpecialistState({ stage: 'receipt' }));
  };

  return (
    <>
      <div className='flex gap-10 mt-10 items-start'>
        <div className='bg-light-green p-4 rounded-[11px] w-full basis-1/2'>
          <table className='w-full border-separate border-spacing-y-3 text-[#052536]'>
            <tbody>
              {serviceType?.name === 'Consultation' ? (
                <tr>
                  <td className='text-left'>Consultation Charge</td>
                  <td className='text-right font-bold '>
                    {paymentSummary &&
                      formatToCurrency(paymentSummary?.consultation_charge)}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className='text-left'>Service Charge</td>
                  <td className='text-right font-bold '>
                    {paymentSummary &&
                      formatToCurrency(paymentSummary?.service_charge)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <hr className='w-full mt-3 border-primary-black/20' />
          <table className='w-full mt-3'>
            <tbody>
              <tr className='font-bold text-primary-green'>
                <td className='text-left'>Total Amount</td>
                <td className='text-right'>
                  {paymentSummary &&
                    formatToCurrency(paymentSummary?.total_charge)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='basis-1/2'>
          <p className='font-bold text-[#111] mb-3'>Payment Method</p>

          <div className='space-y-3'>
            {serviceType?.name !== 'Consultation' && (
              <div
                onClick={() => setSelectedCard(111)}
                className={cn(
                  'cursor-pointer hover:border-primary-green transition-all relative bg-[#F6F8FB] text-[#111] font-medium border border-[#F6F8FB] px-4 py-3 rounded-[10px] flex gap-3 items-center'
                )}
              >
                <div className='min-w-[70px] min-h-10 border border-[#E1E1E1] rounded-[10px] grid place-items-center'>
                  <PayLaterIcon />
                </div>
                Pay Later
                <div
                  className={cn(
                    'absolute right-4 top-5 min-h-6 min-w-6 rounded-full border border-[#111] grid place-items-center',
                    selectedCard === 111 && 'border-primary-green'
                  )}
                >
                  {selectedCard === 111 && (
                    <div className='h-4 w-4 rounded-full bg-primary-green'></div>
                  )}
                </div>
              </div>
            )}
            {!isPaymentShown && (
              <div
                onClick={() => setSelectedCard(222)}
                className={cn(
                  'cursor-pointer hover:border-primary-green transition-all relative bg-[#F6F8FB] text-[#111] font-medium border border-[#F6F8FB] px-4 py-3 rounded-[10px] flex gap-3 items-center'
                )}
              >
                <div className='min-w-[70px] min-h-10 border border-[#E1E1E1] rounded-[10px] grid place-items-center'>
                  <PayLaterIcon />
                </div>
                Pay Now with Stripe
                <div
                  className={cn(
                    'absolute right-4 top-5 min-h-6 min-w-6 rounded-full border border-[#111] grid place-items-center',
                    selectedCard === 222 && 'border-primary-green'
                  )}
                >
                  {selectedCard === 222 && (
                    <div className='h-4 w-4 rounded-full bg-primary-green'></div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className='flex flex-col mt-3'>
            {isPaymentShown && stripePromise && clientSecret && (
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            )}
          </div>
        </div>
      </div>
      <div className='w-max ml-auto mt-20'>
        <Button
          onClick={handlePaymentClicked}
          isLoading={
            isConfirmAppointmentLoading ||
            (selectedCard === 222 &&
              (isStripeLoading || isCreateCheckoutSessionLoading))
          }
          disabled={!selectedCard}
          className='px-[86px]'
        >
          {serviceType?.name === 'Consultation' ? 'Pay Now' : 'Pay'}
        </Button>
      </div>

      <PaymentConfirmed open={isDialogOpen} onOpenChange={closeDialog} />
    </>
  );
};

export default PaymentSummary;

// service_carge(pin):0
// consultation_carge(pin):0
// total_carge(pin):0
