import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { PropsWithChildren } from 'react';

import { authOptions } from '@/app/_lib/auth';

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);
  if (session) return redirect('/');
  return <>{children}</>;
};

export default Layout;
