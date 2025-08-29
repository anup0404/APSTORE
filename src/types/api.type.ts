export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}
