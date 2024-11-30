'use client';
import { useEffect, useState } from 'react';

import { Calendar } from '@/components/ui/calendar';

import { useGetMonthSchedulesMutation } from '@/rtk-query/appointments';
const MonthlyScheduleCalendar = () => {
  const [getSchedule, { isLoading }] = useGetMonthSchedulesMutation();
  const [scheduleData, setScheduleData] = useState<Record<string, number>>({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // 1-12

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const result = await getSchedule({
          month: currentMonth,
        }).unwrap();
        setScheduleData(result.schedules);
      } catch (err) {
        console.error('Failed to fetch schedule:', err);
      }
    };

    fetchSchedule();
  }, [getSchedule, currentMonth]);

  const renderSkeletonContent = () => (
    <div className='flex flex-col items-center'>
      <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse'></div>
      <div className='mt-1 h-1 w-1 bg-gray-200 rounded animate-pulse'></div>
    </div>
  );
  const renderDots = (count: number) => {
    const dots = Math.min(count, 3);
    return (
      <div className='flex justify-center mt-1 space-x-1'>
        {Array.from({ length: dots }).map((_, i) => (
          <div
            key={i}
            className='h-1 w-1 rounded-full bg-primary-green hover:bg-white'
          ></div>
        ))}
      </div>
    );
  };

  return (
    <Calendar
      className='w-full'
      onMonthChange={(date) => setCurrentMonth(date.getMonth() + 1)}
      components={{
        DayContent: ({ date }) =>
          isLoading ? (
            renderSkeletonContent()
          ) : (
            <div className='w-full h-full flex flex-col items-center justify-center'>
              <div>{date.getDate()}</div>
              {renderDots(scheduleData[date.toISOString().split('T')[0]] || 0)}
            </div>
          ),
      }}
    />
  );
};

export default MonthlyScheduleCalendar;
