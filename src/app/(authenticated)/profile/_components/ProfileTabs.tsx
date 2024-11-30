'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { cn } from '@/lib/utils';

import ChangePassword from '@/app/(authenticated)/profile/_components/ChangePassword';
import EditProfile from '@/app/(authenticated)/profile/_components/EditProfile';
import PaymentHistory from '@/app/(authenticated)/profile/_components/PaymentHistory';
import PaymentInfo from '@/app/(authenticated)/profile/_components/PaymentInfo';
import UpgradeSubscription from '@/app/(authenticated)/profile/_components/UpgradeSubscription';
import WellnessService from '@/app/(authenticated)/profile/_components/WellnessService';
import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';

const ProfileTabs = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('action') || 'edit-profile';
  // Function to update the URL with the selected tab
  const handleTabClick = (tab: string) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('action', tab); // Update the tab search param
    router.push(`?${newParams.toString()}`, { shallow: true } as any); // Push new search params to URL
  };

  const renderClientTabContent = () => {
    switch (currentTab) {
      case 'edit-profile':
        return <EditProfile />;
      case 'change-password':
        return <ChangePassword />;
      case 'payment-history':
        return <PaymentHistory />;

      default:
        return <EditProfile />;
    }
  };

  const renderProfileTabContent = () => {
    switch (currentTab) {
      case 'edit-profile':
        return <EditProfile />;
      case 'change-password':
        return <ChangePassword />;
      case 'payment-history':
        return <PaymentHistory />;
      case 'upgrade-subscription':
        return <UpgradeSubscription />;
      // case 'payment-info':
      //   return <PaymentInfo />;
      case 'wellness-service':
        return <WellnessService />;

      default:
        return <EditProfile />;
    }
  };

  return (
    <div>
      <div className='font-medium flex items-center flex-wrap text-lg xl:xl text-[#052536]'>
        <span
          onClick={() => handleTabClick('edit-profile')}
          className={cn(
            'cursor-pointer shrink-0 py-3 px-[16px] rounded-lg',
            currentTab === 'edit-profile' && 'bg-[#16C098] text-white'
          )}
        >
          Edit Profile
        </span>
        {session?.user_groups.includes(RolesEnum.SERVICE_PROVIDER) && (
          <span
            onClick={() => handleTabClick('wellness-service')}
            className={cn(
              'cursor-pointer shrink-0 py-3 px-[16px] rounded-lg',
              currentTab === 'wellness-service' && 'bg-[#16C098] text-white'
            )}
          >
            Wellness Service
          </span>
        )}
        <span
          onClick={() => handleTabClick('change-password')}
          className={cn(
            'cursor-pointer shrink-0 py-3 px-[16px] rounded-lg',
            currentTab === 'change-password' && 'bg-[#16C098] text-white'
          )}
        >
          Change Password
        </span>
        {session?.user_groups.includes(RolesEnum.SERVICE_PROVIDER) && (
          <span
            onClick={() => handleTabClick('upgrade-subscription')}
            className={cn(
              'cursor-pointer shrink-0 py-3 px-[16px] rounded-lg',
              currentTab === 'upgrade-subscription' && 'bg-[#16C098] text-white'
            )}
          >
            Upgrade Subscription
          </span>
        )}
        {/* {session?.user_groups.includes(RolesEnum.SERVICE_PROVIDER) && (
          <span
            onClick={() => handleTabClick('payment-info')}
            className={cn(
              'cursor-pointer shrink-0 py-3 px-[16px] rounded-lg',
              currentTab === 'payment-info' && 'bg-[#16C098] text-white'
            )}
          >
            Payment Info
          </span>
        )} */}
        <span
          onClick={() => handleTabClick('payment-history')}
          className={cn(
            'cursor-pointer shrink-0 py-3 px-[16px] rounded-lg',
            currentTab === 'payment-history' && 'bg-[#16C098] text-white'
          )}
        >
          Payment History
        </span>
      </div>
      {session?.user_groups.includes(RolesEnum.SERVICE_PROVIDER)
        ? renderProfileTabContent()
        : renderClientTabContent()}
    </div>
  );
};

export default ProfileTabs;
