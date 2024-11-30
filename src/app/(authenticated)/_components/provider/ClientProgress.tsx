import { Check } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ClientProgress = ({
  stages = 5,
  progress = 1.5,
  profileImage,
}: {
  stages?: number;
  progress?: number;
  profileImage?: string;
}) => {
  const totalSegments = stages - 1;

  const getLineProgress = (index: number) => {
    const segmentProgress = progress - Math.floor(progress);
    return index === Math.floor(progress)
      ? segmentProgress
      : index < Math.floor(progress)
      ? 1
      : 0;
  };
  const isCircleFilled = (index: number) => {
    return index <= Math.floor(progress);
  };
  return (
    <div className='flex items-center w-full gap-4'>
      <Avatar className={cn('border-2 border-[#16C098] h-10 w-10')}>
        <AvatarImage
          src={profileImage ? profileImage : '/images/profile-icon.png'}
          alt='profile image'
        />
        <AvatarFallback>Image</AvatarFallback>
      </Avatar>
      <div className='flex-1 flex items-center'>
        {[...Array(stages)].map((_, index) => (
          <React.Fragment key={index}>
            <div
              // style={{ boxShadow: '0px 0px 35px 0px #16C09840' }}
              className={`
              w-5 h-5 rounded-full flex-shrink-0 relative flex items-center justify-center
              ${
                index < progress
                  ? 'bg-primary-green ring-4 ring-teal-400/30'
                  : 'bg-[#063751]'
              }
              ${Math.floor(progress) === index ? 'ring-4 ring-teal-400/30' : ''}
            `}
            >
              {isCircleFilled(index) && (
                <Check className='w-3 h-3 text-white' />
              )}
            </div>
            {index < totalSegments && (
              <div className='flex-1 h-[5px] bg-[#063751] relative'>
                <div
                  className='absolute top-0 left-0 h-full  transition-all duration-500'
                  style={{
                    width: `${getLineProgress(index) * 100}%`,
                    background:
                      'linear-gradient(155.5deg, #0DDEAD -5.84%, rgba(41, 163, 155, 0.92) 48.04%, #005459 104.21%)',
                  }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ClientProgress;
