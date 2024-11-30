import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';

import { useAppDispatch, useAppSelector } from '@/store';

import OnboardingHeader from '@/app/(authentication)/_components/OnboardingHeader';
import Back from '@/app/(onboarding)/_components/Back';
import {
  CompleteProfileAddressType,
  completeProfileAddressValidationSchema,
} from '@/app/(onboarding)/complete-profile/_utils/completeProfileAddress.contants';
import { useUpdateUserProfileMutation } from '@/rtk-query/profile';
import {
  COMPLETE_PROFILE_ADDRESS,
  COMPLETE_PROFILE_CITY,
  COMPLETE_PROFILE_POSTAL_CODE,
  COMPLETE_PROFILE_PROVINCE,
  COMPLETE_PROFILE_SLICE_REDUCER_NAME,
  updateCompleteProfileState,
} from '@/slices/complete-profile.slice';

const CompleteProfileAddress = () => {
  const { data: session } = useSession();
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const {
    [COMPLETE_PROFILE_ADDRESS]: address,
    [COMPLETE_PROFILE_CITY]: city,
    [COMPLETE_PROFILE_PROVINCE]: province,
    [COMPLETE_PROFILE_POSTAL_CODE]: postalCode,
  } = useAppSelector((state) => state[COMPLETE_PROFILE_SLICE_REDUCER_NAME]);

  const dispatch = useAppDispatch();

  const memoizedInitialValues: CompleteProfileAddressType = useMemo(() => {
    return {
      [COMPLETE_PROFILE_ADDRESS]:
        session?.profile_data?.personal?.address || address,
      [COMPLETE_PROFILE_CITY]: session?.profile_data?.personal?.city || city,
      [COMPLETE_PROFILE_PROVINCE]:
        session?.profile_data?.personal?.province || province,
      [COMPLETE_PROFILE_POSTAL_CODE]:
        session?.profile_data?.personal?.postal_code || postalCode,
    };
  }, [address, city, postalCode, province, session?.profile_data?.personal]);

  const formik = useFormik({
    initialValues: memoizedInitialValues,
    validationSchema: completeProfileAddressValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        await updateUserProfile({
          address: values.address,
          city: values.city,
          province: values.province,
          postal_code: values.postalCode,
        }).unwrap();
        dispatch(updateCompleteProfileState({ ...values, stage: 'photo' }));
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
        onClick={() => dispatch(updateCompleteProfileState({ stage: 'phone' }))}
      />
      <OnboardingHeader
        title='Enter your address'
        content='Find Wellness Supporters in your area!'
      />

      <form className='mt-5 w-3/5 mx-auto' onSubmit={formik.handleSubmit}>
        <div className='grid grid-cols-2 gap-5'>
          <Input
            id={COMPLETE_PROFILE_ADDRESS}
            type='text'
            required
            label='Address'
            placeholder='Enter Address'
            autoFocus
            {...getInputProps(COMPLETE_PROFILE_ADDRESS)}
          />
          <Input
            id={COMPLETE_PROFILE_CITY}
            type='text'
            required
            label='City'
            placeholder='Enter City'
            {...getInputProps(COMPLETE_PROFILE_CITY)}
          />
          <Input
            id={COMPLETE_PROFILE_PROVINCE}
            type='text'
            required
            label='Province'
            placeholder='Enter Province'
            {...getInputProps(COMPLETE_PROFILE_PROVINCE)}
          />
          <Input
            id={COMPLETE_PROFILE_POSTAL_CODE}
            type='text'
            required
            label='Postal Code'
            placeholder='Enter Postal Code'
            {...getInputProps(COMPLETE_PROFILE_POSTAL_CODE)}
          />
        </div>

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

export default CompleteProfileAddress;
