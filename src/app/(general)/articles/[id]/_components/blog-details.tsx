'use client';

import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { BlogPost } from '@/app/(general)/articles/_components/types';

const BlogDetails = ({
  id,
  setCatId,
}: {
  id: string;
  setCatId: (id: number) => void;
}) => {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://api.followu.ca/api/v1/blog/posts/${id}`
        );
        const data = await response.json();
        setPost(data);
        setCatId(data.category_id);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <section className='container mt-6'>
      <div className='max-w-7xl mx-auto'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/articles'>Blogs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Blog Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className='mt-7'>
          <h3 className='text-center'>{post.title}</h3>

          <p className='text-lg font-semibold text-center mt-4'>
            <span className='text-primary-green'>{post.creator} &bull;</span>{' '}
            {moment(post.created_at * 1000).format('DD MMM YYYY')}
          </p>

          <div className='w-full aspect-[2.29] mt-12 relative rounded-xl overflow-hidden'>
            <Image
              src={post.image}
              alt={post.title}
              className='w-full h-auto object-cover'
              fill
            />
          </div>

          <p
            className='pt-10'
            key={new Date().getTime()}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </section>
      </div>
    </section>
  );
};

export default BlogDetails;
