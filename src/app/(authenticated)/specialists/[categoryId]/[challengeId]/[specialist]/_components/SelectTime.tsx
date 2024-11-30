import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';

import { useAppDispatch, useAppSelector } from '@/store';

import {
  BOOK_APPOINTMENT_DATE,
  BOOK_APPOINTMENT_SLICE_REDUCER_NAME,
  BOOK_APPOINTMENT_TIME,
  updateBookAppointmentState,
} from '@/slices/book-appointment.slice';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const SelectTime = () => {
  const dispatch = useAppDispatch();

  const { availabilities } = useAppSelector((state) => state['specialist']);

  const {
    [BOOK_APPOINTMENT_DATE]: selectedDate,
    [BOOK_APPOINTMENT_TIME]: appointmentTime,
  } = useAppSelector((state) => state[BOOK_APPOINTMENT_SLICE_REDUCER_NAME]);

  console.log(selectedDate);

  const formatMonth = (date: Date | null) => {
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  };

  const getSelectedDayAvailability = () => {
    if (!selectedDate) return null;
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const selectedDayName = dayNames[selectedDate.getDay()];
    return availabilities?.find(
      (availability) => availability.day === selectedDayName
    );
  };

  const generateTimeSlots = () => {
    const availability = getSelectedDayAvailability();
    if (!availability) return [];

    const { startTime, endTime } = availability;
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);

    const times = [];
    for (let hour = start; hour < end; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      times.push(time);
    }
    return times;
  };

  const availableTimes = generateTimeSlots();
  const allTimes = Array.from(
    { length: 16 },
    (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`
  );

  const handleTimeClicked = (time: string) => {
    dispatch(updateBookAppointmentState({ [BOOK_APPOINTMENT_TIME]: time }));
  };

  const handleSubmit = () => {
    dispatch(updateBookAppointmentState({ stage: 'serviceType' }));
  };

  return (
    <DialogContent className='rounded-2xl w-max max-w-max p-10 border-none outline-none'>
      <DialogTitle className='text-[28px] text-[#111] font-bold mb-5 text-center'>
        Select Time
      </DialogTitle>
      <div className='text-xl text-[#111] font-medium'>
        {formatMonth(selectedDate)}
      </div>
      <div className='w-max mx-auto mb-5 grid grid-cols-4 gap-4'>
        {allTimes.map((time) => {
          const isAvailable = availableTimes.includes(time);
          return (
            <span
              key={time}
              onClick={() => isAvailable && handleTimeClicked(time)}
              className={cn(
                'rounded-md px-7 py-1',
                isAvailable
                  ? 'bg-[#E8F9F5] cursor-pointer'
                  : 'opacity-50 cursor-not-allowed',
                appointmentTime === time && 'bg-primary-green text-white'
              )}
            >
              {time}
            </span>
          );
        })}
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!appointmentTime}
        className='px-[78px] w-max mx-auto'
      >
        Done
      </Button>
    </DialogContent>
  );
};

export default SelectTime;
