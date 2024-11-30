'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

import FollowUpLogo from '@/components/ui/followup-logo';
import { Progress } from '@/components/ui/progress';

import { useAppSelector } from '@/store';

import CompleteProfileAddress from '@/app/(onboarding)/complete-profile/_components/CompleteProfileAddress';
import CompleteProfileInsurance from '@/app/(onboarding)/complete-profile/_components/CompleteProfileInsurance';
import CompleteProfileName from '@/app/(onboarding)/complete-profile/_components/CompleteProfileName';
import CompleteProfilePhone from '@/app/(onboarding)/complete-profile/_components/CompleteProfilePhone';
import CompleteProfilePhoto from '@/app/(onboarding)/complete-profile/_components/CompleteProfilePhoto';
import {
  COMPLETE_PROFILE_SLICE_REDUCER_NAME,
  CompleteProfileStageType,
} from '@/slices/complete-profile.slice';

const stagesRanking: Record<CompleteProfileStageType, number> = {
  name: 1,
  phone: 2,
  address: 3,
  photo: 4,
  insurance: 5,
};

const stagesComponents: Record<CompleteProfileStageType, JSX.Element> = {
  name: <CompleteProfileName />,
  phone: <CompleteProfilePhone />,
  address: <CompleteProfileAddress />,
  photo: <CompleteProfilePhoto />,
  insurance: <CompleteProfileInsurance />,
};

const CompleteProfileFlow = () => {
  const { stage } = useAppSelector(
    (state) => state[COMPLETE_PROFILE_SLICE_REDUCER_NAME]
  );

  const progress: number = useMemo(() => {
    const currStage = stagesRanking[stage];

    return (currStage / 5) * 100;
  }, [stage]);

  const currentHeader = useMemo(() => {
    switch (stage) {
      case 'name':
        return 'Getting Started';
      case 'phone':
        return 'Almost There';
      case 'address':
        return 'One Step Away';
      case 'photo':
        return 'Just There ⚡';
      case 'insurance':
        return 'Last Step 😊';
      default:
        return 'Getting Started';
    }
  }, [stage]);

  return (
    <div className='w-full'>
      <div className='w-2/12 mx-auto text-[#052536]'>
        <FollowUpLogo className='text-[#052536]' />
      </div>

      <AnimatePresence mode='wait'>
        <motion.p
          key={currentHeader}
          className='text-black/40 text-sm font-semibold mt-10'
          {...{
            initial: { opacity: 0, y: -50 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 50 },
            transition: { duration: 0.25, ease: 'easeOut' },
          }}
        >
          {currentHeader}
        </motion.p>
      </AnimatePresence>

      <Progress className='mt-3 w-2/5 mx-auto' value={progress} />

      <AnimatePresence mode='popLayout'>
        <motion.div
          key={stage}
          className='w-full mt-10'
          {...{
            initial: { opacity: 0, x: 50 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 50 },
            transition: { duration: 0.25, ease: 'easeOut' },
          }}
        >
          {stagesComponents[stage]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CompleteProfileFlow;
