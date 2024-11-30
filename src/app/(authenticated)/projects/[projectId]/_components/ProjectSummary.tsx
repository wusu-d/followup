import React from 'react';

import PersonalNotes from '@/app/(authenticated)/projects/[projectId]/_components/PersonalNotes';
import { ProjectDetailResponse } from '@/rtk-query/projects/types';

const ProjectSummary = ({
  projectDetails,
  refetch,
}: {
  projectDetails: ProjectDetailResponse | undefined;
  refetch: () => void;
}) => {
  return (
    <div className='space-y-8'>
      <div>
        <h4 className='text-base text-[#111] font-bold'>Goal</h4>
        <p className='text-[#6B6B6B]'>{projectDetails?.goal}</p>
      </div>
      <div>
        <h4 className='text-base text-[#111] font-bold'>Project Details</h4>
        <p className='text-[#6B6B6B]'>{projectDetails?.description}</p>
      </div>
      <PersonalNotes
        notes={projectDetails?.notes ?? []}
        tasks={projectDetails?.tasks ?? []}
        refetch={refetch}
      />
    </div>
  );
};

export default ProjectSummary;
