import { Download, X } from 'lucide-react';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';

import style from '../style/ProjectDocumentTile.module.scss';

import { cn } from '@/lib/utils';

import { Dialog, DialogContent } from '@/components/ui/dialog';
const ProjectDocumentTile = ({
  imageUrl,
  documentName,
}: {
  imageUrl: string;
  documentName: string;
}) => {
  const isPdf = imageUrl?.toLowerCase().endsWith('.pdf');
  console.log(isPdf);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => {
    console.log('outside');
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDownload = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation(); // Prevent event bubbling to the div

    const link = document.createElement('a');
    link.href = `${imageUrl}?download=true`;
    // link.download = imageUrl.split('/').pop() || 'downloaded-file.jpg';
    link.setAttribute(
      'download',
      imageUrl.split('/').pop() || 'downloaded-file.jpg'
    );
    // link.setAttribute('target', '_blank');
    document.body.appendChild(link); // Required for Next.js
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div
        onClick={openModal}
        className='bg-[#F6F8FB] rounded-2xl p-4 cursor-pointer'
      >
        <div className='relative rounded-[10px] w-full h-[180px] overflow-hidden flex items-center justify-center bg-white'>
          {isPdf ? (
            <FaFilePdf className='text-primary-green' size={100} />
          ) : (
            <Image src={imageUrl} alt='image' layout='fill' objectFit='cover' />
          )}
        </div>
        <div className='flex gap-4 justify-between items-start mt-[10px] mb-1'>
          <p className='text-[#111111] text-lg font-bold leading-7 truncate'>
            {documentName}
          </p>

          <Download
            className='cursor-pointer hover:scale-110 transition-all shrink-0'
            onClick={handleDownload}
          />
        </div>
        <p className='text-xs'>
          Uploaded by{' '}
          <span className='font-bold text-[#16C098]'>Jason Fowler</span>
        </p>
      </div>
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className='rounded-2xl p-10 border-none outline-none max-w-xl mx-auto'>
          <span
            onClick={closeModal}
            className='cursor-pointer absolute top-5 right-5 h-10 w-10 border[#05253666] border rounded-full flex items-center justify-center'
          >
            <X color='#052536' strokeWidth={1.5} />
          </span>
          <p className='text-2xl text-[#111] font-bold mb-5 text-center'>
            {documentName}
          </p>
          <div
            className={cn(
              'relative h-[400px] w-[486px] overflow-hidden',
              style.iframe
            )}
          >
            {isPdf ? (
              <iframe
                src={`${imageUrl}#toolbar=0&navpanes=0&scrollbar=0&zoom=page-fit&view=FitH`}
                className='w-full h-full overflow-hidden origin-center'
                title={documentName}
                style={{
                  border: 'none',
                  overflow: 'hidden',

                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              ></iframe>
            ) : (
              <Image
                src={imageUrl}
                alt='image'
                layout='fill'
                objectFit='cover'
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectDocumentTile;
