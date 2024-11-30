'use client';
import { useEffect } from 'react';

import { useAppDispatch } from '@/store';

import SubscriptionFlow from '@/app/(onboarding)/subscription/_components/subscription-flow';
import { resetSubscriptionState } from '@/slices/service-provider-subscription.slice';

const ServiceProviderSubscription = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetSubscriptionState());
    };
  }, [dispatch]);
  return <SubscriptionFlow />;
};

export default ServiceProviderSubscription;
