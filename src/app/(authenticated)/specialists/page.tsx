import PageComponentWrapper from '@/components/PageComponentWrapper';

import SpecialistCategories from '@/app/(authenticated)/specialists/_components/SpecialistCategories';

const Specialists = () => {
  return (
    <PageComponentWrapper headerComponent={<h1 className='h2'>Specialists</h1>}>
      <h3 className='mb-5'>Select a Category</h3>
      <SpecialistCategories />
    </PageComponentWrapper>
  );
};

export default Specialists;
