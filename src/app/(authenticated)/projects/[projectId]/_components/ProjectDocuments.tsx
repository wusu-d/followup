import { FaBoxOpen } from 'react-icons/fa';

import ProjectDocumentTile from '@/app/(authenticated)/projects/[projectId]/_components/ProjectDocumentTile';
import UploadDocumentButton from '@/app/(authenticated)/projects/[projectId]/_components/UploadDocumentButton';
import { ProjectDetailResponse } from '@/rtk-query/projects/types';

const ProjectDocuments = ({
  projectDetails,
  refetch,
}: {
  projectDetails: ProjectDetailResponse | undefined;
  refetch: () => void;
}) => {
  return (
    <>
      <div className='grid grid-cols-4 gap-5'>
        {!projectDetails?.documents ? (
          <div className='flex flex-col items-center justify-center col-span-4 h-[100px]'>
            <FaBoxOpen className='text-primary-green' size={40} />
            <p className='text-[#111] font-medium'>No documents yet</p>
          </div>
        ) : (
          projectDetails?.documents?.map((document) => {
            return (
              <ProjectDocumentTile
                key={document.name}
                imageUrl={document.path}
                documentName={document.name}
              />
            );
          })
        )}
      </div>
      <div className='ml-auto w-max mt-6'>
        <UploadDocumentButton
          projectId={projectDetails?.id}
          refetch={refetch}
        />
      </div>
    </>
  );
};

export default ProjectDocuments;
