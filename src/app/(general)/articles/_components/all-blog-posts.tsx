'use client';

import { useEffect, useState } from 'react';

import Pagination from '@/components/pagination';

import ArticleCard from '@/app/(general)/articles/_components/blog-card';
import { BlogPostResponse } from '@/app/(general)/articles/_components/types';

const AllBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPostResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.followu.ca/api/v1/blog/posts?page=${currentPage}&limit=${limit}`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <section className='w-full bg-white pt-8 pb-10'>
      <div className='container'>
        <div className='max-w-7xl mx-auto space-y-5'>
          <h3>All Blog Posts</h3>

          <div className='grid grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] gap-4'>
            {posts?.data.map((post) => (
              <ArticleCard key={post.id} {...post} />
            ))}
          </div>

          {posts && (
            <Pagination
              pageCount={posts.page_count}
              currentPage={currentPage - 1}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AllBlogPosts;
