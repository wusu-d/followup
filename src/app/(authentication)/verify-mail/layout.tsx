import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { PropsWithChildren } from 'react';

import { authOptions } from '@/app/_lib/auth';

const VerifyMailLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);

  if (session?.access_token) redirect('/');

  return <>{children}</>;
};

export default VerifyMailLayout;
