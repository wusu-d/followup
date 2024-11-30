'use client';

import PageComponentWrapper from '@/components/PageComponentWrapper';

import { useAppSelector } from '@/store';

import AddSubscription from '@/app/(authenticated)/profile/_components/AddSubscription';
import AddSubscriptionHeader from '@/app/(authenticated)/profile/_components/AddSubscriptionHeader';
import ChangeCard from '@/app/(authenticated)/profile/_components/ChangeCard';
import ChangeCardHeader from '@/app/(authenticated)/profile/_components/ChangeCardHeader';
import ConfirmPaymentProfile from '@/app/(authenticated)/profile/_components/ConfirmPaymentProfile';
import ConfirmPaymentProfileHeader from '@/app/(authenticated)/profile/_components/ConfirmPaymentProfileHeader';
import ProfileTabs from '@/app/(authenticated)/profile/_components/ProfileTabs';
import {
  EDIT_PROFILE_SLICE_REDUCER_NAME,
  EditProfileStageType,
} from '@/slices/editProfile.slice';

const stagesComponent: Record<EditProfileStageType, JSX.Element> = {
  home: <ProfileTabs />,
  changeCard: <ChangeCard />,
  addSubscription: <AddSubscription />,
  confirmation: <ConfirmPaymentProfile />,
};

const stagesHeader: Record<EditProfileStageType, JSX.Element> = {
  home: <h1 className='h3'>Profile</h1>,
  changeCard: <ChangeCardHeader />,
  addSubscription: <AddSubscriptionHeader />,
  confirmation: <ConfirmPaymentProfileHeader />,
};

const ProfilePage = () => {
  const { stage } = useAppSelector(
    (state) => state[EDIT_PROFILE_SLICE_REDUCER_NAME]
  );
  return (
    <PageComponentWrapper headerComponent={stagesHeader[stage]}>
      <div className='p-4'>{stagesComponent[stage]}</div>
    </PageComponentWrapper>
  );
};

export default ProfilePage;
