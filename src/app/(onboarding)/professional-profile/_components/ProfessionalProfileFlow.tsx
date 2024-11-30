'use client';

import { AnimatePresence, motion } from 'framer-motion';

import FollowUpLogo from '@/components/ui/followup-logo';

import { useAppSelector } from '@/store';

import AreaOfExpertise from '@/app/(onboarding)/professional-profile/_components/AreaOfExpertise';
import ProfessionalAcademicBackground from '@/app/(onboarding)/professional-profile/_components/ProfessionalAcademicBackground';
import ProfessionalAvailabilty from '@/app/(onboarding)/professional-profile/_components/ProfessionalAvailabilty';
import ProfessionalEmail from '@/app/(onboarding)/professional-profile/_components/ProfessionalEmail';
import ProfessionalProfileName from '@/app/(onboarding)/professional-profile/_components/ProfessionalProfileName';
import ProfessionalProfileUploadLicense from '@/app/(onboarding)/professional-profile/_components/ProfessionalProfileUploadLicense';
import ProfessionalSocials from '@/app/(onboarding)/professional-profile/_components/ProfessionalSocials';
import ServiceCharges from '@/app/(onboarding)/professional-profile/_components/ServiceCharges';
import ProofOfPastEmployment from '@/app/(onboarding)/professional-profile/_components/UploadProofOfPastEmployment';
import {
  PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME,
  ProfessionalProfileStagesType,
} from '@/slices/professional-profile.slice';

const stagesComponents: Record<ProfessionalProfileStagesType, JSX.Element> = {
  name: <ProfessionalProfileName />,
  academicBackground: <ProfessionalAcademicBackground />,
  license: <ProfessionalProfileUploadLicense />,
  proofPastEmployment: <ProofOfPastEmployment />,
  areaOfExpertise: <AreaOfExpertise />,
  serviceCharges: <ServiceCharges />,
  email: <ProfessionalEmail />,
  availability: <ProfessionalAvailabilty />,
  socials: <ProfessionalSocials />,
};

const ProfessionalProfileFlow = () => {
  const { stage } = useAppSelector(
    (state) => state[PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME]
  );

  return (
    <div className='w-full'>
      <div className='w-2/12 mx-auto'>
        <FollowUpLogo className='text-[#052536]' />
      </div>

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

export default ProfessionalProfileFlow;
