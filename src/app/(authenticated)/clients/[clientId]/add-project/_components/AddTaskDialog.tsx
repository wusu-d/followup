import { useFormik } from 'formik';
import { X } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';

import Button from '@/components/buttons/Button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

import CalendarProjectIcon from '@/app/(authenticated)/projects/[projectId]/_components/CalendarProjectIcon';

const AddTaskDialog = ({
  isAddModalOpen,
  closeModal,
}: {
  isAddModalOpen: boolean;
  closeModal: () => void;
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const formik = useFormik({
    initialValues: {
      title: '',
      date: date,
      description: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Dialog open={isAddModalOpen} onOpenChange={closeModal}>
      <DialogContent className='rounded-2xl max-w-3xl p-10 border-none outline-none'>
        <span
          onClick={closeModal}
          className='cursor-pointer absolute top-5 right-5 h-10 w-10 border[#05253666] border rounded-full flex items-center justify-center'
        >
          <X color='#052536' strokeWidth={1.5} />
        </span>
        <DialogTitle className='text-[28px] text-[#111] font-bold mb-5 text-center'>
          {isAddModalOpen ? 'Add Task' : 'Edit Task'}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <div className='flex items-center mb-5 gap-3'>
            <div className='w-1/2'>
              <Input
                id='title'
                label='Title'
                placeholder='Add Title'
                name='title'
                onBlur={formik.handleBlur}
                required
                value={formik.values.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className='w-1/2'>
              <Popover>
                <PopoverTrigger asChild>
                  <div className='relative'>
                    <Input
                      id='date'
                      name='date'
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        console.log(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      label='Expected Completion Date'
                      placeholder='Select Date'
                      value={date ? 'dd MMMM yyyy' : ''}
                      readOnly
                      className='pr-10'
                    />
                    <Button
                      variant='ghost'
                      className='absolute right-0 top-4 h-full'
                    >
                      <CalendarProjectIcon />
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar mode='single' selected={date} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Textarea
            id='description'
            label='Description'
            placeholder='Add Description'
            containerClassName='w-full'
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              console.log(e.target.value);
            }}
            value={formik.values.description}
            name='description'
            onBlur={formik.handleBlur}
            rows={5}
            required
            className='resize-none'
          />
          <div className='w-max mx-auto'>
            <Button
              type='submit'
              className='w-max px-32 mt-9'
              disabled={!formik.isValid}
            >
              {isAddModalOpen ? 'Add Task' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
