'use client';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import CalendarIcon from '@/components/icons/CalendarIcon';
import TimeIcon from '@/components/icons/TimeIcon';
import IconWithText from '@/components/IconWithText';
import UnstyledLink from '@/components/links/UnstyledLink';
import SpecialistBadge from '@/components/SpecialistBadge';
import LoadingSpinner from '@/components/Spinner';

import { useAppDispatch } from '@/store';

import UserBadge from '@/app/(authenticated)/_components/UserBadge';
import CancelAppointmentButton from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/CancelAppointmentButton';
import MeetingLinkIcon from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/icon/MeetingLinkIcon';
import MapLocation from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/MapLocation';
import UploadInvoiceButton from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/UploadInvoiceButton';
import ViewInvoiceButton from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/ViewInvoiceButton';
import {
  useAcceptAppointmentMutation,
  useGetSingleAppointmentQuery,
} from '@/rtk-query/appointments';
import { updateAppointmentState } from '@/slices/appointments.slice';
import { formatToCurrency } from '@/utils/forrmatCurrency';

type StatusColor = {
  text: string;
  background: string;
};

const AppointmentStatusPage = ({
  appointmentId,
  type,
  isProvider,
}: {
  appointmentId: string;
  type: string;
  isProvider: boolean | undefined;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const {
    data: appointmentDetails,
    isLoading,
    refetch,
  } = useGetSingleAppointmentQuery(appointmentId);
  const [acceptAppointment, { isLoading: isAcceptLoading }] =
    useAcceptAppointmentMutation();

  // Convert string to Date object
  const date =
    appointmentDetails && new Date(appointmentDetails.appointment_time);

  const appointmentTime = `${date?.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    // hour12: true,
  })}`;
  const appointmentDate = `${date?.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;

  const statusColor = (): StatusColor => {
    let text = '';
    let background = '';
    if (appointmentDetails?.status === 'ongoing') {
      text = 'text-[#16C098]';
      background = 'bg-[#16C0981A]';
    } else if (appointmentDetails?.status === 'upcoming') {
      text = 'text-[#FFD912]';
      background = 'bg-[#FFD9121A]';
    } else if (appointmentDetails?.status === 'pending') {
      text = 'text-[#FFA553]';
      background = 'bg-[#FFA5531A]';
    } else if (appointmentDetails?.status === 'past') {
      text = 'text-[#27AE60]';
      background = 'bg-[#27AE601A]';
    } else if (appointmentDetails?.status === 'accepted') {
      text = 'text-[#27AE60]';
      background = 'bg-[#27AE601A]';
    }

    return { text, background };
  };

  const handleMeetClick = () => {
    router.push(`${pathname}/meet`);
  };

  const makePayment = () => {
    dispatch(
      updateAppointmentState({
        stage: 'payment',
        service_charge: appointmentDetails?.service_charge,
        total_charge: appointmentDetails?.total_charge,
        appointmentDetails,
      })
    );
    // router.push(`${pathname}/payment`);
  };

  const handleAcceptAppointment = async () => {
    try {
      await acceptAppointment(appointmentId).unwrap();
      router.push('/appointments');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const showMakePayment =
    !isProvider &&
    appointmentDetails?.status === 'accepted' &&
    appointmentDetails?.payment_status === 'unpaid' &&
    appointmentDetails?.service_type === 'service';

  if (isLoading)
    return (
      <div className='grid place-items-center w-full min-h-72 '>
        <LoadingSpinner />
      </div>
    );
  return (
    <main className='rounded-[20px] border-[#F1F1F1] border p-5'>
      <div className='flex items-start justify-between'>
        <UserBadge
          imgSrc={
            isProvider
              ? appointmentDetails?.client_image ?? ''
              : appointmentDetails?.provider_image ?? ''
          }
          username={
            isProvider
              ? appointmentDetails?.client_name
              : appointmentDetails?.provider_name
          }
          desc={
            isProvider
              ? appointmentDetails?.appointment_type === 'remote'
                ? 'Virtual'
                : 'In-Person'
              : appointmentDetails?.provider.profession
          }
          textColor='text-[#052536] text-2xl'
          imgClassNames='w-[70px] h-[70px]'
        />
        <div className='flex items-center gap-2'>
          {!isProvider && (
            <div
              className={cn(
                'rounded-lg px-4 py-2 font-bold capitalize bg-[#6E41E21A] text-[#6E41E2]',
                appointmentDetails?.appointment_type !== 'remote' &&
                  'bg-[#428BF91A] text-[#428BF9]'
              )}
            >
              {appointmentDetails?.appointment_type === 'remote'
                ? 'Virtual'
                : 'In-Person'}
            </div>
          )}
          <div
            className={`${statusColor().background} ${
              statusColor().text
            } rounded-lg px-4 py-2 font-bold text-[#16C098] capitalize`}
          >
            {appointmentDetails?.status === 'past'
              ? 'Completed'
              : appointmentDetails?.status}
          </div>
        </div>
      </div>

      <div className='flex gap-[60px] pt-5 pb-4 border-b border-[#F1F1F1]'>
        <p>
          Service Charge:{' '}
          <span className='text-[#16C098] font-bold'>
            {appointmentDetails &&
              formatToCurrency(appointmentDetails?.service_charge)}
          </span>
        </p>
        <IconWithText
          icon={<CalendarIcon width='22' height='22' />}
          text={appointmentDate}
          classNames={{ text: 'text-[#111111]' }}
        />
        <IconWithText
          icon={<TimeIcon fill='#428BF9' />}
          classNames={{ text: 'text-[#111111]' }}
          text={appointmentTime}
        />
      </div>

      <div className='mt-5 flex gap-5'>
        <div className='space-y-3'>
          <p className='text-sm text-[#6B6B6B] font-semibold'>Service</p>
          <SpecialistBadge
            text={appointmentDetails?.service_category}
            classNames={{
              icon: 'w-[50px] h-[50px] bg-[#FFA553]',
              text: 'text-[#111111] bg-[#FFA55333] font-medium text-base rounded-r-[30px]',
            }}
          />
        </div>
        <div className='space-y-3'>
          <p className='text-sm text-[#6B6B6B] font-semibold'>Challenge</p>
          <SpecialistBadge
            text={appointmentDetails?.challenge}
            classNames={{
              icon: 'w-[50px] h-[50px] ',
              text: 'text-[#111111] font-medium text-base rounded-r-[30px]',
            }}
          />
        </div>
        <div className='space-y-3'>
          <p className='text-sm text-[#6B6B6B] font-semibold'>Goal</p>
          <SpecialistBadge
            text={
              appointmentDetails?.goal === 'short-term'
                ? 'Short Term'
                : 'Long Term'
            }
            classNames={{
              icon: 'w-[50px] h-[50px] bg-[#052536]',
              text: 'text-[#111111] bg-[#05253626] font-medium text-base rounded-r-[30px]',
            }}
            backgrounds={{
              icon: '#052536',
              text: '#05253626',
            }}
          />
        </div>
      </div>

      {/* meeting link for virtual meets */}
      {appointmentDetails?.status !== 'pending' &&
        appointmentDetails?.appointment_type !== 'in-person' && (
          <div className='mt-5'>
            <h4 className='text-[#111] text-base font-bold'>Meeting Link</h4>
            <div className='mt-3 gap-3 flex items-center'>
              <div className='rounded-[10px] bg-[#F6F8FB] px-4 py-3 flex items-center gap-[10px] text-sm w-max'>
                <span className='h-10 w-10 flex items-center justify-center rounded-full bg-[#052536]'>
                  <MeetingLinkIcon />
                </span>
                <span>{appointmentDetails?.meeting_link}</span>
              </div>
              <UnstyledLink
                href={`${pathname}/meet`}
                className='font-semibold cursor-pointer'
              >
                Join
              </UnstyledLink>
            </div>
          </div>
        )}

      {/* <MapLocation /> */}
      {appointmentDetails?.appointment_type === 'in-person' && (
        <MapLocation
          address={`${appointmentDetails?.provider_address}` ?? ''}
        />
      )}
      {/* additional notes */}
      {appointmentDetails?.note && (
        <div className='mt-5'>
          <h4 className='text-[#111] text-base font-bold'>Additional Notes</h4>
          <p className='text-sm text-[#6B6B6B] leading-6 mt-3'>
            {appointmentDetails?.note}
          </p>
        </div>
      )}

      {/* payment mode */}
      {/* <div className='mt-5'>
        <h4 className='text-[#111] text-base font-bold'>
          Payment Mode: <span className='text-[#16C098]'>Prepaid</span>
        </h4>
        <div className='rounded-2xl mt-3 p-5 w-[500px] bg-[#E8F9F5] space-y-[10px]'>
          <div className='flex items-center justify-between'>
            <span>Transaction Id</span>
            <span className='font-bold text-[#052536]'>
              OP85GH451XC21NB542J
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Consultation Charge</span>
            <span className='font-bold text-[#052536]'>$0.00</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Convenience Fees</span>
            <span className='font-bold text-[#052536]'>$25.00</span>
          </div>
          <div className='flex items-center justify-between pt-[10px] border-t border-[#111111] font-bold text-[#16C098]'>
            <span>Total Amount</span>
            <span>$275.00</span>
          </div>
        </div>
      </div> */}

      <div className='w-max ml-auto mt-20 flex gap-4'>
        {!isProvider &&
          (appointmentDetails?.status === 'upcoming' ||
            appointmentDetails?.status === 'pending') && (
            <>
              <CancelAppointmentButton appointmentId={appointmentId} />
              <UnstyledLink href='/appointments'>
                <Button className='px-[72px]'>Back</Button>
              </UnstyledLink>
            </>
          )}

        {showMakePayment && (
          <>
            {/* <ViewInvoiceButton imgSrc={appointmentDetails?.invoice} /> */}
            <Button onClick={makePayment} className='px-[72px]'>
              Make Payment
            </Button>
          </>
        )}
        {isProvider && appointmentDetails?.status === 'upcoming' && (
          <CancelAppointmentButton appointmentId={appointmentId} />
        )}
        {isProvider && appointmentDetails?.status === 'pending' && (
          <>
            {/* <CancelAppointmentButton /> <DeclineAppointmentButton /> */}
            <CancelAppointmentButton appointmentId={appointmentId} />

            <Button
              isLoading={isAcceptLoading}
              onClick={handleAcceptAppointment}
              className='px-[72px]'
            >
              Accept
            </Button>
          </>
        )}
        {isProvider && appointmentDetails?.status === 'accepted' && (
          <>
            <UnstyledLink
              href={`/clients/${appointmentDetails.client_id}/add-project`}
            >
              <Button variant='outline' className='px-[72px]'>
                Add Project
              </Button>
            </UnstyledLink>
            {appointmentDetails?.invoice ? (
              <ViewInvoiceButton imgSrc={appointmentDetails?.invoice} />
            ) : (
              <UploadInvoiceButton
                appointmentId={appointmentId}
                refetch={refetch}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default AppointmentStatusPage;
