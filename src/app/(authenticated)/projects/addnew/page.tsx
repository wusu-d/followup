import PageComponentWrapper from '@/components/PageComponentWrapper';

import AddProjectClient from '@/app/(authenticated)/projects/addnew/_components/AddProjectClient';
import AddProjectHeader from '@/app/(authenticated)/projects/addnew/_components/AddProjectHeader';

const AddNewProject = () => {
  return (
    <PageComponentWrapper headerComponent={<AddProjectHeader />}>
      <div className='border rounded-[20px] border-[#F1F1F1] p-5'>
        <AddProjectClient />
      </div>
    </PageComponentWrapper>
  );
};

export default AddNewProject;
