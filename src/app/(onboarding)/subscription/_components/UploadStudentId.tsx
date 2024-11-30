import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import { array, mixed, object } from 'yup';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import EditIcon from '@/components/icons/EditIcon';
import ProfileIcon from '@/components/icons/ProfileIcon';

import { useAppDispatch, useAppSelector } from '@/store';

import Back from '@/app/(onboarding)/_components/Back';
import { useUploadDocumentsMutation } from '@/rtk-query/professional-profile';
import { useInitializeSubscriptionMutation } from '@/rtk-query/subscription';
import {
  SUBSCRIPTION_PLAN,
  SUBSCRIPTION_SLICE_REDUCER_NAME,
  SUBSCRIPTION_STUDENT_ID,
  updateSubscriptionState,
} from '@/slices/service-provider-subscription.slice';
import { compressImage } from '@/utils/compress-image.utils';

const UploadStudentId = () => {
  const [uploadDocuments, { isLoading }] = useUploadDocumentsMutation();
  const dispatch = useAppDispatch();
  const [initializeSubscription, { isLoading: isInitializeLoading }] =
    useInitializeSubscriptionMutation();

  const { [SUBSCRIPTION_STUDENT_ID]: studentId, [SUBSCRIPTION_PLAN]: plan } =
    useAppSelector((state) => state[SUBSCRIPTION_SLICE_REDUCER_NAME]);

  const memoizedInitialValues = useMemo(() => {
    return {
      [SUBSCRIPTION_STUDENT_ID]: studentId,
    };
  }, [studentId]);

  const formik = useFormik({
    initialValues: memoizedInitialValues,
    validationSchema: object().shape({
      [SUBSCRIPTION_STUDENT_ID]: array(
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
      const formData = new FormData();
      formData.append('document', 'student_id');
      formData.append('file', values.studentId[0]);
      try {
        // logic here
        await uploadDocuments(formData).unwrap();
        await initializeSubscription({ plan_id: plan?.id ?? 0 }).unwrap();
        dispatch(
          updateSubscriptionState({ ...values, stage: 'payment-details' })
        );
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

      formik.setFieldValue(SUBSCRIPTION_STUDENT_ID, [compressedFile], true);
    }
  }

  const { [SUBSCRIPTION_STUDENT_ID]: images } = formik.values;

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
          dispatch(updateSubscriptionState({ stage: 'select-plan' }))
        }
      />
      <h2>Upload Student Id</h2>

      <p className='w-2/5 mx-auto mt-2 text-[#6B6B6B]'>
        Please verify your secondary or post secondary enrollement
      </p>

      <form className='mt-4 w-3/5 mx-auto' onSubmit={formik.handleSubmit}>
        <div className='border focus-within:ring ring-primary-green/30 text-light-green overflow-hidden p-5 relative flex gap-5 items-center justify-center rounded-[15px] w-full max-w-96 aspect-[335/210] mx-auto'>
          {!memoizedImage && (
            <>
              <ProfileIcon className='text-9xl' />
              <div className='w-full self-start h-3/6 flex flex-col justify-end space-y-3'>
                <div className='w-full h-4 bg-light-green rounded-full'></div>
                <div className='w-5/6 h-4 bg-light-green rounded-full'></div>
              </div>
            </>
          )}

          <input
            type='file'
            id={SUBSCRIPTION_STUDENT_ID}
            accept='image/*'
            className='opacity-0 absolute cursor-pointer top-0 left-0 size-full'
            onChange={handleFileUpload}
          />

          {memoizedImage && (
            <>
              <Image
                alt='Student ID'
                src={memoizedImage}
                fill
                className='object-cover overflow-hidden'
              />
            </>
          )}

          <label
            htmlFor={SUBSCRIPTION_STUDENT_ID}
            className='size-12 grid place-items-center cursor-pointer absolute right-5 bottom-5 rounded-full bg-[#052536]'
          >
            <EditIcon />
          </label>
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

export default UploadStudentId;
