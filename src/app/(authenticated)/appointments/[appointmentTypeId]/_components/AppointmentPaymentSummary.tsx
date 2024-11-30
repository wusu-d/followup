'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSquarePlus } from 'react-icons/fa6';

import logger from '@/lib/logger';
import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import TextButton from '@/components/buttons/TextButton';

import { useAppDispatch, useAppSelector } from '@/store';

import AddPaymentMethod from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/pay/_components/AddPaymentMethod';
import MastercardIcon from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/pay/_components/MastercardIcon';
import PaymentConfirmed from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/pay/_components/PaymentConfirmed';
import { useMakePaymentAppointmentMutation } from '@/rtk-query/appointments';
import {
  useInitializePaymentQuery,
  useListPaymentMethodsQuery,
} from '@/rtk-query/subscription';
import {
  APPOINTMENTS_SLICE_REDUCER_NAME,
  updateAppointmentState,
} from '@/slices/appointments.slice';
import { PAYMENT_METHODS_SLICE_REDUCER_NAME } from '@/slices/paymentMethods.slice';
import { formatToCurrency } from '@/utils/forrmatCurrency';

const AppointmentPaymentSummary = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedCard, setSelectedCard] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isPaymentShown, setIsPaymentShown] = useState<boolean>(false);
  const { total_charge, service_charge } = useAppSelector(
    (state) => state[APPOINTMENTS_SLICE_REDUCER_NAME]
  );

  const { isSuccess } = useInitializePaymentQuery();
  const [makePayment, { isLoading: isMakePaymentLoading }] =
    useMakePaymentAppointmentMutation();
  const { isLoading: paymentMethodsLoading } = useListPaymentMethodsQuery();
  const {
    paymentMethods,
    publicKey,
    clientKey: clientSecret,
  } = useAppSelector((state) => state[PAYMENT_METHODS_SLICE_REDUCER_NAME]);

  const options = {
    // passing the SetupIntent's client secret
    clientSecret: clientSecret,
    // Fully customizable with appearance API.
    // appearance: {
    //   /*...*/
    // },
  };

  const stripePromise = loadStripe(publicKey);

  const closeDialog = () => {
    setIsDialogOpen(false);
    dispatch(updateAppointmentState({ stage: 'receipt' }));
  };

  const handlePaymentClicked = async () => {
    const appointmentId = pathname.split('/')[2];

    const data = { payment_method_id: selectedCard };
    try {
      // await makePayment({
      //   appointmentId,
      //   data,
      // }).unwrap();

      setIsDialogOpen(true);
    } catch (error) {
      logger(error);
    }
  };

  const toggleShowPaymentMethod = () => {
    setIsPaymentShown((prev) => !prev);
  };
  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <div className='flex gap-10 mt-10 items-start'>
          <div className='bg-light-green p-4 rounded-[11px] w-full basis-1/2'>
            <table className='w-full border-separate border-spacing-y-3 text-[#052536]'>
              <tbody>
                <tr>
                  <td className='text-left'>Service Charge</td>
                  <td className='text-right font-bold '>
                    {service_charge && formatToCurrency(service_charge)}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr className='w-full mt-3 border-primary-black/20' />
            <table className='w-full mt-3'>
              <tbody>
                <tr className='font-bold text-primary-green'>
                  <td className='text-left'>Total Amount</td>
                  <td className='text-right'>
                    {total_charge && formatToCurrency(total_charge)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='basis-1/2'>
            <p className='font-bold text-[#111] mb-3'>Payment Method</p>

            <div className='space-y-3'>
              {paymentMethods?.map((method) => {
                return (
                  <div
                    onClick={() => setSelectedCard(method.id)}
                    className={cn(
                      'cursor-pointer hover:border-primary-green transition-all relative bg-[#F6F8FB] text-[#111] font-medium border border-[#F6F8FB] px-4 py-3 rounded-[10px] flex gap-3 items-center'
                    )}
                    key={method?.created_at}
                  >
                    <div className='min-w-[70px] min-h-10 border border-[#E1E1E1] rounded-[10px] grid place-items-center'>
                      <MastercardIcon />
                    </div>
                    • • • • • • • • • • • • {method?.last4}
                    <div className='w-[70px] ml-3 rounded-[10px] border h-10 border-[#E1E1E1] grid place-items-center text-sm text-[#e1e1e1]'>
                      CVV
                    </div>
                    <div
                      className={cn(
                        'absolute right-4 top-5 min-h-6 min-w-6 rounded-full border border-[#111] grid place-items-center',
                        selectedCard === method.id && 'border-primary-green'
                      )}
                    >
                      {selectedCard === method.id && (
                        <div className='h-4 w-4 rounded-full bg-primary-green'></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className='flex flex-col items-center justify-center mt-3'>
              <TextButton
                onClick={toggleShowPaymentMethod}
                className='mt-auto flex gap-2 text-xs lg:text-base items-center font-bold text-primary-green'
              >
                <FaSquarePlus color='#16C098' />
                <p>{isPaymentShown ? 'Hide' : 'Add New Card'} </p>
              </TextButton>
              {isPaymentShown && (
                <AddPaymentMethod closePaymentMethod={setIsPaymentShown} />
              )}
            </div>
          </div>
        </div>
        <div className='w-max ml-auto mt-20'>
          <Button
            onClick={handlePaymentClicked}
            disabled={!selectedCard}
            isLoading={isMakePaymentLoading}
            className='px-[86px]'
          >
            Pay
          </Button>
        </div>
      </Elements>
      <PaymentConfirmed open={isDialogOpen} onOpenChange={closeDialog} />
    </>
  );
};

export default AppointmentPaymentSummary;

// service_carge(pin):0
// consultation_carge(pin):0
// total_carge(pin):0
