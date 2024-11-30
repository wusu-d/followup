import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { PropsWithChildren } from 'react';

import { authOptions } from '@/app/_lib/auth';

const CompleteProfileLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);

  if (
    session?.profile_status === 'verified' ||
    session?.profile_status === 'pending'
  )
    redirect('/');

  return (
    <main className='w-full h-auto min-h-screen p-8 xl:p-12 grid place-items-center'>
      <div className='border w-full p-8 min-h-[calc(100dvh-6rem)] flex flex-col items-center justify-center text-center gap-6 rounded-[20px] relative'>
        {children}
      </div>
    </main>
  );
};

export default CompleteProfileLayout;
