'use client';

import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import PrimaryLink from '@/components/links/PrimaryLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import { Checkbox } from '@/components/ui/checkbox';
import FollowUpLogo from '@/components/ui/followup-logo';
import { Input } from '@/components/ui/input';

import {
  ROLE_SEARCH_PARAM_KEY_CONSTANT,
  RolesEnum,
} from '@/app/(authentication)/register/_utils/register.constants';
import {
  SignupFormFieldIds,
  SignupFormFieldType,
  signupFormInitialValues,
  signupFormValidationSchema,
} from '@/app/(authentication)/register/_utils/signup-form.constants';
import { useRegisterUserMutation } from '@/rtk-query/auth';

const SignUpForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get(ROLE_SEARCH_PARAM_KEY_CONSTANT) as RolesEnum;

  const [signupUser, { isLoading }] = useRegisterUserMutation();

  const memoizedInitialValues: SignupFormFieldType = useMemo(() => {
    if (!Object.values(RolesEnum).includes(role)) {
      return { ...signupFormInitialValues, [SignupFormFieldIds.ROLE]: role };
    }

    return {
      ...signupFormInitialValues,
      [SignupFormFieldIds.ROLE]: role,
    };
  }, [role]);

  const formik = useFormik({
    initialValues: memoizedInitialValues,
    validationSchema: signupFormValidationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async ({
      [SignupFormFieldIds.AGREE_TERMS]: _agreeTerms,
      ...values
    }) => {
      // logic here
      try {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          formData.append(key, values[key as keyof typeof values]);
        });

        await signupUser(formData).unwrap();

        toast.success('Account created successfully!');

        formik.resetForm();

        router.push(
          `/verify-mail?email=${encodeURIComponent(
            values[SignupFormFieldIds.EMAIL]
          )}`
        );

        // console.log({ res });
      } catch (error) {
        logger(error);

        if (error && typeof error === 'object') {
          if ('data' in error && typeof error.data === 'object' && error.data) {
            if ('messages' in error.data && error.data.messages) {
              const data = error.data.messages as Record<string, string>;
              for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                  const element = data[key];

                  formik.setFieldError(key, element);
                }
              }
            }
          }
        }
      }
    },
  });

  const getInputProps = (id: keyof typeof formik.values) => {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  };

  const getSelectProps = (id: keyof typeof formik.values) => ({
    ...formik.getFieldHelpers(id),
  });

  const agreedInputProps = getInputProps(SignupFormFieldIds.AGREE_TERMS);
  const setAgreedInputValue = getSelectProps(
    SignupFormFieldIds.AGREE_TERMS
  ).setValue;
  return (
    <section className='w-4/5 flex flex-col justify-center h-full'>
      <div className='w-3/12 flex justify-start items-center'>
        <FollowUpLogo className='text-[#052536]' />
      </div>

      <h2 className='md:text-[2.175rem] mt-5 xl:mt-8'>Sign Up</h2>
      <p className='mt-2'>to Start Connecting</p>

      <form
        className='mt-8 flex flex-col gap-6'
        onSubmit={formik.handleSubmit}
        autoComplete='off'
      >
        <Input
          placeholder='Email'
          id={SignupFormFieldIds.EMAIL}
          required
          label='Email'
          type='text'
          {...getInputProps(SignupFormFieldIds.EMAIL)}
        />
        <Input
          placeholder='Enter Password'
          id={SignupFormFieldIds.PASSWORD}
          required
          label='Password'
          type='password'
          {...getInputProps(SignupFormFieldIds.PASSWORD)}
        />
        <Input
          placeholder='Re-type Password'
          id={SignupFormFieldIds.CONFIRM_PASSWORD}
          required
          label='Re-type Password'
          type='password'
          {...getInputProps(SignupFormFieldIds.CONFIRM_PASSWORD)}
        />

        <div className='flex items-center space-x-2'>
          <Checkbox
            id={SignupFormFieldIds.AGREE_TERMS}
            {...agreedInputProps}
            setValue={setAgreedInputValue}
          />
          <span className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            By tapping here you agree to our{' '}
            <PrimaryLink href=''>Terms and Conditions</PrimaryLink> &{' '}
            <PrimaryLink href=''>Privacy Policy</PrimaryLink>
          </span>
        </div>

        <Button
          type='submit'
          className='w-full mt-6'
          disabled={!formik.isValid}
          isLoading={isLoading}
        >
          Sign Up
        </Button>
      </form>

      <p className='mt-4 text-center'>
        Already have an account?{' '}
        <UnderlineLink className='font-bold' href='/login'>
          Sign In
        </UnderlineLink>
      </p>
    </section>
  );
};

export default SignUpForm;
