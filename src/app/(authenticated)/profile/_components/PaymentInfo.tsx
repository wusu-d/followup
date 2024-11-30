import { useFormik } from 'formik';
import { object, string } from 'yup';
import Button from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useGetUserProfileQuery } from '@/rtk-query/profile';
import LoadingSpinner from '@/components/Spinner';
import { useUpdateBankEmailMutation } from '@/rtk-query/professional-profile';
import { useAppDispatch } from '@/store';
import { updateProfessionalProfileState } from '@/slices/professional-profile.slice';
import logger from '@/lib/logger';
import { toast } from 'sonner';
const PaymentInfo = () => {
  const { data, isLoading } = useGetUserProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [bankMail, setBankMail] = useState('');
  const [updateBankEmail, { isLoading: isUpdateLoading }] =
    useUpdateBankEmailMutation();
  const formik = useFormik({
    initialValues: {
      email: data?.data?.work?.bank_email || bankMail,
    },
    validationSchema: object().shape({
      email: string()
        .required('Email is required')
        .email('Please provide a valid email'),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await updateBankEmail({ email: values.email }).unwrap();
        toast.success('Bank Mail Updated Successfully');
        setBankMail(values.email);
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
    <div className='mt-10'>
      <p className='text-[#111] text-[28px] leading-10 font-bold'>
        Banking Information
      </p>
      <p className='mt-2 text-[#6B6B6B]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore.
      </p>
      {isLoading ? (
        <div className='grid place-items-center w-full min-h-72 '>
          <LoadingSpinner />
        </div>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className='w-4/5 lg:w-3/5 xl:w-2/5 flex flex-col gap-5 mt-5 '
        >
          <Input
            id='email'
            type='email'
            inputMode='email'
            required
            label='Email'
            placeholder='Enter Email Address'
            autoFocus
            {...getInputProps('email')}
          />

          <Button
            disabled={!formik.isValid}
            isLoading={isUpdateLoading}
            type='submit'
            className='w-2/5 mt-5 block'
          >
            Done
          </Button>
        </form>
      )}
    </div>
  );
};

export default PaymentInfo;
