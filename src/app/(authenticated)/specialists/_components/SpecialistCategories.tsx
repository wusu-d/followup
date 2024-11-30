'use client';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import LoadingSpinner from '@/components/Spinner';

import { categoriesMapping } from '@/app/(authenticated)/specialists/_components/specialists.constants';
import { useGetServicesQuery } from '@/rtk-query/professional-profile';

const SpecialistCategories = () => {
  const { data, isLoading } = useGetServicesQuery(undefined);

  if (isLoading)
    return (
      <div className='grid place-items-center w-full min-h-72 '>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className='grid grid-cols-[repeat(auto-fill,_minmax(13rem,_1fr))] gap-6'>
      {data?.map((area) => {
        const { icon: Icon, color } = categoriesMapping[area.name];
        return (
          <Link
            className={cn(
              'text-white hover:text-white rounded-2xl border flex flex-col items-center py-6 gap-6 border-[#F1F1F1]',
              'focus-visible:ring-primary-green/20 focus:outline-none focus-visible:ring focus-visible:ring-offset-2'
            )}
            href={`/specialists/${area.id}`}
            key={area.id}
          >
            <span
              className={cn(
                'grid place-content-center w-1/3 aspect-square rounded-full'
              )}
              style={{
                background: color,
              }}
            >
              {Icon && <Icon />}
            </span>

            <span className='text-[#111111] block w-4/5 text-center font-medium text-base'>
              {area.name}
            </span>
          </Link>
        );
      })}
      {/* {areas?.map(({ Icon, href, ...area }) => {
        return (
          <Link
            className={cn(
              'text-white hover:text-white rounded-2xl border flex flex-col items-center py-6 gap-6 border-[#F1F1F1]',
              'focus-visible:ring-primary-green/20 focus:outline-none focus-visible:ring focus-visible:ring-offset-2'
            )}
            href={`/specialists/${href}`}
            key={area.id}
          >
            <span
              className={cn(
                'grid place-content-center w-1/3 aspect-square rounded-full'
              )}
              style={{
                background: area.color,
              }}
            >
              {Icon && <Icon />}
            </span>

            <span className='text-[#111111] block w-4/5 text-center font-medium text-base'>
              {area.name}
            </span>
          </Link>
        );
      })} */}
    </div>
  );
};

export default SpecialistCategories;
