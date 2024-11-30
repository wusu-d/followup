'use client';
import {
  HTMLMotionProps,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image, { ImageProps } from 'next/image';
import { useRef } from 'react';

const ScrollImageScale = ({
  imageProps,
  containerProps,
}: {
  imageProps: ImageProps & { alt: string };
  containerProps?: HTMLMotionProps<'div'>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);

  return (
    <motion.div {...containerProps} ref={ref}>
      <motion.figure
        style={{ scale }}
        className='w-full h-full overflow-hidden'
      >
        <Image {...imageProps} alt={imageProps.alt} />
      </motion.figure>
    </motion.div>
  );
};

export default ScrollImageScale;
