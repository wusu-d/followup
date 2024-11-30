import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import UnstyledLink from '@/components/links/UnstyledLink';

import { BlogPost } from '@/rtk-query/blog/types';

const BlogCard = ({
  title,
  image,
  created_at,
  body,
  creator,
  id,
}: BlogPost) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };
  return (
    <div className='space-y-5'>
      <div
        className='h-[240px] relative w-full rounded-xl overflow-hidden bg-slate-900
      '
      >
        <Image src={image} alt={title} fill className='object-cover' />
      </div>
      <div className='space-y-3'>
        <div className='text-sm font-semibold'>
          <span className='text-[#16c098]'>{creator} • </span>
          <span className='text-[#111]'>{formatDate(created_at)}</span>
        </div>
        <UnstyledLink
          href={`/articles/${id}`}
          className='text-[#052536] font-bold text-2xl flex justify-between items-start cursor-pointer'
        >
          <span title={title} className='truncate'>
            {title}
          </span>
          <ArrowUpRight className='shrink-0' />
        </UnstyledLink>
        <p
          className='line-clamp-2 overflow-hidden text-ellipsis text-[#6B6B6B]'
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </div>
  );
};

export default BlogCard;
