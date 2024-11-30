'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import TextButton from '@/components/buttons/TextButton';

import { useResendVerificationMutation } from '@/rtk-query/auth';

import EmailSuccess from '~/images/email.png';

const VerifyMailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');

  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(90); //
  const [resendVerifcation, { isLoading }] = useResendVerificationMutation();

  useEffect(() => {
    if (!email) {
      router.replace('/login');
    }
  }, [email, router]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      setTimeLeft(120); // Reset timer to 2 minutes
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const onBackClick = () => {
    router.push('/login');
  };

  const onResendClick = async () => {
    const formData = new FormData();
    formData.append('email', email || '');
    try {
      await resendVerifcation(formData).unwrap();
      setIsTimerActive(true);
    } catch (error) {
      logger(error);
    }
  };

  if (!email) {
    return null;
  }
  return (
    <main className='w-full h-auto min-h-screen p-8 xl:p-12 grid place-items-center'>
      <div className='border w-full p-8 min-h-[calc(100dvh-6rem)] flex flex-col items-center justify-center text-center gap-6 rounded-[20px]'>
        <div className='w-full '>
          <div className='flex flex-col items-center gap-4'>
            <Image
              src={EmailSuccess}
              className='object-contain'
              width={120}
              height={120}
              alt='icon'
            />
            <h4 className='max-w-2xl mx-auto'>Email has been sent</h4>
            <p>
              An email has been sent to your given email address. <br />
              If you don't see the email, be sure to check your spam or junk
              folder.
            </p>
            <Button onClick={onBackClick}>Back to Sign-in</Button>
            <p className='flex gap-1'>
              Didn't Receive Email?{' '}
              <TextButton
                disabled={isTimerActive}
                onClick={onResendClick}
                className='text-[#16C098]'
              >
                Resend
              </TextButton>
              {isTimerActive && (
                <span className='font-semibold text-[#111]'>
                  {formatTime(timeLeft)}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyMailPage;
