'use client';
import { FaBoxOpen } from 'react-icons/fa';

import LoadingSpinner from '@/components/Spinner';

import ClientCard from '@/app/(authenticated)/clients/_components/ClientCard';
import { useGetClientsQuery } from '@/rtk-query/projects';

const ClientList = () => {
  const { data, isLoading } = useGetClientsQuery();
  const clients = data ?? [];

  if (isLoading)
    return (
      <div className='grid place-items-center w-full min-h-72 '>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
      {clients.length === 0 ? (
        <div className='grid place-items-center col-span-5 min-h-72 '>
          <div className='flex flex-col items-center justify-center'>
            <FaBoxOpen className='text-primary-green' size={80} />
            <p className='text-center text-lg'>Your clients will appear here</p>
          </div>
        </div>
      ) : (
        clients.map((client, index) => {
          return <ClientCard client={client} key={index} />;
        })
      )}
    </div>
  );
};

export default ClientList;
