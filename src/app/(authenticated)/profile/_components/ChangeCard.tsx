import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import LoadingSpinner from '@/components/Spinner';

import { useAppSelector } from '@/store';

import AddCardProfile from '@/app/(authenticated)/profile/_components/AddCard';
import { useInitializePaymentQuery } from '@/rtk-query/subscription';
import { PAYMENT_METHODS_SLICE_REDUCER_NAME } from '@/slices/paymentMethods.slice';
const ChangeCard = () => {
  const { isLoading, isSuccess } = useInitializePaymentQuery();
  const { publicKey, clientKey: clientSecret } = useAppSelector(
    (state) => state[PAYMENT_METHODS_SLICE_REDUCER_NAME]
  );

  const options = {
    clientSecret: clientSecret,
  };

  const stripePromise = loadStripe(publicKey);

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <h1 className='text-bold text-[28px]'>Change Card</h1>
        <p className='text-[#6B6B6B] mt-2 invisible'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore.
        </p>
        {isLoading ? (
          <div className='grid place-items-center w-full min-h-72 '>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <AddCardProfile />
          </>
        )}
      </Elements>
    </div>
  );
};

export default ChangeCard;
