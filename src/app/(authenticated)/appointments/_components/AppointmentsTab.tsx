'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaBoxOpen } from 'react-icons/fa';

import { cn } from '@/lib/utils';

import CalendarIcon from '@/components/icons/CalendarIcon';
import LocationPinIcon from '@/components/icons/LocationPinIcon';
import IconWithText from '@/components/IconWithText';

import UserBadge from '@/app/(authenticated)/_components/UserBadge';
import AppointmentTile from '@/app/(authenticated)/appointments/_components/AppointmentTile';
import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';
import { useGetAppointmentsQuery } from '@/rtk-query/appointments';
const AppointmentsTab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const isProvider = session?.user_groups.includes(RolesEnum.SERVICE_PROVIDER);
  const currentTab = searchParams.get('type') || 'pending';

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAppointmentsQuery(
    {
      page: 1,
      type: currentTab,
    },
    { refetchOnMountOrArgChange: true }
  );
  const { data: upcoming, isLoading: isLoadingUpcomnig } =
    useGetAppointmentsQuery(
      {
        page: 1,
        type: 'upcoming',
      },
      { refetchOnMountOrArgChange: true }
    );
  const appointments = response?.data ?? [];
  const upcomingAppointment = upcoming?.data[0];

  const date =
    upcomingAppointment && new Date(upcomingAppointment?.appointment_time);

  // Format the date to "24 Oct, 2024 - 08:00 AM"
  const formattedDate = `${date?.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })} - ${date?.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    // hour12: true,
  })}`;

  // Function to update the URL with the selected tab
  const handleTabClick = (tab: string) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('type', tab); // Update the tab search param
    router.push(`?${newParams.toString()}`, { shallow: true } as any); // Push new search params to URL
  };
  return (
    <>
      {upcomingAppointment && (
        <Link
          href={`appointments/${upcomingAppointment.id}`}
          className='bg-[#052536] rounded-xl px-5 py-4 block'
        >
          <div className='flex items-center justify-between'>
            <UserBadge
              username={
                isProvider
                  ? upcomingAppointment.client_name
                  : upcomingAppointment.provider_name
              }
              imgSrc={
                isProvider
                  ? upcomingAppointment.client_image
                  : upcomingAppointment.provider_image
              }
            />
            <span className='rounded-lg bg-[#FFFFFF1A] text-white py-2 px-4 font-semibold text-sm'>
              Upcoming
            </span>
          </div>
          <div className='text-white divide-x space-x-5 mt-4 border-white flex'>
            <IconWithText
              icon={<LocationPinIcon width='18' height='18' />}
              text={
                upcomingAppointment.appointment_type === 'remote'
                  ? 'Virtual Appointment'
                  : !isProvider
                  ? upcomingAppointment.provider_address ||
                    'In-Person Appointment'
                  : 'In-Person Appointment'
              }
              classNames={{ text: 'text-sm font-semibold' }}
            />
            <IconWithText
              icon={<CalendarIcon width='18' height='18' />}
              text={formattedDate}
              classNames={{ container: 'pl-5', text: 'text-sm font-semibold' }}
            />
          </div>
        </Link>
      )}
      <div className='font-bold text-lg text-[#052536] space-x-1 my-5'>
        <span
          onClick={() => handleTabClick('upcoming')}
          className={cn(
            'cursor-pointer py-3 px-[22px] rounded-lg',
            currentTab === 'upcoming' && 'bg-[#16C098] text-white'
          )}
        >
          Upcoming
        </span>
        <span
          onClick={() => handleTabClick('pending')}
          className={cn(
            'cursor-pointer py-3 px-[22px] rounded-lg',
            currentTab === 'pending' && 'bg-[#16C098] text-white'
          )}
        >
          Pending
        </span>
        <span
          onClick={() => handleTabClick('past')}
          className={cn(
            'cursor-pointer py-3 px-[22px] rounded-lg',
            currentTab === 'past' && 'bg-[#16C098] text-white'
          )}
        >
          Past
        </span>
      </div>
      <div className='grid gap-5 grid-cols-3'>
        {isLoading ? (
          Array.from({ length: 3 }, (_, index) => index).map((_, index) => (
            <div
              key={index}
              className='w-full p-4 bg-white rounded-lg shadow-md max-w-sm'
            >
              <div className='animate-pulse'>
                {/* <!-- Profile Picture Placeholder --> */}
                <div className='flex items-center space-x-4 mb-4'>
                  <div className='rounded-full bg-gray-300 h-12 w-12'></div>
                  <div className='flex-1'>
                    <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                    <div className='h-3 bg-gray-300 rounded mt-2 w-1/2'></div>
                  </div>
                </div>

                <div className='flex items-center mb-4'>
                  <div className='h-5 w-5 bg-gray-300 rounded-full mr-2'></div>
                  <div className='h-4 bg-gray-300 rounded w-2/3'></div>
                </div>
                <div className='flex items-center mb-4'>
                  <div className='h-5 w-5 bg-gray-300 rounded-full mr-2'></div>
                  <div className='h-4 bg-gray-300 rounded w-2/3'></div>
                </div>

                {/* <!-- Challenge Placeholder --> */}
                <div className='h-4 bg-gray-300 rounded w-4/5 mb-4'></div>
              </div>
            </div>
          ))
        ) : appointments.length === 0 ? (
          <div className='col-span-3 text-center mt-4 text-[#111] font-medium flex flex-col items-center justify-center min-h-52'>
            <FaBoxOpen className='text-primary-green' size={40} />
            No {currentTab} appointments yet
          </div>
        ) : (
          appointments.map((appointment) => {
            return (
              <AppointmentTile key={appointment.id} appointment={appointment} />
            );
          })
        )}

        {/* <AppointmentTile type={currentTab} />
        <AppointmentTile type={currentTab} /> */}
      </div>
    </>
  );
};

export default AppointmentsTab;
