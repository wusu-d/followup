import { X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { BiSolidPlusSquare } from 'react-icons/bi';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';

import { useAppDispatch, useAppSelector } from '@/store';

import TaskIcon from '@/app/(authenticated)/clients/[clientId]/add-project/_components/TaskIcon';
import Back from '@/app/(onboarding)/_components/Back';
import { useCreateProjectMutation } from '@/rtk-query/projects';
import {
  ADD_PROJECT_CLIENT_DESCRIPTION,
  ADD_PROJECT_CLIENT_GOAL,
  ADD_PROJECT_CLIENT_IMAGE,
  ADD_PROJECT_CLIENT_NOTES,
  ADD_PROJECT_CLIENT_SLICE_REDUCER_NAME,
  ADD_PROJECT_CLIENT_TASKS,
  ADD_PROJECT_CLIENT_TITLE,
  prevStep,
  updateAddProjectClientState,
} from '@/slices/addproject-client';
import { compressImage } from '@/utils/compress-image.utils';

type FileWithPreview = {
  file: File;
  preview: string;
  id: string;
};

const AddDocuments = ({ maxFiles = 8 }: { maxFiles?: number }) => {
  const pathname = usePathname();
  const newPathname = pathname.split('/').slice(0, -1).join('/');
  const clientId = pathname.split('/')[2];

  const router = useRouter();
  const [stage, setStage] = useState<number>(1);
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [error, setError] = useState<string | null>(null);
  const {
    [ADD_PROJECT_CLIENT_TASKS]: tasks,
    [ADD_PROJECT_CLIENT_DESCRIPTION]: description,
    [ADD_PROJECT_CLIENT_GOAL]: goal,
    [ADD_PROJECT_CLIENT_IMAGE]: photo,
    [ADD_PROJECT_CLIENT_TITLE]: title,
    [ADD_PROJECT_CLIENT_NOTES]: notesArray,
  } = useAppSelector((state) => state[ADD_PROJECT_CLIENT_SLICE_REDUCER_NAME]);
  // const { [CLIENT_DETAILS]: client } = useAppSelector(
  //   (state) => state[CLIENTS_SLICE_REDUCER_NAME]
  // );

  const goBack = () => {
    dispatch(updateAddProjectClientState({ stage: 'notes' }));
    dispatch(prevStep());
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const validFiles = selectedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );

    const newFiles = await Promise.all(
      validFiles.map(async (file) => {
        let processedFile: File;
        let preview: string;

        if (file.type.startsWith('image/')) {
          // Apply compression for image files
          const compressedFile = await compressImage(file);
          // If compression fails, use original file
          processedFile = compressedFile || file;
          preview = URL.createObjectURL(processedFile);
        } else if (file.type === 'application/pdf') {
          processedFile = file;
          preview = '/images/projectcard.png';
        } else {
          processedFile = file;
          preview = '/api/placeholder/100/100';
        }

        return {
          file: processedFile,
          preview,
          id: Math.random().toString(36).substr(2, 9),
        };
      })
    );

    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setSelectedFiles((prev) => {
      const updatedFiles = prev.filter((file) => file.id !== id);
      // Cleanup preview URLs
      prev.forEach((file) => {
        if (file.id === id && file.file.type.startsWith('image/')) {
          URL.revokeObjectURL(file.preview);
        }
      });
      return updatedFiles;
    });
  };

  const handleAddMore = () => {
    fileInputRef.current?.click();
  };

  const handleDone = async () => {
    try {
      const data = new FormData();
      data.append('client_id', clientId);
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
      // Append documents dynamically
      selectedFiles.forEach((document, index) => {
        data.append(`documents[]`, document.file);
      });

      await createProject(data).unwrap();
      router.push(`${newPathname}`);
    } catch (error) {
      logger(error);
    }
  };

  return (
    <>
      <Back onClick={goBack} />
      {selectedFiles.length === 0 && (
        <div>
          <div className=' relative mx-auto w-[150px] flex items-center justify-center h-[150px] border border-primary-green bg-[#16C09814] rounded-full'>
            <TaskIcon />
            <label
              htmlFor='pdf-upload'
              className='cursor-pointer absolute bottom-0 right-0 h-[50px] w-[50px] bg-[#052536] rounded-full flex items-center justify-center'
            >
              <BiSolidPlusSquare size={24} color='#16C098' />{' '}
            </label>
          </div>
          <p className='text-center font-bold text-lg text-[#111] mt-5 mb-20'>
            Add Documents
          </p>
        </div>
      )}
      {selectedFiles.length > 0 && (
        <div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4'>
            {selectedFiles.map((file) => (
              <div key={file.id} className='relative group'>
                <div className='bg-[#F6F8FB] rounded-2xl p-4 relative'>
                  <div className='relative rounded-[10px] w-full h-[180px] overflow-hidden'>
                    <Image
                      src={file.preview}
                      alt={file.file.name}
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    <X className='h-4 w-4' />
                  </button>
                  <div className='flex gap-4 justify-between items-start mt-[10px] mb-1'>
                    <p className='text-[#111111] text-xs font-semibold leading-7'>
                      {file.file.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='ml-auto w-max mt-6 flex gap-4 items-center'>
            {maxFiles < 9 && (
              <Button onClick={handleAddMore} className='px-8'>
                Add More
              </Button>
            )}
            <Button
              onClick={handleDone}
              isLoading={isLoading}
              className='px-16'
            >
              Done
            </Button>
          </div>
        </div>
      )}
      <input
        id='pdf-upload'
        type='file'
        ref={fileInputRef}
        accept='.pdf,image/*'
        className='hidden'
        onChange={handleFileSelect}
      />
    </>
  );
};

export default AddDocuments;
