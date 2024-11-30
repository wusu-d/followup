import { useEffect, useState } from 'react';

import Pagination from '@/components/pagination';

import ArticleCard from '@/app/(general)/articles/_components/blog-card';
import { BlogPostResponse } from '@/app/(general)/articles/_components/types';

const RelatedBlogPost = ({ catId }: { catId: number | null }) => {
  const [posts, setPosts] = useState<BlogPostResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.followu.ca/api/v1/blog/posts/get-by-category/${catId}?page=${currentPage}&limit=${limit}`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchPosts();
  }, [currentPage, catId]);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <section>
      <div className='container pb-5'>
        <div className='max-w-7xl mx-auto space-y-5'>
          <h3>Related Blog Posts</h3>

          <div className='grid grid-col-1 lg:grid-cols-3 gap-4 pb-20'>
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

export default RelatedBlogPost;
