import React from 'react';

import LoginRegisterWrapper from '@/app/(authentication)/_components/login-register.wrapper';
import LoginForm from '@/app/(authentication)/login/_components/LoginForm';

const LoginPage = async () => {
  return (
    <main className='w-full h-auto min-h-screen p-8 xl:p-12 grid place-items-center'>
      <LoginRegisterWrapper>
        <LoginForm />
      </LoginRegisterWrapper>
    </main>
  );
};

export default LoginPage;
