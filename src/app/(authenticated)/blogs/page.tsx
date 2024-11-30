import { Suspense } from 'react';

import PageComponentWrapper from '@/components/PageComponentWrapper';

import BlogList from '@/app/(authenticated)/blogs/_components/BlogList';
import LoadingSpinner from '@/components/Spinner';

const BlogsPage = () => {
  return (
    <PageComponentWrapper headerComponent={<h1 className='h3'>Blogs</h1>}>
      <Suspense fallback={<LoadingSpinner />}>
        <BlogList />
      </Suspense>
    </PageComponentWrapper>
  );
};

export default BlogsPage;
