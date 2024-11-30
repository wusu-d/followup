'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import ForgotPasswordForm from '@/app/(authentication)/forgot-password/_components/ForgotPasswordForm';
import ForgotPasswordSuccess from '@/app/(authentication)/forgot-password/_components/ForgotPasswordSuccess';

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [key, setKey] = useState(Math.random());

  function handleSuccess() {
    setIsSuccess(true);
    setKey(Math.random());
  }
  return (
    <AnimatePresence initial={false} mode='popLayout'>
      <motion.div
        key={key}
        className='w-full mt-10'
        {...{
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 50 },
          transition: { duration: 0.25, ease: 'easeOut' },
        }}
      >
        {!isSuccess && <ForgotPasswordForm onSuccess={handleSuccess} />}
        {isSuccess && <ForgotPasswordSuccess />}
      </motion.div>
    </AnimatePresence>
  );
};

export default ForgotPassword;
