'use client';

import { FaBoxOpen } from 'react-icons/fa';

import PageComponentWrapper from '@/components/PageComponentWrapper';
import LoadingSpinner from '@/components/Spinner';

import NotificationTile from '@/app/(authenticated)/notification/_components/NotificationTile';
import { useGetNotificationsQuery } from '@/rtk-query/notifications';

const Notifications = () => {
  const { data, isLoading, refetch } = useGetNotificationsQuery(
    { page: 1 },
    { refetchOnMountOrArgChange: true }
  );

  const notifications = data?.data ?? [];

  return (
    <PageComponentWrapper
      headerComponent={<h1 className='h3'>Notifications</h1>}
    >
      {isLoading ? (
        <div className='grid place-items-center w-full min-h-72 '>
          <LoadingSpinner />
        </div>
      ) : notifications.length > 0 ? (
        <div className='space-y-8'>
          {notifications.map((notification) => {
            const now = Date.now();
            const createdAt = notification.created_at * 1000; // Convert to milliseconds
            const diffInDays = Math.floor(
              (now - createdAt) / (1000 * 60 * 60 * 24)
            );

            let timeAgo;
            if (diffInDays === 0) {
              const diffInHours = Math.floor(
                (now - createdAt) / (1000 * 60 * 60)
              );
              timeAgo = `${diffInHours}h`;
            } else if (diffInDays < 30) {
              timeAgo = `${diffInDays}d`;
            } else {
              const diffInMonths = Math.floor(diffInDays / 30);
              timeAgo = `${diffInMonths}mo`;
            }

            return (
              <NotificationTile
                key={notification.id}
                active={!notification.seen}
                note={notification.message}
                id={notification.id}
                refetch={refetch}
                timeAgo={timeAgo}
              />
            );
          })}
        </div>
      ) : (
        <div className='grid place-items-center w-full min-h-72 '>
          <div className='flex flex-col items-center justify-center'>
            <FaBoxOpen className='text-primary-green' size={80} />
            <p className='text-center text-lg'>
              Your notifications will appear here
            </p>
          </div>
        </div>
      )}
    </PageComponentWrapper>
  );
};

export default Notifications;
