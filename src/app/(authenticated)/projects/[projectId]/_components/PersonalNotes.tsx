'use client';

import { useFormik } from 'formik';
import { Plus } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';

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

import PersonalNoteTile from '@/app/(authenticated)/projects/[projectId]/_components/PersonalNoteTile';
import {
  useAddNoteMutation,
  useUpdateNoteMutation,
} from '@/rtk-query/projects';
import { Note } from '@/rtk-query/projects/types';
import { Task } from '@/rtk-query/projects/types';

const PersonalNotes = ({
  notes,
  tasks,
  refetch,
}: {
  notes: Note[] | [];
  tasks: Task[] | [];
  refetch: () => void;
}) => {
  const [tasksArr, setTasksArr] = useState<Task[]>();
  const [selectedTaskId, setSelectedTaskId] = useState<number>();
  const [newNote, setNewNote] = useState('');
  const [notesArr, setNotesArr] = useState<Note[]>(notes);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [addNote, { isLoading: isAddLoading }] = useAddNoteMutation();
  const [updateNote, { isLoading: isEditLoading }] = useUpdateNoteMutation();

  const validationSchema = Yup.object({
    taskId: Yup.string().required('Please select a task'),
    notes: Yup.string().required('Please enter a note'),
  });
  // const memoizedInitializedValues = useMemo(() => {
  //   return { notes: 'Fuck this' };
  // }, [currentNote]);
  useEffect(() => {
    setNotesArr(notes);
    setTasksArr(tasks);
  }, [notes, tasks]);

  const formik = useFormik({
    initialValues: {
      notes: isEditModalOpen ? currentNote?.note || '' : newNote,
      taskId: selectedTaskId,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      if (isAddModalOpen) {
        try {
          console.log(values);
          await addNote({
            task_id: values.taskId,
            note: values.notes,
          }).unwrap();
          refetch();
          setIsAddModalOpen(false);
        } catch (error) {
          logger(error);
        }
      }
      // if (currentNote) {
      //   if (currentNote.id) {
      //     setNotesArr(
      //       notesArr.map((note) =>
      //         note.id === currentNote.id ? currentNote : note
      //       )
      //     );
      //   } else {
      //     setNotesArr([
      //       ...notesArr,
      //       { ...currentNote, id: Date.now().toString() },
      //     ]);
      //   }
      //   setIsEditModalOpen(false);
      //   setIsAddModalOpen(false);
      //   setCurrentNote(null);
      // }
      if (currentNote) {
        const noteId = currentNote ? currentNote.id.toString() : '';
        console.log(currentNote, values.notes);
        try {
          await updateNote({
            data: { note: values.notes },
            noteId,
          }).unwrap();
          const updatedNotes = notesArr?.map((note) =>
            note.id === currentNote.id ? { ...note, note: values.notes } : note
          );
          setNotesArr(updatedNotes);
          setIsEditModalOpen(false);
          setIsAddModalOpen(false);
          setCurrentNote(null);
        } catch (error) {
          toast.error('Something went wrong');
        }
      }
      console.log(notesArr);
    },
  });

  const handleValueChange = (value: string) => {
    const selectedTask = tasksArr?.find((task) => task.title === value);
    if (selectedTask) {
      setSelectedTaskId(selectedTask.id);
      formik.setFieldValue('taskId', selectedTask.id);
    }
  };

  const getInputProps = (id: keyof typeof formik.values) => {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  };

  const handleEdit = (noteId: number) => {
    const noteToEdit = notesArr?.find((note) => note.id === noteId);

    if (noteToEdit) {
      setSelectedTaskId(1);
      setCurrentNote(noteToEdit); // Set the current note
      setIsEditModalOpen(true);
    }
  };

  const handleAddNote = () => {
    // setCurrentNote({
    //   id: notesArr?.length + 1,
    //   date: new Date().toLocaleDateString('en-GB', {
    //     day: 'numeric',
    //     month: 'long',
    //     year: 'numeric',
    //   }),
    //   content: '',
    // });
    setSelectedTaskId(0);
    setNewNote('');
    formik.setFieldValue('taskId', '');
    setIsAddModalOpen(true);
  };
  return (
    <>
      <div>
        <div className='flex items-center justify-between'>
          <h4 className='text-base text-[#111] font-bold'>Personal Notes</h4>
          <span
            onClick={handleAddNote}
            className='cursor-pointer h-5 w-5 bg-[#16C098] flex items-center justify-center rounded-md'
          >
            <Plus size={16} color='white' />
          </span>
        </div>
        <div className='mt-4 space-y-5'>
          {notesArr?.map((note) => {
            return (
              <PersonalNoteTile
                key={note.id}
                note={note}
                onEdit={handleEdit}
                notesArray={notesArr}
                setNotes={setNotesArr}
              />
            );
          })}
          {/* {notesArr.map((note) => (
            <PersonalNoteTile
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))} */}
        </div>
      </div>
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
            {isAddModalOpen && (
              <div className='space-y-3 mb-5'>
                <p className='text-base font-bold text-[#111]'>Task</p>
                <Select name='taskId' onValueChange={handleValueChange}>
                  <SelectTrigger className='h-[60px] bg-[#F2F5F8] border-none rounded-[10px]'>
                    <SelectValue placeholder='Select' />
                  </SelectTrigger>
                  <SelectContent>
                    {tasksArr?.map((task) => (
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
              </div>
            )}
            <Textarea
              id='notes'
              label='Notes'
              placeholder='Add Note'
              containerClassName='w-[375px]'
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                if (currentNote) {
                  setCurrentNote({ ...currentNote, note: e.target.value });
                } else {
                  setNewNote(e.target.value);
                }
              }}
              value={formik.values.notes}
              name='notes'
              onBlur={formik.handleBlur}
              touched={formik.dirty}
              rows={5}
              required
              className='resize-none'
            />
            {/* <input value={formik.values.notes} name='notes' id='notes' /> */}
            <Button
              type='submit'
              className='w-full mt-9'
              disabled={!formik.isValid}
              isLoading={isEditLoading || isAddLoading}
            >
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PersonalNotes;
