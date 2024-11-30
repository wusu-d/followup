'use client';

import AppointmentPaymentSummary from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/AppointmentPaymentSummary';

const AppointmentPaymentPage = () => {
  return (
    <>
      <div className='border-[#F1F1F1] border rounded-[20px] p-5'>
        <h4 className='text-[#111] text-[24px] font-bold'>Make Payment</h4>
        <p className='text-[#6B6B6B] mt-3'>''</p>
      </div>
      <AppointmentPaymentSummary />
    </>
  );
};

export default AppointmentPaymentPage;
