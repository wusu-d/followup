import { useFormik } from 'formik';
import { useMemo } from 'react';
import { array, mixed, object } from 'yup';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';

import { useAppDispatch, useAppSelector } from '@/store';

import OnboardingHeader from '@/app/(authentication)/_components/OnboardingHeader';
import Back from '@/app/(onboarding)/_components/Back';
import UploadProfessionalDocuments from '@/app/(onboarding)/professional-profile/_components/UploadProfessionalDocuments';
import { useUploadDocumentsMutation } from '@/rtk-query/professional-profile';
import {
  PRO_PROOF_EMPLOYMENT,
  PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME,
  updateProfessionalProfileState,
} from '@/slices/professional-profile.slice';

const ProofOfPastEmployment = () => {
  const [uploadDocuments, { isLoading }] = useUploadDocumentsMutation();

  const { [PRO_PROOF_EMPLOYMENT]: proofOfEmployment } = useAppSelector(
    (state) => state[PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME]
  );

  const dispatch = useAppDispatch();

  const memoizedInitialValues = useMemo(() => {
    return {
      [PRO_PROOF_EMPLOYMENT]: proofOfEmployment,
    };
  }, [proofOfEmployment]);

  const formik = useFormik({
    initialValues: memoizedInitialValues,
    validationSchema: object().shape({
      [PRO_PROOF_EMPLOYMENT]: array(
        mixed().test(
          'test if is a valid image',
          'Invalid file provided',
          (value) => {
            return value && value instanceof File;
          }
        )
      ).min(1, 'Plese provide proof of past employment'),
    }),
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      // logic here
      const formData = new FormData();
      formData.append('document', 'past_employment_proof');
      formData.append('file', values.proofPastEmployment[0]);
      try {
        await uploadDocuments(formData).unwrap();
        dispatch(
          updateProfessionalProfileState({
            ...values,
            stage: 'areaOfExpertise',
          })
        );
      } catch (error) {
        logger(error);
      }
    },
  });

  const getDocumentUploadProps = (id: keyof typeof formik.values) => {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
      ...formik.getFieldHelpers(id),
    };
  };

  const uploadProps = getDocumentUploadProps(PRO_PROOF_EMPLOYMENT);

  return (
    <>
      <Back
        onClick={() =>
          dispatch(updateProfessionalProfileState({ stage: 'license' }))
        }
      />
      <OnboardingHeader
        title='Proof of Past Employment'
        content='Please provide Proof of Past Employment or Experience'
      />

      <form
        onSubmit={formik.handleSubmit}
        className='w-4/5 lg:w-3/5 xl:w-2/5 flex flex-col gap-5 mt-5 mx-auto'
      >
        <UploadProfessionalDocuments
          id={PRO_PROOF_EMPLOYMENT}
          onUpload={uploadProps.setValue}
          value={uploadProps.value}
          label='Upload Proof'
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

export default ProofOfPastEmployment;
