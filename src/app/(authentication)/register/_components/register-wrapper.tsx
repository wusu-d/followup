'use client';

import { useSearchParams } from 'next/navigation';
import { PropsWithChildren, Suspense } from 'react';

import SelectUserRole from '@/app/(authentication)/register/_components/select-user-role';
import {
  ROLE_SEARCH_PARAM_KEY_CONSTANT,
  RolesEnum,
} from '@/app/(authentication)/register/_utils/register.constants';

const RegisterWrapperComponent = ({ children }: PropsWithChildren) => {
  const searchParams = useSearchParams();

  const role = searchParams.get(
    ROLE_SEARCH_PARAM_KEY_CONSTANT
  ) as RolesEnum | null;

  if (!role || !Object.values(RolesEnum).includes(role)) {
    return <SelectUserRole />;
  }

  return (
    <main className='w-full h-auto min-h-screen p-8 xl:p-12 grid place-items-center'>
      {children}
    </main>
  );
};

function RegisterWrapper({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <RegisterWrapperComponent>{children}</RegisterWrapperComponent>
    </Suspense>
  );
}

export default RegisterWrapper;
