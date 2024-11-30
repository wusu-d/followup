import { useFormik } from 'formik';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { object, string } from 'yup';

import Button from '@/components/buttons/Button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import { useAppDispatch } from '@/store';

import { updateSubscriptionState } from '@/slices/service-provider-subscription.slice';

const VerifyStudentEmail = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: object().shape({
      code: string()
        .required('Please enter your code')
        .length(4, 'Invalid code'),
    }),
    validateOnMount: true,
    onSubmit: () => {
      dispatch(updateSubscriptionState({ stage: 'payment-details' }));
    },
  });
  return (
    <>
      <h2>Verify Your Student Email</h2>

      <p className='w-2/6 mx-auto mt-2 text-[#6B6B6B]'>
        We have sent a verification code to your student email. Please enter the
        code below
      </p>

      <form onSubmit={formik.handleSubmit}>
        <div className='mx-auto flex justify-center mt-4'>
          <InputOTP
            pattern={REGEXP_ONLY_DIGITS}
            maxLength={4}
            className='w-max'
            id='code'
            name='code'
            onChange={(value) => {
              formik.setFieldValue('code', value);
            }}
            value={formik.values.code}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <p className='mt-5'>
          Have you recieve the code?{' '}
          <span className='font-bold text-primary-green'>Resend</span>
        </p>

        <Button className='px-8 mt-5' disabled={!formik.isValid}>
          Verify
        </Button>
      </form>
    </>
  );
};

export default VerifyStudentEmail;
