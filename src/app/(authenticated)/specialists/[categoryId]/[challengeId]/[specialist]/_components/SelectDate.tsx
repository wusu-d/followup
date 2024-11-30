import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import Button from '@/components/buttons/Button';
import LoadingSpinner from '@/components/Spinner';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';

import { useAppDispatch, useAppSelector } from '@/store';

import { useGetProviderAvailabilityClientQuery } from '@/rtk-query/services';
import {
  BOOK_APPOINTMENT_DATE,
  BOOK_APPOINTMENT_SLICE_REDUCER_NAME,
  updateBookAppointmentState,
} from '@/slices/book-appointment.slice';

const SelectDate = () => {
  const dispatch = useAppDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());

  const { providerPortfolio, availabilities } = useAppSelector(
    (state) => state['specialist']
  );

  const { isLoading } = useGetProviderAvailabilityClientQuery(
    `${providerPortfolio?.personal.user_id}`
  );
  const { [BOOK_APPOINTMENT_DATE]: selectedDate } = useAppSelector(
    (state) => state[BOOK_APPOINTMENT_SLICE_REDUCER_NAME]
  );

  const isBookedDay = (date: Date | null) => {
    if (!date) return false;

    // Convert the date to the same format as disabled dates for comparison
    const dateString = date.toISOString().split('T')[0];

    return providerPortfolio?.unavailable_time.some((disabledDate) => {
      // Convert disabled date string to date object for comparison
      const disabled = new Date(disabledDate);
      return disabled.toISOString().split('T')[0] === dateString;
    });
  };

  const changeMonth = (offset: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const isCurrentMonth = (date: Date) => {
    return date && date.getMonth() === currentDate.getMonth();
  };

  const handleDateClick = (date: Date | null) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date?.getDate()
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (clickedDate >= today) {
      dispatch(
        updateBookAppointmentState({
          [BOOK_APPOINTMENT_DATE]: clickedDate,
        })
      );
    }
  };

  const isAvailableDay = (date: Date | null) => {
    if (!date) return false;
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayName = dayNames[date.getDay()];
    return availabilities?.some((availability) => availability.day === dayName);
  };

  const isDateSelectable = (date: Date | null) => {
    const day = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date?.getDate()
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the day has availabilities
    const hasAvailability = isAvailableDay(date);

    return day >= today && hasAvailability;
  };

  const handleSubmit = () => {
    dispatch(
      updateBookAppointmentState({
        stage: 'time',
        [BOOK_APPOINTMENT_DATE]: selectedDate,
      })
    );
  };

  const days = getDaysInMonth(currentDate);
  return (
    <DialogContent className='rounded-2xl max-w-2xl p-10 border-none outline-none'>
      <DialogTitle className='text-[28px] text-[#111] font-bold mb-5 text-center'>
        Select Date
      </DialogTitle>
      {isLoading ? (
        <div className='w-full mx-auto mb-10 grid place-items-center min-h-[200px]'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {' '}
          <div className='w-full mx-auto mb-10'>
            <div className='flex justify-between items-center  text-xl'>
              <span className='text-[#111] font-medium'>
                {formatMonth(currentDate)}
              </span>
              <div className='flex gap-5 items-center'>
                <ChevronLeft
                  onClick={() => changeMonth(-1)}
                  size={32}
                  className='cursor-pointer'
                />
                <ChevronRight
                  onClick={() => changeMonth(1)}
                  size={32}
                  className='cursor-pointer'
                />
              </div>
            </div>
            <div className='grid grid-cols-7 mt-4 mb-2'>
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                <div key={day} className='text-left text-sm text-[#3C3C434D]'>
                  {day}
                </div>
              ))}
            </div>
            <div className='grid grid-cols-7 gap-1'>
              {days.map((date, index) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isSelected =
                  date &&
                  selectedDate &&
                  date.toDateString() === selectedDate.toDateString();

                return (
                  <div key={index} className='w-full flex justify-start'>
                    <div
                      onClick={() =>
                        isDateSelectable(date) && handleDateClick(date)
                      }
                      className={`
                    w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-xl 
                    ${
                      date
                        ? !isDateSelectable(date)
                          ? 'text-[#DADADA] cursor-not-allowed'
                          : ''
                        : ''
                    }
                    ${
                      date && isDateSelectable(date) && !isSelected
                        ? 'bg-[#e8f9f5] hover:bg-[#e8f9f5]'
                        : ''
                    }
                    ${
                      isSelected && isDateSelectable(date)
                        ? 'bg-primary-green text-white'
                        : ''
                    }
                  `}
                    >
                      {date ? date.getDate() : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            className='px-[78px] w-max mx-auto'
            disabled={!selectedDate}
          >
            Done
          </Button>
        </>
      )}
    </DialogContent>
  );
};

export default SelectDate;
