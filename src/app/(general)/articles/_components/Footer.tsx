import Link from 'next/link';

import EnvelopeIcon from '@/components/icons/EnvelopeIcon';
import LocationIcon from '@/components/icons/LocationIcon';

const Footer = () => {
  return (
    <footer className='w-full mt-auto bg-primary-black py-6 lg:py-12 text-white'>
      <div className='container'>
        <div className='max-w-7xl mx-auto'>
          <section className='flex md:flex-row gap-6 md:gap-0 flex-col justify-between border-b pb-6 border-b-white/40'>
            <h2 className='w-full md:w-6/12 lg:w-5/12 xl:w-4/12'>
              Discover the Art of Self Care Transform Your Well-Being Today
            </h2>

            <div className='space-y-5'>
              <div className='flex items-center gap-3'>
                <div className='text-sm grid place-items-center w-4'>
                  <LocationIcon />
                </div>

                <div className='max-w-56'>Toronto, Canada</div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='text-sm grid place-items-center w-4'>
                  <EnvelopeIcon />
                </div>

                <a href='mailto:support@followu.ca' className='max-w-56'>
                  support@followu.ca
                </a>
              </div>
            </div>
          </section>

          <div className='mt-6 flex flex-col md:flex-row gap-6 items-center justify-between'>
            <nav className='flex gap-6'>
              <Link href='https://followu.ca/about'>About</Link>
              <Link href='/articles'>Blogs</Link>
            </nav>

            <p>© Copyright 2023, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
