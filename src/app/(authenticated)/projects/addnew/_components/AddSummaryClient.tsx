import { useFormik } from 'formik';
import { CameraIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import { array, mixed, object, string } from 'yup';

import style from '../style/AddSummaryClient.module.scss';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useAppDispatch, useAppSelector } from '@/store';

import {
  ADD_PROJECT_CLIENT_DESCRIPTION,
  ADD_PROJECT_CLIENT_GOAL,
  ADD_PROJECT_CLIENT_IMAGE,
  ADD_PROJECT_CLIENT_SLICE_REDUCER_NAME,
  ADD_PROJECT_CLIENT_TITLE,
  nextStep,
  updateAddProjectClientState,
} from '@/slices/addproject-client';
import { compressImage } from '@/utils/compress-image.utils';

const AddSummaryClient = () => {
  const dispatch = useAppDispatch();

  const {
    [ADD_PROJECT_CLIENT_DESCRIPTION]: description,
    [ADD_PROJECT_CLIENT_GOAL]: goal,
    [ADD_PROJECT_CLIENT_IMAGE]: photo,
    [ADD_PROJECT_CLIENT_TITLE]: title,
  } = useAppSelector((state) => state[ADD_PROJECT_CLIENT_SLICE_REDUCER_NAME]);

  const memoizedInitialValues = useMemo(() => {
    return {
      [ADD_PROJECT_CLIENT_DESCRIPTION]: description,
      [ADD_PROJECT_CLIENT_GOAL]: goal,
      [ADD_PROJECT_CLIENT_IMAGE]: photo,
      [ADD_PROJECT_CLIENT_TITLE]: title,
    };
  }, [title, goal, photo, description]);

  const profileSummaryValidationSchema = object({
    [ADD_PROJECT_CLIENT_DESCRIPTION]: string()
      .min(10, 'Enter a valid description')
      .required('Please enter a project description'),
    [ADD_PROJECT_CLIENT_TITLE]: string()
      .min(5, 'Enter a valid title')
      .matches(
        /^[a-zA-Z0-9\s~!#$%&*\-_+=|:]+$/,
        'Title can only contain letters, numbers, spaces and ~ ! # $ % & * - _ + = | :'
      )
      .required('Please enter a project title'),
    [ADD_PROJECT_CLIENT_GOAL]: string()
      .min(5, 'Enter a valid goal')
      .required('Please enter a project goal'),
    [ADD_PROJECT_CLIENT_IMAGE]: array(
      mixed().test(
        'test if is a valid image',
        'Invalid image provided',
        (value) => {
          return (
            value && value instanceof File && value.type.includes('image/')
          );
        }
      )
    ).min(1, 'Please provide at  least one image'),
  });

  const formik = useFormik({
    initialValues: memoizedInitialValues,
    validationSchema: profileSummaryValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      dispatch(updateAddProjectClientState({ stage: 'tasks', ...values }));
      dispatch(nextStep());
    },
  });

  const { [ADD_PROJECT_CLIENT_IMAGE]: images } = formik.values;

  const memoizedImage = useMemo(() => {
    if (!images || !images.length) {
      return null;
    }

    return URL.createObjectURL(images[0]);
  }, [images]);

  useEffect(() => {
    return () => {
      if (memoizedImage) {
        URL.revokeObjectURL(memoizedImage);
      }
    };
  }, [memoizedImage]);

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      // logic

      const compressedFile = await compressImage(file);

      if (!compressedFile) {
        return null;
      }

      formik.setFieldValue(ADD_PROJECT_CLIENT_IMAGE, [compressedFile], true);
    }
  }
  const getInputProps = (id: keyof typeof formik.values) => {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <p className='text-[#052536] font-bold'>Project Image</p>
      <div
        className={cn(
          'max-w-52 mr-auto mt-4 aspect-square rounded-full relative',
          style.edit_profile_image_container
        )}
      >
        <div className='relative focus-within:ring ring-primary-green/10 overflow-hidden size-full rounded-full bg-[#F3F6F9]'>
          {!memoizedImage && (
            <label
              htmlFor='photo'
              className='text-primary-black/10 size-full grid place-items-center text-6xl rounded-full'
            >
              <CameraIcon />
            </label>
          )}

          {memoizedImage && (
            <>
              <Image
                alt='Profile photo'
                src={memoizedImage}
                fill
                className='object-cover rounded-full overflow-hidden'
              />
            </>
          )}

          <input
            type='file'
            id='photo'
            accept='image/*'
            className='opacity-0 absolute top-0 left-0 size-full'
            onChange={handleFileUpload}
          />
        </div>

        {memoizedImage && (
          <label
            htmlFor='photo'
            className={`${cn(
              `${style.edit_profile_image_button}`,
              'cursor-pointer bg-[#052536] text-primary-green text-xl border-2 border-white'
            )}`}
          >
            <CameraIcon />
          </label>
        )}
      </div>

      <div className='grid grid-cols-2 gap-5 mt-4'>
        <Input
          id='title'
          type='text'
          required
          label='Title'
          placeholder='Enter Project Title'
          labelClassName='text-[#052536]'
          autoFocus
          {...getInputProps(ADD_PROJECT_CLIENT_TITLE)}
        />
        <Input
          id='goal'
          type='text'
          required
          label='Goal'
          placeholder='Enter Goal'
          labelClassName='text-[#052536]'
          {...getInputProps(ADD_PROJECT_CLIENT_GOAL)}
        />
        <Textarea
          id='description'
          label='Project Description'
          placeholder='Enter Description'
          {...getInputProps(ADD_PROJECT_CLIENT_DESCRIPTION)}
          containerClassName='col-span-2'
          labelClassName='text-[#052536]'
          className='resize-none'
        />
      </div>
      {/* <div className='mt-5'>
        <p className='text-[#052536] font-bold mb-2'> Personal Notes</p>
        <Button variant='outline' className='px-10'>
          Add Notes
        </Button>
      </div> */}
      <div className='w-max ml-auto mt-10'>
        <Button type='submit' className='px-20' disabled={!formik.isValid}>
          Next
        </Button>
      </div>
    </form>
  );
};

export default AddSummaryClient;
