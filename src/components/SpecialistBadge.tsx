import Image from 'next/image';
import React, { ReactNode } from 'react';
import { GiInspiration } from 'react-icons/gi';

import { cn } from '@/lib/utils';

type SpecialistBadgeProps = {
  icon?: ReactNode | string;
  text?: string;
  classNames?: {
    text?: string;
    icon?: string;
  };
  backgrounds?: {
    icon?: string;
    text?: string;
  };
};

const SpecialistBadge = ({
  classNames,
  text,
  icon,
  backgrounds,
}: SpecialistBadgeProps) => {
  const defaultIcon = (
    <GiInspiration size={28} className='m-auto h-full text-white' />
  );
  return (
    <div className='flex shrink-0'>
      <span
        className={cn(
          'w-[30px] h-[30px] rounded-full z-10 flex items-center justify-center',
          classNames?.icon
        )}
        style={{ backgroundColor: backgrounds?.icon ?? '#16C098' }}
      >
        {icon ? (
          typeof icon === 'string' ? (
            <Image src={icon} alt='icon' width={40} height={40} />
          ) : (
            icon
          )
        ) : (
          defaultIcon
        )}
      </span>
      <span
        className={cn(
          '-ml-[18px] pl-6 py-2 pr-4 flex items-center rounded-r-2xl text-xs text-[#111111]',
          classNames?.text
        )}
        style={{ backgroundColor: backgrounds?.text ?? '#D0F2EA' }}
      >
        {text}
      </span>
    </div>
  );
};

export default SpecialistBadge;
