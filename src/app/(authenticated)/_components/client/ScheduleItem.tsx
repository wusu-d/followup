import React from 'react';

import { cn } from '@/lib/utils';

import TimeIcon from '@/components/icons/TimeIcon';
import { Schedule } from '@/rtk-query/appointments/types';
import { useSession } from 'next-auth/react';
import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';

function formatTime(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string provided');
  }

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${hours}:${minutes.toString().padStart(2, '0')}${ampm}`;
}

const ScheduleItem = ({
  schedule,
  title,
  description,
  variant,
}: {
  schedule: Schedule;
  title?: string;
  description?: string;
  variant?: string;
}) => {
  const { data: session } = useSession();
  const isProvider = session?.user_groups.includes(RolesEnum.SERVICE_PROVIDER);
  return (
    <div
      className={cn('px-4 py-5 rounded-xl', [
        schedule.status !== 'accepted' && 'bg-[#FFA55314]',
        schedule.status === 'accepted' && 'bg-[#16C09814]',
      ])}
    >
      <div className='flex gap-2 items-center'>
        <TimeIcon
          fill={schedule.status !== 'accepted' ? '#FFA553' : '#16C098'}
        />
        <span className='font-semibold text-sm text-[#052536]'>
          {formatTime(schedule.appointment_time)}
        </span>
      </div>
      <p className='text-[15px] font-medium text-[#052536]'>
        Appointment with{' '}
        {isProvider ? `${schedule.client_name}` : `${schedule.provider_name}`}
      </p>
    </div>
  );
};

export default ScheduleItem;
