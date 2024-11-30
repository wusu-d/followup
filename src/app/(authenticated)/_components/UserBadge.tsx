import React from 'react';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type UserBadgeProps = {
  textColor?: string;
  username?: string;
  imgSrc: string;
  imgClassNames?: string;

  desc?: string;
};

const UserBadge = ({
  textColor,
  username,
  imgSrc,
  imgClassNames,
  desc,
}: UserBadgeProps) => {
  return (
    <div className='flex items-center gap-3'>
      <Avatar className={cn('border-2 border-[#16C098]', imgClassNames)}>
        <AvatarImage src={imgSrc} alt='profile image' />
        <AvatarFallback>Image</AvatarFallback>
      </Avatar>
      <div>
        <h1 className={cn('text-lg font-bold text-white', textColor)}>
          {username}
        </h1>
        <p className={cn('text-[#6B6B6B] font-bold text-lg capitalize')}>
          {desc}
        </p>
      </div>
    </div>
  );
};

export default UserBadge;
