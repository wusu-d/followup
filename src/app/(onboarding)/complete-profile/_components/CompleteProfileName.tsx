'use client';

import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useAppDispatch, useAppSelector } from '@/store';

import OnboardingHeader from '@/app/(authentication)/_components/OnboardingHeader';
import {
  CompleteProfileNameFieldType,
  completeProfileNameValidationSchema,
} from '@/app/(onboarding)/complete-profile/_utils/completeProfileName.constants';
import { useUpdateUserProfileMutation } from '@/rtk-query/profile';
import {
  COMPLETE_PROFILE_BIO,
  COMPLETE_PROFILE_FIRST_NAME,
  COMPLETE_PROFILE_LAST_NAME,
  COMPLETE_PROFILE_SLICE_REDUCER_NAME,
  updateCompleteProfileState,
} from '@/slices/complete-profile.slice';
import { toast } from 'sonner';

const CompleteProfileName = () => {
  const { data: session } = useSession();
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const {
    [COMPLETE_PROFILE_FIRST_NAME]: firstName,
    [COMPLETE_PROFILE_LAST_NAME]: lastName,
    [COMPLETE_PROFILE_BIO]: bio,
  } = useAppSelector((state) => state[COMPLETE_PROFILE_SLICE_REDUCER_NAME]);
  const dispatch = useAppDispatch();

  const memoizedInitialValues: CompleteProfileNameFieldType = useMemo(() => {
    return {
      [COMPLETE_PROFILE_BIO]: session?.profile_data?.personal?.bio || bio,
      [COMPLETE_PROFILE_FIRST_NAME]:
        session?.profile_data?.personal?.first_name || firstName,
      [COMPLETE_PROFILE_LAST_NAME]:
        session?.profile_data?.personal?.last_name || lastName,
    };
  }, [bio, firstName, lastName, session?.profile_data?.personal]);

  const formik = useFormik({
    initialValues: memoizedInitialValues,
    validationSchema: completeProfileNameValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      // logic here
      try {
        await updateUserProfile({
          first_name: values.firstName,
          last_name: values.lastName,
          bio: values.bio,
        }).unwrap();

        dispatch(updateCompleteProfileState({ ...values, stage: 'phone' }));
      } catch (error: any) {
        if (error?.messages && typeof error.messages === 'object') {
          Object.values(error.messages).forEach((message) => {
            toast.error(message as string);
          });
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

  return (
    <form onSubmit={formik.handleSubmit} className='w-3/5 mx-auto'>
      <OnboardingHeader title='Let’s create your profile' content='' />

      <div className='grid grid-cols-2 gap-5 mt-4'>
        <Input
          id={COMPLETE_PROFILE_FIRST_NAME}
          type='text'
          required
          label='First Name'
          placeholder='Enter First Name'
          autoFocus
          {...getInputProps(COMPLETE_PROFILE_FIRST_NAME)}
        />
        <Input
          id={COMPLETE_PROFILE_LAST_NAME}
          type='text'
          required
          label='Last Name'
          placeholder='Enter Last Name'
          {...getInputProps(COMPLETE_PROFILE_LAST_NAME)}
        />
        <Textarea
          id={COMPLETE_PROFILE_BIO}
          label='Bio'
          placeholder='Enter Bio'
          {...getInputProps(COMPLETE_PROFILE_BIO)}
          containerClassName='col-span-2'
        />
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
  );
};

export default CompleteProfileName;
