'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

import ActiveLink from '@/components/links/ActiveLink';
import FollowUpLogo from '@/components/ui/followup-logo';

import LogoutButton from '@/app/(authenticated)/_components/LogoutButton';
import { SIDEBAR_LINKS } from '@/utils/rbac';

const Sidebar = () => {
  const session = useSession();

  const role = session?.data?.user_groups;

  return (
    <aside className='w-full h-full grid-cols-1 grid grid-rows-[auto_1fr_auto] bg-[#052536]'>
      <div className='md:w-52 ml-auto flex flex-col py-12 px-2 md:px-6 items-start lg:w-52 xl:w-64 2xl:w-64 max-w-full'>
        <FollowUpLogo className='text-white max-w-full' />
      </div>
      <nav className='mt-6 flex flex-col text-white ml-auto w-max max-w-full'>
        {SIDEBAR_LINKS.map(({ href, id, title, index, icon: Icon, access }) => {
          const hasAccess = role?.some((r) => access.includes(r));
          if (hasAccess) {
            return (
              <ActiveLink
                className='flex text-xs lg:text-base items-center md:w-52 lg:w-52 font-bold xl:w-64 2xl:w-64 max-w-full py-4 after'
                activeClassName='bg-primary-green text-white'
                href={href}
                index={!!index}
                key={id}
              >
                <span className='px-2 lg:px-6 flex items-center justify-start gap-1 lg:gap-3 w-full'>
                  <Icon className='w-3 md:w-5 block' />
                  <span>{title}</span>
                </span>
              </ActiveLink>
            );
          }
          return <React.Fragment key={id}></React.Fragment>;
        })}
      </nav>

      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
