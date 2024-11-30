import { PiCheckCircleFill } from 'react-icons/pi';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';

import { useAppDispatch, useAppSelector } from '@/store';

import {
  BOOK_APPOINTMENT_APPOINTMENT_TYPE,
  BOOK_APPOINTMENT_SLICE_REDUCER_NAME,
  updateBookAppointmentState,
} from '@/slices/book-appointment.slice';

const appointmentType = ['Remote', 'In Person'];

const SelectAppointmentType = () => {
  const dispatch = useAppDispatch();
  const { providerPortfolio } = useAppSelector((state) => state['specialist']);
  const { [BOOK_APPOINTMENT_APPOINTMENT_TYPE]: selectedAppointment } =
    useAppSelector((state) => state[BOOK_APPOINTMENT_SLICE_REDUCER_NAME]);

  const handleAppointmentClick = (appointment: string) => {
    dispatch(
      updateBookAppointmentState({
        [BOOK_APPOINTMENT_APPOINTMENT_TYPE]: appointment,
      })
    );
  };

  const handleSubmit = () => {
    dispatch(updateBookAppointmentState({ stage: 'inputForm' }));
  };
  return (
    <DialogContent className='rounded-2xl max-w-lg p-10 border-none outline-none'>
      <DialogTitle className='text-[28px] text-[#111] font-bold mb-5 text-center'>
        Select Appointment Type
      </DialogTitle>
      <div className='w-full flex-wrap justify-center flex gap-5'>
        {appointmentType.map((appointment, index) => {
          const appointmentModified = appointment
            .toLowerCase()
            .replace(/\s+/g, '-');
          const isDisabled =
            providerPortfolio?.work.appointment_type === 'in-person' &&
            appointmentModified === 'remote';
          return (
            <div
              key={index}
              onClick={() => handleAppointmentClick(appointmentModified)}
              className={cn(
                'bg-[#F6F8FB] flex-shrink-0 flex items-center gap-4 py-[18px] px-5 basis-[45%] rounded-[10px] text-[#111] font-medium border border-transparent cursor-pointer',
                selectedAppointment === appointmentModified &&
                  'bg-[#16C09814] border-[#16C098]',
                isDisabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className='h-6 w-6 rounded-full border border-[#D0F2EA] text-primary-green'>
                {selectedAppointment === appointmentModified && (
                  <PiCheckCircleFill className='w-full h-auto aspect-square' />
                )}
              </div>
              {appointment}
            </div>
          );
        })}
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!selectedAppointment}
        className=''
      >
        Next
      </Button>
    </DialogContent>
  );
};

export default SelectAppointmentType;
