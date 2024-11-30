import { useState } from 'react';
import { BiSolidPlusSquare } from 'react-icons/bi';

import AddTaskDialog from '@/app/(authenticated)/clients/[clientId]/add-project/_components/AddTaskDialog';
import TaskIcon from '@/app/(authenticated)/clients/[clientId]/add-project/_components/TaskIcon';

const AddTasks = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsAddModalOpen(false);
  };
  const handleAddTask = () => {
    setIsAddModalOpen(true);
  };
  return (
    <>
      <div
        onClick={handleAddTask}
        className='cursor-pointer relative mx-auto w-[150px] flex items-center justify-center h-[150px] border border-primary-green bg-[#16C09814] rounded-full'
      >
        <TaskIcon />
        <div className='absolute bottom-0 right-0 h-[50px] w-[50px] bg-[#052536] rounded-full flex items-center justify-center'>
          <BiSolidPlusSquare size={24} color='#16C098' />
        </div>
      </div>
      <AddTaskDialog isAddModalOpen={isAddModalOpen} closeModal={closeModal} />
    </>
  );
};

export default AddTasks;
