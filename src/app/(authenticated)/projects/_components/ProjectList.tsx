'use client';
import { useRouter } from 'next/navigation';

import Button from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';
import LoadingSpinner from '@/components/Spinner';

import { useAppDispatch } from '@/store';

import ProjectCard from '@/app/(authenticated)/projects/_components/ProjectCard';
import { useGetProjectsQuery } from '@/rtk-query/projects';
import { resetAddProjectClient } from '@/slices/addproject-client';

const ProjectList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data, isLoading, isError } = useGetProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const handleAddProject = () => {
    console.log('clicked');

    dispatch(resetAddProjectClient());
  };

  if (isLoading) {
    return (
      <div className='grid place-items-center w-full min-h-72'>
        <LoadingSpinner />
      </div>
    );
  }

  // if (isError) {
  //   return (
  //
  //       <div className='text-center text-red-500'>
  //         Error loading projects. Please refresh the page.
  //       </div>
  //
  //   );
  // }
  return (
    <div className='pb-7 h-full'>
      <div className='grid grid-cols-2 gap-5 h-[calc(100vh-240px)] overflow-y-scroll'>
        {data?.projects?.length === 0 ? (
          <p className='text-xl font-semibold text-center col-span-2 mt-10 text-primary-green'>
            Nothing to see here yet. Add a new project
          </p>
        ) : (
          data?.projects?.map((project) => (
            <UnstyledLink href={`/projects/${project.id}`} key={project.id}>
              <ProjectCard
                title={project.title}
                description={project.description}
                progress={project.progress_stage.value}
                imageUrl={project.image}
                creator={project.created_by_you ? 'You' : project.creator}
              />
            </UnstyledLink>
          ))
        )}
      </div>

      <div className='ml-auto w-max mt-8'>
        <UnstyledLink href='/projects/addnew'>
          <Button onClick={handleAddProject} className='px-8'>
            Add New Project
          </Button>
        </UnstyledLink>
      </div>
    </div>
  );
};

export default ProjectList;
