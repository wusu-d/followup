'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import EmotionalWellnessIcon from '@/components/icons/EmotionalWellnessIcon';
import LoadingSpinner from '@/components/Spinner';

import { useGetServicesChallengesQuery } from '@/rtk-query/services';

const CategoriesChallenges = ({ categoryId }: { categoryId: string }) => {
  const pathname = usePathname();

  const { data, isLoading } = useGetServicesChallengesQuery(categoryId);

  if (isLoading)
    return (
      <div className='grid place-items-center w-full min-h-72 '>
        <LoadingSpinner />
      </div>
    );

  return (
    <div className='grid grid-cols-[repeat(auto-fill,_minmax(13rem,_1fr))] gap-6'>
      {data?.length === 0 && (
        <p className='text-xl font-semibold text-center col-span-4 mt-10 text-primary-green'>
          Nothing to see here yet
        </p>
      )}
      {data?.map((challenge) => {
        return (
          <Link
            className={cn(
              'text-white hover:text-white rounded-2xl border flex flex-col items-center py-6 gap-6 border-[#F1F1F1]',
              'focus-visible:ring-primary-green/20 focus:outline-none focus-visible:ring focus-visible:ring-offset-2'
            )}
            href={`${pathname}/${challenge.id}`}
            key={challenge.id}
          >
            <span
              className={cn(
                'grid place-content-center w-1/3 aspect-square rounded-full relative'
              )}
              style={{
                background: '#FF6D60',
              }}
            >
              {challenge.icon ? (
                <Image
                  src={challenge.icon}
                  alt={challenge.name}
                  // className='w-full h-full object-cover'
                  width={60}
                  height={60}
                />
              ) : (
                <EmotionalWellnessIcon />
              )}
            </span>

            <span className='text-[#111111] block w-4/5 text-center font-medium text-base'>
              {challenge.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoriesChallenges;
