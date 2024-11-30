import ConfirmPaymentDetailsForm from '@/app/(onboarding)/subscription/_components/ConfirmPaymentDetailsForm';

const ConfirmPaymentDetails = () => {
  return (
    <div className='max-w-2xl mx-auto'>
      <div className='mx-auto text-center mb-5'>
        <h2>Confirm Payment Details</h2>
        <p className='mt-3 w-4/5 mx-auto'>
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore. */}
        </p>
      </div>

      <ConfirmPaymentDetailsForm />
    </div>
  );
};

export default ConfirmPaymentDetails;
