'use client';

import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

import Button from '@/components/buttons/Button';

const NullResponsiveWrapper = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  // Check if pathname starts with '/articles'
  const shouldDisplay = pathname.startsWith('/articles');

  function switchDesktopMode() {
    if (document) {
      document
        ?.querySelector('meta[name=viewport]')
        ?.setAttribute('content', 'width=768');
    }
  }

  return (
    <>
      <div
        className={`${
          shouldDisplay ? 'hidden md:hidden' : 'md:hidden'
        } text-md flex h-full w-full items-center justify-center md:hidden bg-[#052536] text-white flex-col`}
      >
        <svg
          width='143'
          height='46'
          viewBox='0 0 143 46'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M5.66016 30.9152V9.2961H18.8718V13.3797H9.74376V18.0638H17.0702V22.1475H9.74376V30.9152H5.66016Z'
            fill='white'
          />
          <path
            d='M28.1388 31.3656C26.5073 31.3656 25.0761 31.0003 23.845 30.2696C22.6139 29.539 21.653 28.5331 20.9624 27.252C20.2818 25.9608 19.9415 24.4795 19.9415 22.808C19.9415 21.1165 20.2918 19.6302 20.9925 18.3491C21.6931 17.058 22.6589 16.0521 23.89 15.3314C25.1211 14.6108 26.5373 14.2505 28.1388 14.2505C29.7702 14.2505 31.2015 14.6158 32.4326 15.3464C33.6737 16.0771 34.6395 17.088 35.3301 18.3791C36.0207 19.6603 36.366 21.1366 36.366 22.808C36.366 24.4895 36.0157 25.9758 35.3151 27.267C34.6245 28.5481 33.6586 29.554 32.4175 30.2846C31.1865 31.0053 29.7602 31.3656 28.1388 31.3656ZM28.1388 27.5522C29.4499 27.5522 30.4258 27.1118 31.0663 26.2311C31.7169 25.3403 32.0422 24.1993 32.0422 22.808C32.0422 21.3668 31.7119 20.2157 31.0513 19.355C30.4008 18.4942 29.4299 18.0638 28.1388 18.0638C27.248 18.0638 26.5173 18.264 25.9468 18.6644C25.3763 19.0647 24.9509 19.6202 24.6707 20.3308C24.4005 21.0415 24.2653 21.8672 24.2653 22.808C24.2653 24.2593 24.5906 25.4153 25.2412 26.2761C25.9018 27.1269 26.8676 27.5522 28.1388 27.5522Z'
            fill='white'
          />
          <path
            d='M39.6675 30.9152V8.8457H43.7511V30.9152H39.6675Z'
            fill='white'
          />
          <path
            d='M48.2521 30.9152V8.8457H52.3357V30.9152H48.2521Z'
            fill='white'
          />
          <path
            d='M63.8328 31.3656C62.2014 31.3656 60.7701 31.0003 59.539 30.2696C58.3079 29.539 57.3471 28.5331 56.6565 27.252C55.9759 25.9608 55.6356 24.4795 55.6356 22.808C55.6356 21.1165 55.9859 19.6302 56.6865 18.3491C57.3871 17.058 58.353 16.0521 59.584 15.3314C60.8151 14.6108 62.2314 14.2505 63.8328 14.2505C65.4642 14.2505 66.8955 14.6158 68.1266 15.3464C69.3677 16.0771 70.3335 17.088 71.0241 18.3791C71.7148 19.6603 72.0601 21.1366 72.0601 22.808C72.0601 24.4895 71.7098 25.9758 71.0091 27.267C70.3185 28.5481 69.3527 29.554 68.1116 30.2846C66.8805 31.0053 65.4542 31.3656 63.8328 31.3656ZM63.8328 27.5522C65.144 27.5522 66.1198 27.1118 66.7604 26.2311C67.411 25.3403 67.7362 24.1993 67.7362 22.808C67.7362 21.3668 67.4059 20.2157 66.7454 19.355C66.0948 18.4942 65.1239 18.0638 63.8328 18.0638C62.942 18.0638 62.2114 18.264 61.6409 18.6644C61.0704 19.0647 60.645 19.6202 60.3647 20.3308C60.0945 21.0415 59.9594 21.8672 59.9594 22.808C59.9594 24.2593 60.2847 25.4153 60.9352 26.2761C61.5958 27.1269 62.5617 27.5522 63.8328 27.5522Z'
            fill='white'
          />
          <path
            d='M77.9279 30.9152L72.9735 14.6708L76.9671 14.7009L79.9097 24.3694L82.8973 14.7009H86.2903L89.2779 24.3694L92.2205 14.7009H96.2141L91.2597 30.9152H88.1369L84.5938 20.3459L81.0507 30.9152H77.9279Z'
            fill='white'
          />
          <path
            d='M108.29 31.7199C106.548 31.7199 105.017 31.3696 103.696 30.669C102.375 29.9583 101.344 28.9624 100.603 27.6813C99.8625 26.4002 99.4922 24.8939 99.4922 23.1623V9.68042L103.636 9.65039V23.1323C103.636 23.8429 103.756 24.4885 103.996 25.069C104.236 25.6495 104.567 26.15 104.987 26.5703C105.417 26.9907 105.913 27.316 106.473 27.5462C107.044 27.7664 107.649 27.8765 108.29 27.8765C108.951 27.8765 109.561 27.7614 110.122 27.5312C110.692 27.301 111.188 26.9757 111.608 26.5553C112.028 26.135 112.354 25.6345 112.584 25.054C112.824 24.4735 112.944 23.8329 112.944 23.1323V9.65039H117.088V23.1623C117.088 24.8939 116.717 26.4002 115.977 27.6813C115.236 28.9624 114.205 29.9583 112.884 30.669C111.563 31.3696 110.031 31.7199 108.29 31.7199Z'
            fill='#16C098'
          />
          <path
            d='M128.936 31.7199C127.324 31.7199 125.978 31.3446 124.897 30.5939C123.816 29.8432 123.001 28.8223 122.45 27.5312C121.91 26.24 121.639 24.7838 121.639 23.1623C121.639 21.5409 121.91 20.0846 122.45 18.7935C122.991 17.5023 123.786 16.4814 124.837 15.7308C125.888 14.9801 127.184 14.6048 128.726 14.6048C130.277 14.6048 131.628 14.9751 132.779 15.7157C133.93 16.4564 134.821 17.4723 135.452 18.7634C136.092 20.0446 136.412 21.5109 136.412 23.1623C136.412 24.7838 136.097 26.24 135.467 27.5312C134.846 28.8223 133.975 29.8432 132.854 30.5939C131.733 31.3446 130.427 31.7199 128.936 31.7199ZM120.949 38.4759V15.0552H124.552V26.165H125.062V38.4759H120.949ZM128.275 28.0867C129.156 28.0867 129.877 27.8665 130.437 27.4261C130.998 26.9857 131.413 26.3952 131.683 25.6545C131.953 24.9039 132.089 24.0731 132.089 23.1623C132.089 22.2615 131.948 21.4408 131.668 20.7002C131.388 19.9495 130.953 19.354 130.362 18.9136C129.782 18.4632 129.036 18.238 128.125 18.238C127.274 18.238 126.584 18.4432 126.053 18.8535C125.533 19.2639 125.152 19.8394 124.912 20.58C124.672 21.3207 124.552 22.1815 124.552 23.1623C124.552 24.1432 124.672 25.004 124.912 25.7446C125.152 26.4853 125.543 27.0608 126.083 27.4711C126.634 27.8815 127.364 28.0867 128.275 28.0867Z'
            fill='#16C098'
          />
        </svg>

        <h2 className='text-center px-6 mt-4'>
          This app cannot be accessed on mobile devices.
        </h2>

        <Button onClick={switchDesktopMode} variant='white' className='mt-5'>
          Click here to view in desktop mode
        </Button>
      </div>

      <div
        className={` ${
          shouldDisplay ? 'block' : 'hidden md:block'
        } w-full h-full `}
      >
        {children}
      </div>
    </>
  );
};

export default NullResponsiveWrapper;
