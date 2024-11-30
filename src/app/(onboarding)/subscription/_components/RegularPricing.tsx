import { usePathname } from 'next/navigation';

import logger from '@/lib/logger';

import { useAppDispatch } from '@/store';

import PricingCard from '@/app/(onboarding)/subscription/_components/PricingCard';
import { useInitializeSubscriptionMutation } from '@/rtk-query/subscription';
import { updateEditProfileState } from '@/slices/editProfile.slice';
import {
  SUBSCRIPTION_PLAN,
  SUBSCRIPTION_PLAN_FREE_TRIAL,
  SubscriptionType,
  updateSubscriptionState,
} from '@/slices/service-provider-subscription.slice';

const RegularPricing = ({
  activePlan,
  subscriptionPlans,
}: {
  activePlan?: number;
  subscriptionPlans?: SubscriptionType[];
}) => {
  const [initializeSubscription, { isLoading }] =
    useInitializeSubscriptionMutation();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const handleOnSelectPlan = async (plan: SubscriptionType, free?: boolean) => {
    if (pathname === '/profile') {
      dispatch(updateEditProfileState({ stage: 'confirmation' }));
      dispatch(
        updateSubscriptionState({
          [SUBSCRIPTION_PLAN]: plan,
          [SUBSCRIPTION_PLAN_FREE_TRIAL]: !!free,
          stage: 'confirmation',
        })
      );
    } else {
      try {
        await initializeSubscription({ plan_id: plan.id }).unwrap();
        dispatch(
          updateSubscriptionState({
            [SUBSCRIPTION_PLAN]: plan,
            [SUBSCRIPTION_PLAN_FREE_TRIAL]: !!free,
            stage: 'confirmation',
          })
        );
      } catch (error) {
        logger(error);
      }
    }
  };

  return (
    <div className='flex justify-center flex-wrap gap-6 mt-12'>
      {subscriptionPlans?.map((pricing, index) => {
        return (
          <PricingCard
            activePlan={activePlan}
            onSelectPlan={handleOnSelectPlan}
            {...pricing}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default RegularPricing;
