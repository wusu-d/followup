'use client';

import { useState } from 'react';

import RelatedBlogPost from '@/app/(general)/articles/_components/related-blog-posts';
import BlogDetails from '@/app/(general)/articles/[id]/_components/blog-details';

const SingleBlogPost = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [catId, setCatId] = useState<number | null>(null);
  return (
    <main className='w-full h-auto space-y-16'>
      <BlogDetails id={id} setCatId={setCatId} />
      <RelatedBlogPost catId={catId} />
    </main>
  );
};

export default SingleBlogPost;
