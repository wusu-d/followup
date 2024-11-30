import React, { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type IconWithTextProps = {
  icon: ReactNode;
  text: string;
  classNames?: {
    container?: string;
    text?: string;
  };
};

const IconWithText = ({ icon, text, classNames }: IconWithTextProps) => {
  return (
    <div className={cn('flex items-center gap-2', classNames?.container)}>
      <span className='min-w-5 flex items-center'>{icon}</span>
      <p className={cn('text-white', classNames?.text)}>{text}</p>
    </div>
  );
};

export default IconWithText;
