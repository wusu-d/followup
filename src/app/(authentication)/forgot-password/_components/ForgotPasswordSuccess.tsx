import Image from 'next/image';

import ButtonLink from '@/components/links/ButtonLink';

import EmailIcon from '~/images/email.png';

const ForgotPasswordSuccess = () => {
  return (
    <div className='flex mx-auto flex-col gap-6 w-full items-center max-w-2xl'>
      <div className='grid place-items-center overflow-hidden aspect-square w-4/12'>
        <Image
          src={EmailIcon}
          width={110}
          height={110}
          alt='Email success icon'
          className='w-3/5 aspect-square'
        />
      </div>

      <h2>Email has been Sent</h2>

      <p>An email has been sent to your given email address.</p>

      <ButtonLink className='py-3.5 font-bold px-6' href='/login'>
        Back to Sign In
      </ButtonLink>

      <p className='text-center'>
        Didn't recieve email?{' '}
        <span className='font-bold text-primary-green'>Resend</span>
      </p>
    </div>
  );
};

export default ForgotPasswordSuccess;
