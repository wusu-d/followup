'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
type Props = {
  children?: React.ReactNode;
  session: Session | null;
  sessionKey?: number;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  // const memoizedSessionKey = useMemo(() => {
  //   console.log(session, 'session has changed');
  //   return sessionKey;
  // }, [sessionKey]);
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
