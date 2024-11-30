'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { useAppSelector } from '@/store';

import ConfirmPaymentDetails from '@/app/(onboarding)/subscription/_components/ConfirmPaymentDetails';
import PricingSectionCards from '@/app/(onboarding)/subscription/_components/PricingSection';
import SubscriptionMakePayment from '@/app/(onboarding)/subscription/_components/SubscriptionMakePayment';
import UploadStudentId from '@/app/(onboarding)/subscription/_components/UploadStudentId';
import VerifyStudentEmail from '@/app/(onboarding)/subscription/_components/VerifyStudentEmail';
import {
  SUBSCRIPTION_SLICE_REDUCER_NAME,
  SubscriptionStagesType,
} from '@/slices/service-provider-subscription.slice';

const stagesComponents: Record<SubscriptionStagesType, JSX.Element> = {
  'select-plan': <PricingSectionCards />,
  'payment-details': <SubscriptionMakePayment />,
  confirmation: <ConfirmPaymentDetails />,
  'upload-student-id': <UploadStudentId />,
  'verify-student-mail': <VerifyStudentEmail />,
};

const SubscriptionFlow = () => {
  const { stage } = useAppSelector(
    (state) => state[SUBSCRIPTION_SLICE_REDUCER_NAME]
  );
  return (
    <div className='w-full max-w-screen-xl'>
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.div
          key={stage}
          className='w-full mt-10'
          {...{
            initial: { opacity: 0, x: 50 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 50 },
            transition: { duration: 0.25, ease: 'easeOut' },
          }}
        >
          {stagesComponents[stage]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SubscriptionFlow;
