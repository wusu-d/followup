'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

import { BlogPostResponse } from '@/app/(general)/articles/_components/types';

const RecentBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPostResponse | null>(null);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://api.followu.ca/api/v1/blog/posts?page=1&limit=3'
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching recent blog posts:', error);
      }
    };

    fetchPosts();
  }, []);

  if (!posts?.data) return null;

  const [mainPost, ...smallPosts] = posts.data;

  return (
    <section className='w-full bg-white pt-8 mb-10'>
      <div className='container'>
        <div className='max-w-7xl mx-auto space-y-5'>
          <h3>Recent Blog Posts</h3>

          <div className='w-full flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-6 lg:gap-4'>
            {/* Main (larger) post */}
            <div className='col-start-1 col-span-1 row-start-1 row-span-2 flex flex-col gap-2 lg:gap-3 xl:gap-6'>
              <div className='w-full aspect-[2.29] relative rounded-xl overflow-hidden'>
                <Image
                  src={mainPost.image}
                  alt={mainPost.title}
                  className='w-full h-auto object-cover'
                  fill
                />
              </div>

              <div className='space-y-2 lg:space-y-3 xl:space-y-5'>
                <p className='text-sm font-semibold'>
                  <span className='text-primary-green'>
                    {mainPost.creator} &bull;
                  </span>{' '}
                  {formatDate(mainPost.created_at)}
                </p>

                <UnstyledLink
                  href={`/articles/${mainPost.id}`}
                  className='group flex items-center justify-between gap-3'
                >
                  <h3
                    className='min-w-0 flex-1 line-clamp-1'
                    title={mainPost.title}
                  >
                    {mainPost.title}
                  </h3>

                  <ArrowUpRight className='shrink-0' />
                </UnstyledLink>
                <p
                  className='text-light-gray line-clamp-3'
                  dangerouslySetInnerHTML={{ __html: mainPost.body }}
                />
              </div>
            </div>

            {/* Smaller posts */}
            {smallPosts.map((post, index) => (
              <div
                key={post.id}
                className={`col-start-2 col-span-1 ${
                  index === 1 ? 'row-start-2' : 'row-start-1'
                } row-span-1 flex flex-col lg:grid grid-cols-2 gap-2 lg:gap-4`}
              >
                <div className='w-full aspect-[2.29] h-full relative rounded-lg overflow-hidden'>
                  <Image
                    src={post.image}
                    alt={post.title}
                    className='w-full h-auto object-cover'
                    fill
                  />
                </div>

                <div className='space-y-2 lg:space-y-3 xl:space-y-4'>
                  <p className='text-sm font-semibold'>
                    <span className='text-primary-green'>
                      {post.creator} &bull;
                    </span>{' '}
                    {formatDate(post.created_at)}
                  </p>

                  <div className='flex items-center justify-between'>
                    <Link
                      href={`/articles/${post.id}`}
                      title={post.title}
                      className='text-lg truncate lg:w-5/6 h4'
                    >
                      {post.title}
                    </Link>
                    <Link
                      className='flex-shrink-0'
                      href={`/articles/${post.id}`}
                    >
                      <ArrowUpRight />
                    </Link>
                  </div>
                  <p
                    className='text-light-gray line-clamp-4'
                    dangerouslySetInnerHTML={{ __html: post.body }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogPosts;
