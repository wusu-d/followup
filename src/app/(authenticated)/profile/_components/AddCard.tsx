import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { toast } from 'sonner';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';

import { useLazyCompletePaymentQuery } from '@/rtk-query/subscription';

const AddCardProfile = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [completePayment, { data, isLoading, error }] =
    useLazyCompletePaymentQuery();

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
      toast.error('Something went wrong');

      logger(error);
    } else {
      console.log('Setup Intent', setupIntent);
      try {
        await completePayment();

        toast.success('Card Added Successfully');
      } catch (error) {
        logger(error);
      }
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-6 w-1/2 self-stretch'>
      <h4 className='text-left text-lg font-semibold mb-4'>
        Enter your card details
      </h4>
      <div className='w-full'>
        <PaymentElement />
      </div>

      <div className='flex items-center justify-center'>
        <Button
          className='mt-6 px-8'
          isLoading={isLoading}
          type='submit'
          disabled={!stripe}
        >
          Save Details
        </Button>
      </div>
    </form>
  );
};

export default AddCardProfile;
