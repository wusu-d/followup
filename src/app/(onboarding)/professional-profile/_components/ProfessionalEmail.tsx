import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from '@stripe/react-connect-js';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'sonner';
import { object, string } from 'yup';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';

import { useAppDispatch, useAppSelector } from '@/store';

import OnboardingHeader from '@/app/(authentication)/_components/OnboardingHeader';
import Back from '@/app/(onboarding)/_components/Back';
import ProfessionalCompleteDialog from '@/app/(onboarding)/professional-profile/_components/ProfessionalCompleteDialog';
import useStripeConnect from '@/app/(onboarding)/professional-profile/hooks/useStripeConnect';
import {
  useCompleteOnboardingMutation,
  useUpdateBankEmailMutation,
} from '@/rtk-query/professional-profile';
import {
  useCreateConnectedAccountMutation,
  useLazyConfirmStripeOnboardingQuery,
} from '@/rtk-query/stripe-onboarding';
import {
  PRO_EMAIL,
  PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME,
  updateProfessionalProfileState,
} from '@/slices/professional-profile.slice';
const ProfessionalEmail = () => {
  const [onboardingExited, setOnboardingExited] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState<string>();
  const [publishableKey, setPublishableKey] = useState<string>();
  const stripeConnectInstance = useStripeConnect(
    connectedAccountId,
    publishableKey
  );
  const [createAccount, { isLoading: isCreateAccountLoading, isError }] =
    useCreateConnectedAccountMutation();
  const [
    confirmStripeOnboarding,
    {
      data: confirmStripeOnboardingData,
      isLoading: isConfirmStripeOnboardingLoading,
    },
  ] = useLazyConfirmStripeOnboardingQuery();

  const [updateBankEmail, { isLoading }] = useUpdateBankEmailMutation();
  const [completeOnboarding, { isLoading: isCompleteLoading }] =
    useCompleteOnboardingMutation();

  const { [PRO_EMAIL]: email } = useAppSelector(
    (state) => state[PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME]
  );
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      [PRO_EMAIL]: email,
    },
    validateOnMount: true,
    validationSchema: object().shape({
      [PRO_EMAIL]: string()
        .required('Email is required')
        .email('Please provide a valid email'),
    }),

    onSubmit: async (values) => {
      try {
        await updateBankEmail({ email: values.email }).unwrap();
        dispatch(
          updateProfessionalProfileState({ ...values, stage: 'availability' })
        );
      } catch (error) {
        logger(error);
      }
    },
  });

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleContinueClicked = async () => {
    try {
      await confirmStripeOnboarding();
      await completeOnboarding().unwrap();
      openDialog();
    } catch (error: any) {
      if (error?.message) {
        toast.error(error.message);
      } else if (error?.messages && typeof error.messages === 'object') {
        Object.values(error.messages).forEach((message) => {
          toast.error(message as string);
        });
      } else {
        toast.error('An error occurred while completing onboarding');
      }
      logger(error);
    }
  };

  const getInputProps = (id: keyof typeof formik.values) => {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  };

  return (
    <>
      <Back
        onClick={() =>
          dispatch(updateProfessionalProfileState({ stage: 'socials' }))
        }
      />
      <OnboardingHeader
        title='Create a Stripe Account'
        content="To receive payments, you'll need a Stripe account linked to your profile"
      />

      {!isCreateAccountLoading && !connectedAccountId && (
        <div className='mt-10'>
          <Button
            className='px-10'
            onClick={async () => {
              try {
                const response = await createAccount().unwrap();
                setConnectedAccountId(response.account);
                setPublishableKey(response.public_key);
              } catch (error) {
                logger(error);
              }
            }}
          >
            Create Account
          </Button>
        </div>
      )}

      {isCreateAccountLoading && (
        <p className='text-center italic text-sm font-medium text-[#111]/50 mt-10'>
          Creating a connected account...
        </p>
      )}

      {stripeConnectInstance && (
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <ConnectAccountOnboarding onExit={() => setOnboardingExited(true)} />
        </ConnectComponentsProvider>
      )}

      {onboardingExited && (
        <div className='mt-10'>
          <Button
            className='px-10'
            isLoading={isCompleteLoading || isConfirmStripeOnboardingLoading}
            onClick={handleContinueClicked}
          >
            Continue
          </Button>
        </div>
      )}
      {/* <form
        onSubmit={formik.handleSubmit}
        className='w-4/5 lg:w-3/5 xl:w-2/5 flex flex-col gap-5 mt-5 mx-auto'
      >
        <Input
          id={PRO_EMAIL}
          type='email'
          inputMode='email'
          required
          label='Email'
          placeholder='Enter Email Address'
          autoFocus
          {...getInputProps(PRO_EMAIL)}
        />

        <Button
          disabled={!formik.isValid}
          type='submit'
          className='w-2/5 mt-5 mx-auto block'
          isLoading={isLoading}
        >
          Next
        </Button>
      </form> */}
      <ProfessionalCompleteDialog
        onOpenChange={closeDialog}
        open={isDialogOpen}
      />
    </>
  );
};

export default ProfessionalEmail;
