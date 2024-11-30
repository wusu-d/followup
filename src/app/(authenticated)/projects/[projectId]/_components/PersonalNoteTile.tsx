import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

import DeleteNoteButton from '@/app/(authenticated)/projects/[projectId]/_components/DeleteNoteModal';
import EditNoteIcon from '@/app/(authenticated)/projects/[projectId]/_components/EditNoteIcon';
import { useDeleteNoteMutation } from '@/rtk-query/projects';
import { Note } from '@/rtk-query/projects/types';

const PersonalNoteTile = ({
  note,
  onEdit,
  notesArray,
  setNotes,
}: {
  note: Note;
  onEdit: (noteId: number) => void;
  notesArray: Note[];
  setNotes: Dispatch<SetStateAction<Note[] | []>>;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteNote, { isLoading: isDeleteLoading }] = useDeleteNoteMutation();

  const handleDelete = async (noteId: number) => {
    try {
      const id = noteId.toString();
      await deleteNote(id).unwrap();
      setNotes(notesArray?.filter((note) => note.id !== noteId));
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  const date = new Date(note.created_at * 1000);
  const appointmentDate = `${date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;
  return (
    <div>
      <div className='flex gap-5 items-center'>
        <p className='text-[#6B6B6B] font-medium'>{appointmentDate}</p>
        <hr className='grow' />
        <div className='flex gap-[10px] items-center'>
          <EditNoteIcon onClick={() => onEdit(note.id)} />
          <DeleteNoteButton
            open={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
            isLoading={isDeleteLoading}
            onDelete={() => handleDelete(note.id)}
          />
        </div>
      </div>
      <p className='text-[#111111]'>{note.note}</p>
    </div>
  );
};

export default PersonalNoteTile;
