'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';

import Button from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';
import SpecialistBadge from '@/components/SpecialistBadge';
import LoadingSpinner from '@/components/Spinner';

import { useAppDispatch, useAppSelector } from '@/store';

import UserBadge from '@/app/(authenticated)/_components/UserBadge';
import MapLocation from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/MapLocation';
import { categoriesMapping } from '@/app/(authenticated)/specialists/_components/specialists.constants';
import AddressIcon from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/AddressIcon';
import BookAppointmentFlow from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/BookAppointmentFlow';
import FacebookIcon from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/icons/FacebookIcon';
import InstagramIcon from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/icons/InstagramIcon';
import { useGetProviderPortfolioQuery } from '@/rtk-query/services';
import {
  BOOK_APPOINTMENT_SERVICE_ARRAY,
  BOOK_APPOINTMENT_SLICE_REDUCER_NAME,
  resetBookAppointment,
} from '@/slices/book-appointment.slice';
import { formatToCurrency } from '@/utils/forrmatCurrency';

const SpecialistHomePage = ({ providerId }: { providerId: string }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const { providerPortfolio } = useAppSelector((state) => state['specialist']);
  const { [BOOK_APPOINTMENT_SERVICE_ARRAY]: serviceArray } = useAppSelector(
    (state) => state[BOOK_APPOINTMENT_SLICE_REDUCER_NAME]
  );
  const { isLoading } = useGetProviderPortfolioQuery(providerId);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const openDialog = () => {
    dispatch(resetBookAppointment());

    setIsDialogOpen(true);
  };

  if (isLoading)
    return (
      <div className='grid place-items-center w-full min-h-72 '>
        <LoadingSpinner />
      </div>
    );

  const servicePrice =
    serviceArray.find((item) => item.name === 'Service')?.price || 0;

  return (
    <>
      <div className='border-[#F1F1F1] border rounded-[20px] p-5'>
        <div>
          <div className='flex justify-between items-start pb-5'>
            <UserBadge
              username={providerPortfolio?.work.professional_name}
              imgSrc={providerPortfolio?.personal.profile_image ?? ''}
              imgClassNames='h-[70px] w-[70px]'
              desc={providerPortfolio?.work.profession}
              textColor='text-[24px] text-[#052536] mb-2'
            />
            <div className='grid grid-cols-3 gap-[10px]'>
              <div className='py-[5px] px-4 flex flex-col items-center rounded-[5px] bg-[#428BF91A]'>
                <span className='font-bold text-[#428BF9] text-sm capitalize'>
                  {providerPortfolio?.work.appointment_type}
                </span>
                <span className='text-xs text-center text-[#052536]'>
                  Appointment Type
                </span>
              </div>
              <div className='py-[5px] px-4 flex flex-col items-center rounded-[5px] bg-[#E8F9F5]'>
                <span className='font-bold text-[#27AE60] text-sm'>
                  {!providerPortfolio?.work.consultation_charge
                    ? 'Free'
                    : formatToCurrency(
                        providerPortfolio?.work.consultation_charge
                      )}
                </span>
                <span className='text-xs text-center text-[#052536]'>
                  Consultation Charge
                </span>
              </div>
              <div className='py-[5px] px-4 flex flex-col items-center rounded-[5px] bg-[#DEE3E7]'>
                <span className='font-bold text-[#052536] text-sm'>
                  {formatToCurrency(servicePrice)}
                </span>
                <span className='text-xs text-center text-[#052536]'>
                  Service Charge
                </span>
              </div>
            </div>
          </div>
          <div className='h-[calc(100vh-320px)] overflow-y-scroll pb-4'>
            <p className='pb-4 text-sm text-[#6B6B6B] border-b border-b-[#F1F1F1]'>
              {providerPortfolio?.work.bio}
            </p>
            <div className='mt-5 space-y-5'>
              <div>
                <h3 className='text-base font-bold text-[#111]'>
                  Service Category
                </h3>
                <div className='flex gap-4 mt-3 flex-wrap'>
                  {providerPortfolio?.services.map((service) => {
                    const { color } = categoriesMapping[service.name];
                    const textBgColor = color.replace('#', '') + '33';

                    return (
                      <SpecialistBadge
                        key={service.name}
                        text={service.name}
                        classNames={{
                          icon: 'w-[50px] h-[50px]',
                          text: 'text-[#111111] font-medium text-base rounded-r-[30px]',
                        }}
                        backgrounds={{
                          icon: color,
                          text: `#${textBgColor}`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              <div>
                <h3 className='text-base font-bold text-[#111]'>
                  Wellness Services
                </h3>
                <div className='flex gap-4 mt-3 flex-wrap'>
                  {providerPortfolio?.wellness_challenges.map((challenge) => {
                    return (
                      <SpecialistBadge
                        key={challenge.name}
                        text={challenge.name}
                        classNames={{
                          icon: 'w-[50px] h-[50px] bg-[#FFA553]',
                          text: 'text-[#111111] bg-[#FFA55333] font-medium text-base rounded-r-[30px]',
                        }}
                        icon={challenge.icon}
                        backgrounds={{
                          icon: '#FF6D60',
                          text: `'#FF6D6033`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              <div>
                <h3 className='text-base font-bold text-[#111]'>Address</h3>
                <div className='mt-3 px-4 py-3 bg-[#F6F8FB] rounded-[10px] flex items-center gap-2 w-max'>
                  <span className='flex items-center justify-center w-10 h-10 rounded-full bg-[#052536]'>
                    <AddressIcon />
                  </span>
                  <span className='font-medium text-[#111] capitalize'>
                    {providerPortfolio?.personal.address},{' '}
                    {providerPortfolio?.personal.province},{' '}
                    {providerPortfolio?.personal.city}{' '}
                    {providerPortfolio?.personal.postal_code}{' '}
                  </span>
                </div>
              </div>

              <MapLocation
                address={`${providerPortfolio?.personal.address} ${providerPortfolio?.personal.city}`}
              />

              <div>
                <h3 className='text-base font-bold text-[#111]'>
                  Social Media
                </h3>
                <div className='mt-3 flex gap-4'>
                  {providerPortfolio?.personal.social_links ? (
                    Object.entries(
                      providerPortfolio?.personal.social_links
                    )?.map(([platform, url]) => {
                      const getIconBackground = () => {
                        if (platform.toLowerCase() === 'instagram')
                          return '#F3E2F3';
                        if (platform.toLowerCase() === 'facebook')
                          return '#DFEFFB';
                        if (platform.toLowerCase() === 'linkedin')
                          return ' #dce6f1';
                        if (
                          platform.toLowerCase() === 'twitter' ||
                          platform.toLowerCase() === 'x'
                        )
                          return '#AAB8C2';
                        return undefined;
                      };
                      const getIcon = () => {
                        if (platform.toLowerCase() === 'instagram')
                          return <InstagramIcon />;
                        if (platform.toLowerCase() === 'facebook')
                          return <FacebookIcon />;
                        if (
                          platform.toLowerCase() === 'twitter' ||
                          platform.toLowerCase() === 'x'
                        ) {
                          return <FaXTwitter size={28} />;
                        }
                        if (platform.toLowerCase() === 'linkedin') {
                          return <FaLinkedin color='#0a66c2' size={28} />;
                        }
                        return null;
                      };

                      return (
                        <Link key={platform} href={url} target='_blank'>
                          <SpecialistBadge
                            text={platform}
                            classNames={{
                              icon: 'w-[50px] h-[50px]',
                              text: 'text-[#111111] font-medium text-base capitalize rounded-r-[30px]',
                            }}
                            icon={getIcon()}
                            backgrounds={{
                              icon: getIconBackground(),
                              text: '#F6F8FB',
                            }}
                          />
                        </Link>
                      );
                    })
                  ) : (
                    <SpecialistBadge
                      text='Instagram'
                      classNames={{
                        icon: 'w-[50px] h-[50px] bg-[#FFA553]',
                        text: 'text-[#111111] bg-[#FFA55333] font-medium text-base rounded-r-[30px]',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='space-x-4 w-max ml-auto mt-5'>
            <UnstyledLink href={`${pathname}/portfolio`}>
              <Button variant='outline' className='px-16'>
                Portfolio
              </Button>
            </UnstyledLink>
            <Button onClick={openDialog} className='px-5'>
              Book Appointment
            </Button>
          </div>
        </div>
      </div>

      <BookAppointmentFlow
        isDialogOpen={isDialogOpen}
        closeDialog={closeDialog}
      />
    </>
  );
};

export default SpecialistHomePage;
