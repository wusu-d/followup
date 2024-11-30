import React from 'react';

import PageComponentWrapper from '@/components/PageComponentWrapper';

import CategoriesChallenges from '@/app/(authenticated)/specialists/[categoryId]/_components/CategoriesChallenges';
import CategoryChallengesHeader from '@/app/(authenticated)/specialists/[categoryId]/_components/CategoriesChallengesHeader';

const CategoriesPage = ({ params }: { params: { categoryId: string } }) => {
  return (
    <PageComponentWrapper
      headerComponent={
        <CategoryChallengesHeader categoryId={params.categoryId} />
      }
    >
      <h3 className='mb-5'>Select a Challenge</h3>

      <CategoriesChallenges categoryId={params.categoryId} />
    </PageComponentWrapper>
  );
};

export default CategoriesPage;
