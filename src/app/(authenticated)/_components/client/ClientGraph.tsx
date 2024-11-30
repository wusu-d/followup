'use client';
import { ChartData } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import DashboardChartMockup from '@/components/icons/DashboardChartMockup';
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
const data: ChartData<'line', number[], string> = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: '',
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: '#16C098',
      tension: 0.5,
      pointStyle: ['', '', '', '', customImage()],
      pointRadius: 1,
    },
    {
      label: '',
      data: [25, 60, 100, 41, 30],
      fill: false,
      borderColor: '#FFA553',
      tension: 0.5,
      pointStyle: [
        customImage2(),
        customImage2(),
        customImage2(),
        customImage2(),
        customImage2(),
      ],

      pointRadius: 5,
    },
  ],
};

const ClientGraph = () => {
  return (
    <div className='bg-[#052536] grid grid-cols-[minmax(10rem,_60%)_40%] w-full rounded-[20px] p-5'>
      <div className='w-full'>
        <Line
          options={{
            scales: {
              y: {
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
          data={data}
        />
      </div>
      <div className='w-full'>
        <DashboardChartMockup className='w-full' />
      </div>
    </div>
  );
};

export default ClientGraph;
