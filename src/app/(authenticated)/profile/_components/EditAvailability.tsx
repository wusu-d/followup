import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import logger from '@/lib/logger';
import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import DeleteIcon from '@/components/icons/DeleteIcon';
import LoadingSpinner from '@/components/Spinner';
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

import { useAppDispatch, useAppSelector } from '@/store';

import EditAvailabilityIcon from '@/app/(onboarding)/professional-profile/_components/EditAvailabilityIcon';
import {
  useGetProviderAvailabilityQuery,
  useUpdateAvailabiltyMutation,
  useUpdateWorkProfileMutation,
} from '@/rtk-query/professional-profile';
import { useGetUserProfileQuery } from '@/rtk-query/profile';
import {
  PRO_EDIT_AVAILABILTY,
  PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME,
  setAvailabilities,
} from '@/slices/professional-profile.slice';

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
const workType = ['hybrid', 'in-Person', 'remote'];

type Availability = {
  id: number;
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

const EditProfessionalAvailability = () => {
  const { isLoading: isGetAvailLoading, refetch } =
    useGetProviderAvailabilityQuery();
  const { data: profileData, isLoading: isUserProfileLoading } =
    useGetUserProfileQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const [updateWorkProfile, { isLoading: isWorkUpdateLoading }] =
    useUpdateWorkProfileMutation();
  const [updateAvailabilty, { isLoading }] = useUpdateAvailabiltyMutation();
  const [activeDay, setActiveDay] = useState<string>('');
  const { [PRO_EDIT_AVAILABILTY]: availabilities } = useAppSelector(
    (state) => state[PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME]
  );

  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [typeofAvailability, setTypeofAvailability] = useState<WorkType>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const dispatch = useAppDispatch();

  console.log(availabilities);

  const handleAddAvailability = () => {
    if (activeDay && startTime && endTime) {
      // Add check for existing availability
      const existingAvailability = availabilities.find(
        (a) => a.day === activeDay
      );
      if (existingAvailability && !isEditing) {
        return;
      }

      if (isEditing && editingId) {
        dispatch(
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
          )
        );
        setIsEditing(false);
        setEditingId(null);
      } else {
        dispatch(
          setAvailabilities([
            ...availabilities,
            {
              id: availabilities.length + 1,
              day: activeDay,
              startTime,
              endTime,
            },
          ])
        );
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
    // Check if day already has availability
    const existingAvailability = availabilities.find((a) => a.day === day);
    if (existingAvailability) {
      handleEdit(existingAvailability);
      return;
    }

    // Reset editing state when adding new availability
    setActiveDay(day);
    setStartTime('');
    setEndTime('');
    setIsEditing(false);
    setEditingId(null);
    setIsDialogOpen(true);

    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollTop);
    }
  };

  useEffect(() => {
    if (profileData)
      setTypeofAvailability(profileData?.data?.work?.appointment_type);
  }, [profileData]);

  useEffect(() => {
    // Restore the scroll position when the modal is closed
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
      // setTypeofAvailability(editDay.appointmentType);
      editDay.startTime = startTime;
      editDay.endTime = endTime;
      // editDay.appointmentType = typeofAvailability;
      const updatedAvailabilities = availabilities.map((availability) =>
        availability.day === editDay?.day
          ? { ...availability, ...editDay }
          : availability
      );
      dispatch(setAvailabilities(updatedAvailabilities));
      setIsDialogOpen(true);
    }
  };

  const handleProfesional = (index: number) => {
    const availability = availabilities[index];
    setActiveDay(availability.day);
    setStartTime(availability.startTime);
    setEndTime(availability.endTime);
    // setTypeofAvailability(availability.appointmentType);
    setIsEditing(true);
    setEditingIndex(index);
    setIsDialogOpen(true);
  };

  const handleEdit = (availability: Availability) => {
    setActiveDay(availability.day);
    setStartTime(availability.startTime);
    setEndTime(availability.endTime);
    // setTypeofAvailability(availability.appointmentType);
    setIsEditing(true);
    setEditingId(availability.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(setAvailabilities(availabilities.filter((a) => a.id !== id)));
  };

  const handleSubmitAvailabilty = async () => {
    const data = availabilities.map((availabity) => ({
      week_day: availabity.day.slice(0, 3).toLowerCase(),
      start_time: availabity.startTime,
      end_time: availabity.endTime,
      // appointment_type: availabity.appointmentType.toLowerCase(),
    }));
    try {
      await updateAvailabilty(data).unwrap();
      await updateWorkProfile({
        appointment_type: typeofAvailability,
      }).unwrap();
      refetch();
      toast.success('Availability Updated Successfully');
    } catch (error) {
      logger(error);
    }
  };

  if (isGetAvailLoading || isUserProfileLoading) {
    return (
      <div className='grid place-items-center w-full min-h-72 '>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className=' max-w-2xl'>
        <div className='flex-col flex items-start'>
          <span className='text-lg font-bold text-black flex justify-between items-center mb-4'>
            Select Availability
          </span>
          <div
            ref={containerRef}
            className='h-[400px] overflow-y-auto space-y-3 w-full'
          >
            {daysOfWeek.map((day) => (
              <div key={day} className='flex flex-col items-stretch'>
                <div className='py-3 px-4 font-bold text-[#6B6B6B] text-lg flex items-center justify-between'>
                  {day}
                  {/* {getAvailabilityForDay(day) ? (
                    <EditAvailabilityIcon
                      onClick={() =>
                        handleEditAvailability(getIndexForDay(day))
                      }
                    />
                  ) : (
                    ''
                  )} */}
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
                {/* {getAvailabilityForDay(day) ? (
                  <span className='pt-1 px-4 font-medium text-[#052536] self-start'>
                    {getAvailabilityForDay(day)?.startTime} -{' '}
                    {getAvailabilityForDay(day)?.endTime} |{' '}
                    {getAvailabilityForDay(day)?.appointmentType}
                  </span>
                ) : (
                  ''
                )} */}
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
          <p className='text-lg font-bold text-black flex justify-between items-center mt-7'>
            Type of Availability
          </p>
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
          disabled={availabilities.length === 0}
          type='submit'
          onClick={handleSubmitAvailabilty}
          className='w-2/5 mt-5 mx-auto block'
          isLoading={isLoading || isWorkUpdateLoading}
        >
          Update Availability
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

export default EditProfessionalAvailability;
