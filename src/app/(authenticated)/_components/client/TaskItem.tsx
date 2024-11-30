import { LucideCheck } from 'lucide-react';
import { PiX } from 'react-icons/pi';

import IconButton from '@/components/buttons/IconButton';
import TaskSquareIcon from '@/components/icons/TaskSquareIcon';
import { useMarkTaskCompleteMutation } from '@/rtk-query/projects';
import logger from '@/lib/logger';
import { cn } from '@/lib/utils';

const TaskItem = ({
  title,
  desc,
  taskId,
  status,
  refetch,
}: {
  title: string;
  desc?: string;
  taskId: number;
  status: string;
  refetch: () => Promise<void>;
}) => {
  const [completeTask, { isLoading }] = useMarkTaskCompleteMutation();

  const handleClick = async () => {
    if (status === 'completed') return;
    try {
      await completeTask(`${taskId}`).unwrap();
      await refetch();
    } catch (error) {
      logger(error);
    }
  };
  return (
    <div className='bg-[#F2F5F8B2] p-4  rounded-xl'>
      <div className='flex items-center gap-4'>
        <div className='p-4 w-max aspect-square rounded-full bg-white'>
          <TaskSquareIcon className='text-[#052536]' />
        </div>

        <p className='font-bold'>{title}</p>

        <div className='ml-auto space-x-3'>
          {/* <IconButton className='rounded-full' variant='white' icon={PiX} /> */}
          <IconButton
            isLoading={isLoading}
            onClick={handleClick}
            className={cn(
              'rounded-full',
              status === 'completed' && 'bg-primary-green'
            )}
            classNames={{ icon: cn(status === 'completed' && 'text-white') }}
            variant='outline'
            icon={LucideCheck}
          />
        </div>
      </div>
      <p className='mt-[10px] text-[#6B6B6B] text-xs'>{desc}</p>
    </div>
  );
};

export default TaskItem;
