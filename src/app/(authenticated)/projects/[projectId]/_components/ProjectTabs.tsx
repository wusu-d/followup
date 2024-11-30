'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';

import ProjectDocuments from '@/app/(authenticated)/projects/[projectId]/_components/ProjectDocuments';
import ProjectProgress from '@/app/(authenticated)/projects/[projectId]/_components/ProjectProgress';
import ProjectSummary from '@/app/(authenticated)/projects/[projectId]/_components/ProjectSummary';
import ProjectTasks from '@/app/(authenticated)/projects/[projectId]/_components/ProjectTasks';
import { useGetProjectDetailsQuery } from '@/rtk-query/projects';

const ProjectTabs = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'summary'; // Default to 'tab1' if no tab is selected

  const {
    data: projectDetails,
    isLoading,
    refetch,
  } = useGetProjectDetailsQuery(projectId);

  // Function to update the URL with the selected tab
  const handleTabClick = (tab: string) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('tab', tab); // Update the tab search param
    router.push(`?${newParams.toString()}`, { shallow: true } as any); // Push new search params to URL
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'summary':
        return (
          <ProjectSummary projectDetails={projectDetails} refetch={refetch} />
        );
      case 'tasks':
        return (
          <ProjectTasks
            projectTasks={projectDetails?.tasks ?? []}
            projectId={projectId}
          />
        );
      case 'progress':
        return <ProjectProgress projectDetails={projectDetails} />;
      case 'documents':
        return (
          <ProjectDocuments projectDetails={projectDetails} refetch={refetch} />
        );
      default:
        return <div>Default Tab Content</div>;
    }
  };
  return (
    <>
      <div className='font-bold text-xl text-[#6B6B6B] space-x-[140px]'>
        <span
          onClick={() => handleTabClick('summary')}
          className={cn(
            'border-b-[5px] pb-1 cursor-pointer border-transparent',
            currentTab === 'summary' && 'text-[#16C098] border-[#16C098]'
          )}
        >
          Summary
        </span>
        <span
          onClick={() => handleTabClick('tasks')}
          className={cn(
            'border-b-[5px] pb-1 cursor-pointer border-transparent',
            currentTab === 'tasks' && 'text-[#16C098] border-[#16C098]'
          )}
        >
          Tasks
        </span>
        <span
          onClick={() => handleTabClick('progress')}
          className={cn(
            'border-b-[5px] pb-1 cursor-pointer border-transparent',
            currentTab === 'progress' && 'text-[#16C098] border-[#16C098]'
          )}
        >
          Progress
        </span>
        <span
          onClick={() => handleTabClick('documents')}
          className={cn(
            'border-b-[5px] pb-1 cursor-pointer border-transparent',
            currentTab === 'documents' && 'text-[#16C098] border-[#16C098]'
          )}
        >
          Documents
        </span>
      </div>
      <hr className='bg-[#111111] mt-1 border mb-8' />
      {renderTabContent()}
    </>
  );
};

export default ProjectTabs;
