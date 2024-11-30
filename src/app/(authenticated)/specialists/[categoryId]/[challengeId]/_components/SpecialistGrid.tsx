'use client';
import { useParams, usePathname } from 'next/navigation';

import LoadingSpinner from '@/components/Spinner';

import SpecialistCard from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/_components/SpecialistCard';
import { useGetServiceProvidersQuery } from '@/rtk-query/services';

const SpecialistGrid = () => {
  const pathname = usePathname();
  const { categoryId } = useParams();

  const { data: specialists, isLoading } = useGetServiceProvidersQuery(
    `${categoryId}`
  );

  if (isLoading)
    return (
      <div className='grid place-items-center w-full min-h-72 '>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
      {specialists?.length === 0 ? (
        <p className='text-xl font-semibold text-center col-span-4 mt-10 text-primary-green'>
          Nothing to see here yet
        </p>
      ) : (
        specialists?.map(({ service_id, qualifications, ...rest }) => {
          return <SpecialistCard key={rest.user_id} specialist={rest} />;
        })
      )}
    </div>
  );
};

export default SpecialistGrid;
