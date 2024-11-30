'use client';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import ContactCallIcon from '@/app/(general)/contact/_components/ContactCallIcon';
import ContactMailIcon from '@/app/(general)/contact/_components/ContactMailIcon';
import ContactUsForm from '@/app/(general)/contact/_components/ContactUsForm';
const ContactUsPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className='border border-[#E9E9E9] rounded-[20px] w-[90%] mx-auto mt-5 py-5 relative'>
        <span
          onClick={() => router.back()}
          className='cursor-pointer absolute top-5 right-5 h-10 w-10 border[#05253666] border rounded-full flex items-center justify-center'
        >
          <X color='#052536' strokeWidth={1.5} />
        </span>
        <h1 className='text-center font-bold text-[28px]'>Contact Us</h1>
        <p className='text-center text-[#11111180] w-4/5 mx-auto mt-3 mb-5'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley.
        </p>
        <div className='mb-6 divide-x divide-[#052536] flex items-center gap-4 px-[30px] py-6 w-max mx-auto bg-[#F4F4F4] rounded-xl text-lg text-[#16C098] font-bold'>
          <Link href='#' className='flex items-center gap-2 '>
            <ContactMailIcon /> support@followup.com
          </Link>
          <Link href='#' className=' flex items-center gap-2 pl-4'>
            <ContactCallIcon />
            510-889-7038
          </Link>
        </div>
        <div className='w-3/5 mx-auto'>
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
