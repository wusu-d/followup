import React from 'react';

import ProgressGraph from '@/app/(authenticated)/projects/[projectId]/_components/ProgressGraph';
import ProjectProgressTile from '@/app/(authenticated)/projects/[projectId]/_components/ProjectProgressTile';
import { ProjectDetailResponse } from '@/rtk-query/projects/types';

const ProjectProgress = ({
  projectDetails,
}: {
  projectDetails: ProjectDetailResponse | undefined;
}) => {
  return (
    <div className='grid grid-cols-5 gap-5'>
      <div className='col-span-3'>
        <ProgressGraph graphPoints={projectDetails?.graph_points} />
      </div>
      <div className='col-span-2 space-y-5 invisible'>
        <ProjectProgressTile />
        <ProjectProgressTile />
        <ProjectProgressTile />
        <ProjectProgressTile />
        <ProjectProgressTile />
      </div>
    </div>
  );
};

export default ProjectProgress;
