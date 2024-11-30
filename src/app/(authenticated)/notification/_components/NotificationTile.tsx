import logger from '@/lib/logger';
import { cn } from '@/lib/utils';

import NotificationIcon from '@/components/icons/NotificationIcon';

import { useMarkAsSeenMutation } from '@/rtk-query/notifications';

const NotificationTile = ({
  id,
  active,
  note,
  refetch,
  timeAgo,
}: {
  id: number;
  active: boolean;
  note: string;
  refetch: () => void;
  timeAgo: string;
}) => {
  const [markAsSeen] = useMarkAsSeenMutation();

  const handleNotificationClick = async () => {
    if (active) {
      try {
        await markAsSeen({ id: [id] }).unwrap();
        refetch();
      } catch (error) {
        logger(error);
      }
    }
  };
  return (
    <div
      className={cn(
        'cursor-pointer border border-[#e1e1e1] grid grid-cols-[auto,1fr] gap-[105px] rounded-xl p-4 pr-5',
        active && 'border-[#16C098] bg-[#16C09814]'
      )}
      onClick={handleNotificationClick}
    >
      <div className='flex items-center gap-2'>
        <div className='h-[50px] w-[50px] border-2 grid place-items-center border-[#16C098] rounded-xl relative'>
          <NotificationIcon />
        </div>
        <p className='text-[#111]'>{note}</p>
      </div>
      <span className='text-[#6B6B6B] text-sm flex justify-end'>{timeAgo}</span>
    </div>
  );
};

export default NotificationTile;
