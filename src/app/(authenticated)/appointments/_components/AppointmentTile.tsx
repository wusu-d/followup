import { useSession } from 'next-auth/react';
import React from 'react';

import CalendarIcon from '@/components/icons/CalendarIcon';
import LocationPinIcon from '@/components/icons/LocationPinIcon';
import IconWithText from '@/components/IconWithText';
import UnstyledLink from '@/components/links/UnstyledLink';
import SpecialistBadge from '@/components/SpecialistBadge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { useAppDispatch } from '@/store';

import UserBadge from '@/app/(authenticated)/_components/UserBadge';
import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';
import { AppointmentType } from '@/rtk-query/appointments/types';
import { updateAppointmentState } from '@/slices/appointments.slice';

const AppointmentTile = ({ appointment }: { appointment: AppointmentType }) => {
  const { data: session } = useSession();
  const isClient = session?.user_groups.includes(RolesEnum.MEMBER);
  const dispatch = useAppDispatch();

  // Convert string to Date object
  const date = new Date(appointment.appointment_time);

  // Format the date to "24 Oct, 2024 - 08:00 AM"
  const formattedDate = `${date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })} - ${date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    // hour12: true,
  })}`;
  return (
    <UnstyledLink
      onClick={() => dispatch(updateAppointmentState({ appointment }))}
      href={`/appointments/${appointment.id}`}
    >
      <Card className='rounded-2xl border border-[#E1E1E166] bg-[#F6F8FB] p-4 space-y-4 transition-all duration-300 ease-out gradient-border'>
        <CardHeader className='p-0'>
          <UserBadge
            username={
              isClient ? appointment.provider_name : appointment.client_name
            }
            imgSrc={
              isClient ? appointment.provider_image : appointment.client_image
            }
            textColor='text-[#052536]'
          />
        </CardHeader>
        <CardContent className='p-0 space-y-4'>
          <IconWithText
            icon={<LocationPinIcon width='18' height='16' />}
            text={
              appointment.appointment_type === 'remote'
                ? 'Virtual Appointment'
                : isClient
                ? appointment.provider_address || 'In-Person Appointment'
                : 'In-Person Appointment'
            }
            classNames={{
              text: 'text-[#111111] truncate  ',
            }}
          />

          <IconWithText
            icon={<CalendarIcon width='18' height='19' />}
            text={formattedDate}
            classNames={{ text: 'text-[#111111]' }}
          />
          <div className='flex gap-3 items-center'>
            <span>Challenge:</span>
            <SpecialistBadge text={appointment.challenge} />
          </div>
        </CardContent>
      </Card>
    </UnstyledLink>
  );
};

export default AppointmentTile;
