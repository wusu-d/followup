import React from 'react';

import PageComponentWrapper from '@/components/PageComponentWrapper';

import AppointmentsTab from '@/app/(authenticated)/appointments/_components/AppointmentsTab';

const Appointments = () => {
  return (
    <PageComponentWrapper
      headerComponent={<h1 className='h3'>Appointments</h1>}
    >
      <main>
        <AppointmentsTab />
      </main>
    </PageComponentWrapper>
  );
};

export default Appointments;
