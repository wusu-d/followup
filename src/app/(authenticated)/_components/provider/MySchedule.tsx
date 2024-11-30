'use client';
import { useEffect, useState } from 'react';
import { FaBoxOpen } from 'react-icons/fa';

import ScheduleItem from '@/app/(authenticated)/_components/client/ScheduleItem';
import { useDaySchedulesMutation } from '@/rtk-query/appointments';
import { Schedule } from '@/rtk-query/appointments/types';
import { getUTCDateString } from '@/utils/getUTCDateString';

const MySchedule = () => {
  const [getSchedule, { isLoading }] = useDaySchedulesMutation();
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const date = getUTCDateString();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const result = await getSchedule({
          date,
        }).unwrap();
        setScheduleData(result.schedules);
      } catch (err) {
        console.error('Failed to fetch schedule:', err);
      }
    };

    fetchSchedule();
  }, [date, getSchedule]);

  return (
    <section className='w-full p-4 '>
      <h3>My Schedule</h3>
      {scheduleData.length === 0 ? (
        <div className='grid place-items-center w-full h-32'>
          <div className='flex flex-col items-center justify-center'>
            <FaBoxOpen className='text-primary-green' size={40} />
            <p className='text-[#111] font-medium'>
              No available schedule today
            </p>
          </div>
        </div>
      ) : (
        <div className='space-y-3 mt-6'>
          {scheduleData.slice(0, 2).map((schedule) => {
            return <ScheduleItem key={schedule.id} schedule={schedule} />;
          })}
        </div>
      )}
    </section>
  );
};

export default MySchedule;
