'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

import { cn } from '@/lib/utils';

import { useAppSelector } from '@/store';

import AddNoteClient from '@/app/(authenticated)/projects/addnew/_components/AddNoteClient';
import AddSummaryClient from '@/app/(authenticated)/projects/addnew/_components/AddSummaryClient';
import AddTasksClient from '@/app/(authenticated)/projects/addnew/_components/AddTasksClient';
import {
  ADD_PROJECT_CLIENT_SLICE_REDUCER_NAME,
  AddProjectClientStageType,
} from '@/slices/addproject-client';

const stagesComponent: Record<AddProjectClientStageType, JSX.Element> = {
  summary: <AddSummaryClient />,
  tasks: <AddTasksClient />,
  notes: <AddNoteClient />,
  documents: <></>,
};
const AddProjectClient = () => {
  const { stage, currentStep } = useAppSelector(
    (state) => state[ADD_PROJECT_CLIENT_SLICE_REDUCER_NAME]
  );

  const steps = ['Summary', 'Tasks', 'Notes'];

  return (
    <div className='relative'>
      <div className='w-full max-w-md mx-auto p-6 '>
        <div className='relative flex justify-between mb-8'>
          {/* Progress Bar */}
          <div className='absolute top-[30%] transform -translate-y-[30%] h-[10px] bg-[#D0F2EA] w-[90%] mx-auto left-[5%] -z-10'></div>
          <div
            className='absolute top-[30%] transform -translate-y-[30%] h-[10px] bg-primary-green -z-10 transition-all duration-500 w-[90%] mx-auto left-[5%]'
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 90}%`,
            }}
          ></div>

          {/* Steps */}
          {steps.map((step, index) => (
            <div key={index} className='flex flex-col items-center'>
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex font-bold items-center justify-center mb-2 bg-[#DADEE1] text-[#052536]',
                  [index + 1 <= currentStep && 'bg-primary-green text-white']
                  // [index + 1 === 1 && 'bg-[#052536] text-white']
                )}
              >
                {index + 1 > currentStep ? index + 1 : <FaCheck />}
              </div>
              <span
                className={`text-sm font-bold ${
                  index + 1 <= currentStep
                    ? 'text-[#052536] '
                    : 'text-[#DADEE1]'
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence mode='popLayout'>
        <motion.div
          key={currentStep}
          className='max-w-[950px] mx-auto mt-7'
          {...{
            initial: { opacity: 0, x: 50 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 50 },
            transition: { duration: 0.25, ease: 'easeOut' },
          }}
        >
          {stagesComponent[stage]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AddProjectClient;
