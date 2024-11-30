'use client';

import AppointmentOverviewPending from '@/components/icons/AppointmentOverviewPending';
import AppointmentOverviewUpcoming from '@/components/icons/AppointmentOverviewUpcoming';

import AppointmentOverviewCard from '@/app/(authenticated)/_components/provider/AppointmentOverviewCard';
import { useGetAppointmentsSummaryQuery } from '@/rtk-query/appointments';

const AppointmentOverview = () => {
  const { data, isLoading } = useGetAppointmentsSummaryQuery();
  if (isLoading) {
    return (
      <div className='flex gap-5 items-center w-full'>
        <div className='bg-white rounded-2xl p-6 shadow-sm animate-pulse basis-1/2'>
          <div className='flex justify-between items-start'>
            {/* Number skeleton */}
            <div className='w-12 h-10 bg-gray-200 rounded-md' />

            {/* Icon skeleton */}
            <div className='w-16 h-16 bg-gray-200 rounded-lg' />
          </div>

          {/* Title skeleton */}
          <div className='mt-4'>
            <div className='w-48 h-5 bg-gray-200 rounded-md' />
          </div>
        </div>
        <div className='bg-white rounded-2xl p-6 shadow-sm animate-pulse basis-1/2'>
          <div className='flex justify-between items-start'>
            {/* Number skeleton */}
            <div className='w-12 h-10 bg-gray-200 rounded-md' />

            {/* Icon skeleton */}
            <div className='w-16 h-16 bg-gray-200 rounded-lg' />
          </div>

          {/* Title skeleton */}
          <div className='mt-4'>
            <div className='w-48 h-5 bg-gray-200 rounded-md' />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='flex gap-5 items-center w-full'>
      <AppointmentOverviewCard
        icon={<AppointmentOverviewUpcoming />}
        description='Upcoming Appointments'
        amount={data?.upcoming_appointments ?? 0}
      />
      <AppointmentOverviewCard
        icon={<AppointmentOverviewPending />}
        description='Pending Appointments'
        amount={data?.pending_appointments ?? 0}
      />
    </div>
  );
};

export default AppointmentOverview;
