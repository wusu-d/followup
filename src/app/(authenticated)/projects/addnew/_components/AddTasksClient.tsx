import { useFormik } from 'formik';
import { X } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { BiSolidPlusSquare } from 'react-icons/bi';
import { mixed, object, string } from 'yup';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

import { useAppDispatch } from '@/store';

import TaskIcon from '@/app/(authenticated)/clients/[clientId]/add-project/_components/TaskIcon';
import CalendarProjectIcon from '@/app/(authenticated)/projects/[projectId]/_components/CalendarProjectIcon';
import AddTaskTile from '@/app/(authenticated)/projects/addnew/_components/AddTaskTile';
import Back from '@/app/(onboarding)/_components/Back';
import {
  nextStep,
  prevStep,
  updateAddProjectClientState,
} from '@/slices/addproject-client';

type AddTask = {
  id: number;
  date: Date;
  title: string;
  content: string;
};

const AddTasksClient = () => {
  const dispatch = useAppDispatch();
  const [stage, setStage] = useState<number>(1);
  const [tasksArray, setTasksArray] = useState<AddTask[] | []>([]);

  const [taskId, setTaskId] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [currentTask, setCurrentTask] = useState<AddTask | null>(null);

  useEffect(() => {
    if (tasksArray.length === 0) setStage(1);
  }, [tasksArray.length]);

  const formik = useFormik({
    initialValues: {
      title: currentTask?.title || '',
      date: date,
      content: currentTask?.content || '',
    },
    validationSchema: object({
      title: string()
        .min(5, 'Enter a valid title')
        .matches(
          /^[a-zA-Z0-9\s~!#$%&*\-_+=|:]+$/,
          'Title can only contain letters, numbers, spaces and ~ ! # $ % & * - _ + = | :'
        )
        .required('Title is required'),
      date: mixed().required('Date is required'),
      content: string()
        .min(10, 'Enter a valid description')
        .required('Description is required'),
    }),
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      const dDate = date && new Date(date);
      const formattedDate = dDate?.toISOString().split('T')[0];
      if (isAddModalOpen) {
        try {
          setTasksArray((prev) => [
            ...prev,
            {
              id: tasksArray.length + 1,
              content: values.content,
              title: values.title,
              date: values.date ? new Date(values.date) : new Date(),
            },
          ]);
          setIsAddModalOpen(false);
          setStage(2);
          setCurrentTask(null);
        } catch (error) {
          logger(error);
        }
      }

      if (isEditModalOpen) {
        try {
          const updatedTasks = tasksArray?.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  title: values.title,
                  date: values.date ? new Date(values.date) : new Date(),
                  content: values.content,
                }
              : task
          );
          setTasksArray(updatedTasks);
          setIsEditModalOpen(false);
          setCurrentTask(null);
        } catch (error) {
          logger(error);
        }
      }
    },
  });

  const getInputProps = (id: keyof typeof formik.values) => {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleEditTask = (id: number) => {
    setTaskId(id);
    const taskToEdit = tasksArray?.find((task) => task.id === id);

    if (taskToEdit) {
      const editDate = new Date(taskToEdit.date);
      setCurrentTask({
        id: taskToEdit.id,
        content: taskToEdit.content,
        date: editDate,
        title: taskToEdit.title,
      });
      setDate(editDate);
      setIsEditModalOpen(true);
    }
  };

  const handleAddTask = () => {
    setDate(undefined);
    setCurrentTask({
      id: tasksArray.length + 1,
      date: new Date(),
      title: '',
      content: '',
    });
    setIsAddModalOpen(true);
  };

  const dDate = date && new Date(date);

  const taskDate = `${dDate?.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;

  const isPastDate = (day: Date) => {
    return day < new Date(new Date().setHours(0, 0, 0, 0));
  };

  const goBack = () => {
    dispatch(updateAddProjectClientState({ stage: 'summary' }));
    dispatch(prevStep());
  };

  const handleDone = () => {
    dispatch(
      updateAddProjectClientState({ tasks: tasksArray, stage: 'notes' })
    );
    dispatch(nextStep());
  };

  return (
    <>
      <Back onClick={goBack} />
      {stage === 1 && (
        <div className='relative'>
          <div className=' relative mx-auto w-[150px] flex items-center justify-center h-[150px] border border-primary-green bg-[#16C09814] rounded-full'>
            <TaskIcon />
            <div
              onClick={handleAddTask}
              className='cursor-pointer absolute bottom-0 right-0 h-[50px] w-[50px] bg-[#052536] rounded-full flex items-center justify-center'
            >
              <BiSolidPlusSquare size={24} color='#16C098' />
            </div>
          </div>
          <p className='text-center font-bold text-lg text-[#111] mt-5 mb-20'>
            Add Tasks
          </p>
        </div>
      )}
      {stage === 2 && (
        <div>
          <div className='space-y-5'>
            {tasksArray.map((task) => (
              <AddTaskTile
                task={task}
                taskArray={tasksArray}
                setTaskArray={setTasksArray}
                onEdit={handleEditTask}
                key={task.id}
              />
            ))}
          </div>
          <div className='ml-auto w-max mt-6 flex gap-4 items-center'>
            <Button onClick={handleAddTask} className='px-8'>
              Add Task
            </Button>
            <Button onClick={handleDone} className='px-16'>
              Done
            </Button>
          </div>
        </div>
      )}
      <Dialog
        open={isAddModalOpen || isEditModalOpen}
        onOpenChange={closeModal}
      >
        <DialogContent className='rounded-2xl max-w-3xl p-10 border-none outline-none'>
          <span
            onClick={closeModal}
            className='cursor-pointer absolute top-5 right-5 h-10 w-10 border[#05253666] border rounded-full flex items-center justify-center'
          >
            <X color='#052536' strokeWidth={1.5} />
          </span>
          <DialogTitle className='text-[28px] text-[#111] font-bold mb-5 text-center'>
            {isAddModalOpen ? 'Add Task' : 'Edit Task'}
          </DialogTitle>
          <form onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-2 mb-5 gap-3'>
              <div className=''>
                <Input
                  id='title'
                  label='Title'
                  placeholder='Add Title'
                  required
                  {...getInputProps('title')}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (currentTask)
                      setCurrentTask({ ...currentTask, title: e.target.value });
                    // formik.handleChange(e);
                  }}
                />
              </div>
              <div className=''>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className='relative cursor-pointer'>
                      <Input
                        id='date'
                        {...getInputProps('date')}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          console.log(e.target.value);
                        }}
                        label='Expected Completion Date'
                        placeholder='Select Date'
                        value={date ? taskDate : ''}
                        readOnly
                        className='pr-10 cursor-pointer'
                      />
                      <Button
                        variant='ghost'
                        className='absolute right-0 top-1/2 h-full -translate-y-1/2'
                      >
                        <CalendarProjectIcon />
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      onSelect={setDate}
                      selected={date}
                      disabled={isPastDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Textarea
              id='content'
              label='Description'
              placeholder='Add Description'
              containerClassName='w-full'
              {...getInputProps('content')}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                if (currentTask)
                  setCurrentTask({ ...currentTask, content: e.target.value });
              }}
              rows={5}
              required
              className='resize-none'
            />
            <div className='w-max mx-auto'>
              <Button
                type='submit'
                className='w-max px-32 mt-9'
                disabled={!formik.isValid}
                isLoading={false}
              >
                {isAddModalOpen ? 'Add Task' : 'Save'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTasksClient;
