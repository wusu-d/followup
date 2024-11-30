import { useParams, usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, FocusEvent, useState } from 'react';
import { PiCheckCircleFill } from 'react-icons/pi';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

import { useAppDispatch, useAppSelector } from '@/store';

import { useCreateAppointmentMutation } from '@/rtk-query/appointments';
import {
  BOOK_APPOINTMENT_APPOINTMENT_TYPE,
  BOOK_APPOINTMENT_DATE,
  BOOK_APPOINTMENT_GOAL,
  BOOK_APPOINTMENT_NOTE,
  BOOK_APPOINTMENT_SERVICE_TYPE,
  BOOK_APPOINTMENT_SLICE_REDUCER_NAME,
  BOOK_APPOINTMENT_TIME,
  updateBookAppointmentState,
} from '@/slices/book-appointment.slice';
import { updateSpecialistState } from '@/slices/specialists.slice';

type Challenge = {
  name: string;
};

const challengeArray: Challenge[] = [
  {
    name: 'Emotional Wellness',
  },
  {
    name: 'Physical Wellness',
  },
];

const goals = ['Short Term', 'Long Term'];

const AppointmentInputForm = () => {
  const dispatch = useAppDispatch();

  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();
  const router = useRouter();
  const { specialist, challengeId, categoryId } = useParams();
  console.log(specialist, challengeId, categoryId);
  const {
    [BOOK_APPOINTMENT_GOAL]: appointmentGoal,
    [BOOK_APPOINTMENT_NOTE]: appointmentNote,
    [BOOK_APPOINTMENT_APPOINTMENT_TYPE]: appointmentType,
    [BOOK_APPOINTMENT_SERVICE_TYPE]: selectedServiceType,
    [BOOK_APPOINTMENT_TIME]: appointmentTime,
    [BOOK_APPOINTMENT_DATE]: appointmentDate,
  } = useAppSelector((state) => state[BOOK_APPOINTMENT_SLICE_REDUCER_NAME]);

  const [touched, setTouched] = useState<boolean>(false);

  const handleGoalClick = (goal: string) => {
    dispatch(
      updateBookAppointmentState({
        [BOOK_APPOINTMENT_GOAL]: goal,
      })
    );
  };

  const handleSubmit = async () => {
    const formattedDate = appointmentDate?.toLocaleDateString('en-CA');
    try {
      await createAppointment({
        service_id: Number(categoryId),
        challenge_id: Number(challengeId),
        provider_id: Number(specialist),
        appointment_time: `${formattedDate} ${appointmentTime}`,
        appointment_type: appointmentType, // remote, in-person
        service_type: selectedServiceType?.name.toLowerCase(), // consultation or service
        goal: appointmentGoal, // short-term, long-term
        note: appointmentNote,
      }).unwrap();
      dispatch(updateSpecialistState({ stage: 'payment' }));
      // router.push(`${pathname}/pay`);
    } catch (error) {
      console.log(error);
      // if (error instanceof AxiosError) {
      //   if (error.data) toast.error(error?.data.messages.error);
      // }
    }
  };

  return (
    <DialogContent className='rounded-2xl max-w-lg p-10 border-none outline-none'>
      <DialogTitle className='text-[28px] text-[#111] font-bold mb-5 text-center'>
        Input Form
      </DialogTitle>
      <div className='w-full space-y-5'>
        {/* <div className='space-y-3'>
          <p className='text-sm text-[#111]'>Challenge</p>
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className='h-[60px] bg-[#F2F5F8] border-none rounded-[10px]'>
              <SelectValue placeholder='Select Wellness Dimension' />
            </SelectTrigger>
            <SelectContent>
              {challengeArray.map((challenge) => (
                <SelectItem
                  key={challenge.name}
                  value={challenge.name}
                  className='py-4'
                >
                  {challenge.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
        <div className='space-y-3'>
          <p className='text-sm text-[#111]'>Select Goal</p>
          <div className='w-full flex-wrap justify-between flex gap-5'>
            {goals.map((goal, index) => {
              const goalModified = goal.toLowerCase().replace(/\s+/g, '-');
              return (
                <div
                  key={index}
                  onClick={() => handleGoalClick(goalModified)}
                  className={cn(
                    'bg-[#F6F8FB] flex-shrink-0 flex items-center gap-4 py-[18px] px-5 basis-[47%] rounded-[10px] text-[#111] font-medium border border-transparent cursor-pointer',
                    appointmentGoal === goalModified &&
                      'bg-[#16C09814] border-[#16C098]'
                  )}
                >
                  <div className='h-6 w-6 rounded-full border border-[#D0F2EA] text-primary-green'>
                    {appointmentGoal === goalModified && (
                      <PiCheckCircleFill className='w-full h-auto aspect-square' />
                    )}
                  </div>
                  {goal}
                </div>
              );
            })}
          </div>
        </div>
        <div className='space-y-3'>
          <p className='text-sm text-[#111]'>Additional Notes</p>
          <Textarea
            value={appointmentNote}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              dispatch(
                updateBookAppointmentState({
                  [BOOK_APPOINTMENT_NOTE]: e.target.value,
                })
              );
            }}
            onBlur={(e: FocusEvent<HTMLTextAreaElement>) => {
              setTouched(true);
            }}
            touched={touched}
            name='notes'
            className='resize-none'
            rows={5}
          />
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        isLoading={isLoading}
        disabled={!appointmentGoal}
        className=''
      >
        Submit & Pay
      </Button>
    </DialogContent>
  );
};

export default AppointmentInputForm;
