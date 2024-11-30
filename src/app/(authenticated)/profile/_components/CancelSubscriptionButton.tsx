'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaCircleExclamation } from 'react-icons/fa6';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import AccountSuccess from '~/images/account-success.png';

const CancelSubscriptionButton = ({ disable }: { disable: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [showSuccessful, setShowSuccessful] = useState<boolean>(false);

  const handleYesClicked = () => {
    if (showSuccessful) {
      //!function to delete appointment
      router.push('/profile');
    } else {
      setShowSuccessful(true);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setShowSuccessful(false);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          disabled={disable}
          variant='outline'
          className='px-7 border-[#DB524E] text-[#DB524E] disabled:text-[#D4D4D4] disabled:bg-transparent disabled:border-[#D4D4D4]'
        >
          Cancel Subscription
        </Button>
      </DialogTrigger>
      <DialogContent className='rounded-2xl'>
        {showSuccessful ? (
          <>
            <DialogHeader>
              <div className='relative flex items-center justify-center'>
                <Image
                  src={AccountSuccess}
                  className='object-contain'
                  width={120}
                  height={120}
                  alt='icon'
                />
              </div>
            </DialogHeader>
            <DialogTitle>
              <DialogDescription className='text-center'>
                <span className='h4 text-[#111111] block w-4/5 mx-auto'>
                  Your Subscription has been Cancelled Successfully
                </span>
                <span className='text-[#6B6B6B] text-sm mt-[10px] font-normal invisible'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </span>
              </DialogDescription>
            </DialogTitle>

            <DialogFooter className='flex w-full justify-stretch flex-row mt-3 gap-4'>
              <Button className='basis-2 grow' onClick={handleYesClicked}>
                Done
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <div
                className={cn(
                  'relative w-2/5 aspect-square rounded-full overflow-hidden',
                  'grid place-content-center mx-auto',
                  'border border-dashed',
                  'before:absolute before:w-4/5 z-[1] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 before:top-1/2 before:left-1/2 before:aspect-square before:bg-[#FFFAEB]',
                  'after:absolute after:w-3/5 z-[1] after:rounded-full after:-translate-x-1/2 after:-translate-y-1/2 after:top-1/2 after:left-1/2 after:aspect-square after:bg-[#FEEFC6]'
                )}
              >
                <FaCircleExclamation
                  size={64}
                  className='relative z-[5] w-full text-[#DC6803]'
                />
                {/* <LogoutIconFill className='relative z-[5] w-full text-[#DB524E]' /> */}
              </div>
            </DialogHeader>
            <DialogTitle>
              <DialogDescription className='text-center'>
                <span className='h4 text-[#111111] block w-4/5 mx-auto'>
                  Are you sure you want to cancel this subscription?
                </span>
                <span className='text-[#6B6B6B] text-sm mt-[10px] font-normal'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </span>
              </DialogDescription>
            </DialogTitle>
            <DialogFooter className='flex w-full justify-stretch flex-row mt-3 gap-4'>
              <Button
                onClick={handleYesClicked}
                className='basis-1/3'
                variant='grey'
              >
                Yes
              </Button>
              <DialogClose asChild>
                <Button className='grow'>No</Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CancelSubscriptionButton;
