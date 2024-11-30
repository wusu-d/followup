import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/buttons/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useAppDispatch } from '@/store';

import { setOnboardingStage } from '@/slices/onboarding.slice';

import CardSuccess from '~/images/card-success.png';

const PaymentConfirmedDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handlePaymentDone = async () => {
    dispatch(setOnboardingStage('professional-profile'));
    onOpenChange();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='rounded-2xl w-max p-10'>
        <DialogHeader>
          <div className='relative flex items-center justify-center'>
            <Image
              src={CardSuccess}
              className='object-contain'
              width={120}
              height={120}
              alt='icon'
            />
          </div>
        </DialogHeader>
        <DialogTitle>
          <DialogDescription className='text-center'>
            <span className='h4 text-[#111111] block mx-auto'>
              Payment Successful
            </span>
            <p className='text-sm font-normal text-[#6B6B6B] w-[300px] leading-6 mt-2'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </DialogDescription>
        </DialogTitle>

        <DialogFooter className='flex w-full justify-stretch flex-row mt-3 gap-4'>
          <Button className='basis-2 grow' onClick={handlePaymentDone}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmedDialog;
