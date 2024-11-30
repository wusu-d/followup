'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PiCheckCircleFill } from 'react-icons/pi';

import { useAppSelector } from '@/store';

import MakePaymentForm from '@/app/(onboarding)/subscription/_components/MakePaymentForm';
import { useInitializePaymentQuery } from '@/rtk-query/subscription';
import { PAYMENT_METHODS_SLICE_REDUCER_NAME } from '@/slices/paymentMethods.slice';
import {
  SUBSCRIPTION_NEW_PRICE,
  SUBSCRIPTION_PLAN,
  SUBSCRIPTION_PLAN_FREE_TRIAL,
  SUBSCRIPTION_PROMO_CODE,
  SUBSCRIPTION_SLICE_REDUCER_NAME,
} from '@/slices/service-provider-subscription.slice';
import { formatToCurrency } from '@/utils/forrmatCurrency';

// const stripePromise = loadStripe(`${process.env.STRIPE_PUB_KEY}`);
const SubscriptionMakePayment = () => {
  const {
    [SUBSCRIPTION_PLAN]: plan,
    [SUBSCRIPTION_PLAN_FREE_TRIAL]: freeTrial,
    [SUBSCRIPTION_NEW_PRICE]: newPrice,
    [SUBSCRIPTION_PROMO_CODE]: promoCode,
  } = useAppSelector((state) => state[SUBSCRIPTION_SLICE_REDUCER_NAME]);

  const { isSuccess } = useInitializePaymentQuery();
  const { publicKey, clientKey: clientSecret } = useAppSelector(
    (state) => state[PAYMENT_METHODS_SLICE_REDUCER_NAME]
  );

  const options = {
    // passing the SetupIntent's client secret
    clientSecret: clientSecret,
    // Fully customizable with appearance API.
    // appearance: {
    //   /*...*/
    // },
  };

  // useEffect(() => {
  //   if (isSuccess && data) {
  //     setClientSecret(data.client_secret);
  //     setPublicKey(data.stripe_public_key);
  //   }
  // }, [isSuccess, data]);

  const stripePromise = loadStripe(publicKey);

  const price = promoCode ? newPrice : plan?.price || 0;
  return (
    <>
      {/* Title */}
      <div className='max-w-2xl mx-auto text-center mb-5'>
        <h2>Enter Payment Details</h2>
        <p className='mt-3 w-4/5 mx-auto'>
          Provide your payment details to complete your subscription. You won’t
          be charged immediately — payment will only be processed after your
          free trial ends.
        </p>
      </div>

      {/* End Title */}

      <div className='w-full p-6 rounded-2xl max-w-3xl mx-auto primary-gradient text-white flex justify-between'>
        <div>
          <h2 className='flex items-center gap-2'>
            {plan?.name} <PiCheckCircleFill />
          </h2>

          <p>{plan?.description || ''}</p>
        </div>

        <p className='flex items-center gap-2'>
          <span className='h1'>
            {plan?.billing_cycle === 'yearly'
              ? formatToCurrency(price * 12)
              : formatToCurrency(price)}
          </span>
          <span>{plan?.billing_cycle === 'yearly' ? '/ Year' : '/ Month'}</span>
        </p>
      </div>
      <Elements stripe={stripePromise} options={options}>
        <MakePaymentForm />
      </Elements>
    </>
  );
};

export default SubscriptionMakePayment;
