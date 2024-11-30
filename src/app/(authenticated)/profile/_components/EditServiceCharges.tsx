import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';

import {
  useFetchUserServicesQuery,
  useUpdateServicePriceMutation,
  useUpdateUserServicesMutation,
  useUpdateWorkProfileMutation,
} from '@/rtk-query/professional-profile';
import { useGetUserProfileQuery } from '@/rtk-query/profile';

type FormValues = {
  consultationCharge: string;
  [key: string]: string;
};

const EditServiceCharges = () => {
  const { data: userProfile, isLoading } = useGetUserProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [updateUserServicePrice, { isLoading: isPriceUpdating }] =
    useUpdateServicePriceMutation();
  const [updateWorkProfile, { isLoading: isWorkUpdateLoading }] =
    useUpdateWorkProfileMutation();
  const { data: userServices } = useFetchUserServicesQuery();
  const [updateServices] = useUpdateUserServicesMutation();
  const { data: session } = useSession();

  const initialValues = {
    consultationCharge: (
      userProfile?.data?.work?.consultation_charge ?? ''
    ).toString(),
    ...Object.fromEntries(
      userServices?.map((service) => [
        service.name,
        service.price.toString(),
      ]) || []
    ),
  };

  const validationSchema = Yup.object().shape({
    consultationCharge: Yup.number()
      .required('Consultation charge is required')
      .min(0, 'Price must be non-negative'),
    ...(userServices?.reduce(
      (acc, service) => ({
        ...acc,
        [service.name]: Yup.number()
          .required('Price is required')
          .min(0, 'Price must be non-negative'),
      }),
      {}
    ) || {}),
  });

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const getInputProps = (id: string) => {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  };

  const handleServiceUpdate = async (id: number, price: number) => {
    try {
      setUpdatingId(id);
      await updateUserServicePrice({ data: { price }, id: `${id}` }).unwrap();
      toast.success('Price Updated Successfully');
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleConsultationUpdate = async (price: string) => {
    try {
      await updateWorkProfile({ consultation_charge: Number(price) }).unwrap();
      toast.success('Price Updated Successfully');
    } catch (error) {
      console.log('Consultation charge updated:', error);
    }
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className='w-4/5 flex flex-col gap-5 mt-5 '
      >
        <div className='grid grid-cols-[40%_1fr_auto] gap-4'>
          {userServices?.map((charge) => {
            const fieldError =
              formik.touched[charge.name] && formik.errors[charge.name];
            return (
              <React.Fragment key={charge.id}>
                <label
                  htmlFor={charge.name}
                  className='bg-[#E1E1E166] h-max py-4 text-lg border rounded-lg px-3'
                >
                  {charge?.name}
                </label>
                <div className='flex flex-col'>
                  <Input
                    id={charge.name}
                    isMoneyInput
                    placeholder='Enter Service charge'
                    name={charge.name}
                    type='number'
                    min={0}
                    value={formik.values[charge.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched[charge.name]}
                  />
                  {fieldError && (
                    <span className='pl-1 pt-1 text-xs font-semibold text-red-600'>
                      {fieldError as string}
                    </span>
                  )}
                </div>
                <Button
                  onClick={() =>
                    handleServiceUpdate(
                      charge.id,
                      Number(formik.values[charge.name])
                    )
                  }
                  isLoading={isPriceUpdating && charge.id === updatingId}
                  className='h-[60px] px-7'
                  disabled={!formik.values[charge.name] || !!fieldError}
                >
                  Update
                </Button>
              </React.Fragment>
            );
          })}
        </div>

        <hr />
        <div className='grid grid-cols-[40%_1fr_auto] gap-4'>
          <label
            htmlFor='consultationCharge'
            className='bg-[#E1E1E166] h-max py-4 text-lg border rounded-lg px-3'
          >
            Consultation Charge
          </label>
          <div className='flex flex-col'>
            <Input
              id='consultationCharge'
              placeholder='Enter Consultation charge'
              type='number'
              isMoneyInput
              min={0}
              {...getInputProps('consultationCharge')}
            />
            {formik.touched.consultationCharge &&
              formik.errors.consultationCharge && (
                <span className='text-red-500 text-sm mt-1'>
                  {formik.errors.consultationCharge as string}
                </span>
              )}
          </div>
          <Button
            onClick={() =>
              handleConsultationUpdate(formik.values.consultationCharge)
            }
            className='h-[60px] px-7'
            disabled={
              !formik.values.consultationCharge ||
              !!formik.errors.consultationCharge
            }
            isLoading={isWorkUpdateLoading}
          >
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditServiceCharges;
