'use client';
import Link from 'next/link';

import DashboardChartMockup from '@/components/icons/DashboardChartMockup';

import ClientProgress from '@/app/(authenticated)/_components/provider/ClientProgress';
import { useGetClientTimelineQuery } from '@/rtk-query/projects';

const ClientOverview = () => {
  const { data, isLoading } = useGetClientTimelineQuery();
  return (
    <div className='my-5  bg-[#052536] rounded-[20px] '>
      <div className='flex justify-between items-center p-5 font-bold'>
        <span className='text-lg text-primary-green'>Client Overview</span>
        <Link href='/clients' className='text-white  text-sm'>
          See all
        </Link>
      </div>
      <div className='grid grid-cols-[minmax(10rem,_60%)_40%] '>
        <div className='flex items-center pl-2 gap-2'>
          <div className='relative w-8 h-[100px]'>
            {Array.from('CLIENTS').map((char, index) => (
              <span
                key={index}
                className='absolute left-1/2 transform -translate-x-1/2 text-[10px] font-medium text-[#FFA553]'
                style={{
                  bottom: `${index * 1}rem`,
                  transform: `translateX(-50%) rotate(-90deg)`,
                }}
              >
                {char}
              </span>
            ))}
          </div>
          {data?.length === 0 ? (
            <div className='grow self-stretch flex items-center justify-center'>
              <p className='text-white text-center  '>
                Clients Progress Overview will appear here
              </p>
            </div>
          ) : (
            <div className='grow self-stretch space-y-8 flex flex-col '>
              {data?.slice(0, 4).map((client) => {
                const stages =
                  client.projects.length === 0 ? 5 : client.projects.length;
                const progress = client.projects.filter(
                  (project) => project.status === 'completed'
                ).length;
                return (
                  <ClientProgress
                    key={client.client_id}
                    stages={stages}
                    profileImage={client.profile_image}
                    progress={progress}
                  />
                );
              })}

              {/* <ClientProgress stages={4} progress={1.5} />
            <ClientProgress progress={2.7} />
            <ClientProgress stages={4} progress={0.5} /> */}
            </div>
          )}
        </div>
        <div className='w-full '>
          <DashboardChartMockup className='w-full' />
        </div>
      </div>
    </div>
  );
};

export default ClientOverview;
