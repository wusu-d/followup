'use client';
import UnderlineLink from '@/components/links/UnderlineLink';

import TaskItem from '@/app/(authenticated)/_components/client/TaskItem';
import { useTaskByDateMutation } from '@/rtk-query/projects';
import { useCallback, useEffect, useState } from 'react';
import { TaskByDateResponse } from '@/rtk-query/projects/types';
import { getUTCDateString } from '@/utils/getUTCDateString';
import { FaBoxOpen } from 'react-icons/fa';

const TaskToday = () => {
  const [getTodaysTask, { isLoading }] = useTaskByDateMutation();
  const [taskData, setTaskData] = useState<TaskByDateResponse[]>([]);
  const date = getUTCDateString();

  const fetchTasks = useCallback(async () => {
    try {
      const result = await getTodaysTask({
        date,
      }).unwrap();
      setTaskData(result);
    } catch (err) {
      console.error('Failed to fetch schedule:', err);
    }
  }, [getTodaysTask, date]);

  useEffect(() => {
    // const fetchTasks = async () => {
    //   try {
    //     const result = await getTodaysTask({
    //       date,
    //     }).unwrap();
    //     setTaskData(result);
    //   } catch (err) {
    //     console.error('Failed to fetch schedule:', err);
    //   }
    // };

    fetchTasks();
  }, [getTodaysTask, date]);

  return (
    <section className='w-full'>
      <div className='flex flex-row items-center justify-between'>
        <h3>Today's Task</h3>
        <UnderlineLink variant='gray' href='/tasks'>
          See All Tasks
        </UnderlineLink>
      </div>

      <div className='flex flex-col gap-4 mt-4 h-36 overflow-y-scroll'>
        {taskData.length === 0 ? (
          <div className='flex flex-col items-center justify-center'>
            <FaBoxOpen className='text-primary-green' size={40} />
            <p className='text-[#111] font-medium'>No available task today</p>
          </div>
        ) : (
          <>
            {taskData.slice(0, 4).map((task) => {
              return (
                <TaskItem
                  key={task.id}
                  title={task.title}
                  taskId={task.id}
                  status={task.status}
                  refetch={fetchTasks}
                />
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default TaskToday;
