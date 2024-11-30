import Footer from '@/app/(general)/articles/_components/Footer';
import TopNavbar from '@/app/(general)/articles/_components/TopNavbar';
import React from 'react';

const ArticlesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <TopNavbar />
      {children}
      <Footer />
    </div>
  );
};

export default ArticlesLayout;
