'use client';

import { useFormik } from 'formik';
import Image from 'next/image';
import { object, string } from 'yup';

import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';
import { Input } from '@/components/ui/input';

import LockQuestionIcon from '~/images/forgot-password.png';

type ForgotPasswordFormProps = {
  onSuccess: () => void;
};

const ForgotPasswordForm = ({ onSuccess }: ForgotPasswordFormProps) => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnMount: true,
    validationSchema: object().shape({
      email: string()
        .required('Email is required')
        .email('Please provide a valid email'),
    }),
    onSubmit: () => {
      // logic here

      onSuccess();
    },
  });

  const getInputProps = (id: keyof typeof formik.values) => {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  };

  return (
    <div className='flex mx-auto flex-col gap-6 w-full items-center max-w-2xl'>
      <div className='w-4/12 rounded-full grid place-items-center overflow-hidden aspect-square bg-light-green'>
        <Image
          src={LockQuestionIcon}
          width={70}
          height={70}
          alt='Forgot Password Icon'
          className='w-3/5 aspect-square'
        />
      </div>
      <h2>Forgot Password</h2>
      <p>Reset Password will been sent to your registered email address.</p>

      <form onSubmit={formik.handleSubmit} className='w-full'>
        <Input
          placeholder='Enter Registered Email'
          id='email'
          required
          label='Email'
          type='text'
          {...getInputProps('email')}
        />

        <Button
          type='submit'
          className='w-max mt-6 px-12'
          disabled={!formik.isValid}
        >
          Send
        </Button>
      </form>

      <p className='mt-4 text-center'>
        Go back to{' '}
        <UnderlineLink className='font-bold' href='/login'>
          Sign In
        </UnderlineLink>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
