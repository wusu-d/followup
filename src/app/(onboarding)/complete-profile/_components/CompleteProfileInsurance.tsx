import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import { object, string } from 'yup';

import logger from '@/lib/logger';
import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import TextButton from '@/components/buttons/TextButton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { useAppDispatch, useAppSelector } from '@/store';

import OnboardingHeader from '@/app/(authentication)/_components/OnboardingHeader';
import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';
import Back from '@/app/(onboarding)/_components/Back';
import ProfileCompletedDialog from '@/app/(onboarding)/complete-profile/_components/ProfileCompletedDialog';
import { useCompleteOnboardingMutation } from '@/rtk-query/professional-profile';
import { useUpdateUserProfileMutation } from '@/rtk-query/profile';
import {
  COMPLETE_PROFILE_INSURANCE,
  COMPLETE_PROFILE_SLICE_REDUCER_NAME,
  updateCompleteProfileState,
} from '@/slices/complete-profile.slice';
import { setOnboardingStage } from '@/slices/onboarding.slice';

const CompleteProfileInsurance = () => {
  const dispatch = useAppDispatch();
  const { data: session, update } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const [completeOnboarding, { isLoading: isCompleteLoading }] =
    useCompleteOnboardingMutation();
  const router = useRouter();

  const { [COMPLETE_PROFILE_INSURANCE]: insurance } = useAppSelector(
    (state) => state[COMPLETE_PROFILE_SLICE_REDUCER_NAME]
  );

  const memoizedInitialValues: {
    [COMPLETE_PROFILE_INSURANCE]?: boolean;
  } = useMemo(() => {
    return {
      [COMPLETE_PROFILE_INSURANCE]: insurance,
    };
  }, [insurance]);

  const formik = useFormik({
    initialValues: memoizedInitialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema: object().shape({
      [COMPLETE_PROFILE_INSURANCE]: string()
        .required()
        .test('is boolean value', 'Please select an option', (value) => {
          return ['true', 'false'].includes(value);
        }),
    }),

    onSubmit: async (values) => {
      // logic here
      const hasInsurance = values[COMPLETE_PROFILE_INSURANCE] === true;

      try {
        await updateUserProfile({
          has_insurance: hasInsurance,
        }).unwrap();

        handleProceed();
      } catch (error) {
        logger(error);
      }
    },
  });

  const getSelectProps = (id: keyof typeof formik.values) => ({
    ...formik.getFieldHelpers(id),
  });

  const getInputProps = (id: keyof typeof formik.values) => {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  };

  const insuranceInputProps = getInputProps(COMPLETE_PROFILE_INSURANCE);
  const setInsuranceInputValue = getSelectProps(
    COMPLETE_PROFILE_INSURANCE
  ).setValue;

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleProceed = async () => {
    if (session?.user_groups.includes(RolesEnum.MEMBER)) {
      await completeOnboarding().unwrap();
      openDialog();
      return;
    } else {
      dispatch(setOnboardingStage('subscription'));
    }
  };

  return (
    <>
      <Back
        onClick={() => dispatch(updateCompleteProfileState({ stage: 'photo' }))}
      />
      <OnboardingHeader
        title='Do you have insurance?'
        content="FollowUp is available at no cost to you. Insurance isn't necessary to access our platform,
although some providers might request it."
      />

      <form
        className='mt-5 w-4/5 xl:w-2/5 mx-auto'
        onSubmit={formik.handleSubmit}
      >
        <RadioGroup
          id={COMPLETE_PROFILE_INSURANCE}
          {...getInputProps(COMPLETE_PROFILE_INSURANCE)}
          onValueChange={(value) => {
            setInsuranceInputValue(value, true);
          }}
          className='grid grid-cols-2 gap-5 w-3/5 mx-auto'
        >
          <div
            className={cn(
              'flex items-center justify-start gap-2 font-medium border border-[#F2F5F8] bg-[#F2F5F8] px-3 py-3.5 rounded-[10px]',
              [
                insuranceInputProps.value === 'true' &&
                  'bg-primary-green/[0.08] border-primary-green',
              ]
            )}
          >
            <RadioGroupItem id={COMPLETE_PROFILE_INSURANCE} value='true' />
            Yes
          </div>
          <div
            className={cn(
              'flex items-center justify-start gap-2 font-medium border border-[#F2F5F8] bg-[#F2F5F8] px-3 py-3.5 rounded-[10px]',
              [
                insuranceInputProps.value === 'false' &&
                  'bg-primary-green/[0.08] border-primary-green',
              ]
            )}
          >
            <RadioGroupItem id={COMPLETE_PROFILE_INSURANCE} value='false' />
            No
          </div>
        </RadioGroup>

        <Button
          disabled={!formik.isValid}
          type='submit'
          className='w-2/5 mt-5 mx-auto block'
          isLoading={isLoading || isCompleteLoading}
        >
          Next
        </Button>

        <TextButton onClick={handleProceed} type='button' className='mt-5'>
          Skip
        </TextButton>
      </form>
      <ProfileCompletedDialog open={isDialogOpen} onOpenChange={closeDialog} />
    </>
  );
};

export default CompleteProfileInsurance;
