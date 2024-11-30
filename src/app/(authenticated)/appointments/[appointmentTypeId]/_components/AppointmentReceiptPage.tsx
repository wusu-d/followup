import { usePathname, useRouter } from 'next/navigation';

import Button from '@/components/buttons/Button';
import CalendarIcon from '@/components/icons/CalendarIcon';
import TimeIcon from '@/components/icons/TimeIcon';
import IconWithText from '@/components/IconWithText';
import UnstyledLink from '@/components/links/UnstyledLink';
import SpecialistBadge from '@/components/SpecialistBadge';

import { useAppSelector } from '@/store';

import UserBadge from '@/app/(authenticated)/_components/UserBadge';
import MeetingLinkIcon from '@/app/(authenticated)/appointments/[appointmentTypeId]/_components/icon/MeetingLinkIcon';
import { APPOINTMENTS_SLICE_REDUCER_NAME } from '@/slices/appointments.slice';
import {
  BOOK_APPOINTMENT_PAYMENT_SUMMARY,
  BOOK_APPOINTMENT_SERVICE_TYPE,
  BOOK_APPOINTMENT_SLICE_REDUCER_NAME,
} from '@/slices/book-appointment.slice';
import { formatToCurrency } from '@/utils/forrmatCurrency';

const AppointmentReceiptPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    [BOOK_APPOINTMENT_SERVICE_TYPE]: serviceType,
    [BOOK_APPOINTMENT_PAYMENT_SUMMARY]: paymentSummary,
  } = useAppSelector((state) => state[BOOK_APPOINTMENT_SLICE_REDUCER_NAME]);
  const { appointmentDetails } = useAppSelector(
    (state) => state[APPOINTMENTS_SLICE_REDUCER_NAME]
  );

  const currentDate = new Date();

  const currentDateFmt = currentDate.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

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

  const handleMeetClick = () => {
    router.push(`${pathname}/meet`);
  };
  return (
    <div className='border-[#F1F1F1] border rounded-[20px] p-5'>
      <div className='flex justify-between items-center'>
        <h4 className='text-[#111] text-xl font-bold'>Payment Confirmation</h4>
        <div className='text-[#052536] bg-[#05253633] rounded-lg px-4 py-2 font-bold'>
          {currentDateFmt}
        </div>
      </div>

      {/* receipt table */}
      <div className='bg-light-green p-4 rounded-[11px] lg:w-1/2 w-full mt-4'>
        <table className='w-full border-separate border-spacing-y-3 text-[#052536]'>
          <tbody>
            <tr>
              <td className='text-left'>Transaction Id</td>
              <td className='text-right font-bold '>OP85GH451XC21NB542J</td>
            </tr>

            <tr>
              <td className='text-left'>Service Charge</td>
              <td className='text-right font-bold '>
                {appointmentDetails?.service_charge &&
                  formatToCurrency(appointmentDetails?.service_charge)}
              </td>
            </tr>
          </tbody>
        </table>
        <hr className='w-full mt-3 border-primary-black/20' />
        <table className='w-full mt-3'>
          <tbody>
            <tr className='font-bold text-primary-green'>
              <td className='text-left'>Total Amount</td>
              <td className='text-right'>
                {appointmentDetails?.total_charge &&
                  formatToCurrency(appointmentDetails?.total_charge)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='flex items-start justify-between mt-5'>
        <UserBadge
          imgSrc='/images/profile-icon.png'
          username={appointmentDetails?.provider_name}
          desc='Psychiatrist'
          textColor='text-[#052536] text-2xl'
          imgClassNames='w-[70px] h-[70px]'
        />
      </div>

      <div className='flex gap-[60px] pt-5 pb-4 border-b border-[#F1F1F1]'>
        <p>
          Service Charge:{' '}
          <span className='text-[#16C098] font-bold'>
            {' '}
            {appointmentDetails?.service_charge &&
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
          />
        </div>
      </div>

      {/* meeting link for virtual meets */}
      <div className='mt-5'>
        <h4 className='text-[#111] text-base font-bold'>Meeting Link</h4>
        <div className='mt-3 gap-3 flex items-center'>
          <div className='rounded-[10px] bg-[#F6F8FB] px-4 py-3 flex items-center gap-[10px] text-sm w-max'>
            <span className='h-10 w-10 flex items-center justify-center rounded-full bg-[#052536]'>
              <MeetingLinkIcon />
            </span>
            <span>{appointmentDetails?.meeting_link}</span>
          </div>
          <span
            onClick={handleMeetClick}
            className='font-semibold cursor-pointer'
          >
            Join
          </span>
        </div>
      </div>

      {/* additional notes */}
      {/* additional notes */}
      {appointmentDetails?.note && (
        <div className='mt-5'>
          <h4 className='text-[#111] text-base font-bold'>Additional Notes</h4>
          <p className='text-sm text-[#6B6B6B] leading-6 mt-3'>
            {appointmentDetails?.note}
          </p>
        </div>
      )}

      <div className='w-max ml-auto mt-20'>
        <UnstyledLink href='/appointments'>
          <Button className='px-[86px]'>Done</Button>
        </UnstyledLink>
      </div>
    </div>
  );
};

export default AppointmentReceiptPage;
