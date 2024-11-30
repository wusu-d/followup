type Notification = {
  id: number;
  message: string;
  link: string | null;
  seen: boolean;
  source_type: string;
  source_id: number | null;
  created_at: number;
};

export type NotificationsResponse = {
  current_page: number;
  page_count: number;
  total_records: number;
  data: Notification[];
};
export type MarkAsSeenParam = {
  id: number[];
};
