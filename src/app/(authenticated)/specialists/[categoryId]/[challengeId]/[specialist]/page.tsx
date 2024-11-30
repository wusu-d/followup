'use client';
import PageComponentWrapper from '@/components/PageComponentWrapper';

import { useAppSelector } from '@/store';

// import PaymentPage from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/PaymentPage';
// import PaymentReceivedPage from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/ReceiptPage';
// import SpecialistHeader from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/SpecialistHeader';
// import SpecialistHomePage from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/SpecialistPage';
// import PaymentSummaryHeader from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/pay/_components/PaymentSummaryHeader';
import { SpecialistStagesType } from '@/slices/specialists.slice';
import SpecialistHeader from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/SpecialistHeader';
import PaymentSummaryHeader from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/pay/_components/PaymentSummaryHeader';
import SpecialistHomePage from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/SpecialistPage';
import PaymentPage from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/PaymentPage';
import PaymentReceivedPage from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/ReceiptPage';

const SpecialistPage = ({ params }: { params: { specialist: string } }) => {
  const { stage } = useAppSelector((state) => state['specialist']);

  const stagesHeader: Record<SpecialistStagesType, JSX.Element> = {
    home: <SpecialistHeader />,
    payment: <PaymentSummaryHeader />,
    receipt: <PaymentSummaryHeader />,
  };
  const stagesComponents: Record<SpecialistStagesType, JSX.Element> = {
    home: <SpecialistHomePage providerId={params.specialist} />,
    payment: <PaymentPage />,
    receipt: <PaymentReceivedPage />,
  };
  return (
    <PageComponentWrapper headerComponent={stagesHeader[stage]}>
      {stagesComponents[stage]}
    </PageComponentWrapper>
  );
};

export default SpecialistPage;
