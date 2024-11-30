import { useFormik } from 'formik';
import React, { useMemo } from 'react';
import { AnyObject, object, string, StringSchema } from 'yup';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';

import { useAppDispatch, useAppSelector } from '@/store';

import OnboardingHeader from '@/app/(authentication)/_components/OnboardingHeader';
import Back from '@/app/(onboarding)/_components/Back';
import {
  useUpdateUserServicesMutation,
  useUpdateWorkProfileMutation,
} from '@/rtk-query/professional-profile';
import {
  PRO_CONSULT_CHARGE,
  PRO_DIMENSION_SUPPORT,
  PRO_SERVICE_CHARGES,
  PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME,
  updateProfessionalProfileState,
} from '@/slices/professional-profile.slice';

const ServiceCharges = () => {
  const [updateServices, { isLoading }] = useUpdateUserServicesMutation();
  const [updateWorkProfile, { isLoading: isWorkUpdateLoading }] =
    useUpdateWorkProfileMutation();

  const {
    [PRO_SERVICE_CHARGES]: serviceCharges,
    [PRO_CONSULT_CHARGE]: consultCharge,
    [PRO_DIMENSION_SUPPORT]: areaofExpertise,
  } = useAppSelector((state) => state[PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME]);

  const dispatch = useAppDispatch();

  const memoizedInitialValues = useMemo(() => {
    const values: Record<string, string> = {
      [PRO_CONSULT_CHARGE]: consultCharge,
      ...serviceCharges,
    };

    return values;
  }, [consultCharge, serviceCharges]);

  const memoizedValidationSchema = useMemo(() => {
    const schema = object().shape({
      [PRO_CONSULT_CHARGE]: string().required(
        'Please enter your consult charge'
      ),
      ...Object.keys(serviceCharges).reduce((acc, service) => {
        acc[service] = string().required(`Please enter your charge`);
        return acc;
      }, {} as Record<string, StringSchema<string, AnyObject, undefined, ''>>),
    });

    return schema;
  }, [serviceCharges]);

  const formik = useFormik({
    initialValues: memoizedInitialValues,
    validationSchema: memoizedValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async ({ [PRO_CONSULT_CHARGE]: consultCharge, ...rest }) => {
      // logic here
      const data = Object.entries(rest).map(([key, value]) => ({
        service_id: parseInt(key),
        price: parseFloat(value),
      }));

      try {
        await updateServices(data).unwrap();
        await updateWorkProfile({
          consultation_charge: consultCharge,
        }).unwrap();
        dispatch(
          updateProfessionalProfileState({
            [PRO_CONSULT_CHARGE]: consultCharge,
            [PRO_SERVICE_CHARGES]: rest,
            stage: 'availability',
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
          dispatch(updateProfessionalProfileState({ stage: 'areaOfExpertise' }))
        }
      />
      <OnboardingHeader
        title='Enter Service Charges'
        content='Please enter the rate for each service you’ll offer within the selected wellness dimension.'
      />

      <form
        onSubmit={formik.handleSubmit}
        className='w-full lg:w-4/5 xl:w-3/5 flex flex-col gap-5 mt-5 mx-auto'
      >
        <div className='grid grid-cols-[40%_1fr] gap-4'>
          {Object.keys(serviceCharges).map((id, idx) => {
            const service = areaofExpertise.find(
              (category) => category.id === parseInt(id)
            );
            if (service) {
              return (
                <React.Fragment key={idx}>
                  <label
                    htmlFor={id}
                    className='bg-[#E1E1E166] h-max py-4 text-lg border rounded-lg'
                  >
                    {service?.name}
                  </label>
                  <Input
                    id={id}
                    isMoneyInput
                    placeholder='Enter Service charge'
                    {...getInputProps(id)}
                  />
                </React.Fragment>
              );
            }
          })}
        </div>

        <hr />
        <div className='grid grid-cols-[40%_1fr] gap-4'>
          <label
            htmlFor={PRO_CONSULT_CHARGE}
            className='bg-[#E1E1E166] h-max py-4 text-lg border rounded-lg'
          >
            Consultation Charge
          </label>
          <Input
            id={PRO_CONSULT_CHARGE}
            placeholder='Enter Consultation charge'
            {...getInputProps(PRO_CONSULT_CHARGE)}
            isMoneyInput
          />
        </div>

        <Button
          disabled={!formik.isValid}
          type='submit'
          className='w-2/5 mt-5 mx-auto block'
          isLoading={isLoading || isWorkUpdateLoading}
        >
          Next
        </Button>
      </form>
    </>
  );
};

export default ServiceCharges;
