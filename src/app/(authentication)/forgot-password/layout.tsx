import { PropsWithChildren } from 'react';

const ForgotPasswordLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className='w-full h-auto min-h-screen p-8 xl:p-12 grid place-items-center'>
      <div className='border w-full p-8 min-h-[calc(100dvh-6rem)] flex flex-col items-center justify-center text-center gap-6 rounded-[20px]'>
        {children}
      </div>
    </main>
  );
};

export default ForgotPasswordLayout;
