'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { useTaskByDateMutation } from '@/rtk-query/projects';
import { getUTCDateString } from '@/utils/getUTCDateString';
import { TaskByDateResponse } from '@/rtk-query/projects/types';
import TaskItem from '@/app/(authenticated)/_components/client/TaskItem';
import LoadingSpinner from '@/components/Spinner';
import { FaBoxOpen } from 'react-icons/fa';

const mockTasks = [
  {
    id: 36,
    project_id: 21,
    title: 'Another task title',
    description: 'Another task description',
    expected_completion_date: '2024-12-02',
    completion_date: '2024-12-02',
    added_by: 1,
    status: 'completed',
    created_at: 1729339124,
    updated_at: 1729339124,
    deleted_at: null,
    client_id: '3',
  },
  {
    id: 40,
    project_id: 24,
    title: 'Another task title',
    description: 'Another task description',
    expected_completion_date: '2024-12-02',
    completion_date: '2024-12-02',
    added_by: 1,
    status: 'completed',
    created_at: 1729490546,
    updated_at: 1729490546,
    deleted_at: null,
    client_id: '3',
  },
  {
    id: 42,
    project_id: 25,
    title: 'Another task title',
    description: 'Another task description',
    expected_completion_date: '2024-12-02',
    completion_date: '2024-12-02',
    added_by: 1,
    status: 'pending',
    created_at: 1729493086,
    updated_at: 1729493086,
    deleted_at: null,
    client_id: '3',
  },
];

const TodaysTasksPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [visibleDates, setVisibleDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [taskData, setTaskData] = useState<TaskByDateResponse[]>([]);

  const [getTodaysTask, { isLoading }] = useTaskByDateMutation();

  const fetchTasks = useCallback(async () => {
    const date = getUTCDateString(selectedDate.toDateString());
    console.log(date);
    try {
      const result = await getTodaysTask({ date }).unwrap();
      setTaskData(result);
    } catch (err) {
      console.error('Failed to fetch schedule:', err);
    }
  }, [getTodaysTask, selectedDate]);

  useEffect(() => {
    fetchTasks();
  }, [getTodaysTask, selectedDate]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const updateVisibleDates = () => {
    const dates = [];
    for (let i = -11; i <= 11; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      dates.push(date);
    }
    setVisibleDates(dates);
  };

  useEffect(() => {
    updateVisibleDates();
  }, [currentDate]);

  const scrollDays = (direction: any) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const formatDayOfWeek = (date: Date) => {
    return date.toLocaleString('default', { weekday: 'short' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div>
      <div className='w-full bg-[#E8F9F5] rounded-xl p-4'>
        {/* month */}
        <div className='w-max mx-auto flex justify-between items-center'>
          <ChevronLeft
            className='cursor-pointer'
            color='#111'
            onClick={() => changeMonth(-1)}
          />
          <span className='min-w-36 text-center font-medium text-[#111]'>
            {formatMonth(currentDate)}
          </span>
          <ChevronRight
            className='cursor-pointer'
            color='#111'
            onClick={() => changeMonth(1)}
          />
        </div>
        {/* days */}
        <div className='w-full flex items-center mt-3'>
          <ChevronLeft
            className='cursor-pointer'
            color='#111'
            onClick={() => scrollDays(-1)}
          />
          {visibleDates.map((date, index) => (
            <div
              key={index}
              className={cn(
                'flex flex-col justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer',
                isToday(date) && 'bg-white',
                selectedDate === date && 'bg-primary-green '
              )}
              onClick={() => handleDateClick(date)}
            >
              <div
                className={cn(
                  'text-[10px] text-gray-500 uppercase',
                  selectedDate === date && 'text-white'
                )}
              >
                {formatDayOfWeek(date)}
              </div>
              <div
                className={cn(
                  'flex items-center text-lg justify-center rounded-full font-medium text-[#111]',
                  selectedDate === date && 'text-white',

                  date.getMonth() !== currentDate.getMonth() && 'opacity-40'
                )}
              >
                {date.getDate()}
              </div>
            </div>
          ))}
          <ChevronRight
            className='cursor-pointer'
            color='#111'
            onClick={() => scrollDays(1)}
          />
        </div>
      </div>
      <div className='mt-8 h-[calc(100vh-280px)] overflow-y-scroll space-y-5'>
        {isLoading && (
          <div className='grid place-items-center w-full h-full'>
            <LoadingSpinner />
          </div>
        )}
        {taskData.length === 0 ? (
          <div className='flex flex-col items-center h-full w-full justify-center'>
            <FaBoxOpen className='text-primary-green' size={40} />
            <p className='text-[#111] font-medium'>No available task today</p>
          </div>
        ) : (
          taskData.map((task) => {
            return (
              <TaskItem
                key={task.id}
                title={task.title}
                desc={task.description}
                taskId={task.id}
                status={task.status}
                refetch={fetchTasks}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TodaysTasksPage;
