'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useAppDispatch } from '@/store';

import { setServiceArrayState } from '@/slices/book-appointment.slice';
import { formatToCurrency } from '@/utils/forrmatCurrency';

type SpecialistCardPropType = {
  specialist: {
    consultation_charge: number;
    full_name?: string;
    profession: string;
    service_charge: number;
    qualifications?: string;
    service_id?: number;
    professional_name: string;
    profile_image: string;
    user_id: number;
  };
};

const SpecialistCard = ({ specialist }: SpecialistCardPropType) => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const setServiceArray = () => {
    // dispatch(updateSpecialistState({ provider_id: specialist.user_id }));

    dispatch(
      setServiceArrayState({
        consultationCharge: specialist.consultation_charge,
        serviceCharge: specialist.service_charge,
      })
    );
  };

  return (
    <Link
      onClick={setServiceArray}
      className='transition-all duration-300 ease-out gradient-border flex flex-col items-center gap-[10px] bg-[#F6F8FB] border-[#E1E1E14D] rounded-2xl py-[10px] px-[17px]'
      href={`${pathName}/${specialist.user_id}`}
      style={{
        border: '1.5px solid',
        borderImage:
          'linear-gradient(155.5deg, #0DDEAD -5.84%, rgba(41, 163, 155, 0.92) 48.04%, #005459 104.21%)',
      }}
    >
      <Avatar className={cn('border-2 border-[#16C098] h-20 w-20')}>
        <AvatarImage src={specialist.profile_image} alt='profile image' />
        <AvatarFallback>Image</AvatarFallback>
      </Avatar>
      <p className='text-lg font-bold text-center text-[#111111]'>
        {specialist.professional_name}
      </p>
      <div className='self-stretch grid gap-x-[10px] grid-cols-2 text-[12px]'>
        <span
          title={specialist.profession}
          className='flex justify-center px-2 bg-[#16C098] items-center text-white text-center rounded-[5px]'
        >
          <p>{specialist.profession}</p>
        </span>
        <span className='outline flex justify-center items-center text-center bg-[#052536] text-white rounded-[5px]'>
          Hybrid
        </span>
      </div>
      <div className='self-stretch py-1 bg-[#0525361A] border border-[#E1E1E14D] rounded-[5px] flex flex-col items-center'>
        <span className='text-sm text-[#052536] font-bold'>
          {formatToCurrency(specialist.service_charge)}
        </span>
        <span className='text-[#052536] text-xs'>Service Charge</span>
      </div>
      <div className='self-stretch py-1 bg-[#E8F9F5] border border-[#E1E1E14D] rounded-[5px] flex flex-col items-center'>
        <span
          className={cn(
            'text-[#27AE60] font-bold text-sm',
            specialist.consultation_charge && 'text-[#052536]'
          )}
        >
          {!specialist.consultation_charge
            ? 'Free'
            : formatToCurrency(specialist.consultation_charge)}
        </span>
        <span>Consultation Charge</span>
      </div>
    </Link>
  );
};

export default SpecialistCard;
