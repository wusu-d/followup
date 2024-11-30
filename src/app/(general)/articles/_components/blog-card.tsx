import { ArrowUpRight } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

import { BlogPost } from '@/app/(general)/articles/_components/types';

const ArticleCard = ({
  id,
  title,
  creator,
  created_at,
  image,
  body,
}: BlogPost) => {
  return (
    <div className='flex flex-col gap-2 lg:gap-3 xl:gap-6'>
      <div className='w-full aspect-[2.29] relative rounded-xl overflow-hidden'>
        <Image
          src={image}
          alt='Recent Blog Post Image'
          className='w-full h-auto object-cover'
          fill
        />
      </div>

      <div className='space-y-2 lg:space-y-3 xl:space-y-5'>
        <p className='text-sm font-semibold'>
          <span className='text-primary-green'>{creator} &bull;</span>{' '}
          {moment(created_at * 1000).format('DD MMM YYYY')}
        </p>

        <div className='flex items-center justify-between'>
          <Link href={`/articles/${id}`}>
            <h3 title={title} className='line-clamp-2 '>
              {title}
            </h3>
          </Link>
          <Link className='flex-shrink-0' href={`/blog/${id}`}>
            <ArrowUpRight />
          </Link>
        </div>
        <p
          className='line-clamp-3'
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </div>
  );
};

export default ArticleCard;
