import React from 'react';
import { IconBaseProps } from 'react-icons';

const NotificationIcon = (props: IconBaseProps) => {
  return (
    <svg
      width='23'
      height='26'
      viewBox='0 0 23 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <mask
        id='mask0_3039_5297'
        style={{
          maskType: 'luminance',
        }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='23'
        height='21'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M0.5 0.166016H22.0797V20.4053H0.5V0.166016Z'
          fill='white'
        />
      </mask>
      <g mask='url(#mask0_3039_5297)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M11.2882 1.91602C7.21068 1.91602 4.36868 5.11035 4.36868 7.97685C4.36868 10.4023 3.69552 11.5235 3.10052 12.5128C2.62335 13.3074 2.24652 13.935 2.24652 15.2989C2.44135 17.4992 3.89385 18.6553 11.2882 18.6553C18.6417 18.6553 20.1397 17.4479 20.3333 15.223C20.3298 13.935 19.953 13.3074 19.4758 12.5128C18.8808 11.5235 18.2077 10.4023 18.2077 7.97685C18.2077 5.11035 15.3657 1.91602 11.2882 1.91602ZM11.2882 20.4053C5.83285 20.4053 0.902516 20.0203 0.500016 15.3735C0.496516 13.4508 1.08335 12.4732 1.60135 11.6122C2.12518 10.7395 2.61868 9.91702 2.61868 7.97685C2.61868 4.20502 6.10235 0.166016 11.2882 0.166016C16.474 0.166016 19.9577 4.20502 19.9577 7.97685C19.9577 9.91702 20.4512 10.7395 20.975 11.6122C21.493 12.4732 22.0798 13.4508 22.0798 15.2989C21.6727 20.0203 16.7435 20.4053 11.2882 20.4053Z'
          fill='#16C098'
        />
      </g>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.2312 25.2497H11.2289C9.92103 25.2485 8.68319 24.6722 7.74403 23.6257C7.42086 23.2675 7.45003 22.7134 7.80936 22.3914C8.16869 22.067 8.72169 22.0962 9.04486 22.4567C9.64919 23.1299 10.425 23.4997 11.23 23.4997H11.2312C12.0397 23.4997 12.819 23.1299 13.4245 22.4555C13.7489 22.0974 14.3019 22.0682 14.66 22.3914C15.0194 22.7145 15.0485 23.2687 14.7254 23.6269C13.7827 24.6734 12.5425 25.2497 11.2312 25.2497Z'
        fill='#16C098'
      />
    </svg>
  );
};

export default NotificationIcon;
