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

const ChangeCardHeader = () => {
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
        <BreadcrumbItem>
          <BreadcrumbPage>Change Card</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ChangeCardHeader;
