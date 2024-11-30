import AllBlogPosts from '@/app/(general)/articles/_components/all-blog-posts';
import RecentBlogPosts from '@/app/(general)/articles/_components/recent-blog-posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: `%s | FollowUp`,
  },
  description: 'FollowUp Blog',
};

const ArticlesPage = () => {
  return (
    <main className='w-full h-auto'>
      <RecentBlogPosts />
      <AllBlogPosts />
    </main>
  );
};

export default ArticlesPage;
