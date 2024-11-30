import Image from 'next/image';
import { PropsWithChildren } from 'react';

import AvatarCircles from '@/components/ui/avatar-circles';

import Avatar from '~/images/avatar.jpg';
import SignupMeditation from '~/images/signup-image.png';

const LoginRegisterWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className='grid grid-cols-2 w-full h-full'>
      {children}

      <div className='w-full h-full'>
        <div className='w-full h-full relative rounded-r-3xl [clip-path:polygon(15%_0%,100%_0%,100%_100%,0_100%)] overflow-hidden'>
          <Image
            alt='Meditating woman'
            src={SignupMeditation}
            // width={681}
            // height={784}
            fill
            className='object-cover'
          />
        </div>
        <div className='absolute top-[10%] flex items-center flex-col gap-5 p-5 rounded-t-[10px] text-white rounded-br-[26px] rounded-bl-[16px] backdrop-blur-xl bg-black/20'>
          {/* <p className='mix-blend-normal h4'>Trusted by Million Users</p> */}

          <AvatarCircles
            avatarUrls={[Avatar, Avatar, Avatar, Avatar, Avatar]}
            numPeople='2k'
          />
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterWrapper;
