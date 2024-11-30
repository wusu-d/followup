'use client';

import { useState } from 'react';

import LoadingSpinner from '@/components/Spinner';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import BlogCard from '@/app/(authenticated)/blogs/_components/BlogCard';
import { useGetBlogPostsQuery } from '@/rtk-query/blog';

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetBlogPostsQuery(
    {
      page: currentPage,
      limit: 15,
    },
    {
      // Add these options to help with CORS and caching issues
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      // Add retry logic
    }
  );

  if (isLoading) {
    return (
      <div className='h-[calc(100vh-130px)] flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='h-[calc(100vh-130px)] flex items-center justify-center text-red-500'>
        Error loading blogs. Please try again.
      </div>
    );
  }

  const totalPages = data?.page_count ?? 1;

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={
                currentPage === i ? 'cursor-default' : 'cursor-pointer'
              }
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return items;
  };
  return (
    <div className='h-[calc(100vh-130px)]'>
      <div className='grid grid-cols-3 gap-x-8 gap-y-12 h-[90%] overflow-y-scroll'>
        {data?.data.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>

      <Pagination className='mt-4'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={
                currentPage === 1
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>

          {renderPaginationItems()}

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className={
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default BlogList;
