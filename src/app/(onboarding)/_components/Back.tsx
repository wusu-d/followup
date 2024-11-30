import { MdArrowBackIos } from 'react-icons/md';

import { cn } from '@/lib/utils';

const Back = ({
  onClick,
  position,
}: {
  onClick: () => void;
  position?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'cursor-pointer flex items-center gap-1 text-[#111] font-semibold text-lg absolute top-10 left-10',
        position
      )}
    >
      <MdArrowBackIos color='#16C098' />
      Back
    </div>
  );
};

export default Back;
