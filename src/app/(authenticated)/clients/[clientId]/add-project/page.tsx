import PageComponentWrapper from '@/components/PageComponentWrapper';

import AddProject from '@/app/(authenticated)/clients/[clientId]/add-project/_components/AddProject';

const page = () => {
  return (
    <PageComponentWrapper headerComponent={<h3>Clients</h3>}>
      <div className='border border-[#F1F1F1] rounded-[20px] p-5 relative'>
        <AddProject />
      </div>
    </PageComponentWrapper>
  );
};

export default page;
