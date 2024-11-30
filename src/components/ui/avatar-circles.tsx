'use client';

import Image, { StaticImageData } from 'next/image';

import { cn } from '@/lib/utils';

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number | string;
  avatarUrls: (string | StaticImageData)[];
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn('z-10 flex -space-x-4 rtl:space-x-reverse', className)}>
      {avatarUrls.map((url, index) => (
        <Image
          key={index}
          className='h-14 w-14 rounded-full border-2 border-white dark:border-gray-800'
          src={url}
          width={40}
          height={40}
          alt={`Avatar ${index + 1}`}
          placeholder='blur'
        />
      ))}
      <div className='flex h-14 w-14 items-center text-xl font-extrabold justify-center rounded-full border-2 border-primary-green bg-primary-green text-center'>
        +{numPeople}
      </div>
    </div>
  );
};

export default AvatarCircles;
