'use client';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';

import CompleteProfileFlow from '@/app/(onboarding)/complete-profile/_components/complete-profile-flow';
import ProfessionalProfileFlow from '@/app/(onboarding)/professional-profile/_components/ProfessionalProfileFlow';
import SubscriptionFlow from '@/app/(onboarding)/subscription/_components/subscription-flow';
import { resetCompleteProfile } from '@/slices/complete-profile.slice';
import {
  ONBOARDING_SLICE_REDUCER_NAME,
  OnboardingStageType,
} from '@/slices/onboarding.slice';

const stagesComponents: Record<OnboardingStageType, JSX.Element> = {
  'complete-profile': <CompleteProfileFlow />,
  subscription: <SubscriptionFlow />,
  'professional-profile': <ProfessionalProfileFlow />,
};
const CompleteProfile = () => {
  const { stage } = useAppSelector(
    (state) => state[ONBOARDING_SLICE_REDUCER_NAME]
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetCompleteProfile());
    };
  }, [dispatch]);

  return <>{stagesComponents[stage]}</>;
};

export default CompleteProfile;
