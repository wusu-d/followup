import React, { Dispatch, SetStateAction, useState } from 'react';

import logger from '@/lib/logger';

import CalendarIcon from '@/components/icons/CalendarIcon';
import TaskSquareIcon from '@/components/icons/TaskSquareIcon';

import DeleteTaskButton from '@/app/(authenticated)/projects/[projectId]/_components/DeleteTaskButton';
import EditNoteIcon from '@/app/(authenticated)/projects/[projectId]/_components/EditNoteIcon';
import { useDeleteTaskMutation } from '@/rtk-query/projects';
import { Task } from '@/rtk-query/projects/types';

const ProjectTaskTile = ({
  task,
  onEdit,
  taskArray,
  setTaskArray,
}: {
  task: Task;
  onEdit: (taskId: number) => void;
  taskArray: Task[] | [];
  setTaskArray: Dispatch<SetStateAction<[] | Task[]>>;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTask, { isLoading: isDeleteLoading }] = useDeleteTaskMutation();

  const date = new Date(task.created_at * 1000);
  const taskDate = `${date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(`${taskId}`).unwrap();
      setTaskArray(taskArray.filter((task) => task.id !== taskId));
      setIsDeleteModalOpen(false);
    } catch (error) {
      logger(error);
    }
  };
  return (
    <div className='space-y-3 rounded-xl bg-[#F6F8FB] px-5 py-[10px]'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-4'>
          <span className='w-10 h-10 rounded-full flex items-center bg-white justify-center'>
            <TaskSquareIcon className='text-[#052536]' />
          </span>
          <div>
            <h1 className='text-base font-bold text-[#052536]'>{task.title}</h1>
            <div className='flex items-center gap-1 mt-1'>
              <CalendarIcon width='18' height='18' />
              <p className='text-[#111] text-xs'>{taskDate}</p>
            </div>
          </div>
        </div>
        <div className='flex gap-[10px] items-center'>
          <EditNoteIcon onClick={() => onEdit(task.id)} />
          <DeleteTaskButton
            open={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
            isLoading={isDeleteLoading}
            onDelete={() => handleDelete(task.id)}
          />
        </div>
      </div>
      <p className='text-xs text-[#6B6B6B]'>{task.description}</p>
    </div>
  );
};

export default ProjectTaskTile;
