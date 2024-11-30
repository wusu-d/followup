import Button from '@/components/buttons/Button';
import CalendarIcon from '@/components/icons/CalendarIcon';
import TimeIcon from '@/components/icons/TimeIcon';
import IconWithText from '@/components/IconWithText';
import UnstyledLink from '@/components/links/UnstyledLink';
import PageComponentWrapper from '@/components/PageComponentWrapper';
import SpecialistBadge from '@/components/SpecialistBadge';

import UserBadge from '@/app/(authenticated)/_components/UserBadge';
import PaymentSummaryHeader from '@/app/(authenticated)/specialists/[categoryId]/[challengeId]/[specialist]/pay/_components/PaymentSummaryHeader';
const PaymentReceivedPage = () => {
  return (
    <PageComponentWrapper headerComponent={<PaymentSummaryHeader />}>
      <div className='border-[#F1F1F1] border rounded-[20px] p-5'>
        <div className='flex justify-between items-center'>
          <h4 className='text-[#111] text-xl font-bold'>
            Payment Confirmation
          </h4>
          <div className='text-[#052536] bg-[#05253633] rounded-lg px-4 py-2 font-bold'>
            12 July, 2023 10:00am
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
                <td className='text-left'>Consultation Charge</td>
                <td className='text-right font-bold '>$2.50</td>
              </tr>
            </tbody>
          </table>
          <hr className='w-full mt-3 border-primary-black/20' />
          <table className='w-full mt-3'>
            <tbody>
              <tr className='font-bold text-primary-green'>
                <td className='text-left'>Total Amount</td>
                <td className='text-right'>$100</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='flex items-start justify-between mt-5'>
          <UserBadge
            imgSrc='/images/profile-icon.png'
            username='Monaco Paez'
            desc='Psychiatrist'
            textColor='text-[#052536] text-2xl'
            imgClassNames='w-[70px] h-[70px]'
          />
        </div>

        <div className='flex gap-[60px] pt-5 pb-4 border-b border-[#F1F1F1]'>
          <p>
            Service Charge:{' '}
            <span className='text-[#16C098] font-bold'>$250.00</span>
          </p>
          <IconWithText
            icon={<CalendarIcon width='22' height='22' />}
            text='14 July,2023'
            classNames={{ text: 'text-[#111111]' }}
          />
          <IconWithText
            icon={<TimeIcon fill='#428BF9' />}
            classNames={{ text: 'text-[#111111]' }}
            text='04:00 pm'
          />
        </div>

        <div className='mt-5 flex gap-5'>
          <div className='space-y-3'>
            <p className='text-sm text-[#6B6B6B] font-semibold'>Service</p>
            <SpecialistBadge
              text='Physical Wellness'
              classNames={{
                icon: 'w-[50px] h-[50px] bg-[#FFA553]',
                text: 'text-[#111111] bg-[#FFA55333] font-medium text-base rounded-r-[30px]',
              }}
            />
          </div>
          <div className='space-y-3'>
            <p className='text-sm text-[#6B6B6B] font-semibold'>Challenge</p>
            <SpecialistBadge
              text='Emotional Awareness'
              classNames={{
                icon: 'w-[50px] h-[50px] ',
                text: 'text-[#111111] font-medium text-base rounded-r-[30px]',
              }}
            />
          </div>
          <div className='space-y-3'>
            <p className='text-sm text-[#6B6B6B] font-semibold'>Goal</p>
            <SpecialistBadge
              text='Short Term'
              classNames={{
                icon: 'w-[50px] h-[50px] bg-[#052536]',
                text: 'text-[#111111] bg-[#05253626] font-medium text-base rounded-r-[30px]',
              }}
            />
          </div>
        </div>

        {/* meeting link for virtual meets */}
        <div className='mt-5'>
          <h4 className='h4'>Meeting Link</h4>
          <div className='mt-3 rounded-[10px] bg-[#F6F8FB] px-4 py-3 flex items-center gap-[10px] text-sm w-max'>
            <span className='h-10 w-10 flex items-center justify-center rounded-full bg-[#052536]'></span>
            zoommtg://zoom.us/join?confno=85290 15944&pwd=&uname=Nobody%20-%20
          </div>
        </div>

        {/* additional notes */}
        <div className='mt-5'>
          <h4 className='h4'>Additional Notes</h4>
          <p className='text-sm text-[#6B6B6B] leading-6'>
            Office ipsum you must be muted. Win-win-win tentative reality
            slipstream flesh nobody. Contribution prioritize reinvent six
            ourselves slipstream journey. Idea long metal anomalies client.
            Drawing-board shower space people yet innovation already. Unlock
            take catching third asserts ladder with waste put deep. Spaces drive
            walk journey and also cross hits responsible. Guys next search busy
            net cloud social minimize.
          </p>
        </div>

        <div className='w-max ml-auto mt-20'>
          <UnstyledLink href='/appointments'>
            <Button className='px-[86px]'>Done</Button>
          </UnstyledLink>
        </div>
      </div>
    </PageComponentWrapper>
  );
};

export default PaymentReceivedPage;
