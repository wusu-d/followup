import { useEffect, useRef, useState } from 'react';

import logger from '@/lib/logger';
import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import DeleteIcon from '@/components/icons/DeleteIcon';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useAppDispatch } from '@/store';

import OnboardingHeader from '@/app/(authentication)/_components/OnboardingHeader';
import Back from '@/app/(onboarding)/_components/Back';
import EditAvailabilityIcon from '@/app/(onboarding)/professional-profile/_components/EditAvailabilityIcon';
import {
  useUpdateAvailabiltyMutation,
  useUpdateWorkProfileMutation,
} from '@/rtk-query/professional-profile';
import { updateProfessionalProfileState } from '@/slices/professional-profile.slice';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

type WorkType = 'hybrid' | 'in-person' | 'remote' | string;
const workType = ['hybrid', 'in-person', 'remote'];
type Availability = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
};

const capitalizeAppointmentType = (type: string): string => {
  if (type === 'in-person') {
    return 'In-Person';
  }
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const ProfessionalAvailabilty = () => {
  const [updateAvailabilty, { isLoading }] = useUpdateAvailabiltyMutation();
  const [activeDay, setActiveDay] = useState<string>('');
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [updateWorkProfile, { isLoading: isWorkUpdateLoading }] =
    useUpdateWorkProfileMutation();
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [typeofAvailability, setTypeofAvailability] = useState<WorkType>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  console.log(availabilities);

  const dispatch = useAppDispatch();

  const handleAddAvailability = () => {
    if (activeDay && startTime && endTime) {
      const existingAvailability = availabilities.find(
        (a) => a.day === activeDay
      );
      if (existingAvailability && !isEditing) {
        return;
      }

      if (isEditing && editingId) {
        setAvailabilities(
          availabilities.map((a) =>
            a.id === editingId
              ? {
                  ...a,
                  day: activeDay,
                  startTime,
                  endTime,
                }
              : a
          )
        );
        setIsEditing(false);
        setEditingId(null);
      } else {
        setAvailabilities([
          ...availabilities,
          {
            id: Date.now().toString(),
            day: activeDay,
            startTime,
            endTime,
          },
        ]);
      }
      setActiveDay('');
      setStartTime('');
      setEndTime('');
    }
  };

  const getAvailabilityForDay = (day: string) => {
    return availabilities.find((a) => a.day === day);
  };

  const getIndexForDay = (day: string) => {
    return availabilities.findIndex((a) => a.day === day);
  };

  const handleDayClick = (day: string) => {
    const existingAvailability = availabilities.find((a) => a.day === day);
    if (existingAvailability) {
      handleEdit(existingAvailability);
      return;
    }

    setActiveDay(day);
    setIsDialogOpen(true);
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollTop);
    }
  };

  useEffect(() => {
    if (!isDialogOpen && containerRef.current) {
      containerRef.current.scrollTop = scrollPosition;
    }
  }, [isDialogOpen, scrollPosition]);

  const editAvailabilty = (day: string) => {
    const editDay = availabilities.find((a) => a.day === day);
    if (editDay) {
      setActiveDay(editDay.day);
      setEndTime(editDay.endTime);
      setStartTime(editDay.startTime);
      editDay.startTime = startTime;
      editDay.endTime = endTime;
      const updatedAvailabilities = availabilities.map((availability) =>
        availability.day === editDay?.day
          ? { ...availability, ...editDay }
          : availability
      );
      setAvailabilities(updatedAvailabilities);
      setIsDialogOpen(true);
    }
  };

  const handleEditAvailability = (index: number) => {
    const availability = availabilities[index];
    setActiveDay(availability.day);
    setStartTime(availability.startTime);
    setEndTime(availability.endTime);
    setIsEditing(true);
    setEditingIndex(index);
    setIsDialogOpen(true);
  };

  const handleEdit = (availability: Availability) => {
    setActiveDay(availability.day);
    setStartTime(availability.startTime);
    setEndTime(availability.endTime);
    setIsEditing(true);
    setEditingId(availability.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setAvailabilities(availabilities.filter((a) => a.id !== id));
  };

  const handleSubmitAvailabilty = async () => {
    const data = availabilities.map((availabity) => ({
      week_day: availabity.day.slice(0, 3).toLowerCase(),
      start_time: availabity.startTime,
      end_time: availabity.endTime,
    }));
    try {
      await updateAvailabilty(data).unwrap();
      await updateWorkProfile({
        appointment_type: typeofAvailability,
      }).unwrap();
      dispatch(
        updateProfessionalProfileState({
          stage: 'socials',
        })
      );
    } catch (error) {
      logger(error);
    }
  };

  return (
    <>
      <Back
        onClick={() =>
          dispatch(updateProfessionalProfileState({ stage: 'serviceCharges' }))
        }
      />
      <OnboardingHeader title='Add your availability' content='' />
      <div className=' max-w-2xl mx-auto'>
        <div className='flex-col flex items-start'>
          <span className='text-[#111111] font-bold mt-10 mb-4'>
            Select Availability
          </span>
          <div
            ref={containerRef}
            className='h-[150px] md:h-[250px] lg:h-[350px] overflow-y-auto space-y-3 w-full'
          >
            {daysOfWeek.map((day) => (
              <div key={day} className='flex flex-col items-stretch'>
                <div className='py-3 px-4 font-bold text-[#6B6B6B] text-lg flex items-center justify-between'>
                  {day}
                </div>
                <div className='py-3 px-4 text-[#6B6B6B] border-t border-b border-[#F1F1F1] flex justify-between'>
                  Add Availability
                  <button
                    onClick={() => handleDayClick(day)}
                    className='h-5 w-5 cursor-pointer text-white font-semibold bg-[#16C098] rounded-md flex items-center justify-center'
                  >
                    +
                  </button>
                </div>
                <table className='table-fixed'>
                  <tbody>
                    {availabilities
                      .filter((a) => a.day === day)
                      .map((availability, index) => (
                        <tr key={index}>
                          <td className='text-left px-4 w-max text-[#16C098] font-medium'>
                            {availability.startTime} - {availability.endTime}
                          </td>
                          <td>
                            <span className='px-4 py-1 flex items-center justify-end gap-2'>
                              <EditAvailabilityIcon
                                onClick={() => handleEdit(availability)}
                              />

                              <DeleteIcon
                                fill='black'
                                className='cursor-pointer'
                                onClick={() => handleDelete(availability.id)}
                              />
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <p className='text-[#111111] font-bold mt-7'>Type of Availability</p>
          <p className='text-[#6B6B6B] text-sm mb-3'>
            You can choose to offer your services remotely, in-person, or
            through a hybrid model
          </p>

          <Select
            onValueChange={setTypeofAvailability}
            value={typeofAvailability}
          >
            <SelectTrigger className='h-[60px] bg-[#F2F5F8] border-none self-stretch'>
              <SelectValue placeholder='Select' />
            </SelectTrigger>
            <SelectContent>
              {workType.map((work) => (
                <SelectItem key={work} value={work}>
                  {capitalizeAppointmentType(work)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          disabled={availabilities.length === 0 || !typeofAvailability}
          type='submit'
          onClick={handleSubmitAvailabilty}
          className='w-2/5 mt-5 mx-auto block'
          isLoading={isLoading}
        >
          Next
        </Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='border-none rounded-2xl'>
          <DialogHeader>
            <DialogTitle>
              <p className='text-2xl font-bold text-center'>
                Select Date and Time
              </p>
            </DialogTitle>
          </DialogHeader>
          <div className='flex gap-4 items-center justify-center'>
            {daysOfWeek.map((day) => {
              const date = day[0];
              return (
                <div
                  key={day}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center bg-[#D0F2EA]',
                    activeDay === day && ['bg-[#16C098] text-white']
                  )}
                >
                  {date}
                </div>
              );
            })}
          </div>
          <div className='flex self-stretch gap-4 w-full'>
            <Select onValueChange={setStartTime} value={startTime}>
              <SelectTrigger className='h-[60px] bg-[#F2F5F8] border-none'>
                <SelectValue placeholder='Start Time' />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                  <SelectItem
                    key={hour}
                    value={`${hour.toString().padStart(2, '0')}:00`}
                  >
                    {`${hour.toString().padStart(2, '0')}:00`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setEndTime} value={endTime}>
              <SelectTrigger className='h-[60px] bg-[#F2F5F8] border-none'>
                <SelectValue placeholder='End Time' />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                  <SelectItem
                    key={hour}
                    value={`${hour.toString().padStart(2, '0')}:00`}
                  >
                    {`${hour.toString().padStart(2, '0')}:00`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogClose asChild>
            <Button
              type='submit'
              className='w-2/5 mt-5 mx-auto block'
              onClick={handleAddAvailability}
              disabled={!startTime || !endTime}
            >
              {isEditing ? 'Edit' : 'Add'} Availabilty
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfessionalAvailabilty;
