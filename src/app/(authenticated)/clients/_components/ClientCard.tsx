import Link from 'next/link';
import { TbTargetArrow } from 'react-icons/tb';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useAppDispatch } from '@/store';

import { GetClientResponse } from '@/rtk-query/projects/types';
import { CLIENT_DETAILS, updateClientState } from '@/slices/clients.slice';

const ClientCard = ({ client }: { client: GetClientResponse }) => {
  const dispatch = useAppDispatch();
  const handleCardClick = () => {
    dispatch(updateClientState({ [CLIENT_DETAILS]: client }));
  };

  return (
    <Link
      onClick={handleCardClick}
      href={`/clients/${client.client_id}`}
      className='py-[10px] px-4 space-y-[10px] rounded-2xl border border-[#E1E1E166] bg-[#F6F8FB] flex flex-col items-center transition-all duration-300 ease-out gradient-border'
    >
      <Avatar className={cn('border-2 border-[#16C098] h-20 w-20')}>
        <AvatarImage src='/images/avatar.jpg' alt='profile image' />
        <AvatarFallback>Image</AvatarFallback>
      </Avatar>
      <p className='text-[#111] text-lg font-bold'>{client.full_name}</p>
      <div className='py-[5px] bg-[#E8F9F5] text-[#052536] rounded-[5px] self-stretch flex flex-col gap-1 items-center'>
        <span className='text-xs'>Challenge</span>
        <span className='font-bold text-sm'>{client.challenge}</span>
      </div>
      <div className='self-stretch gap-2 flex items-center justify-center bg-white py-2 px-[14px] clientCard-desc text-sm font-bold'>
        <div>
          <TbTargetArrow color='#16C098' />
        </div>
        <div>
          <span className='text-primary-green'>
            {client.progress_stage.value}%
          </span>{' '}
          {client.progress_stage.value === 100 ? 'Completed' : 'In Progress'}
        </div>
      </div>
    </Link>
  );
};

export default ClientCard;
