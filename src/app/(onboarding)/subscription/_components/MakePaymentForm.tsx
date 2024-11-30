import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';

import { useAppDispatch, useAppSelector } from '@/store';

import PaymentConfirmedDialog from '@/app/(onboarding)/subscription/_components/PaymentConfirmedDialog';
import { MakePaymentFormType } from '@/app/(onboarding)/subscription/_utils/make-payment-form.constants';
import { useLazyCompletePaymentQuery } from '@/rtk-query/subscription';
import { setOnboardingStage } from '@/slices/onboarding.slice';
import { SUBSCRIPTION_SLICE_REDUCER_NAME } from '@/slices/service-provider-subscription.slice';
import {
  SUBSCRIPTION_CARD_HOLDER_NAME,
  SUBSCRIPTION_CARD_NUMBER,
  SUBSCRIPTION_CVV,
  SUBSCRIPTION_EXPIRY_DATE,
} from '@/slices/service-provider-subscription.slice';
const MakePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [trigger, { data, isFetching, error }] = useLazyCompletePaymentQuery();
  const {
    [SUBSCRIPTION_CARD_HOLDER_NAME]: cardHolderName,
    [SUBSCRIPTION_CARD_NUMBER]: cardNumber,
    [SUBSCRIPTION_EXPIRY_DATE]: expiryDate,
    [SUBSCRIPTION_CVV]: cvv,
  } = useAppSelector((state) => state[SUBSCRIPTION_SLICE_REDUCER_NAME]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const dispatch = useAppDispatch();

  const memoizedInitialValues: MakePaymentFormType = useMemo(() => {
    return {
      [SUBSCRIPTION_CARD_HOLDER_NAME]: cardHolderName,
      [SUBSCRIPTION_CARD_NUMBER]: cardNumber,
      [SUBSCRIPTION_EXPIRY_DATE]: expiryDate,
      [SUBSCRIPTION_CVV]: cvv,
    };
  }, [cardHolderName, cardNumber, cvv, expiryDate]);

  // const formik = useFormik({
  //   initialValues: memoizedInitialValues,
  //   // validationSchema: makePaymentFormValidationSchema,
  //   enableReinitialize: true,
  //   validateOnMount: true,
  //   onSubmit: async (values) => {
  //     // logic here
  //     if (!stripe || !elements) {
  //       return; // Stripe.js hasn't loaded yet or clientSecret isn't ready
  //     }

  //     // Get individual elements
  //     const cardNumberElement = elements.getElement(CardNumberElement);
  //     const cardExpiryElement = elements.getElement(CardExpiryElement);
  //     const cardCvcElement = elements.getElement(CardCvcElement);

  //     console.log(true);

  //     if (cardNumberElement && cardExpiryElement && cardCvcElement) {
  //       try {
  //         // Confirm the setup intent using the individual card elements
  //         const { setupIntent, error } = await stripe.confirmSetup({
  //           elements,
  //         });

  //         if (error) {
  //           logger(error.message || 'An unexpected error occurred.');
  //         } else if (setupIntent && setupIntent.status === 'succeeded') {
  //           console.log('Setup intent succeeded:', setupIntent);
  //           // Handle successful setup, e.g., save setupIntent.payment_method in your DB
  //         }
  //       } catch (err) {
  //         console.error('Error during setup:', err);
  //       }
  //     }

  //     dispatch(
  //       updateSubscriptionState({
  //         ...values,
  //         stage: 'confirmation',
  //       })
  //     );
  //   },
  // });

  // const getInputProps = (id: keyof typeof formik.values) => {
  //   return {
  //     ...formik.getFieldProps(id),
  //     ...formik.getFieldMeta(id),
  //   };
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return null;
    }

    const { error, setupIntent } = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: '',
      },
      redirect: 'if_required',
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      logger(error);
      toast.error(error.message);
    } else {
      console.log('Setup Intent', setupIntent);
      try {
        trigger();
        dispatch(setOnboardingStage('professional-profile'));
      } catch (err) {
        if (err && typeof err === 'object') {
          if ('data' in err && typeof err.data === 'object' && err.data) {
            if ('messages' in err.data && err.data.messages) {
              const data = err.data.messages as Record<string, string>;
              toast(data.error);
            }
          }
        }
        logger(err);
      }
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '18px',
        color: '#424770',
        backgroundColor: '#F2F5F8',
        '::placeholder': {
          color: '#1111117A',
        },
        height: '100%',
      },
      invalid: {
        color: '#dc2626',
      },
    },
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='mt-6 mx-auto max-w-screen-md w-full'
      >
        <div className='w-full'>
          {/* <Input
          id={SUBSCRIPTION_CARD_NUMBER}
          required
          label='Card Number'
          type='tel'
          inputMode='numeric'
          pattern='[0-9\s]{13,19}'
          placeholder='Enter Card Number'
          {...getInputProps(SUBSCRIPTION_CARD_NUMBER)}
        /> */}
          {/* here */}
          {/* <Input
          id={SUBSCRIPTION_CARD_HOLDER_NAME}
          type='text'
          required
          label="Cardholder's Name"
          placeholder="Enter Cardholder's Name"
          autoFocus
          {...getInputProps(SUBSCRIPTION_CARD_HOLDER_NAME)}
        /> */}
          {/* <div className=' flex flex-col gap-2 items-start w-full'>
          <span className='font-bold text-base'>Card Number</span>
          <div className='cardElement-container h-[60px] w-full border rounded-[10px] bg-[#F2F5F8] flex items-center'>
            <CardNumberElement options={cardElementOptions} />
          </div>
        </div>
        <div className=' flex flex-col gap-2 items-start w-full'>
          <span className='font-bold text-base'>Enter Expiry Date</span>
          <div className='cardElement-container h-[60px] w-full border rounded-[10px] bg-[#F2F5F8] flex items-center'>
            <CardExpiryElement options={cardElementOptions} />
          </div>
        </div>
        <div className=' flex flex-col gap-2 items-start w-full'>
          <span className='font-bold text-base'>Enter CVV</span>
          <div className='cardElement-container h-[60px] w-full border rounded-[10px] bg-[#F2F5F8] flex items-center'>
            <CardCvcElement options={cardElementOptions} />
          </div>
        </div> */}
          <div className='w-3/5 mx-auto'>
            <h4 className='text-left mb-4'>Enter your card details</h4>
            <PaymentElement />
          </div>

          {/* <Input
          id={SUBSCRIPTION_EXPIRY_DATE}
          type='tel'
          required
          label='Expiry Date'
          placeholder='Enter Expiry Date'
          inputMode='numeric'
          maxLength={7}
          {...getInputProps(SUBSCRIPTION_EXPIRY_DATE)}
        /> */}

          {/* <Input
          id={SUBSCRIPTION_CVV}
          type='tel'
          required
          label='CVV'
          placeholder='Enter CVV'
          inputMode='numeric'
          minLength={3}
          maxLength={3}
          {...getInputProps(SUBSCRIPTION_CVV)}
        /> */}
        </div>

        <Button className='mt-6 px-8' type='submit' disabled={!stripe}>
          Save Details
        </Button>
      </form>
      <PaymentConfirmedDialog open={isDialogOpen} onOpenChange={closeDialog} />
    </>
  );
};

export default MakePaymentForm;
