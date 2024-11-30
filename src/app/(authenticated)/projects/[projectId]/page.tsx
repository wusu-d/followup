import PageComponentWrapper from '@/components/PageComponentWrapper';

import MyProjectsHeader from '@/app/(authenticated)/projects/[projectId]/_components/MyProjectsHeader';
import PersonalNotes from '@/app/(authenticated)/projects/[projectId]/_components/PersonalNotes';
import ProjectTabs from '@/app/(authenticated)/projects/[projectId]/_components/ProjectTabs';

const ProjectDetail = async ({ params }: { params: { projectId: string } }) => {
  const { projectId } = params;
  return (
    <PageComponentWrapper
      headerComponent={<MyProjectsHeader projectId={projectId} />}
    >
      <div className='border rounded-[20px] border-[#F1F1F1] p-5'>
        <ProjectTabs projectId={projectId} />
      </div>
    </PageComponentWrapper>
  );
};

export default ProjectDetail;
