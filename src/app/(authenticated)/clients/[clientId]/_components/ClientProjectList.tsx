'use client';
import { usePathname } from 'next/navigation';

import UnstyledLink from '@/components/links/UnstyledLink';

import { useAppDispatch } from '@/store';

import ProjectCard from '@/app/(authenticated)/projects/_components/ProjectCard';
import { ProjectType } from '@/rtk-query/projects/types';

const ClientProjectList = ({ projects }: { projects: ProjectType[] }) => {
  const dispatch = useAppDispatch();

  const pathName = usePathname();

  return (
    <div className='mt-5'>
      <h5 className='font-bold text-base text-[#111] mb-2'>Projects</h5>
      <div className='grid grid-cols-2 gap-5'>
        {projects.map((project) => {
          return (
            <UnstyledLink href={`${pathName}/${project.id}`} key={project.id}>
              <ProjectCard
                title={project.title}
                description={project.description}
                progress={project.progress_stage.value}
                imageUrl={project.image}
                creator={project.created_by_you ? 'You' : project.creator}
              />
            </UnstyledLink>
          );
        })}
      </div>
    </div>
  );
};

export default ClientProjectList;
