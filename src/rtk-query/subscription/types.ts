export type PaymentHistoryResponse = {
  current_page: number;
  total_page: number;
  data: Transaction[];
};

export type Transaction = {
  id: number;
  user_id: number;
  amount: number;
  transaction_id: string;
  status: string; // Assuming possible statuses
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
  intent: string;
  provider: string;
};

export type ActiveSubResponse = {
  id: number;
  plan_id: number;
  name: string;
  price: number;
  billing_cycle: string;
  description: string | null;
  start_date: number; // Timestamp
  end_date: number; // Timestamp
  coupon_id: number | null;
  student_plan: boolean;
  next_plan: string;
  status: string;
};
