import { useFormik } from 'formik';
import { X } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
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

import CalendarProjectIcon from '@/app/(authenticated)/projects/[projectId]/_components/CalendarProjectIcon';
import ProjectTaskTile from '@/app/(authenticated)/projects/[projectId]/_components/ProjectTaskTile';
import {
  useAddTaskMutation,
  useUpdateTaskMutation,
} from '@/rtk-query/projects';
import { Task } from '@/rtk-query/projects/types';

type AddTask = {
  date: string | Date;
  title: string;
  content: string;
};

const ProjectTasks = ({
  projectTasks,
  projectId,
}: {
  projectTasks: Task[] | [];
  projectId: string;
}) => {
  const [tasksArray, setTasksArray] = useState<Task[] | []>(projectTasks);
  const [taskId, setTaskId] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [currentTask, setCurrentTask] = useState<AddTask | null>(null);
  const [addTask, { isLoading }] = useAddTaskMutation();
  const [updateTask, { isLoading: updateIsLoading }] = useUpdateTaskMutation();

  useEffect(() => {
    setTasksArray(projectTasks);
  }, [projectTasks]);

  const formik = useFormik({
    initialValues: {
      title: currentTask?.title || '',
      date: date,
      description: currentTask?.content || '',
    },
    validationSchema: object({
      title: string()
        .min(5, 'Title must be at least 5 characters')
        .matches(
          /^[a-zA-Z0-9\s~!#$%&*\-_+=|:]+$/,
          'Title can only contain letters, numbers, spaces and ~ ! # $ % & * - _ + = | :'
        )
        .required('Title is required'),
      date: mixed().required('Date is required'),
      description: string()
        .min(10, 'Content must be at least 10 characters')
        .required('Description is required'),
    }),
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      const dDate = date && new Date(date);
      const formattedDate = dDate?.toISOString().split('T')[0];
      if (isAddModalOpen) {
        try {
          const response = await addTask({
            completion_date: formattedDate,
            description: values.description,
            title: values.title,
            project_id: parseInt(projectId),
          }).unwrap();
          const transformedTask: Task = {
            id: response?.id,
            title: values.title,
            description: values.description,
            expected_completion_date: formattedDate || '',
            status: 'pending', // default status
            created_at: Math.floor(Date.now() / 1000), // setting current timestamp as an example
            added_by: 22, // example value, replace with actual added_by ID if available
          };
          setTasksArray((prevTasks) => [...prevTasks, transformedTask]);
          setIsAddModalOpen(false);
          setCurrentTask(null);
        } catch (error) {
          logger(error);
        }
      }

      if (isEditModalOpen) {
        try {
          await updateTask({
            data: {
              title: values.title,
              completion_date: formattedDate,
              description: values.description,
            },
            taskId: `${taskId}`,
          });
          const updatedTasks = tasksArray?.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  title: values.title,
                  completion_date: formattedDate,
                  description: values.description,
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
      const editDate = new Date(taskToEdit.expected_completion_date);
      setCurrentTask({
        content: taskToEdit.description,
        date: taskToEdit.expected_completion_date,
        title: taskToEdit.title,
      });
      setDate(editDate);
      setIsEditModalOpen(true);
    }
  };

  const handleAddTask = () => {
    setDate(undefined);
    setCurrentTask({
      date: '',
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

  return (
    <>
      <div>
        <div className='space-y-5'>
          {tasksArray?.map((task) => {
            return (
              <ProjectTaskTile
                task={task}
                taskArray={tasksArray}
                setTaskArray={setTasksArray}
                onEdit={handleEditTask}
                key={task.id}
              />
            );
          })}
          {/* {tasks.map((task) => (
            <ProjectTaskTile
              task={task}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              key={task.id}
            />
          ))} */}
        </div>
        <div className='ml-auto w-max mt-6'>
          <Button onClick={handleAddTask} className='px-16'>
            Add Task
          </Button>
        </div>
      </div>
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
              <div>
                <Input
                  id='title'
                  label='Title'
                  placeholder='Add Title'
                  required
                  {...getInputProps('title')}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (currentTask)
                      setCurrentTask({ ...currentTask, title: e.target.value });
                  }}
                />
              </div>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className='relative'>
                      <Input
                        id='date'
                        {...getInputProps('date')}
                        label='Expected Completion Date'
                        placeholder='Select Date'
                        value={date ? taskDate : ''}
                        readOnly
                        className='pr-10'
                      />
                      <Button
                        variant='ghost'
                        className='absolute right-0 top-4 h-full'
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
              id='description'
              label='Description'
              placeholder='Add Description'
              containerClassName='w-full'
              {...getInputProps('description')}
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
                isLoading={isLoading || updateIsLoading}
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

export default ProjectTasks;
