'use client';
import { Dispatch, SetStateAction } from 'react';
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

import DeleteNoteIcon from '@/app/(authenticated)/projects/[projectId]/_components/DeleteNoteIcon';

const DeleteAddTaskButton = ({
  open,
  onOpenChange,
  isLoading,
  onDelete,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  onDelete: () => void;
}) => {
  const handleYesClicked = async () => {
    onDelete();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DeleteNoteIcon />
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
              Are you sure you want to delete this task?
            </span>
          </DialogDescription>
        </DialogTitle>

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

export default DeleteAddTaskButton;
