import TaskChart from '@/app/(authenticated)/_components/client/ClientGraph1';
import TaskToday from '@/app/(authenticated)/_components/client/TaskToday';
import MonthlyScheduleCalendar from '@/app/(authenticated)/_components/MonthlyScheduleCalendar';
import MySchedule from '@/app/(authenticated)/_components/provider/MySchedule';

const ClientDashboard = () => {
  return (
    <section className='grid grid-cols-[minmax(20rem,_1fr)_auto] gap-5 w-full'>
      <div className='w-full space-y-6'>
        {/* <ClientGraph /> */}
        <TaskChart />
        <TaskToday />
      </div>
      <div className='w-full bg-[#F2F5F8B2] rounded-xl'>
        <MonthlyScheduleCalendar />
        <MySchedule />
      </div>
    </section>
  );
};

export default ClientDashboard;
