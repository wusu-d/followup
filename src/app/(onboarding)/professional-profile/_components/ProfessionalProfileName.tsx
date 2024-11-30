'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';

import { useAppDispatch, useAppSelector } from '@/store';

import OnboardingHeader from '@/app/(authentication)/_components/OnboardingHeader';
import Back from '@/app/(onboarding)/_components/Back';
import {
  ProfessionalProfileNameType,
  professionalProfileNameValidationSchema,
} from '@/app/(onboarding)/professional-profile/_utils/professional-profile-name.constants';
import { useUpdateWorkProfileMutation } from '@/rtk-query/professional-profile';
import {
  PRO_NAME,
  PRO_PROFESSION,
  PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME,
  updateProfessionalProfileState,
} from '@/slices/professional-profile.slice';

const ProfessionalProfileName = () => {
  const router = useRouter();
  const [updateWorkProfile, { isLoading }] = useUpdateWorkProfileMutation();
  const { [PRO_NAME]: name, [PRO_PROFESSION]: profession } = useAppSelector(
    (state) => state[PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME]
  );

  const dispatch = useAppDispatch();

  const memoizedInitialValues: ProfessionalProfileNameType = useMemo(() => {
    return { [PRO_NAME]: name, [PRO_PROFESSION]: profession };
  }, [name, profession]);

  const formik = useFormik({
    initialValues: memoizedInitialValues,
    validationSchema: professionalProfileNameValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      // logic here
      try {
        const payload = await updateWorkProfile({
          professional_name: values.name,
          profession: values.profession,
        }).unwrap();

        dispatch(
          updateProfessionalProfileState({
            ...values,
            stage: 'academicBackground',
          })
        );
      } catch (err) {
        if (err && typeof err === 'object') {
          if ('data' in err && typeof err.data === 'object' && err.data) {
            if (
              'messages' in err.data &&
              typeof err.data.messages === 'object' &&
              err.data.messages
            ) {
              const messages = err.data.messages as Record<string, string>;

              // Iterate over the keys of the `messages` object and display each error
              Object.entries(messages).forEach(([field, message]) => {
                toast.error(`${field}: ${message}`);
              });
            }
          }
        }
        logger(err);
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
    <>
      <Back onClick={() => router.back()} />
      <OnboardingHeader
        title='Let’s Build your Professional Profile'
        content='Highlight your expertise, credentials, and build your professional reputation!'
      />

      <form
        onSubmit={formik.handleSubmit}
        className='w-4/5 lg:w-3/5 xl:w-2/5 flex flex-col gap-5 mt-5 mx-auto'
      >
        <Input
          id={PRO_NAME}
          type='text'
          required
          label='How would you like to be addressed?'
          placeholder='Enter Name'
          autoFocus
          {...getInputProps(PRO_NAME)}
        />
        <Input
          id={PRO_PROFESSION}
          type='text'
          required
          label='Enter Your Profession'
          placeholder='Enter Profession'
          {...getInputProps(PRO_PROFESSION)}
        />

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

export default ProfessionalProfileName;
