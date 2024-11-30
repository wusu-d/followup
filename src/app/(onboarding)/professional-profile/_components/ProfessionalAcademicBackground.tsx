'use client';

import { useFormik } from 'formik';
import { useMemo } from 'react';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useAppDispatch, useAppSelector } from '@/store';

import OnboardingHeader from '@/app/(authentication)/_components/OnboardingHeader';
import Back from '@/app/(onboarding)/_components/Back';
import {
  AcademicBackgroundType,
  academicBackgroundValidationSchema,
} from '@/app/(onboarding)/professional-profile/_utils/academic-bg.constants';
import { useUpdateWorkProfileMutation } from '@/rtk-query/professional-profile';
import {
  PRO_ACADEMIC_BACKGROUND,
  PRO_BIO,
  PRO_EXPERIENCE,
  PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME,
  updateProfessionalProfileState,
} from '@/slices/professional-profile.slice';

const ProfessionalAcademicBackground = () => {
  const [updateWorkProfile, { isLoading }] = useUpdateWorkProfileMutation();

  const {
    [PRO_ACADEMIC_BACKGROUND]: academicBackground,
    [PRO_EXPERIENCE]: experience,
    [PRO_BIO]: bio,
  } = useAppSelector((state) => state[PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME]);

  const dispatch = useAppDispatch();

  const memoizedInitialValues: AcademicBackgroundType = useMemo(() => {
    return {
      [PRO_ACADEMIC_BACKGROUND]: academicBackground,
      [PRO_EXPERIENCE]: experience,
      [PRO_BIO]: bio,
    };
  }, [academicBackground, bio, experience]);

  const formik = useFormik({
    initialValues: memoizedInitialValues,
    validationSchema: academicBackgroundValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        await updateWorkProfile({
          qualifications: values.academicBackground,
          bio: values.bio,
          length_of_experience: values.experience,
        }).unwrap();
        // logic here
        dispatch(
          updateProfessionalProfileState({
            ...values,
            stage: 'license',
          })
        );
      } catch (error) {
        logger(error);
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
      <Back
        onClick={() =>
          dispatch(updateProfessionalProfileState({ stage: 'name' }))
        }
      />
      <OnboardingHeader
        title='Enter Qualification Details'
        content='Please provide your professional qualifications and credentials to verify your eligibility as a Wellness Provider.
'
      />

      <form
        onSubmit={formik.handleSubmit}
        className='w-4/5 xl:w-2/5 flex flex-col gap-5 mt-5 mx-auto'
      >
        <div className='grid grid-cols-2 gap-5'>
          <Input
            id={PRO_ACADEMIC_BACKGROUND}
            type='text'
            required
            label='Academic Background'
            placeholder='Secondary, Post-Secondary'
            autoFocus
            {...getInputProps(PRO_ACADEMIC_BACKGROUND)}
          />

          <Input
            id={PRO_EXPERIENCE}
            type='text'
            required
            label='Length of Experience'
            placeholder='Training Period'
            {...getInputProps(PRO_EXPERIENCE)}
          />

          <Textarea
            id={PRO_BIO}
            label='Enter your Professional Biography'
            placeholder='Tell us about your professional experience!'
            {...getInputProps(PRO_BIO)}
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
    </>
  );
};

export default ProfessionalAcademicBackground;
