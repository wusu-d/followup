import React from 'react';

import PaymentSummary from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/pay/_components/PaymentSummary';

const PaymentPage = () => {
  return (
    <div className='border-[#F1F1F1] border rounded-[20px] p-5'>
      <h4 className='text-[#111] text-[24px] font-bold'>Make Payment</h4>
      <p className='text-[#6B6B6B] mt-3'>
        Enter your card details to get started
      </p>

      <PaymentSummary />
    </div>
  );
};

export default PaymentPage;
