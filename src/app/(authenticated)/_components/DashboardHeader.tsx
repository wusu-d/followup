'use client';

import { useSession } from 'next-auth/react';

import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';

const DashboardHeader = () => {
  const { data: session } = useSession();
  return (
    <div>
      <h1 className='h2'>
        Hey,{' '}
        <span className='text-primary-green'>
          {session?.profile_data?.personal.first_name}
        </span>
      </h1>
      <p className='font-medium text-[#111111]'>
        {session?.user_groups.includes(RolesEnum.SERVICE_PROVIDER)
          ? 'Share your expertise and guide clients on their journey!'
          : 'Unleash Your Potential, Achieve Your Goals!'}
      </p>
    </div>
  );
};

export default DashboardHeader;
