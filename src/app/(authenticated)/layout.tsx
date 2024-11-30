'use client';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import LoadingSpinner from '@/components/Spinner';

import Sidebar from '@/app/(authenticated)/_components/sidebar';
import { useGetUserProfileQuery } from '@/rtk-query/profile';

const AuthenticatedLayout = ({ children }: PropsWithChildren) => {
  const { data: profileData, isLoading: isUserProfileLoading } =
    useGetUserProfileQuery();

  if (isUserProfileLoading)
    return (
      <div className='grid place-items-center w-full min-h-72 '>
        <LoadingSpinner />
      </div>
    );

  if (profileData?.status === 'pending') {
    return (
      <main className='w-full h-auto min-h-screen p-8 outline'>
        <div className='border rounded-[20px] min-h-[calc(100dvh-6rem)] flex flex-col justify-center items-center text-[#111]'>
          <div className='relative h-[196px] w-[315px]'>
            <Image
              src='/images/verification-progress.png'
              alt='image'
              fill
              objectFit='contain'
            />
          </div>
          <h1 className='text-[24px] font-bold mt-10'>
            Your Profile Verification is in Progress
          </h1>
          <p className='text-[#6B6B6B] mt-2 w-3/4 text-center'>
            Your registration has been received and is currently under review.
            Please allow up to <span className='font-bold'>24 hours</span> for
            verification. You may check back periodically for updates.
          </p>
        </div>
      </main>
    );
  }
  return (
    <div className='w-full h-screen overflow-hidden'>
      <div className='w-full h-full grid grid-cols-[max-content_1fr] '>
        <Sidebar />
        <main className='w-full h-screen grid-cols-1 grid grid-rows-[auto_1fr_auto] overflow-hidden'>
          {children}
          <footer>
            <nav className='flex items-center justify-center gap-6 text-[#111111]/50'>
              <Link href='terms'>Terms and Conditions</Link>|
              <Link href='privacy'>Privacy Policy</Link>|
              <Link href='contact'>Contact Us</Link>
            </nav>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
