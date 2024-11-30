import { FaCircleCheck, FaCircleExclamation } from 'react-icons/fa6';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';

import { useAppDispatch } from '@/store';

import CancelSubscriptionButton from '@/app/(authenticated)/profile/_components/CancelSubscriptionButton';
import { useGetActiveSubscriptionQuery } from '@/rtk-query/subscription';
import { updateEditProfileState } from '@/slices/editProfile.slice';
import { formatToCurrency } from '@/utils/forrmatCurrency';
import LoadingSpinner from '@/components/Spinner';

const UpgradeSubscription = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetActiveSubscriptionQuery();

  const startDate = data ? data?.start_date * 1000 : 1000;
  const renewalDate = data ? data?.end_date * 1000 : 1000;

  const formatDate = (date: number) => {
    const date1 = new Date(date);
    const formattedDate = date1.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
    return formattedDate;
  };

  const handleCardChangeClicked = () => {
    dispatch(updateEditProfileState({ stage: 'changeCard' }));
  };
  const handleAddSubscription = () => {
    dispatch(updateEditProfileState({ stage: 'addSubscription' }));
  };
  if (isLoading) {
    return (
      <div className='grid place-items-center w-full min-h-72 '>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className='mt-10 space-y-5'>
      <div className='border border-[#F1F1F1] rounded-[20px] p-5'>
        <p className='font-bold text-[#6B6B6B] text-xl'>Current Plan</p>
        <div className='px-4 py-[10px] bg-[#F4F4F4] rounded-[10px] flex items-start my-4 w-max gap-6'>
          <div className='font-bold flex flex-col text-[#052536]'>
            <span>{data?.name}</span>
            <span className='text-xl'>
              {data?.price && formatToCurrency(data.price)}
            </span>
          </div>
          <div
            className={cn(
              'p-2 px-3 bg-[#27AE60] text-white w-[103px] rounded-lg flex items-center justify-between',
              data?.status !== 'active' && 'bg-[#DB524E] px-2'
            )}
          >
            {data?.status === 'active' ? (
              <FaCircleCheck />
            ) : (
              <FaCircleExclamation />
            )}
            {data?.status === 'active' ? 'Active' : 'InActive'}
          </div>
        </div>
        <p className='text-[#111] w-4/5'>
          Office ipsum you must be muted. Meeting culture web race long
          fastworks no-brainer. Items feature us pollination existing pants.
          Dogpile let's if incentivization offline mindfulness savvy.
        </p>
      </div>
      <div className='border border-[#f1f1f1] rounded-[20px] p-5'>
        <p className='font-bold text-[#111] text-xl'>Payment Details</p>
        <div className='mt-7 mb-10 flex gap-8 items-end'>
          <div className='flex flex-col gap-[10px]'>
            <span className='font-medium text-[#6B6B6B]'>Purchase Date</span>
            <span className='font-bold text-lg text-[#111]'>
              {formatDate(startDate)}
            </span>
          </div>
          <div className='border-[#E1E1E1] border min-h-10'></div>
          <div className='flex flex-col gap-[10px]'>
            <span className='font-medium text-[#6B6B6B]'>
              Renew subscription by
            </span>
            <span className='font-bold text-lg text-[#111]'>
              {formatDate(renewalDate)}
            </span>
          </div>
          <div className='border-[#E1E1E1] border min-h-11'></div>
          <div className='flex flex-col gap-[10px]'>
            <span className='font-medium text-[#6B6B6B]'>Payment method</span>
            <span className='text-lg text-[#111]'>
              Credit Card
              <span className='font-bold'>****2023</span>
            </span>
          </div>
          <div className='border-[#E1E1E1] border min-h-10'></div>
          <Button
            onClick={handleCardChangeClicked}
            className='text-[#111] px-8'
            variant='outline'
          >
            Change Card
          </Button>
        </div>
        <div className='flex gap-3'>
          {data?.status === 'active' ? (
            <Button onClick={handleAddSubscription} className='px-[59px]'>
              Upgrade Plan
            </Button>
          ) : (
            <Button onClick={handleAddSubscription} className='px-[59px]'>
              Add Subscription
            </Button>
          )}
          <CancelSubscriptionButton disable={data?.status !== 'active'} />
        </div>
      </div>
    </div>
  );
};

export default UpgradeSubscription;
