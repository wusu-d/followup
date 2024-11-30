'use client';

import { useParams } from 'next/navigation';
import { FaBoxOpen } from 'react-icons/fa';

import PageComponentWrapper from '@/components/PageComponentWrapper';
import LoadingSpinner from '@/components/Spinner';

import { useAppSelector } from '@/store';

import UserBadge from '@/app/(authenticated)/_components/UserBadge';
import MailIcon from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/icons/MailIcon';
import NameIcon from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/icons/NameIcon';
import PhoneIcon from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/icons/PhoneIcon';
import SpecialistPortfolioHeader from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/_components/SpecialistPortfolioHeader';
import { useGetProviderPortfolioQuery } from '@/rtk-query/services';
import {
  BOOK_APPOINTMENT_SERVICE_ARRAY,
  BOOK_APPOINTMENT_SLICE_REDUCER_NAME,
} from '@/slices/book-appointment.slice';
import { formatToCurrency } from '@/utils/forrmatCurrency';

const SpecialistPortfolioPage = () => {
  const { specialist } = useParams();

  const { providerPortfolio } = useAppSelector((state) => state['specialist']);

  const { isLoading } = useGetProviderPortfolioQuery(`${specialist}`);
  const { [BOOK_APPOINTMENT_SERVICE_ARRAY]: serviceArray } = useAppSelector(
    (state) => state[BOOK_APPOINTMENT_SLICE_REDUCER_NAME]
  );

  const servicePrice =
    serviceArray.find((item) => item.name === 'Service')?.price || 0;

  if (isLoading)
    return (
      <div className='grid place-items-center w-full min-h-72 '>
        <LoadingSpinner />
      </div>
    );
  return (
    <>
      <PageComponentWrapper headerComponent={<SpecialistPortfolioHeader />}>
        <div className='border-[#F1F1F1] border rounded-[20px] p-5'>
          <div>
            <div className='flex justify-between items-start'>
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
            <div className='mt-7 p-5 bg-[] rounded-2xl bg-[#F6F8FB] border border-[#E1E1E14D]'>
              <div className='grid grid-cols-[auto,1fr,1fr] gap-3'>
                {/* first column */}
                <div className='rounded-lg border-2 border-[#16C098] p-5 pr-10 shadow-[0px 0px 14px 0px #16C09840] bg-white w-max'>
                  <p>Client Details:</p>
                  <div className='mt-5 space-y-10'>
                    <span className='flex items-center gap-2 text-[#111] font-semibold w-max bg-[#F6F8FB]'>
                      <NameIcon /> {providerPortfolio?.client.profile.full_name}
                    </span>
                    <span className='flex items-center gap-2 text-[#111] font-semibold w-max bg-[#F6F8FB]'>
                      <PhoneIcon /> {providerPortfolio?.client.profile.phone}
                    </span>
                    <span className='flex items-center gap-2 text-[#111] font-semibold w-max bg-[#F6F8FB]'>
                      <MailIcon /> {providerPortfolio?.client.profile.email}
                    </span>
                  </div>
                </div>

                {providerPortfolio?.client.past_appointments?.length ? (
                  providerPortfolio.client.past_appointments.map(
                    (appointment) => (
                      <div key={appointment.id} className='space-y-3'>
                        <div className='border-[#FF78C4] border-t-2 rounded-lg py-[10px] px-4 bg-white space-y-2'>
                          <div className='text-[#111] text-sm'>
                            <span>Challenge: </span>
                            <span className='font-semibold'>
                              {appointment.challenge}
                            </span>
                          </div>
                          <div className='text-[#111] text-sm'>
                            <span>Wellness: </span>
                            <span className='font-semibold'>
                              {appointment.wellness}
                            </span>
                          </div>
                          <div className='text-[#111] text-sm'>
                            <span>Goal: </span>
                            <span className='font-semibold'>
                              {appointment.goal}
                            </span>
                          </div>
                        </div>
                        {/* <div className='bg-[#FF78C433] rounded-lg text-sm font-semibold text-[#111] py-[10px] px-4'>
                        <p>Action Plan:</p>
                        <p className='mt-2'>{appointment.action_plan}</p>
                      </div> */}
                        <div className='text-sm rounded-lg py-[10px] px-4 bg-white'>
                          <p className='font-semibold text-[#111]'>Note:</p>
                          <p className='mt-2 text-[#6B6B6B] leading-6'>
                            {appointment.note}
                          </p>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className='col-span-2 flex flex-col gap-2 items-center justify-center h-full'>
                    <FaBoxOpen className='text-primary-green' size={60} />
                    <p className='text-[#6B6B6B] font-semibold text-lg'>
                      No previous activity
                    </p>
                  </div>
                )}
                {/* third column */}
              </div>
            </div>
          </div>
        </div>
      </PageComponentWrapper>
    </>
  );
};

export default SpecialistPortfolioPage;
