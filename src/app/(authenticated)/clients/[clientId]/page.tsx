'use client';
import { cn } from '@/lib/utils';

import PageComponentWrapper from '@/components/PageComponentWrapper';
import SpecialistBadge from '@/components/SpecialistBadge';
import LoadingSpinner from '@/components/Spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import AddProjectButton from '@/app/(authenticated)/clients/[clientId]/_components/AddProjectButton';
import ClientHeader from '@/app/(authenticated)/clients/[clientId]/_components/ClientHeader';
import ClientProjectList from '@/app/(authenticated)/clients/[clientId]/_components/ClientProjectList';
import { useGetClientsProjectQuery } from '@/rtk-query/projects';

const ClientPage = ({ params }: { params: { clientId: string } }) => {
  const { data, isLoading } = useGetClientsProjectQuery(params.clientId);

  return (
    <PageComponentWrapper
      headerComponent={
        <ClientHeader clientName={data?.client_profile.full_name ?? ''} />
      }
    >
      <div className='border border-[#F1F1F1] rounded-[20px] p-5'>
        {isLoading ? (
          <div className='grid place-items-center w-full min-h-72 '>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className='flex justify-between items-start'>
              <div className='flex items-center gap-3'>
                <Avatar
                  className={cn('border-2 border-[#16C098] w-[90px] h-[90px]')}
                >
                  <AvatarImage
                    src={data?.client_profile.profile_image}
                    alt='client_profile image'
                  />
                  <AvatarFallback>Image</AvatarFallback>
                </Avatar>
                <div className='space-y-2'>
                  <h1 className={cn('text-lg font-bold text-[#052536]')}>
                    {data?.client_profile.full_name}
                  </h1>
                  <p className={cn('text-[#6B6B6B] font-bold text-sm')}>
                    {data?.client_profile.email}
                  </p>
                  <p className={cn('text-[#6B6B6B] font-bold text-sm')}>
                    {data?.client_profile.phone}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-5'>
                <SpecialistBadge
                  text={data?.last_appointment.service_category}
                  classNames={{
                    icon: 'w-[50px] h-[50px] bg-[#FFA553]',
                    text: 'text-[#111111] bg-[#FFA55333] font-medium text-base rounded-r-[30px]',
                  }}
                />
                <SpecialistBadge
                  text={data?.last_appointment.challenge}
                  classNames={{
                    icon: 'w-[50px] h-[50px] bg-[#16C098] ',
                    text: 'text-[#111111 font-medium text-base rounded-r-[30px]',
                  }}
                />
                <SpecialistBadge
                  text={
                    data?.last_appointment?.goal === 'short-term'
                      ? 'Short Term'
                      : 'Long Term'
                  }
                  classNames={{
                    icon: 'w-[50px] h-[50px] bg-[#052536] ',
                    text: 'text-[#111111] bg-[#05253626] font-medium text-base rounded-r-[30px]',
                  }}
                  backgrounds={{
                    icon: '#052536',
                    text: '#05253626',
                  }}
                />
              </div>
            </div>

            <p className='text-[#6B6B6B] mt-5 text-sm'>
              {data?.client_profile.bio}
            </p>
            <ClientProjectList projects={data?.projects ?? []} />
            <div className='w-max ml-auto mt-10'>
              <AddProjectButton />
            </div>
          </>
        )}
      </div>
    </PageComponentWrapper>
  );
};

export default ClientPage;
