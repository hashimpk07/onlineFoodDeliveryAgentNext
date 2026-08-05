export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data?: T;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
