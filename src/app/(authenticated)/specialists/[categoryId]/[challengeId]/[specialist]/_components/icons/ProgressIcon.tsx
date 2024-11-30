import React from 'react';

const ProgressIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      // xmlns:xlink='http://www.w3.org/1999/xlink'
    >
      <mask
        id='mask0_1184_48198'
        // style='mask-type:alpha'
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='20'
        height='20'
      >
        <rect width='20' height='20' fill='url(#pattern0_1184_48198)' />
      </mask>
      <g mask='url(#mask0_1184_48198)'>
        <rect width='20' height='20' fill='#16C098' />
      </g>
      <defs>
        <pattern
          id='pattern0_1184_48198'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          {/* <use xlink:href='#image0_1184_48198' transform='scale(0.01)' /> */}
        </pattern>
        {/* <image
          id='image0_1184_48198'
          width='100'
          height='100'
          xlink:href='data:image/png;base64,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'
        /> */}
      </defs>
    </svg>
  );
};

export default ProgressIcon;
