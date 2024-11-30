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
  PRO_LICENSE,
  PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME,
  updateProfessionalProfileState,
} from '@/slices/professional-profile.slice';

const ProfessionalProfileUploadLicense = () => {
  const [uploadDocuments, { isLoading }] = useUploadDocumentsMutation();

  const { [PRO_LICENSE]: license } = useAppSelector(
    (state) => state[PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME]
  );

  const dispatch = useAppDispatch();

  const memoizedInitialValues = useMemo(() => {
    return {
      [PRO_LICENSE]: license,
    };
  }, [license]);

  const formik = useFormik({
    initialValues: memoizedInitialValues,
    validationSchema: object().shape({
      [PRO_LICENSE]: array(
        mixed().test(
          'test if is a valid image',
          'Invalid file provided',
          (value) => {
            return value && value instanceof File;
          }
        )
      ).min(1, 'Plese provide your license'),
    }),
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('document', 'reg_license');
      formData.append('file', values.license[0]);
      try {
        await uploadDocuments(formData).unwrap();
        // logic here
        dispatch(
          updateProfessionalProfileState({
            ...values,
            stage: 'proofPastEmployment',
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

  const uploadProps = getDocumentUploadProps(PRO_LICENSE);

  return (
    <>
      <Back
        onClick={() =>
          dispatch(
            updateProfessionalProfileState({ stage: 'academicBackground' })
          )
        }
      />
      <OnboardingHeader
        title='Upload Registration/License'
        content='Please provide professional credentials and qualifications'
      />

      <form
        onSubmit={formik.handleSubmit}
        className='w-4/5 lg:w-3/5 xl:w-2/5 flex flex-col gap-5 mt-5 mx-auto'
      >
        <UploadProfessionalDocuments
          id={PRO_LICENSE}
          onUpload={uploadProps.setValue}
          value={uploadProps.value}
          label='Upload License'
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

export default ProfessionalProfileUploadLicense;
