'use client';

import { useFormik } from 'formik';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';
import { array, mixed, object } from 'yup';

import style from '../style/CompleteProfileImage.module.scss';

import logger from '@/lib/logger';
import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import CameraIcon from '@/components/icons/CameraIcon';

import { useAppDispatch, useAppSelector } from '@/store';

import OnboardingHeader from '@/app/(authentication)/_components/OnboardingHeader';
import Back from '@/app/(onboarding)/_components/Back';
import { useUpdateUserProfilePhotoMutation } from '@/rtk-query/profile';
import {
  COMPLETE_PROFILE_PHOTO,
  COMPLETE_PROFILE_SLICE_REDUCER_NAME,
  updateCompleteProfileState,
} from '@/slices/complete-profile.slice';
import { compressImage } from '@/utils/compress-image.utils';

const CompleteProfilePhoto = () => {
  const { data: session, update } = useSession();
  const [updateUserPhoto, { isLoading }] = useUpdateUserProfilePhotoMutation();
  const dispatch = useAppDispatch();

  const { [COMPLETE_PROFILE_PHOTO]: photo } = useAppSelector(
    (state) => state[COMPLETE_PROFILE_SLICE_REDUCER_NAME]
  );

  const memoizedInitialValues = useMemo(() => {
    return {
      [COMPLETE_PROFILE_PHOTO]: photo,
    };
  }, [photo]);

  const formik = useFormik({
    initialValues: memoizedInitialValues,
    validationSchema: object().shape({
      [COMPLETE_PROFILE_PHOTO]: array(
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
    }),
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // logic here
      const formData = new FormData();
      formData.append('photo', values.photo[0]);
      try {
        await updateUserPhoto(formData).unwrap();
        dispatch(updateCompleteProfileState({ ...values, stage: 'insurance' }));
      } catch (error) {
        logger(error);
      }
    },
  });

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      // logic

      const compressedFile = await compressImage(file);

      if (!compressedFile) {
        return null;
      }

      console.log(compressedFile);

      formik.setFieldValue(COMPLETE_PROFILE_PHOTO, [compressedFile], true);
    }
  }

  const { [COMPLETE_PROFILE_PHOTO]: images } = formik.values;

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

  return (
    <>
      <Back
        onClick={() =>
          dispatch(updateCompleteProfileState({ stage: 'address' }))
        }
      />
      <OnboardingHeader
        title='Upload your profile photo'
        content=''
      />

      <form onSubmit={formik.handleSubmit} className='w-2/5 mx-auto'>
        <div
          className={cn(
            'max-w-52 mx-auto mt-4 aspect-square rounded-full relative',
            style.edit_profile_image_container
          )}
        >
          <div className='relative focus-within:ring ring-primary-green/10 overflow-hidden size-full rounded-full bg-[#F3F6F9]'>
            {!memoizedImage && (
              <label
                htmlFor={COMPLETE_PROFILE_PHOTO}
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
              id={COMPLETE_PROFILE_PHOTO}
              accept='image/*'
              className='opacity-0 absolute top-0 left-0 size-full'
              onChange={handleFileUpload}
            />
          </div>

          {memoizedImage && (
            <label
              htmlFor={COMPLETE_PROFILE_PHOTO}
              className={`${cn(
                `${style.edit_profile_image_button}`,
                'cursor-pointer bg-[#052536] text-primary-green text-xl border-2 border-white'
              )}`}
            >
              <CameraIcon />
            </label>
          )}
        </div>

        <Button
          disabled={!formik.isValid}
          type='submit'
          className='w-2/5 mt-5 mx-auto block'
          isLoading={isLoading}
        >
          Next
        </Button>
      </form>
    </>
  );
};

export default CompleteProfilePhoto;
