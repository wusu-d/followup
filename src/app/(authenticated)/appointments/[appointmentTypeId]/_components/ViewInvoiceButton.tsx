'use client';
import { X } from 'lucide-react';
import Image from 'next/image';

import Button from '@/components/buttons/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

const ViewInvoiceButton = ({ imgSrc }: { imgSrc: string }) => {
  const isPdf = imgSrc.toLowerCase().endsWith('.pdf');
  console.log(isPdf);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='px-12'>View Invoice</Button>
      </DialogTrigger>
      <DialogContent className='rounded-2xl p-10 max-w-xl'>
        <DialogClose asChild>
          <span className='cursor-pointer absolute top-5 right-5 h-10 w-10 border[#05253666] border rounded-full flex items-center justify-center'>
            <X color='#052536' strokeWidth={1.5} />
          </span>
        </DialogClose>
        <DialogHeader>
          <span className='text-[24px] font-bold mb-4 text-[#111111] block text-center mx-auto'>
            Invoice
          </span>
        </DialogHeader>

        <div className='w-auto h-[529px] relative'>
          {isPdf ? (
            <iframe
              src={`${imgSrc}#toolbar=0&navpanes=0&scrollbar=0&zoom=page-fit&view=FitH`}
              className='w-full h-full overflow-hidden origin-center'
              style={{
                border: 'none',
                overflow: 'hidden',

                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            ></iframe>
          ) : (
            <Image src={imgSrc} alt='invoice' fill objectFit='cover' />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewInvoiceButton;
