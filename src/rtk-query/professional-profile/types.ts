export type UserServices = {
  id: number;
  name: string;
  price: number;
};

export type AvailabilitySchedule = {
  id: number;
  week_day: string;
  start_time: string;
  end_time: string;
  created_at: number;
};

export type UserServicePriceParams = {
  data: {
    price: number;
  };
  id: string;
};
