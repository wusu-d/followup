'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

import PageComponentWrapper from '@/components/PageComponentWrapper';

import { useAppSelector } from '@/store';

import AppointmentPaymentHeader from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/AppointmentPaymentHeader';
import AppointmentPaymentPage from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/AppointmentPaymentPage';
import AppointmentReceiptPage from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/AppointmentReceiptPage';
import AppointmentStatusHeader from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/AppointmentStatusHeader';
import AppointmentStatusPage from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/AppointmentStatusPage';
import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';
import {
  APPOINTMENTS_SLICE_REDUCER_NAME,
  AppointmentStageType,
} from '@/slices/appointments.slice';

const AppointmentTypePage = ({
  params,
}: {
  params: { appointmentTypeId: string };
}) => {
  const { data: session } = useSession();
  const isProvider = session?.user_groups.includes(RolesEnum.SERVICE_PROVIDER);
  const { appointmentTypeId: id } = params;
  const { stage } = useAppSelector(
    (state) => state[APPOINTMENTS_SLICE_REDUCER_NAME]
  );

  const stagesComponent: Record<AppointmentStageType, JSX.Element> = {
    home: (
      <AppointmentStatusPage
        appointmentId={id}
        type='ongoing'
        isProvider={isProvider}
      />
    ),
    payment: <AppointmentPaymentPage />,
    receipt: <AppointmentReceiptPage />,
  };
  const stagesHeader: Record<AppointmentStageType, JSX.Element> = {
    home: <AppointmentStatusHeader />,
    payment: <AppointmentPaymentHeader />,
    receipt: <AppointmentPaymentHeader />,
  };

  return (
    <PageComponentWrapper headerComponent={stagesHeader[stage]}>
      {/* <AppointmentStatusPage
        appointmentId={id}
        type='ongoing'
        isProvider={isProvider}
      /> */}
      {stagesComponent[stage]}
    </PageComponentWrapper>
  );
};

export default AppointmentTypePage;
