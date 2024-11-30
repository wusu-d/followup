import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import Button from '@/components/buttons/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import AccountSuccess from '~/images/account-success.png';

const ProfileCompletedDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const handleDone = async () => {
    setIsLoading(true);
    await update({
      ...session,
      profile_status: 'verified',
    });
    router.push('/');
    setIsLoading(false);
    onOpenChange();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='rounded-2xl w-max p-10'>
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
            <span className='text-[28px] text-[#052536] block mx-auto'>
              Your account has been created
            </span>
            <p className='text-xl font-bold text-[#052536] mt-2 mb-4'>
              Now Its Time!!
            </p>
            <p className='text-sm font-normal text-center text-[#6B6B6B] leading-6'>
              Your next chapter awaits you
            </p>
          </DialogDescription>
        </DialogTitle>

        <DialogFooter className='flex w-full justify-stretch flex-row mt-3 gap-4'>
          <Button
            isLoading={isLoading}
            className='basis-2 grow'
            onClick={handleDone}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCompletedDialog;
