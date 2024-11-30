'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

import NotificationIcon from '@/components/icons/NotificationIcon';
import ButtonLink from '@/components/links/ButtonLink';
import PrimaryLink from '@/components/links/PrimaryLink';

import { useAppSelector } from '@/store';

import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';
import { useGetUserProfileQuery } from '@/rtk-query/profile';
import { ONBOARDING_SLICE_REDUCER_NAME } from '@/slices/onboarding.slice';

const PageComponentWrapper = ({
  headerComponent,
  children,
}: {
  headerComponent: ReactNode;
  children: ReactNode;
}) => {
  const { data: profileData, isLoading: isUserProfileLoading } =
    useGetUserProfileQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const { profilePic } = useAppSelector(
    (state) => state[ONBOARDING_SLICE_REDUCER_NAME]
  );
  const { data: session } = useSession();

  return (
    <>
      <header className='flex bg-white justify-between items-center gap-5 main-padding'>
        {headerComponent}
        <nav className='flex items-center gap-3'>
          {session?.user_groups.includes(RolesEnum.MEMBER) && (
            <ButtonLink href='/specialists' variant='dark'>
              + Book Appointment
            </ButtonLink>
          )}

          <PrimaryLink
            href='/notification'
            className='h-12 w-12 grid place-content-center rounded-xl border border-primary-green'
          >
            <NotificationIcon className='h-full' />
          </PrimaryLink>

          <PrimaryLink
            href='/profile'
            className='rounded-xl overflow-hidden relative w-[48px] h-[48px] border border-primary-green'
          >
            <Image
              src={profilePic}
              alt='Profile Icon'
              fill
              className=''
              objectFit='cover'
            />
          </PrimaryLink>
        </nav>
      </header>
      <div className='w-full h-full overflow-y-auto main-padding'>
        <div className='container'>{children}</div>
      </div>
    </>
  );
};

export default PageComponentWrapper;
