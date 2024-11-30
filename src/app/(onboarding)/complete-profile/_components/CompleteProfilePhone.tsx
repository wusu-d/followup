import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { object, string } from 'yup';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import { PhoneInput } from '@/components/ui/phone-input';

import { useAppDispatch, useAppSelector } from '@/store';

import OnboardingHeader from '@/app/(authentication)/_components/OnboardingHeader';
import Back from '@/app/(onboarding)/_components/Back';
import { useUpdateUserProfileMutation } from '@/rtk-query/profile';
import {
  COMPLETE_PROFILE_PHONE,
  COMPLETE_PROFILE_SLICE_REDUCER_NAME,
  updateCompleteProfileState,
} from '@/slices/complete-profile.slice';

const CompleteProfilePhone = () => {
  const { data: session } = useSession();
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const { [COMPLETE_PROFILE_PHONE]: phone } = useAppSelector(
    (state) => state[COMPLETE_PROFILE_SLICE_REDUCER_NAME]
  );
  const dispatch = useAppDispatch();
  const memoizedInitialValues: {
    [COMPLETE_PROFILE_PHONE]: string;
  } = useMemo(() => {
    return {
      [COMPLETE_PROFILE_PHONE]: session?.profile_data?.personal?.phone || phone,
    };
  }, [phone,  session?.profile_data?.personal]);

  const formik = useFormik({
    initialValues: memoizedInitialValues,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: object().shape({
      [COMPLETE_PROFILE_PHONE]: string()
        .required('Please enter your phone number')
        .test(
          'check if is possible phone number',
          'Please enter a valid phone number',
          (value) => {
            return isPossiblePhoneNumber(value);
          }
        ),
    }),
    onSubmit: async (values) => {
      try {
        await updateUserProfile({ phone: values.phone }).unwrap();
        dispatch(updateCompleteProfileState({ ...values, stage: 'address' }));
      } catch (error) {
        logger(error);
      }
    },
  });

  const getSelectProps = (id: keyof typeof formik.values) => ({
    ...formik.getFieldHelpers(id),
    ...formik.getFieldProps(id),
  });

  const phoneInputProps = getSelectProps(COMPLETE_PROFILE_PHONE);

  return (
    <>
      <Back
        onClick={() => dispatch(updateCompleteProfileState({ stage: 'name' }))}
      />
      <OnboardingHeader
        title='Enter your phone number'
        content='Please confirm your country code and enter your mobile number'
      />
      <form
        className='grid place-items-center mt-4 w-2/5 mx-auto'
        onSubmit={formik.handleSubmit}
      >
        <PhoneInput
          id={COMPLETE_PROFILE_PHONE}
          onChange={phoneInputProps.setValue}
          value={phoneInputProps.value}
          label='Phone Number'
          autoFocus
        />

        <Button
          disabled={!formik.isValid}
          isLoading={isLoading}
          type='submit'
          className='w-2/5 mt-5 mx-auto block'
        >
          Next
        </Button>
      </form>
    </>
  );
};

export default CompleteProfilePhone;
