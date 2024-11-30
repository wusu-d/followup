import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { BiSolidPlusSquare } from 'react-icons/bi';
import { object, string } from 'yup';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useAppDispatch, useAppSelector } from '@/store';

import TaskIcon from '@/app/(authenticated)/clients/[clientId]/add-project/_components/TaskIcon';
import AddNoteTile from '@/app/(authenticated)/projects/addnew/_components/AddNoteTile';
import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';
import Back from '@/app/(onboarding)/_components/Back';
import { useCreateProjectMutation } from '@/rtk-query/projects';
import {
  ADD_PROJECT_CLIENT_DESCRIPTION,
  ADD_PROJECT_CLIENT_GOAL,
  ADD_PROJECT_CLIENT_IMAGE,
  ADD_PROJECT_CLIENT_SLICE_REDUCER_NAME,
  ADD_PROJECT_CLIENT_TASKS,
  ADD_PROJECT_CLIENT_TITLE,
  nextStep,
  prevStep,
  updateAddProjectClientState,
} from '@/slices/addproject-client';

type AddNote = {
  id: number;
  title: string;
  date: Date;
  note: string;
};

const AddNoteClient = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [stage, setStage] = useState<number>(1);
  const [notesArray, setNotesArray] = useState<AddNote[]>([]);
  const [noteId, setNoteId] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<AddNote | null>(null);
  const {
    [ADD_PROJECT_CLIENT_TASKS]: tasks,
    [ADD_PROJECT_CLIENT_DESCRIPTION]: description,
    [ADD_PROJECT_CLIENT_GOAL]: goal,
    [ADD_PROJECT_CLIENT_IMAGE]: photo,
    [ADD_PROJECT_CLIENT_TITLE]: title,
  } = useAppSelector((state) => state[ADD_PROJECT_CLIENT_SLICE_REDUCER_NAME]);
  const [createProject, { isLoading }] = useCreateProjectMutation();

  useEffect(() => {
    if (notesArray.length === 0) setStage(1);
  }, [notesArray.length]);

  const formik = useFormik({
    initialValues: {
      notes: currentNote?.note || '',
      taskTitle: currentNote?.title || '',
    },
    validationSchema: object({
      taskTitle: string().required('Please select a task'),
      notes: string()
        .min(10, 'Notes must be at least 10 characters')
        .required('Notes are required'),
    }),
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      if (isAddModalOpen) {
        const existingNoteIndex = notesArray.findIndex(
          (note) => note.title === values.taskTitle
        );

        if (existingNoteIndex !== -1) {
          const updatedNotes = [...notesArray];
          updatedNotes[existingNoteIndex] = {
            ...updatedNotes[existingNoteIndex],
            note: values.notes,
            date: new Date(),
          };
          setNotesArray(updatedNotes);
        } else {
          setNotesArray((prev) => [
            ...prev,
            {
              id: notesArray.length + 1,
              title: values.taskTitle,
              date: currentNote?.date ?? new Date(),
              note: values.notes,
            },
          ]);
        }
        setIsAddModalOpen(false);
        setStage(2);
        setCurrentNote(null);
      }
      if (isEditModalOpen) {
        const updatedNotes = notesArray?.map((note) =>
          note.id === noteId
            ? {
                ...note,
                title: currentNote?.title ?? '',
                date: currentNote?.date ?? new Date(),
                note: values.notes,
              }
            : note
        );
        setNotesArray(updatedNotes);
        setIsEditModalOpen(false);
        setCurrentNote(null);
      }
    },
  });

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleEditTask = (id: number) => {
    setNoteId(id);
    const noteToEdit = notesArray.find((note) => note.id === id);

    if (noteToEdit) {
      setCurrentNote({
        id: noteToEdit.id,
        note: noteToEdit.note,
        date: new Date(),
        title: noteToEdit.title,
      });

      setIsEditModalOpen(true);
    }
  };

  const handleAddNote = () => {
    setCurrentNote({
      id: notesArray.length + 1,
      date: new Date(),
      note: '',
      title: '',
    });
    setIsAddModalOpen(true);
  };

  const goBack = () => {
    dispatch(updateAddProjectClientState({ stage: 'tasks' }));
    dispatch(prevStep());
  };

  const handleDone = async () => {
    if (session?.user_groups.includes(RolesEnum.SERVICE_PROVIDER)) {
      dispatch(
        updateAddProjectClientState({ stage: 'documents', notes: notesArray })
      );
      dispatch(nextStep());
    } else {
      try {
        const data = new FormData();

        data.append('image', photo[0]);
        data.append('title', title);
        data.append('goal', goal);
        data.append('description', description);
        tasks.forEach((task, index) => {
          // Append task fields
          data.append(`tasks[${index}][title]`, task.title);
          data.append(
            `tasks[${index}][completion_date]`,
            task.date.toISOString().split('T')[0]
          );
          data.append(`tasks[${index}][description]`, task.content);

          // Find the note that matches the task title
          const matchingNote = notesArray.find(
            (note) => note.title === task.title
          );
          if (matchingNote) {
            data.append(`tasks[${index}][note]`, matchingNote.note);
          } else {
            data.append(`tasks[${index}][note]`, ''); // If no note, leave it blank
          }
        });

        await createProject(data).unwrap();
        router.push('/projects');
      } catch (error) {
        logger(error);
      }
    }
  };

  const handleValueChange = (value: string) => {
    const selected = tasks.find((task) => task.title === value);
    formik.setFieldValue('taskTitle', value);

    const existingNote = notesArray.find((note) => note.title === value);
    if (existingNote) {
      formik.setFieldValue('notes', existingNote.note);
      if (currentNote) {
        setCurrentNote({
          ...currentNote,
          title: value,
          id: selected?.id ?? 0,
          note: existingNote.note,
        });
      }
    } else {
      formik.setFieldValue('notes', '');
      if (currentNote) {
        setCurrentNote({
          ...currentNote,
          title: value,
          id: selected?.id ?? 0,
          note: '',
        });
      }
    }
  };

  return (
    <>
      <Back onClick={goBack} />
      {stage === 1 && (
        <div>
          <div className=' relative mx-auto w-[150px] flex items-center justify-center h-[150px] border border-primary-green bg-[#16C09814] rounded-full'>
            <TaskIcon />
            <div
              onClick={handleAddNote}
              className='cursor-pointer absolute bottom-0 right-0 h-[50px] w-[50px] bg-[#052536] rounded-full flex items-center justify-center'
            >
              <BiSolidPlusSquare size={24} color='#16C098' />
            </div>
          </div>
          <p className='text-center font-bold text-lg text-[#111] mt-5 mb-20'>
            Add Notes
          </p>
        </div>
      )}
      {stage === 2 && (
        <div>
          <div className='space-y-5'>
            {notesArray.map((note) => (
              <AddNoteTile
                note={note}
                onEdit={handleEditTask}
                notesArray={notesArray}
                setNotes={setNotesArray}
                key={note.id}
              />
            ))}
          </div>
          <div className='ml-auto w-max mt-6 flex gap-4 items-center'>
            <Button onClick={handleAddNote} className='px-8'>
              Add Note
            </Button>
            <Button
              isLoading={isLoading}
              onClick={handleDone}
              className='px-16'
            >
              Done
            </Button>
          </div>
        </div>
      )}
      <Dialog
        open={isAddModalOpen || isEditModalOpen}
        onOpenChange={() => {
          setIsEditModalOpen(false);
          setIsAddModalOpen(false);
          setCurrentNote(null);
        }}
      >
        <DialogContent className='rounded-2xl w-max p-10 border-none outline-none'>
          <DialogTitle className='text-[28px] text-[#111] font-bold mb-9 text-center'>
            {isAddModalOpen ? 'Add Notes' : 'Edit Note'}
          </DialogTitle>

          <form onSubmit={formik.handleSubmit}>
            <div className='space-y-3 mb-5'>
              <p className='text-base font-bold text-[#111]'>Task</p>
              <Select
                value={formik.values.taskTitle}
                onValueChange={handleValueChange}
              >
                <SelectTrigger
                  className={`h-[60px] bg-[#F2F5F8] border-none rounded-[10px] ${
                    formik.touched.taskTitle && formik.errors.taskTitle
                      ? 'border-red-500'
                      : ''
                  }`}
                >
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map((task) => (
                    <SelectItem
                      key={task.title}
                      value={task.title}
                      className='py-4'
                    >
                      {task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.taskTitle && formik.errors.taskTitle && (
                <p className='text-red-500 text-sm'>
                  {formik.errors.taskTitle}
                </p>
              )}
            </div>
            <Textarea
              id='notes'
              label='Notes'
              placeholder='Add Note'
              containerClassName='w-[375px]'
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                formik.handleChange(e);
                if (currentNote) {
                  setCurrentNote({ ...currentNote, note: e.target.value });
                }
              }}
              value={formik.values.notes}
              name='notes'
              onBlur={formik.handleBlur}
              touched={formik.touched.notes}
              error={formik.touched.notes ? formik.errors.notes : undefined}
              rows={5}
              required
              className={`resize-none`}
            />

            <Button
              type='submit'
              className='w-full mt-9'
              disabled={!formik.isValid}
            >
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNoteClient;
