'use client';
import { useRouter } from 'next/navigation';

import Button from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';
import PageComponentWrapper from '@/components/PageComponentWrapper';
import LoadingSpinner from '@/components/Spinner';

import { useAppDispatch } from '@/store';

import ProjectCard from '@/app/(authenticated)/projects/_components/ProjectCard';
import { useGetProjectsQuery } from '@/rtk-query/projects';
import { resetAddProjectClient } from '@/slices/addproject-client';
import ProjectList from '@/app/(authenticated)/projects/_components/ProjectList';

const ProjectPage = () => {
  // if (isLoading) {
  //   return (
  //     <PageComponentWrapper headerComponent={<h1 className='h3'>Projects</h1>}>
  //       <div className='grid place-items-center w-full min-h-72'>
  //         <LoadingSpinner />
  //       </div>
  //     </PageComponentWrapper>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <PageComponentWrapper headerComponent={<h1 className='h3'>Projects</h1>}>
  //       <div className='text-center text-red-500'>
  //         Error loading projects. Please refresh the page.
  //       </div>
  //     </PageComponentWrapper>
  //   );
  // }

  return (
    <PageComponentWrapper headerComponent={<h1 className='h3'>Projects</h1>}>
      <ProjectList />
    </PageComponentWrapper>
  );
};

export default ProjectPage;
