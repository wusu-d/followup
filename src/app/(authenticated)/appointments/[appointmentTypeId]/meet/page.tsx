'use client';

import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef } from 'react';

import Button from '@/components/buttons/Button';
import PageComponentWrapper from '@/components/PageComponentWrapper';
import LoadingSpinner from '@/components/Spinner';

import { useAppSelector } from '@/store';

import AppointmentStatusHeader from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/AppointmentStatusHeader';
import { useJoinMeetingQuery } from '@/rtk-query/appointments';
import { APPOINTMENTS_SLICE_REDUCER_NAME } from '@/slices/appointments.slice';

const isBrowser = typeof window !== 'undefined';

const getStorageItem = (key: string): string | null => {
  if (!isBrowser) return null;
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.error('Error accessing sessionStorage:', error);
    return null;
  }
};

const setStorageItem = (key: string, value: string): void => {
  if (!isBrowser) return;
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.error('Error setting sessionStorage:', error);
  }
};

const MeetingPage = ({ params }: { params: { appointmentTypeId: string } }) => {
  const { data, isLoading } = useJoinMeetingQuery(params.appointmentTypeId, {
    refetchOnMountOrArgChange: true,
  });
  const { data: session } = useSession();
  const clientRef = useRef<any>(null);
  const isJoinedRef = useRef(false);

  const { appointmentDetails } = useAppSelector(
    (state) => state[APPOINTMENTS_SLICE_REDUCER_NAME]
  );

  const leaveMeeting = useCallback(async () => {
    if (clientRef.current && isJoinedRef.current) {
      try {
        await clientRef.current.leaveMeeting();
        isJoinedRef.current = false;
        if (ZoomMtgEmbedded) {
          ZoomMtgEmbedded.destroyClient();
        }

        // Clear the reference
        clientRef.current = null;

        console.log('Successfully cleaned up Zoom client');
      } catch (error) {
        console.error('Error leaving meeting:', error);
      }
    }
  }, []);

  const initializeClient = useCallback(() => {
    const meetingSDKElement = document.getElementById('meetingSDKElement');
    if (!meetingSDKElement) return;

    clientRef.current = ZoomMtgEmbedded.createClient();

    clientRef.current.init({
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        video: {
          popper: {
            disableDraggable: true,
          },
        },
      },
    });

    // Add event listeners
    clientRef.current.on('connection-change', (payload: { state: string }) => {
      if (payload.state === 'Closed') {
        console.log('Meeting ended or user left');
        isJoinedRef.current = false;
      }
      if (payload.state === 'Connected') {
        isJoinedRef.current = true;
      }
    });
  }, []);

  // Initialize client when data is available
  useEffect(() => {
    if (data) {
      initializeClient();
    }

    // Cleanup function
    return () => {
      leaveMeeting();
    };
  }, [data, initializeClient, leaveMeeting]);

  const joinMeeting = useCallback(async () => {
    if (!clientRef.current || !data || isJoinedRef.current) return;

    try {
      await clientRef.current.join({
        sdkKey: data.sdk_key,
        signature: data.signature || '',
        meetingNumber: `${data.meeting_number}`,
        password: data.meeting_password,
        userName: session?.profile_data?.personal.full_name,
      });
      isJoinedRef.current = true;
    } catch (error) {
      console.error('Error joining meeting:', error);
    }
  }, [data, session?.profile_data?.personal.full_name]);

  return (
    <PageComponentWrapper headerComponent={<AppointmentStatusHeader />}>
      {isLoading ? (
        <div className='grid place-items-center w-full min-h-72 '>
          <LoadingSpinner />
        </div>
      ) : (
        <div className='w-full relative h-[calc(100dvh-120px)]'>
          <Button
            onClick={joinMeeting}
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          >
            Join Meeting
          </Button>

          <div id='meetingSDKElement' className='mx-auto'></div>
        </div>
      )}
    </PageComponentWrapper>
  );
};

export default MeetingPage;
