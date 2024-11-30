'use client';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import DashboardChartMockup from '@/components/icons/DashboardChartMockup';
import LoadingSpinner from '@/components/Spinner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useGetProjectsGraphQuery } from '@/rtk-query/projects';
import { GraphPoints, ProjectItem } from '@/rtk-query/projects/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Function to generate data based on selected graph_points
const generateChartData = (graph_points: GraphPoints) => {
  // Extract unique dates from completed and pending tasks
  const uniqueDates = [
    ...new Set([
      ...Object.keys(graph_points.completed_tasks),
      ...Object.keys(graph_points.pending_tasks),
    ]),
  ];

  // Sort the dates in ascending order
  uniqueDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // Add future dates if less than 5 dates
  if (uniqueDates.length < 5) {
    const lastDate =
      uniqueDates.length > 0
        ? new Date(uniqueDates[uniqueDates.length - 1])
        : new Date();

    while (uniqueDates.length < 5) {
      lastDate.setDate(lastDate.getDate() + 1);
      uniqueDates.push(lastDate.toISOString().split('T')[0]);
    }
  }

  // Format the dates for display
  const formattedDates = uniqueDates.map((date) => {
    const dateObj = new Date(date);
    // Add one day to fix the date display
    dateObj.setDate(dateObj.getDate() + 1);
    return dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    });
  });

  // Create datasets for completed and pending tasks
  const completedTasks = uniqueDates.map((date) => {
    const completedTasksForDate = graph_points.completed_tasks[date] ?? 0;
    return completedTasksForDate;
  });

  const pendingTasks = uniqueDates.map(
    (date) => graph_points.pending_tasks[date] ?? 0
  );

  return {
    labels: formattedDates,
    datasets: [
      {
        label: 'Completed Tasks',
        data: completedTasks,
        borderColor: '#16C098',
        fill: false,
        tension: 0.5,
        pointStyle: customImage(),
        pointRadius: 1,
      },
      {
        label: 'Pending Tasks',
        data: pendingTasks,
        borderColor: '#FFA553',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: false,
        tension: 0.5,
        pointStyle: customImage2(),
        pointRadius: 5,
      },
    ],
  };
};

const customImage = () => {
  const image = new Image();
  image.src = '/images/custom-chart-point.png';
  image.width = 10;
  image.height = 10;
  return image;
};

const customImage2 = () => {
  const image = new Image();
  image.src = '/images/custom-chart-point-2.png';
  image.width = 10;
  image.height = 10;
  return image;
};

const TaskChart = () => {
  const { data, isLoading } = useGetProjectsGraphQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [selectedItem, setSelectedItem] = useState<ProjectItem | undefined>(
    undefined
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedItem(data[0]);
    }
  }, [data]);

  // Event handler to update selected item
  const handleSelectChange = (value: string) => {
    const selectedId = parseInt(value, 10);
    const selected = data?.find((item) => item.id === selectedId);
    setSelectedItem(selected);
  };

  return (
    <div className='bg-[#052536] w-full rounded-[20px] p-5  '>
      {isLoading ? (
        <div className='flex items-center justify-center w-full h-full min-h-[300px]'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {data?.length && (
            <Select
              onValueChange={handleSelectChange}
              value={selectedItem?.id.toString()}
            >
              <SelectTrigger
                iconColor='#16C098'
                className='mb-4 outline-none bg-transparent w-[200px] text-primary-green font-bold border-none'
              >
                <SelectValue placeholder='Select a project' />
              </SelectTrigger>
              <SelectContent className='w-max'>
                {data?.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.id.toString()}
                    className='pr-4 text-[#111] font-semibold text-xs'
                  >
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <div className='grid grid-cols-[minmax(10rem,_60%)_40%] w-full'>
            {!data?.length ? (
              <div className='flex items-center justify-center w-full h-full min-h-[300px]'>
                <p className='text-primary-green font-medium'>
                  Your projects overview will appear here
                </p>
              </div>
            ) : (
              <div className='w-full'>
                {selectedItem && (
                  <Line
                    data={generateChartData(selectedItem.graph_points)}
                    options={{
                      scales: {
                        y: {
                          min: 0,
                          max: 10,
                          title: {
                            display: true,
                            text: 'T  A  S  K  S',
                            color: '#FFA553',
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      elements: {
                        line: {
                          tension: 0,
                        },
                      },

                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                )}
              </div>
            )}
            <div className='w-full'>
              <DashboardChartMockup className='w-full' />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskChart;
