'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { useAppDispatch } from '@/store';

import { updateEditProfileState } from '@/slices/editProfile.slice';

const ConfirmPaymentProfileHeader = () => {
  const dispatch = useAppDispatch();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem
          onClick={() => dispatch(updateEditProfileState({ stage: 'home' }))}
          className='cursor-pointer'
        >
          Upgrade Subscription
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        <BreadcrumbItem
          onClick={() =>
            dispatch(updateEditProfileState({ stage: 'addSubscription' }))
          }
          className='cursor-pointer'
        >
          Subscription List
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Payment</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ConfirmPaymentProfileHeader;
