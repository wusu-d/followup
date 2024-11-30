import Image, { StaticImageData } from 'next/image';

import { Card, CardTitle } from '@/components/ui/card';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  progress: number;
  creator: string;
}

const ProjectCard = ({
  title,
  description,
  imageUrl,
  progress,
  creator,
}: ProjectCardProps) => {
  return (
    <Card className='cursor-pointer w-full overflow-hidden flex gap-5 rounded-2xl bg-[#F6F8FB] border-[#E1E1E14D] border p-5'>
      <div className='relative min-w-[135px] h-[135px] rounded-[10px] overflow-hidden'>
        <Image src={imageUrl} alt={title} layout='fill' objectFit='cover' />
      </div>

      <div className='space-y-3 grow'>
        <CardTitle className='text-lg text-[#111111] font-bold'>
          {title}
        </CardTitle>
        <p className='text-sm line-clamp-2 min-h-[2rem]'>{description}</p>
        <div className='w-full bg-[#D0F2EA] rounded-md h-2.5'>
          <div
            className='bg-[#16C098] h-2.5 rounded-full'
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className='text-sm text-[#111]'>
          Created by <span className='font-bold'>{creator}</span>
        </p>
      </div>
    </Card>
  );
};

export default ProjectCard;
