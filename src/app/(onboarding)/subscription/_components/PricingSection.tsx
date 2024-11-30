'use client';

import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { boolean, object } from 'yup';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import Back from '@/app/(onboarding)/_components/Back';
import RegularPricing from '@/app/(onboarding)/subscription/_components/RegularPricing';
import StudentPricing from '@/app/(onboarding)/subscription/_components/StudentPricing';
import {
  useGetActiveSubscriptionQuery,
  useGetSubscriptionPlansQuery,
} from '@/rtk-query/subscription';
import { SubscriptionType } from '@/slices/service-provider-subscription.slice';

export default function PricingSectionCards() {
  const pathname = usePathname();
  console.log(pathname);
  const router = useRouter();
  const { data: subscriptionPlans, isLoading } = useGetSubscriptionPlansQuery();
  const skipQuery = pathname === '/complete-profile';
  const { data: activeSub, isLoading: isActiveLoading } =
    useGetActiveSubscriptionQuery(undefined, { skip: skipQuery });
  const activePlan = activeSub?.plan_id;

  const regularPricingData = subscriptionPlans?.filter(
    (plans: SubscriptionType) => !plans.student_plan
  );
  const studentPricingData = subscriptionPlans?.filter(
    (plans: SubscriptionType) => plans.student_plan
  );

  const formik = useFormik({
    initialValues: {
      mode: false,
    },
    validationSchema: object().shape({
      mode: boolean().required(),
    }),
    onSubmit: () => {
      // logic here
    },
  });

  const getSelectProps = (id: keyof typeof formik.values) => ({
    ...formik.getFieldHelpers(id),
  });

  const { mode } = formik.values;

  const setSwitchValue = getSelectProps('mode').setValue;

  return (
    <>
      {/* Pricing */}
      <>
        <Back onClick={() => router.back()} />
        {/* Title */}
        {pathname !== '/profile' && (
          <div className='max-w-2xl mx-auto text-center mb-10 lg:mb-14'>
            <h2>
              Powerful features for{' '}
              <span className='text-primary-green'>powerful creators</span>
            </h2>
            <p className='mt-3'>Choose a plan that's right for you</p>
          </div>
        )}
        {/* End Title */}
        {/* Switch */}
        <div className='flex justify-center items-center'>
          <Label htmlFor='payment-schedule' className='me-3 cursor-pointer'>
            Regular
          </Label>
          <Switch
            checked={mode}
            onCheckedChange={setSwitchValue}
            id='payment-schedule'
          />
          <Label
            htmlFor='payment-schedule'
            className='relative ms-3 cursor-pointer'
          >
            Students
            <span className='absolute left-full top-0 -translate-y-1/3 translate-x-[10%] block w-max'>
              <span className='flex items-center'>
                <svg
                  width='1.22em'
                  height='1em'
                  viewBox='0 0 107 88'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='flex-shrink-0 text-7xl'
                >
                  <path
                    d='M95.4428 61.5972C83.1537 64.6609 68.4802 65.243 57.6803 57.5057C50.7785 52.5611 47.1135 42.5625 49.6929 34.4469C52.1289 26.7823 57.8176 20.0479 66.3422 20.2532C70.7855 20.3602 74.6166 22.4045 75.4255 27.0838C76.6612 34.2327 69.5296 41.6306 63.8594 44.7403C46.1637 54.445 21.1305 53.9049 4.27332 42.6404'
                    stroke='#16C098'
                    strokeWidth='3'
                    strokeLinecap='round'
                  />
                  <path
                    d='M11.7031 55.8442C9.64116 52.963 5.13842 46.2413 3.62315 42.4049'
                    stroke='#16C098'
                    strokeWidth='3'
                    strokeLinecap='round'
                  />
                  <path
                    d='M3.625 42.4048C7.13764 41.9413 15.122 40.6355 18.9584 39.1203'
                    stroke='#16C098'
                    strokeWidth='3'
                    strokeLinecap='round'
                  />
                </svg>

                <div className='mt-3 uppercase flex-shrink-0 text-primary-green'>
                  Save 50%
                </div>
              </span>
            </span>
          </Label>
        </div>
        {/* End Switch */}

        <AnimatePresence mode='popLayout' initial={false}>
          <motion.div
            key={mode ? 'student' : 'regular'}
            className='w-full mt-10'
            {...{
              initial: { opacity: 0, x: 50 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 50 },
              transition: { duration: 0.25, ease: 'easeOut' },
            }}
          >
            {mode ? (
              <StudentPricing subscriptionPlans={studentPricingData} />
            ) : (
              <RegularPricing
                activePlan={activePlan}
                subscriptionPlans={regularPricingData}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </>
      {/* End Pricing */}
    </>
  );
}
