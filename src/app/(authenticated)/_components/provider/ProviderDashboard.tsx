'use client';

import MonthlyScheduleCalendar from '@/app/(authenticated)/_components/MonthlyScheduleCalendar';
import AppointmentOverview from '@/app/(authenticated)/_components/provider/AppointmentOverview';
import ClientOverview from '@/app/(authenticated)/_components/provider/ClientOverview';
import MySchedule from '@/app/(authenticated)/_components/provider/MySchedule';

const ProviderDashboard = () => {
  return (
    <section className='grid grid-cols-[minmax(20rem,_1fr)_auto] gap-5 w-full'>
      <div>
        <AppointmentOverview />
        <ClientOverview />
      </div>
      <div className='w-full bg-[#F2F5F8B2] rounded-xl'>
        <MonthlyScheduleCalendar />
        <MySchedule />
      </div>
    </section>
  );
};

export default ProviderDashboard;
