import PageComponentWrapper from '@/components/PageComponentWrapper';

import ChallengeSpecialistsHeader from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/_components/ChallengeSpecialistsHeader';
import SpecialistGrid from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/_components/SpecialistGrid';

const ChallengeSpecialists = () => {
  return (
    <PageComponentWrapper headerComponent={<ChallengeSpecialistsHeader />}>
      <h3 className='mb-5'>Select a Specialist</h3>
      <SpecialistGrid />
    </PageComponentWrapper>
  );
};

export default ChallengeSpecialists;
