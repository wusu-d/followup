'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, FocusEvent, useState } from 'react';
import { FaCircleExclamation } from 'react-icons/fa6';
import { toast } from 'sonner';

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
import { Textarea } from '@/components/ui/textarea';

import { useCancelAppointmentMutation } from '@/rtk-query/appointments';

const CancelAppointmentButton = ({
  appointmentId,
}: {
  appointmentId: string;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  console.log(pathName);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');
  const [cancelAppointment, { isLoading }] = useCancelAppointmentMutation();

  const handleYesClicked = async () => {
    if (showInput) {
      try {
        await cancelAppointment({
          appointmentId: appointmentId,
          data: { cancellation_reason: reason },
        }).unwrap();
        toast.success('Appointment Cancelled Successfully');
        router.push('/appointments');
      } catch (error) {
        toast.error('Something went wrong');
      }
    } else {
      setShowInput(true);
    }
  };
  return (
    <Dialog
      onOpenChange={() => {
        setShowInput(false);
        setReason('');
      }}
    >
      <DialogTrigger asChild>
        <Button variant='grey' className='px-[72px]'>
          Cancel
        </Button>
      </DialogTrigger>
      <DialogContent className='rounded-2xl'>
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
              Are you sure you want to cancel this appointment?
            </span>
          </DialogDescription>
        </DialogTitle>
        {showInput && (
          <div>
            <Textarea
              value={reason}
              name='cancellationReason'
              placeholder='Tell us the reason why?'
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setReason(e.target.value)
              }
              onBlur={(e: FocusEvent<HTMLTextAreaElement>) => setTouched(true)}
              touched={touched}
              rows={3}
              className='resize-none'
            />
          </div>
        )}

        <DialogFooter className='flex w-full justify-stretch flex-row mt-3 gap-4'>
          <Button
            onClick={handleYesClicked}
            className='basis-1/3'
            variant='grey'
            isLoading={isLoading}
          >
            Yes
          </Button>
          <DialogClose asChild>
            <Button className='grow'>No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelAppointmentButton;
