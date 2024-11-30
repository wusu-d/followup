import React from 'react';

import PageComponentWrapper from '@/components/PageComponentWrapper';

import TodaysTasksPage from '@/app/(authenticated)/tasks/_components/TodaysTaskPage';
import TodaysTaskHeader from '@/app/(authenticated)/tasks/_components/TodaysTaskHeader';

const TasksPage = () => {
  return (
    <PageComponentWrapper headerComponent={<TodaysTaskHeader />}>
      <TodaysTasksPage />
    </PageComponentWrapper>
  );
};

export default TasksPage;
