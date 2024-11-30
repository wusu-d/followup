import logger from '@/lib/logger';

import { useAppDispatch } from '@/store';

import PricingCard from '@/app/(onboarding)/subscription/_components/PricingCard';
import { useInitializeSubscriptionMutation } from '@/rtk-query/subscription';
import {
  SUBSCRIPTION_PLAN,
  SUBSCRIPTION_PLAN_FREE_TRIAL,
  SubscriptionType,
  updateSubscriptionState,
} from '@/slices/service-provider-subscription.slice';

const StudentPricing = ({
  subscriptionPlans,
}: {
  subscriptionPlans?: SubscriptionType[];
}) => {
  const dispatch = useAppDispatch();
  const [initializeSubscription, { isLoading }] =
    useInitializeSubscriptionMutation();

  const handleOnSelectPlan = async (plan: SubscriptionType, free?: boolean) => {
    try {
      // await initializeSubscription({ plan_id: plan.id }).unwrap();
      dispatch(
        updateSubscriptionState({
          [SUBSCRIPTION_PLAN]: plan,
          [SUBSCRIPTION_PLAN_FREE_TRIAL]: !!free,
          stage: 'upload-student-id',
        })
      );
    } catch (error) {
      logger(error);
    }
  };

  return (
    <div className='flex items-center justify-center mt-12 '>
      {subscriptionPlans?.map((pricing, index) => {
        return (
          <PricingCard
            onSelectPlan={handleOnSelectPlan}
            {...pricing}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default StudentPricing;
