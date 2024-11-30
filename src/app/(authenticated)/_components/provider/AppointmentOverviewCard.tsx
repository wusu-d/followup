import React, { ReactNode } from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

const AppointmentOverviewCard = ({
  icon,
  description,
  amount,
}: {
  icon: ReactNode;
  description: string;
  amount: number;
}) => {
  return (
    <Card className='grow border border-[#D0F2EA] bg-[#F2F5F8] rounded-2xl cursor-pointer'>
      <CardHeader>
        <div className='flex items-end justify-between'>
          <span className='text-4xl block font-bold text-[#16C098]'>
            {amount.toString().padStart(2, '0')}
          </span>
          <div className='w-16 h-16 rounded-[10px] bg-[#052536] flex items-center justify-center'>
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='font-bold text-lg text-black'>{description}</p>
      </CardContent>
    </Card>
  );
};

export default AppointmentOverviewCard;
