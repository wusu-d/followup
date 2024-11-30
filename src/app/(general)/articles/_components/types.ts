export interface BlogPost {
  id: number;
  title: string;
  body: string;
  image: string;
  created_by: number;
  created_at: number;
  updated_at: number;
  deleted_at: null | number;
  creator: string;
}

export interface BlogPostResponse {
  current_page: number;
  page_count: number;
  total_records: number;
  data: BlogPost[];
}
