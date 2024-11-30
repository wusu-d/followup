'use client';

import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';
import FollowUpLogo from '@/components/ui/followup-logo';
import { Input } from '@/components/ui/input';

import {
  LoginFormFieldIds,
  loginFormInitialValues,
  loginFormValidationSchema,
} from '@/app/(authentication)/login/_utlils/login.constants';

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: loginFormInitialValues,
    validationSchema: loginFormValidationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      // logic here
      setIsLoading(true);

      try {
        const res = await signIn('login', {
          redirect: false,
          ...values,
          callbackUrl: searchParams.get('callbackUrl') || '/',
        });
        console.log(res?.url, 'response url');

        if (!res?.ok) {
          if (res?.error === 'CredentialsSignin') {
            // yes
            setIsLoading(false);

            toast.error('Something went wrong');
            return;
          }
          toast.error(res?.error || 'Something went wrong');
          setIsLoading(false);
          return;
        }

        // const callbackUrl = searchParams.get('callbackUrl');

        // if (typeof callbackUrl === 'string') {
        //   return router.replace(new URL(callbackUrl).toString());
        // }
        if (res?.url) {
          formik.resetForm();
          console.log('i got here');
          router.refresh();
          // if (typeof window !== 'undefined') {
          //   window.location.reload();
          // }
          // router.push(res.url);
        } else {
          toast.error('Something went wrong');
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        logger(error);
        throw error;
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
    <section className='w-4/5 flex flex-col justify-center h-full'>
      <div className='w-3/12 flex justify-start items-center'>
        <FollowUpLogo className='text-[#052536]' />
      </div>

      <h2 className='md:text-[2.175rem] mt-5 xl:mt-8'>Sign In</h2>
      <p className='mt-2'>to Start Connecting</p>

      <form
        autoComplete='off'
        className='mt-8 flex flex-col gap-6'
        onSubmit={formik.handleSubmit}
      >
        <Input
          placeholder='Email'
          id={LoginFormFieldIds.EMAIL}
          required
          label='Email'
          type='text'
          {...getInputProps(LoginFormFieldIds.EMAIL)}
        />
        <Input
          placeholder='Enter Password'
          id={LoginFormFieldIds.PASSWORD}
          required
          label='Password'
          type='password'
          {...getInputProps(LoginFormFieldIds.PASSWORD)}
        />

        <div className='text-right'>
          <UnderlineLink className='text-right' href='/forgot-password'>
            Forgot Password?
          </UnderlineLink>
        </div>

        <Button
          type='submit'
          className='w-full mt-6'
          disabled={!formik.isValid}
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>

      <p className='mt-4 text-center'>
        Don't have an account?{' '}
        <UnderlineLink className='font-bold' href='/register'>
          Sign Up
        </UnderlineLink>
      </p>
    </section>
  );
};

export default LoginForm;
