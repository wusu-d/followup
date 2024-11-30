import React from 'react';

import { Dialog } from '@/components/ui/dialog';

import { useAppSelector } from '@/store';

import AppointmentInputForm from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/AppointmentInputForm';
import SelectAppointmentType from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/SelectAppointmentType';
import SelectDate from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/SelectDate';
import SelectServiceType from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/SelectServiceType';
import SelectTime from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/SelectTime';
import {
  BOOK_APPOINTMENT_SLICE_REDUCER_NAME,
  BookAppointmentStageType,
} from '@/slices/book-appointment.slice';

interface BookAppointmentFlowProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
}

const stagesComponent: Record<BookAppointmentStageType, JSX.Element> = {
  date: <SelectDate />,
  time: <SelectTime />,
  serviceType: <SelectServiceType />,
  appointmentType: <SelectAppointmentType />,
  inputForm: <AppointmentInputForm />,
};
const BookAppointmentFlow = ({
  isDialogOpen,
  closeDialog,
}: BookAppointmentFlowProps) => {
  const { stage } = useAppSelector(
    (state) => state[BOOK_APPOINTMENT_SLICE_REDUCER_NAME]
  );
  return (
    <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
      {stagesComponent[stage]}
    </Dialog>
  );
};

export default BookAppointmentFlow;
