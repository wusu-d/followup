'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
const Progressbar = () => {
  return (
    <ProgressBar
      height='4px'
      color='#16C098'
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default Progressbar;
