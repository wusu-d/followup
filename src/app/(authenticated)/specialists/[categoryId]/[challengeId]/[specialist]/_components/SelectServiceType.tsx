import Button from '@/components/buttons/Button';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useAppDispatch, useAppSelector } from '@/store';

import {
  BOOK_APPOINTMENT_SERVICE_ARRAY,
  BOOK_APPOINTMENT_SERVICE_TYPE,
  BOOK_APPOINTMENT_SLICE_REDUCER_NAME,
  updateBookAppointmentState,
} from '@/slices/book-appointment.slice';
import { formatToCurrency } from '@/utils/forrmatCurrency';

const SelectServiceType = () => {
  const dispatch = useAppDispatch();

  const {
    [BOOK_APPOINTMENT_SERVICE_TYPE]: selectedServiceType,
    [BOOK_APPOINTMENT_SERVICE_ARRAY]: serviceArray,
  } = useAppSelector((state) => state[BOOK_APPOINTMENT_SLICE_REDUCER_NAME]);

  const handleValueChange = (value: string) => {
    const selected = serviceArray.find((wellness) => wellness.name === value);
    dispatch(
      updateBookAppointmentState({
        [BOOK_APPOINTMENT_SERVICE_TYPE]: selected,
      })
    );
    // setSelectedServiceType(selected || null);
  };

  const handleSubmit = () => {
    dispatch(updateBookAppointmentState({ stage: 'appointmentType' }));
  };

  return (
    <DialogContent className='rounded-2xl max-w-lg p-10 border-none outline-none'>
      <DialogTitle className='text-[28px] text-[#111] font-bold mb-5 text-center'>
        Select Service Type
      </DialogTitle>
      <div className='w-full space-y-5'>
        <Select onValueChange={handleValueChange}>
          <SelectTrigger className='h-[60px] bg-[#F2F5F8] border-none rounded-[10px]'>
            <SelectValue placeholder='Select Service Type' />
          </SelectTrigger>
          <SelectContent>
            {serviceArray.map((service) => (
              <SelectItem
                key={service.name}
                value={service.name}
                className='py-4'
              >
                {service.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className='bg-[#F4F4F4]  flex items-center justify-between rounded-[15px] text-[#111] font-bold p-5'>
          <span>Charge </span>
          <span>
            {selectedServiceType
              ? formatToCurrency(selectedServiceType.price)
              : '$0'}
          </span>
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!selectedServiceType?.name}
        className=''
      >
        Next
      </Button>
    </DialogContent>
  );
};

export default SelectServiceType;
